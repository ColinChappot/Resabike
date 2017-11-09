'use strict';
//Creation of the table journey
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
        Journey.belongsTo(models.Line,{foreignKey: {name:'idLine', allowNull:false}, as:'line'});
        Journey.hasMany(models.Journey_Reservation,{foreignKey: {name:'idJourney', allowNull:false}, as:'journey_tab'});
    }

    return Journey;
};