var nodemailer = require('nodemailer');

module.exports = {

    sendMail(to,subject,text){
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

            resolve('ok')

        })
    },
    confirm(person){
        return new Promise(function (resolve, reject) {

            var text = "Merci d'aovoir choisi Resabike pour votre réservation, votre réservation à été acceptée!" +
                "\nVous pouvez la consulter dans votre historique sur Resabike" +
                "\n\nSi vous avez des question concernant votre réservation votre personne de contact est:" +
                "\n" +person.lastname+" "+person.firstname+
                "\nemail : "+person.mail+"\ntéléphone: "+person.telephone+"" +
                "\n\nBonne journée" ;

            resolve(text)
        })
    },
    Waiting(person){
        return new Promise(function (resolve, reject) {

            var text = "Merci d'aovoir choisi Resabike pour votre réservation, votre réservation est en attente:" +
                "\n Elle sera accepter ou refuser au mimum 1 jour avant la date de votre départ" +
                "\n Vous pouvez la consulter dans votre historique sur Resabike" +
                "\n\nSi vous avez des question concernant votre réservation votre personne de contact est:" +
                "\n" +person.lastname+" "+person.firstname+
                "\nemail : "+person.mail+"\ntéléphone: "+person.telephone+"" +
                "\n\nBonne journée" ;


            resolve(text)
        })
    },
    cancel(reservation,person){
        return new Promise(function (resolve, reject) {

            var text = "Votre réservation à été refusée pour le voyage :" +
                "\nLe "+reservation.date.dataValues.day+"."+reservation.date.dataValues.month+"."+reservation.date.dataValues.day+" de "+reservation.from+" direction "+reservation.to+" à"+reservation.time.dataValues.hour+":"+reservation.time.dataValues.minute+"" +
                "\n\nSi vous avez des question concernant votre réservation votre personne de contact est:" +
                "\n" +person.lastname+" "+person.firstname+
                "\nemail : "+person.mail+"\ntéléphone: "+person.telephone+"" +
                "\n\nBonne journée" ;


            resolve(text)
        })
    }
}