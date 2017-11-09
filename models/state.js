'use strict';
//Creation of the table State
module.exports = (sequelize, DataTypes) =>{
    var State = sequelize.define('State', {
        id_state: {
            type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        }
    });

    State.associate=(models) => {
        State.hasMany(models.Reservation,{foreignKey: {name:'idState', allowNull:false}, as: 'state'});
    }

    return State;
};