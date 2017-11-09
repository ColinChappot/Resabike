var models = require('../models');

//Request to table Time
module.exports = {

    //Find the value in the table Time or create it
    insertTime(time){
        return new Promise(function (resolve, reject) {
            models.Time.findOrCreate(
                {
                    where: {    hour: time.substring(0,3),
                                minute: time.substring(4,6)},
                    defaults:{   hour: time.substring(0,3),
                                minute: time.substring(4,6)}
                }).then(function (time) {
                resolve(time[0].dataValues)
            })
        })
    }
}