const sgMail = require('@sendgrid/mail');
const { SENDGRID_API_KEY } = process.env;
    
sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
    const email = {...data, from: '0504Fusion@gmail.com'}
        await sgMail.send(email)
    .then(() => {
            console.log('Email sent')
        })
    .catch((error) => {
            console.error(error)
    });
}

module.exports = sendEmail;