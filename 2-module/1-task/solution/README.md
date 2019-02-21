# Стрим с лимитом передачи данных (Решение)

Для решения этой задачи нам надо в первую очередь посмотреть 
[раздел документации](https://nodejs.org/dist/latest-v11.x/docs/api/stream.html#stream_implementing_a_transform_stream), 
который описывает процесс создания собственных классов Transform стримов. Из него становится ясно, что наша задача 
сводится к тому, чтобы реализовать метод `_tranform`, который будет вызываться каждый раз, когда очередная порция данных
будет передаваться через стрим. Важно понять сигнатуру данного метода: он принимает три параметра - `chunk`, `encoding` 
и `callback`. 

Первый параметр - это данные, которые передаются через стрим. Это может быть строка или специальный объект buffer. В 
нашей задачи тип этого параметра не важен - прочитав свойство `.length` мы сможем получить размер передаваемых данных,
какого бы типа они не были.
Второй аргумент, который является кодировкой мы использовать не будет, т.к. он нам неважен в данной задаче.
Третий аргумент - это функция обратного вызова, которая должна быть вызвана после того, как будут выполнены все действия
по подсчету размера данных. Первым аргументом в эту функцию передается объект с ошибкой, если что-то пошло не так (или 
значение `null`, если все в порядке), а вторым аргументом - данные, которые надо передать дальше. В нашей задаче данные,
которые мы будем передавать будут исходным параметром `chunk`, т.к. задачи менять их у нас нет. 


Для того, чтобы следить за тем, сколько данных уже было передано через стрим создадим свойство `size` и будем 
увеличивать его каждый раз при вызове метода `_transform`. В свойстве `limit` сохраним значение лимита, которое 
передается при создании стрима. Если при очередном вызове значение свойства `size` превысит `limit` нам необходимо
вызвать функцию `callback`, передав туда в качестве первого аргумента инстанс ошибки LimitExceededError. В другом 
случае первый аргумент будет `null`, а второй - `chunk`. 

В результате получится следующий код:

```js
const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);
    
    this.limit = options.limit;
    this.size = 0;
  }

  _transform(chunk, encoding, callback) {
    this.size += chunk.length;
    
    if (this.size > this.limit) {
      callback(new LimitExceededError());
    } else {
      callback(null, chunk);
    }
  }
}

module.exports = LimitSizeStream;

```  

Это и есть решение исходной задачи.
Отдельно стоит отметить метод `_flush`, указанный в документации. Он не является обязательным для определения в нашем
классе стрима, но может быть очень полезным если после окончания работы стрима нужно выполнить освободить какие-то
ресурсы. В нашем случае никаких дополнительных ресурсов стрим не занимает, поэтому и очистку выполнять не нужно.


## Объектный режим

Это дополнительное условие задачи, которое необязателно к выполнению, однако является довольно важным для полноценного
понимания как устроена работа со стримами в Node.JS. По умолчанию стримы умеют работать либо со строками, либо с 
бинарными данными, но порой может быть полезно передавать через стримы объекты, например, когда нашей задачей является
парсинг огромного JSON, содержащего массив с объектами. В этом случае стрим может быть переведен в объектный режим с 
помощью опции `objectMode: true`. 

Наша текущая реализация при передаче объекта попытается получить у него свойство `.length` и прибавить его к значению
свойства `size`. Правильность работы в этом случае будет нарушена, так как в данном случае мы должны считать каждый чанк
за отдельно взятый объект и прибавлять таким образом к `size` единицу.

Для Transform и Duplex стримов, так как они содержат внутри и стрим для чтения, и стрим для записи, опция может быть 
передана не одна, а сразу две: `readableObjectMode: true, writableObjectMode: true`.

Давайте проверять передается ли опция `readableObjectMode` при создании объекта, и сохранять эту информацию в отдельном 
свойстве `isObjectMode`. Далее, при вызове `_transform` мы сможем проверить в каком режиме работает наш стрим.
В результате код будет выглядеть таким образом:

```js
const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);
    
    this.limit = options.limit;
    this.size = 0;
    this.isObjectMode = !!options.readableObjectMode;
  }

  _transform(chunk, encoding, callback) {
    if (this.isObjectMode) {
      this.size += 1;
    } else {
      this.size += chunk.length;
    }
    
    if (this.size > this.limit) {
      callback(new LimitExceededError());
    } else {
      callback(null, chunk);
    }
  }
}

module.exports = LimitSizeStream;
``` 