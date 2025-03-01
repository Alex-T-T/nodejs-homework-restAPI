const {BASE_URL} = process.env

const verificationMessage = (email, verificationToken) => {
    const message = {
        to: email,
        subject: 'add email',
        text: `All will be fine! Click here to verify your email: <a href='${BASE_URL}/api/users/verify/${verificationToken}' target='_blank' >Click on me</a>`,
        html: `<h1>All will be fine! Click here to verify your email: <a href='${BASE_URL}/api/users/verify/${verificationToken}' target='_blank' >Click on me</a></h1>`
    }
    return message
};

module.exports = verificationMessage