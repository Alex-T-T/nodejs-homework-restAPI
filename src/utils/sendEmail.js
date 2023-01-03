const sgMail = require('@sendgrid/mail');
const { SENDGRID_API_KEY } = process.env;

const sendEmail = async (message) => {
    sgMail.setApiKey(SENDGRID_API_KEY);

    // const { to, from, subject, text, html} = message;

    await sgMail.send(message)
    .then(() => {
            console.log('Email sent')
        })
    .catch((error) => {
            console.error(error)
    });
}

module.exports = sendEmail;