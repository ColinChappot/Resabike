'use strict';
//Creation of the table Role
module.exports = (sequelize, DataTypes) =>{
    var Role = sequelize.define('Role', {
        id_role: {
            type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        }
    });
    Role.associate=(models) =>{
        Role.hasMany(models.Login,{foreignKey: {name:'idRole'}});
    }

    return Role;
};