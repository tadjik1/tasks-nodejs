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
