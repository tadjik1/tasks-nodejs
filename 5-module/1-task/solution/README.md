# Чат на Koa.js (Решение)


Первым делом давайте представим как может выглядеть обработчик запроса `GET /subscribe`. Очевидно, что при обработке
этого запроса должен создаваться новый промис, однако пока не совсем ясно когда он будет резолвится и с каким 
значением. Однако некоторый код мы можем написать уже сейчас и выглядеть он будет примерно так:
```js
router.get('/subscribe', async (ctx, next) => {
  await new Promise((resolve, reject) => {
  });
});
```

Теперь, если мы запустим сервер - то увидим, что запрос `GET /subscribe`, который отправляет клиент "подвисает" 
навсегда. Это конечно не то, что мы хотим получить в результате, поэтому давайте подумаем, когда же наступит тот момент,
когда промис должен быть зарезолвлен? Как следует из условия задачи (и описания технологии long pooling) - этот момент,
это пришедший запрос `POST /publish`, и резолвиться промис должен с текстом сообщения. Однако как мы можем вызвать 
функцию `resolve`, доступную лишь внутри функции-конструктора объекта промиса из другой функции? Ответ - нам нужно 
вынести ее во внешнюю область видимости, так, чтобы обе функции могли получить к ней доступ. Так как запросов, 
ожидающих ответа у нас может быть много, то и хранить мы будем множество функций `resolve`. Воспользуемся для этого 
массивом `clients`:

```js
let clients = [];

router.get('/subscribe', async (ctx, next) => {
  const message = await new Promise((resolve, reject) => {
    clients.push(resolve);
  });
  
  ctx.body = message;
});
``` 


Теперь нам необходимо реализовать обработчик запроса `POST /publish`. Его логика достаточно проста: нам нужно получить
текст сообщения, которое отправил клиент, убедившись, что оно не пустое. Затем зарезолвить все ожидающие промисы с этим
сообщением и очистить массив `clients`. После этого мы можем сообщить отправителю, что все хорошо.

```js
router.post('/publish', async (ctx, next) => {
  const message = ctx.request.body.message;

  if (!message) {
    ctx.throw(400, 'required field `message` is missing');
  }

  clients.forEach(function(resolve) {
    resolve(message);
  });

  clients = [];

  ctx.body = 'ok';
});
```


Не стоит также забывать о таком частом случае как обрыв соединения, при этом нам нужно удалить функцию `resolve` из 
массива `clients`.
```js
router.get('/subscribe', async (ctx, next) => {
  const message = await new Promise((resolve, reject) => {
    clients.push(resolve);

    ctx.res.on('close', function() {
      clients.splice(clients.indexOf(resolve), 1);
      resolve();
    });
  });

  ctx.body = message;
});
```  