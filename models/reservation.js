'use strict';
//Creation of the table Reservation
module.exports = (sequelize, DataTypes) =>{
    const Reservation = sequelize.define('Reservation', {
        id_reservation: {
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
        },
        bikeNumber: {
            type: DataTypes.INTEGER
        },
        groupName: {
            type: DataTypes.STRING
        },
        from: {
            type: DataTypes.STRING
        },
        to: {
            type: DataTypes.STRING
        },
        remarks: {
            type: DataTypes.STRING
        }
    });
    Reservation.associate=(models) =>{
        Reservation.belongsTo(models.Date,{foreignKey: {name:'idDate', allowNull:false}, as:'date'});
        Reservation.belongsTo(models.Time,{foreignKey: {name:'idTime', allowNull:false}, as:'time'});
        Reservation.belongsTo(models.State,{foreignKey: {name:'idState', allowNull:false}, as:'state'});
        Reservation.belongsTo(models.Login,{foreignKey: {name:'idLogin', allowNull:false}});
        Reservation.hasMany(models.Journey_Reservation,{foreignKey: {name:'idReservation', allowNull:false}, as:'reservation_tab'});
    }

    return Reservation;
};