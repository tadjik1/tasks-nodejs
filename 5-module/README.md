# Koa.js

- Официальная документация https://koajs.com/

## Статические файлы

Для отдачи с сервера статических файлов (стилей, скриптов, картинок и т.д.) мы будем использовать
модуль `koa-static`, его логика очень проста - для каждого `GET` и `HEAD` запроса проверяется, есть
ли соответствующий файл на диске в заданной папке и он отдается. Если файла нет - отдается `404`.

## Парсинг запросов

При обработке пользовательских запросов нам потребуется обрабатывать отправленные формы и AJAX 
запросы. В этом нам поможет модуль `koa-bodyparser`, который парсит приходящие на сервер запросы и
устанавливает свойство `ctx.request.body` в объект, который соответствует телу запроса. Например для
формы:
```html
<form method="POST" action="/login">
    <input name="email" type="email" />
    <input name="password" type="password" />
    <button type="submit">Sign In</button>
</form>
```

значение `ctx.request.body` будет равно:
```js
app.use(require('koa-bodyparser')());
app.use(async (ctx, next) => {
  console.log(ctx.request.body.email); // email from form
  console.log(ctx.request.body.password); // password from form
});
```

Этот модуль обрабатывает не только формы, но и AJAX запросы (заголовок `Content-Type` которых 
установлен в значение `application/json`).

## Роутинг

В качестве решения для роутинга запросов мы будем использовать библиотеку `koa-router`, которая 
позволяет добавлять обработчики и цепочки обработчиков на конкретные пути и методы запросов:
```js
const Router = require('koa-router');
const router = new Router();

router.get('/path1', async (ctx, next) => {}); // GET /path1
router.post('/path2/:id', async (ctx, next) => {}); // POST /path2/1, POST /path2/2, etc.
router.get('/path3', 
  async (ctx, next) => {},
  async (ctx, next) => {},
  async (ctx, next) => {}
); // middleware chain
```  
