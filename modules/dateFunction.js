var models = require('../models');

module.exports = {

    insertDate(body){
        return new Promise(function (resolve, reject) {
            models.Date.findOrCreate(
                {
            where: {    year: body.year,
                        month: body.month,
                        day: body.day},
            defaults:{  year: body.year,
                        month: body.month,
                        day: body.day}
                }).then(function (date) {
                resolve(date)
            })
        })
    },
    deleteDate(body){
        return new Promise(function (resolve, reject) {
            models.Date.destroy({
                where:{id: body.id  }
            }).then(function (nbrRow) {
                resolve(nbrRow)
            })
        })
    },
    updateDate(body){
        return new Promise(function (resolve, reject) {
            models.Date.update(
                {   year: body.year,
                    month: body.month,
                    day: body.day},
                {   where: {id: body.id}
                }).then(function (date) {
                resolve(date)
            })
        })
    }
}