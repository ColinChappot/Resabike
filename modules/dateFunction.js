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
                resolve(date.dataValues)
            })
        })
    }
}