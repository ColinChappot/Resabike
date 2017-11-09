//Creation of the table journey_reservation
module.exports = (sequelize, DataTypes) =>{
    var Journey_Reservation = sequelize.define('Journey_Reservation', {

    });
    Journey_Reservation.associate=(models) =>{
        Journey_Reservation.belongsTo(models.Journey,{foreignKey: {name:'idJourney'}, as:'journey_tab'});
        Journey_Reservation.belongsTo(models.Reservation,{foreignKey: {name:'idReservation', allowNull:false}, as:'reservation_tab'});
    }

    return Journey_Reservation;
};