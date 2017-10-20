'use strict';
module.exports = (sequelize, DataTypes) =>{
    var Station = sequelize.define('Station', {
        id_station: {
            type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        stopId: {
            type: DataTypes.STRING
        }
    });
    Station.associate=(models) =>{
        Station.hasMany(models.Line_Station,{foreignKey: {name:'idStation', allowNull:false}});
    }

    return Station;
};