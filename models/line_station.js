'use strict';
module.exports = (sequelize, DataTypes) =>{

    var Line_Station = sequelize.define('Line_Station', {

    });

    Line_Station.associate=(models) =>{
        Line_Station.belongsTo(models.Line,{foreignKey: {name:'idLine', allowNull:false}, as: 'line_tab'});
        Line_Station.belongsTo(models.Station,{foreignKey: {name:'idStation', allowNull:false}, as: 'station_tab'});
    }


    return Line_Station;
};