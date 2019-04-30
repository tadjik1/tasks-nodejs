const sendMail = require('../libs/sendMail');

describe('sendMail', () => {
  it('should send email', async () => {
    const info = await sendMail({
      to: 'user@mail.com',
      subject: 'Подтвердите почту',
      locals: { token: 'token' },
      template: 'confirmation'
    });
    
    console.log(info);
    
    console.log(info.response.toString());
  });
});
