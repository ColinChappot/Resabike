'use strict';
module.exports = (sequelize, DataTypes) =>{
    var Login = sequelize.define('Login', {
        id_login: {
            type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true
        },
        username: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        }
    });
    Login.associate=(models) =>{
        Login.belongsTo(models.Zone,{foreignKey:{ name:'idZone', allowNull:false}});
        Login.belongsTo(models.Role,{foreignKey: {name:'idRole', allowNull:false}});
        Login.hasMany(models.Reservation,{foreignKey: {name:'idLogin', allowNull:false}});
    }

    return Login;
};