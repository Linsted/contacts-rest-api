require("dotenv").config();
const sgMail = require('@sendgrid/mail')

const myMail = "ivan.malenko18@gmail.com"


const emailVerificationSender = async (email, verificationToken) => {
    const { SENDGRID_API_KEY, BASE_URL } = process.env;
    sgMail.setApiKey(SENDGRID_API_KEY);
    const msg = {
        to: email,
        from: myMail,
        subject: 'Verify your email address',
        text: `Please verify your email address. Visit: ${BASE_URL}users/verify/${verificationToken}`,
        html: `<a target="_blank" href=${BASE_URL}users/verify/${verificationToken}>Click to verify</a>`,
    };
    await sgMail.send(msg);
};

module.exports = emailVerificationSender;