'use strict';
module.exports = (sequelize, DataTypes) =>{

    var Line = sequelize.define('Line', {
        id_line: {
            type: DataTypes.INTEGER, primaryKey:true
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
        Line.belongsToMany(models.Station,{ through: 'line_Station', foreignKey: {name:'idStation', allowNull:false}});
        Line.hasMany(models.Journey,{foreignKey: {name:'idLine', allowNull:false}});
        Line.belongsTo(models.Zone,{foreignKey: {name:'idZone', allowNull:false}});

    }


    return Line;
};