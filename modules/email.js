var nodemailer = require('nodemailer');

module.exports = {

    sendMail(to, subject, text){
        return new Promise(function (resolve, reject) {

                    let transporter = nodemailer.createTransport({
                        service: 'gmail',
                        secure: false,
                        port: 25,
                        auth: {
                            user: 'resabikeCCJZ@gmail.com',
                            pass: 'resabike2017'
                        }
                    });

            let HelperOption = {
                from: 'resabikeCCJZ@gmail.com',
                to: to,
                subject: subject,
                text: text
            };

            transporter.sendMail(HelperOption, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log("the mail was sent !");
                console.log(info);
            });

        })
    }
}