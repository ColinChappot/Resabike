module.exports = (sequelize, DataTypes) =>{
    var Journey_Reservation = sequelize.define('Journey_Reservation', {
        id_journey: {
            type: DataTypes.INTEGER, allowNull: true
        },
        id_reservation: {
            type: DataTypes.INTEGER, allowNull: true
        }
    });
    Journey_Reservation.associate=(models) =>{
        Journey_Reservation.belongsTo(models.Journey,{foreignKey: {name:'idJourney', allowNull:false}});
        Journey_Reservation.belongsTo(models.Reservation,{foreignKey: {name:'idReservation', allowNull:false}});
    }

    return Journey_Reservation;
};