# Koa users (Решение)


## GET /users 

Начнем разбор решения с метода, позволяющего получить список всех пользователей из базы данных. Для
того, чтобы выполнить поиск в коллекции пользователей нам необходимо вызвать метод `.find`, который
принимает в качестве аргумента условия поиска. В данном случае наша задача - получить список всех
пользователей поэтому условие можно либо оставить пустым, либо передать `{}`, что одно и тоже в 
данном случае.

```js
router.get('/users', async (ctx) => {
  ctx.body = await User.find({});
});
```


Важный момент, который касается обработки возможных ошибок. В данном случае если что-то случится с
соединением к базе данных - будет выброшена ошибка, которую мы можем обработать с помощью 
конструкции `try/catch`. Но вместо того, чтобы обернуть именно этот запрос к базе данных - лучше 
вынести эту логику в отдельный middleware, который разместить перед всей цепочкой, таким образом мы 
сразу же гарантируем корректную обработку ошибок при любых запросах. Этот middleware объявлен и 
подключен в файле `app.js`.  


## GET /users/:id

Получение пользователя по его идентификатору сводится к поиску пользователя по полю `id`. Выполнить
эту операцию можно с помощью метода `User.findById(id)`. Индентификатор пользователя будет частью
URL, которую `koa-router` позволяет получить с помощью свойства `params`. Метод `.findById` 
возвращает либо объект пользователя (если он найден), либо `null`, если пользователя нет.  

```js
router.get('/users/:id', async (ctx) => {
  const user = await User.findById(ctx.params.id);

  if (!user) {
    ctx.throw(404);
  }

  ctx.body = user;
});
```


Однако в такой реализации есть проблема, дело в том, что если переданный идентификатор будет 
невалидным - то в результате будет выброшена ошибка `CastError`. Наш код будет по-прежнему работать,
но пользователю будет возвращаться ошибка с кодом 500, что не является правильным статусом, ведь в 
данном случае пользователь сам "виноват" в том, что его запрос к базе данных не может быть выполнен.
Есть два способа отследить подобные ситуации:
1. Либо с помощью `try/catch` с дополнительной проверкой типа ошибки в блоке `catch`, т.е.

```js
try {
  ...
} catch (err) {
  if (err instanceof CastError) { ... }
}
```  

2. Либо с помощью метода `mongoose.Types.ObjectId.isValid(id)`, который способен проверить 
валидность схемы передаваемого идентификатора без необходимости выполнять запрос к базе данных.


Воспользуемся для проверки именно вторым способом, так как он является более простым в реализации.
Следуя принятому в koa.js подходу вынесем проверку идентификатора в отдельный middleware, получив 
таким образом сразу 2 бонуса:
1. Код функций остается небольшим и легко читаемым.
2. Проверка id может понадобиться и в других обработчиках, вынеся её в отдельный middleware мы 
получаем возможность подключать её при необходимости.

```js
function validateId(ctx, next) {
  const id = ctx.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    ctx.throw(400);
  }

  return next();
}
```

*Обратите внимание, по условию задачи передача невалидного id должна приводить именно к ошибке со 
статусом 400, то есть таким образом мы сообщаем пользователю, что его запрос некорректный.* 


Подключим теперь эту функцию в цепочку middleware нашего роутера:

```js
router.get('/users/:id', validateId, async (ctx) => {
  const user = await User.findById(ctx.params.id);

  if (!user) {
    ctx.throw(404);
  }

  ctx.body = user;
});
```


## POST /users

Создание документа в базе данных выполняется с помощью метода `User.create`, в него передаются 
данные, которые будут сохранены в базу. Модуль `koa-bodyparser` разберёт запрос от пользователя и
свойство `ctx.request.body` будет содержать соответствующий объект. Наша задача при обработке этого
запроса сводится к двум подзадачам:
1. Получить поля `email` и `displayName` в объекте запроса и использовать их для создания документа.
2. Обработать возможную ошибку валидации, которая может возникнуть в том случае, если пользователь
передал неверные данные.


Для решения первой подзадачи я предлагаю воспользоваться модулем `lodash`, а точнее его функцией
[pick](https://lodash.com/docs/4.17.11#pick). Она решает в точности ту задачу, которая перед нами 
стоит - а именно получает из объекта только необходимые поля, игнорируя все остальные. Кроме этого, 
если каких-то полей нет в исходном объекте, то они также не попадают в результат.
В итоге код будет выглядеть подобным образом:

```js
router.post('/users', async (ctx) => {
  const fields = _.pick(ctx.request.body, ['displayName', 'email']);
  ctx.body = await User.create(fields);
});
```

Для решения второй подзадачи (для обработки ошибки валидации) мы объявим отдельный middleware, как 
уже обсуждалось выше, это самый правильный с архитектурной точки зрения способ работы в koa.js.
Логика здесь будет следующая: этот middleware вызывается **до** непосредственно обработки запроса и
оборачивает всю последующую цепочку в `try/catch`. Далее, если происходит ошибка - он ее 
обрабатывает. Таким образом код создания документа пользователя не должен быть изменен. Так как мы 
не хотим обрабатывать никакие другие ошибки, кроме ошибок валидации в этом обработчике, стоит первым
делом проверить класс ошибки, чтобы убедиться в том, что перед нами именно ошибка валидации. Другие
ошибки, которые могут произойти мы просто прокидываем дальше, полагаясь на то, что обработчик, 
находящийся выше в цепочке ее обработает.

```js
async function handleMongooseValidationError(ctx, next) {
  try {
    await next();
  } catch (err) {
    if (err.name !== 'ValidationError') throw err;

    ...
  }
}
``` 

*Обратите внимание и постарайтесь запомнить этот "паттерн" - практически всегда при обработке 
ошибок первым делом стоит убедиться в том, что ошибка нам известна. Очень часто разработчики 
забывают о такой проверке и код в результате получается некорректный, например, ошибка соединения с
базой данных обрабатывается так, как будто это ошибка валидации, потому что разработчик "забыл"
проверить что именно за ошибка перед ним.*


По условию задачи нам необходимо преобразовать ошибку валидации к объекту, ключами которого будут
поля документа, которые не прошли валидацию, а значениями - собственно сообщения о том, что именно
пошло не так. Код преобразования может выглядеть следующим образом:

```js
async function handleMongooseValidationError(ctx, next) {
  try {
    await next();
  } catch (err) {
    if (err.name !== 'ValidationError') throw err;

    ctx.status = 400;

    const errors = {};

    for (const field in err.errors) {
      errors[field] = err.errors[field].message;
    }

    ctx.body = {
      errors: errors,
    };
  }
}
```


Осталось лишь добавить эту функцию в цепочку middleware:
```js
router.post('/users', handleMongooseValidationError, async (ctx) => {
  const fields = _.pick(ctx.request.body, ['displayName', 'email']);
  ctx.body = await User.create(fields);
});
```



## PATCH /users/:id


Для изменения документа пользователя мы можем воспользоваться методом `User.findByIdAndUpdate`, 
который принимает в качестве аргументов идентификатор пользователя, а также объект, содержащий поля
и значения, которые необходимо изменить. Функция `pick` из модуля `lodash` опять поможет нам 
обработать запрос пользователя, а нужный идентификатор мы получим из свойства `ctx.params.id`.
Не забудем подключить в цепочку наши вспомогательные middleware для проверки идентификатора и для
обработки ошибок валидации:

```js
router.patch('/users/:id', validateId, handleValidationErrors, async (ctx) => {
  const fields = _.pick(ctx.request.body, ['displayName', 'email']);

  const user = await User.findByIdAndUpdate(ctx.params.id, fields);

  ctx.body = user;
});
```

Если на данном этапе запустить тесты, то можно увидеть 2 проблемы: в результате запроса с сервера
возвращается предыдущие данные и к тому же не выполняются валидации. Обе этих проблемы связаны с
поведением по умолчанию метода 
[`User.findByIdAndUpdate`](https://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate), 
которое можно изменить с помощью опций, передаваемых третьим аргументом. Для того, чтобы метод
вернул измененный документ, необходимо передать опцию `{ new: true }`, а для запуска валидаций, 
которые отключены по умолчанию - опцию `{ runValidators: true }`.

```js
router.patch('/users/:id', validateId, handleValidationErrors, async (ctx) => {
  const fields = _.pick(ctx.request.body, ['displayName', 'email']);

  const user = await User.findByIdAndUpdate(ctx.params.id, fields, {
    runValidators: true,
    new: true,
  });

  ctx.body = user;
});

```

*По ссылке полезная статья, объясняющая почему валидации по умолчанию отключены для этого метода:
https://mongoosejs.com/docs/validation.html#update-validators*


## DELETE /users/:id

Удаление документа - относительно простая операция, которая может быть выполнена с помощью метода
`User.findByIdAndRemove`. Метод вернет промис, который зарезолвится с объектом пользователя, который
был удален или `null`, если пользователя не удалось найти. Не забудем также про валидацию 
идентификатора, которая необходима в данном случае:

```js
router.delete('/users/:id', validateId, async (ctx) => {
  const user = await User.findByIdAndRemove(ctx.params.id);
  if (!user) ctx.throw(404);
  ctx.body = user;
});
```
