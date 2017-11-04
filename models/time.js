'use strict';
module.exports = (sequelize, DataTypes) =>{
    var Time = sequelize.define('Time', {
        id_time: {
            type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true
        },
        hour: {
            type: DataTypes.STRING
        },
        minute: {
            type: DataTypes.STRING
        }
    });

    Time.associate=(models) => {
        Time.hasMany(models.Reservation,{foreignKey: {name:'idTime', allowNull:false}, as: 'time'});
    }

    return Time;
};