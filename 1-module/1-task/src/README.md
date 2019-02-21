# Порядок вывода сообщений в консоль

В данной задаче вам необходимо (не запуская код) определить, в каком порядке будут выводиться сообщения в консоль.
Не расстраивайтесь если вывод не соответствует вашим ожиданиям, попробуйте понять, в чем вы допустили просчет.

В качестве решения создайте текстовый файл solution.txt в папке с заданием, в котором каждый вывод начинается с новой 
строки. 
Например,
```text
setImmediate
Promise1
```

Код для запуска находится в файле index.js:
```js
const intervalId = setInterval(() => {
  console.log('James');
}, 10);

setTimeout(() => {
  console.log('John');
  
  const promise = new Promise((resolve) => {
    resolve('Robert');
  });
  
  promise
    .then((value) => {
      console.log(value);
      
      setTimeout(() => {
        console.log('Michael');

        clearInterval(intervalId);
      }, 10);
    });
}, 10);

const promise = new Promise((resolve) => {
  resolve('William');
});

promise
  .then((value) => {
    console.log(value);
    return 'David';
  })
  .then((value) => {
    console.log(value);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Joseph');

        resolve('Richard');
      }, 10);
    });
  })
  .then((value) => {
    console.log(value);
  });
```
