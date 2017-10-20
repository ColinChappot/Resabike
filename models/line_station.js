'use strict';
module.exports = (sequelize, DataTypes) =>{

    var Line_Station = sequelize.define('Line_Station', {
        id_line: {
            type: DataTypes.INTEGER, primaryKey:true, allowNull: true
        },
        id_station: {
            type: DataTypes.INTEGER, allowNull: true
        }
    });

    Line_Station.associate=(models) =>{
        Line_Station.belongsTo(models.Line,{foreignKey: {name:'idLine', allowNull:false}});
        Line_Station.belongsTo(models.Station,{foreignKey: {name:'idStation', allowNull:false}});
    }


    return Line_Station;
};