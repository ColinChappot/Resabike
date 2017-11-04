var models = require('../models');

module.exports = {

    insertTime(body){
        return new Promise(function (resolve, reject) {
            models.Time.findOrCreate(
                {
                    where: {    hour: body.hour,
                                minute: body.minute},
                    defaults:{  hour: body.hour,
                        minute: body.minute}
                }).then(function (time) {
                resolve(time.dataValues)
            })
        })
    }
}