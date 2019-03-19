# Подключение локальной стратегии

В этой задаче вам необходимо будет подключить и сконфигурировать стратегию `passport-local` для аутентификации 
пользователя по логину ии паролю. Весь клиентский и вызывающий код уже находится в приложении, однако сама стратегия не
сконфигурирована должным образом:
- поля тела запроса для логина и пароля называются соответственно `email` и `password`;
- код для проверки правильности пароля пользователя находится в методе `checkPassword` модели `User`;
- в случае если пользователя с заданным `email` нет в базе - во флэш-сообщения должна быть записана ошибка 
"Пользователя с таким email не существует"
- В случае, если пользователь указал неправильный пароль - во флэш сообщения необходимо записать 
"Указан неверный пароль"
- Если email и пароль правильные - во флэш-сообщения должно быть помещено сообщениие "Добро пожаловать".     