'use strict';
module.exports = (sequelize, DataTypes) =>{
var Zone = sequelize.define('Zone', {
    id_zone: {
        type: DataTypes.INTEGER, primaryKey:true
    },
    name: {
        type: DataTypes.STRING
    }
});

    Zone.associate=(models) =>{
        Zone.belongsTo(models.PersonContact,{foreignKey: {name:'idPersonContact', allowNull:false}});
        Zone.hasMany(models.Login,{foreignKey:{ name:'idZone', allowNull:false}});
        Zone.hasMany(models.Line,{foreignKey: {name:'idZone', allowNull:false}});
    }

return Zone;
};