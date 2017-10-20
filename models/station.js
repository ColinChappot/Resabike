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
        Station.belongsToMany(models.Line,{ through: 'line_Station', foreignKey: {name:'idLine', allowNull:false}});
    }

    return Station;
};