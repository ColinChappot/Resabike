'use strict';
module.exports = (sequelize, DataTypes) =>{

    var Line = sequelize.define('Line', {
        id_line: {
            type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        fromStation: {
            type: DataTypes.STRING
        },
        toStation: {
            type: DataTypes.STRING
        }
    });

    Line.associate=(models) =>{
        Line.hasMany(models.Journey,{foreignKey: {name:'idLine', allowNull:false}, as:'journey' });
        Line.belongsTo(models.Zone,{foreignKey: {name:'idZone', allowNull:false}, as: 'line'});
        Line.hasMany(models.Line_Station,{foreignKey: {name:'idLine', allowNull:false}, as: 'line_tab'});
    }


    return Line;
};