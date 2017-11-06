var models = require('../models');

module.exports = {

    insertDate(date){
        return new Promise(function (resolve, reject) {
            models.Date.findOrCreate(
                {
            where: {    year: date.substring(0,4),
                        month: date.substring(5,7),
                        day: date.substring(8,10)},
            defaults:{  year: date.substring(0,4),
                        month: date.substring(5,7),
                        day: date.substring(8,10)}
                }).then(function (date) {
                resolve(date[0].dataValues)
            })
        })
    }
}