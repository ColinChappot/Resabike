'use strict';
module.exports = (sequelize, DataTypes) =>{
    var PersonContact = sequelize.define('PersonContact', {
        id_personContact: {
            type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true
        },
        lastname: {
            type: DataTypes.STRING
        },
        firstname: {
            type: DataTypes.STRING
        },
        telephone: {
            type: DataTypes.STRING
        },
        mail: {
            type: DataTypes.STRING
        }
    });
    PersonContact.associate=(models) =>{
        PersonContact.belongsTo(models.Zone,{foreignKey: {name:'idZone', allowNull:false}});
    }

    return PersonContact;
};