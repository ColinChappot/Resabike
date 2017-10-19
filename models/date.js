'use strict';
module.exports = (sequelize, DataTypes) =>{
    var Date = sequelize.define('Date', {
        id_date: {
            type: DataTypes.INTEGER, primaryKey:true
        },
        year: {
            type: DataTypes.STRING
        },
        month: {
            type: DataTypes.STRING
        },
        day: {
            type: DataTypes.STRING
        }
    });

    Date.associate=(models) => {
        Date.hasMany(models.Reservation,{foreignKey: {name:'idDate', allowNull:false}});
    }

    return Date;
};