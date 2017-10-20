'use strict';
module.exports = (sequelize, DataTypes) =>{
    var Journey = sequelize.define('Journey', {
        id_journey: {
            type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true
        },
        journeyNumber: {
            type: DataTypes.STRING
        }
    });
    Journey.associate=(models) =>{
        Journey.belongsToMany(models.Reservation,{ through: 'journey_Reservation', foreignKey: {name:'idReservation', allowNull:false}});
        Journey.belongsTo(models.Line,{foreignKey: {name:'idLine', allowNull:false}});
    }

    return Journey;
};