var models = require('../models');

module.exports = {

    insertState(state){
        return new Promise(function (resolve, reject) {
            models.State.findOrCreate(
                {
                    where: {    name: state},
                    defaults:{   name: state}
                }).then(function (state) {
                resolve(state[0].dataValues)
            })
        })
    }
}