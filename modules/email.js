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
    confirm(person,trajet){
        return new Promise(function (resolve, reject) {

            if(person.lastname === null)
            {
                person.lastname ="";
            }

            if(person.firstname === null)
            {
                person.firstname="";
            }

            if(person.telephone === null)
            {
                person.telephone="";
            }

            if(person.mail === null)
            {
                person.mail="";
            }


            var text = "Français ------" +
                "\n\nMerci d'avoir choisi Resabike pour votre réservation, votre réservation à été acceptée!" +
                "\n\nRésumer de reservation: " +
                "\nLigne:  "+trajet.line+"\nDépart:  " +trajet.name+"  à  "+trajet.departure.substring(10,16)+""+
                "\nSous-station:  "
                trajet.stops.forEach(function (stops) {
                    text +="\n\t    "+stops.name+""
                })
            text += "\nArrivée:  "+trajet.exit.name+"  à  "+trajet.exit.arrival.substring(10,16)+""+
                "\n\nVous pouvez la consulter dans votre historique sur Resabike" +
                "\n\nSi vous avez des question concernant votre réservation votre personne de contact est:" +
                "\n" +person.lastname+" "+person.firstname+
                "\nemail : "+person.mail+"\ntéléphone: "+person.telephone+"" +
                "\n\nBonne journée" ;

            text += "\n\n\n";

            text += "Deutsch ------" +
                "\n\nVielen Dank, dass Sie Resabike für Ihre Reservierung gewählt haben, Ihre Reservierung wurde akzeptiert!" +
                "\n\n\nZusammenfassung der Reservierung: " +
                "\nLinie:  "+trajet.line+"\nAbfahrt:  " +trajet.name+"  um  "+trajet.departure.substring(10,16)+""+
                "\nNebenstelle:  "
                trajet.stops.forEach(function (stops) {
                    text +="\n\t    "+stops.name+""
                })
            text += "\nAnkunft:  "+trajet.exit.name+"  um  "+trajet.exit.arrival.substring(10,16)+""+
                "\n\nSie können es in Ihrer Geschichte auf Resabike konsultieren" +
                "\n\nWenn Sie Fragen zu Ihrer Buchung haben, ist Ihre Kontaktperson:" +
                "\n" +person.lastname+" "+person.firstname+
                "\nE-Mail: "+person.mail+"\nTelefon: "+person.telephone+"" +
                "\n\nIch wünsche dir einen schönen Tag" ;

            text += "\n\n\n";
            text += "English ------" +
                "\n\nThank you for choosing Resabike for your reservation, your reservation has been accepted!" +
                "\n\nSummary of reservation:" +
                "\nLine:  "+trajet.line+"\nDeparture:  " +trajet.name+"  at  "+trajet.departure.substring(10,16)+""+
                "\nSubstation:  "
                trajet.stops.forEach(function (stops) {
                    text +="\n\t    "+stops.name+""
                })
            text += "\nArrival:  "+trajet.exit.name+"  at  "+trajet.exit.arrival.substring(10,16)+""+
                "\n\nYou can consult it in your history on Resabike" +
                "\n\nIf you have questions about your booking your contact person is:" +
                "\n" +person.lastname+" "+person.firstname+
                "\nemail : "+person.mail+"\nphone: "+person.telephone+"" +
                "\n\nHave a good day" ;

            text += "\n\n\n";


            resolve(text)
        })
    },
    Waiting(person, trajet){
        return new Promise(function (resolve, reject) {

            if(person.lastname === null)
            {
                person.lastname ="";
            }

            if(person.firstname === null)
            {
                person.firstname="";
            }

            if(person.telephone === null)
            {
                person.telephone="";
            }

            if(person.mail === null)
            {
                person.mail="";
            }

            var text = "Français ------" +
                "\n\nMerci d'avoir choisi Resabike pour votre réservation, votre réservation est en attente de confirmation" +
                "\n\nRésumer de reservation: " +
                "\nLigne:  "+trajet.line+"\nDépart:  " +trajet.name+"  à  "+trajet.departure.substring(10,16)+""+
                "\nSous-station:  "
            trajet.stops.forEach(function (stops) {
                text +="\n\t    "+stops.name+""
            })
            text += "\nArrivée:  "+trajet.exit.name+"  à  "+trajet.exit.arrival.substring(10,16)+""+
                "\n\nVous pouvez la consulter dans votre historique sur Resabike" +
                "\n\nSi vous avez des question concernant votre réservation votre personne de contact est:" +
                "\n" +person.lastname+" "+person.firstname+
                "\nemail : "+person.mail+"\ntéléphone: "+person.telephone+"" +
                "\n\nBonne journée" ;

            text += "\n\n\n";

            text += "Deutsch ------" +
                "\n\nDanke, dass Sie Resabike für Ihre Reservierung gewählt haben, Ihre Reservierung wartet auf Ihre Bestätigung" +
                "\n\n\nZusammenfassung der Reservierung: " +
                "\nLinie:  "+trajet.line+"\nAbfahrt:  " +trajet.name+"  um  "+trajet.departure.substring(10,16)+""+
                "\nNebenstelle:  "
            trajet.stops.forEach(function (stops) {
                text +="\n\t    "+stops.name+""
            })
            text += "\nAnkunft:  "+trajet.exit.name+"  um  "+trajet.exit.arrival.substring(10,16)+""+
                "\n\nSie können es in Ihrer Geschichte auf Resabike konsultieren" +
                "\n\nWenn Sie Fragen zu Ihrer Buchung haben, ist Ihre Kontaktperson:" +
                "\n" +person.lastname+" "+person.firstname+
                "\nE-Mail: "+person.mail+"\nTelefon: "+person.telephone+"" +
                "\n\nIch wünsche dir einen schönen Tag" ;

            text += "\n\n\n";
            text += "English ------" +
                "\n\nThank you for choosing Resabike for your reservation, your reservation is awaiting confirmation" +
                "\n\nSummary of reservation:" +
                "\nLine:  "+trajet.line+"\nDeparture:  " +trajet.name+"  at  "+trajet.departure.substring(10,16)+""+
                "\nSubstation:  "
            trajet.stops.forEach(function (stops) {
                text +="\n\t    "+stops.name+""
            })
            text += "\nArrival:  "+trajet.exit.name+"  at  "+trajet.exit.arrival.substring(10,16)+""+
                "\n\nYou can consult it in your history on Resabike" +
                "\n\nIf you have questions about your booking your contact person is:" +
                "\n" +person.lastname+" "+person.firstname+
                "\nemail : "+person.mail+"\nphone: "+person.telephone+"" +
                "\n\nHave a good day" ;

            text += "\n\n\n";

            resolve(text)
        })
    },
    cancel(reservation,person){
        return new Promise(function (resolve, reject) {

            if(person.lastname === null)
            {
                person.lastname ="";
            }

            if(person.firstname === null)
            {
                person.firstname="";
            }

            if(person.telephone === null)
            {
                person.telephone="";
            }

            if(person.mail === null)
            {
                person.mail="";
            }

            var text = "Français ------" +
                "\n\nVotre réservation à été refusée pour le voyage du" +
                "\n\n"+reservation.date.dataValues.day+"."+reservation.date.dataValues.month+"."+reservation.date.dataValues.year+"\tde "+reservation.from+"\tdirection "+reservation.to+"\tà"+reservation.time.dataValues.hour+":"+reservation.time.dataValues.minute+"" +
                "\n\nSi vous avez des question concernant votre réservation votre personne de contact est:" +
                "\n" +person.lastname+" "+person.firstname+
                "\nemail : "+person.mail+"\ntéléphone: "+person.telephone+"" +
                "\n\nBonne journée" ;

            text += "\n\n\n";

            text += "Deutsch ------" +
                "\n\nIhre Reservierung wurde für die Reise von" +
                "\n\n"+reservation.date.dataValues.day+"."+reservation.date.dataValues.month+"."+reservation.date.dataValues.year+"\tvon "+reservation.from+"\tRichtung "+reservation.to+"\tum"+reservation.time.dataValues.hour+":"+reservation.time.dataValues.minute+"" +
                "\n\nWenn Sie Fragen zu Ihrer Buchung haben, ist Ihre Kontaktperson:" +
                "\n" +person.lastname+" "+person.firstname+
                "\nE-Mail: "+person.mail+"\nTelefon: "+person.telephone+"" +
                "\n\nIch wünsche dir einen schönen Tag" ;

            text += "\n\n\n";

            text += "English ------" +
                "\n\nYour reservation has been refused for the trip of" +
                "\n\n"+reservation.date.dataValues.day+"."+reservation.date.dataValues.month+"."+reservation.date.dataValues.year+"\tfrom "+reservation.from+"\tto "+reservation.to+"\tat"+reservation.time.dataValues.hour+":"+reservation.time.dataValues.minute+"" +
                "\n\nIf you have questions about your booking your contact person is:" +
                "\n" +person.lastname+" "+person.firstname+
                "\nemail : "+person.mail+"\nphone: "+person.telephone+"" +
                "\n\nHave a good day" ;

            text += "\n\n\n";


            resolve(text)
        })
    }
}