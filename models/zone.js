'use strict';
module.exports = (sequelize, DataTypes) =>{
var Zone = sequelize.define('Zone', {
    id_zone: {
        type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    }
});

    Zone.associate=(models) =>{
        Zone.hasMany(models.PersonContact,{foreignKey: {name:'idZone', allowNull:false}});
        Zone.hasMany(models.Login,{foreignKey:{ name:'idZone', allowNull:false}});
        Zone.hasMany(models.Line,{foreignKey: {name:'idZone', allowNull:false}});
    }

return Zone;
};