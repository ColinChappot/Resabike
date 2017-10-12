const Sequelize = require('Sequelize');

const sequelize = new Sequelize('resabike', 'public', 'public', {
    host: 'localhost',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },

});

const Zone = sequelize.define('zone', {
    id_zone: {
        type: Sequelize.INTEGER, primaryKey:true
    },
    name: {
        type: Sequelize.STRING
    }

});

const Line = sequelize.define('line', {
    id_line: {
        type: Sequelize.INTEGER, primaryKey:true
    },
    name: {
        type: Sequelize.STRING
    },
    fromStation: {
        type: Sequelize.STRING
    },
    toStation: {
        type: Sequelize.STRING
    }
});

const Station = sequelize.define('station', {
    id_station: {
        type: Sequelize.INTEGER, primaryKey:true
    },
    name: {
        type: Sequelize.STRING
    },
    stopId: {
        type: Sequelize.STRING
    }
});

const Line_Station = sequelize.define('line_Station', {

});

const Login = sequelize.define('login', {
    id_login: {
        type: Sequelize.INTEGER, primaryKey:true
    },
    username: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }
});

const Role = sequelize.define('role', {
    id_role: {
        type: Sequelize.INTEGER, primaryKey:true
    },
    name: {
        type: Sequelize.STRING
    }
});

const PersonContact = sequelize.define('personContact', {
    id_personContact: {
        type: Sequelize.INTEGER, primaryKey:true
    },
    lastname: {
        type: Sequelize.STRING
    },
    firstname: {
        type: Sequelize.STRING
    },
    telephone: {
        type: Sequelize.STRING
    },
    mail: {
        type: Sequelize.STRING
    }
});


const Journey = sequelize.define('journey', {
    id_journey: {
        type: Sequelize.INTEGER, primaryKey:true
    },
    journeyNumber: {
        type: Sequelize.STRING
    }
});

const Journey_Reservation = sequelize.define('journey_Reservation', {

});

const Reservation = sequelize.define('reservation', {
    id_reservation: {
        type: Sequelize.INTEGER, primaryKey:true
    },
    lastname: {
        type: Sequelize.STRING
    },
    firstname: {
        type: Sequelize.STRING
    },
    telephone: {
        type: Sequelize.STRING
    },
    mail: {
        type: Sequelize.STRING
    },
    bikeNumber: {
        type: Sequelize.INTEGER
    },
    groupName: {
        type: Sequelize.STRING
    },
    from: {
        type: Sequelize.STRING
    },
    to: {
        type: Sequelize.STRING
    },
    remarks: {
        type: Sequelize.STRING
    }
});

const Date = sequelize.define('date', {
    id_date: {
        type: Sequelize.INTEGER, primaryKey:true
    },
    year: {
        type: Sequelize.STRING
    },
    month: {
        type: Sequelize.STRING
    },
    day: {
        type: Sequelize.STRING
    }
});



PersonContact.hasOne(Zone,{foreignKey: {name:'idPersonContact', AllowNull:false}});
Zone.hasMany(Login,{foreignKey:{ name:'idZone', AllowNull:false}});
Role.hasMany(Login,{foreignKey: {name:'idRole', AllowNull:false}});
Zone.hasMany(Line,{foreignKey: {name:'idZone', AllowNull:false}});
Line.hasMany(Line_Station,{foreignKey: {name:'idLine', AllowNull:false}});
Station.hasMany(Line_Station,{foreignKey: {name:'idStation', AllowNull:false}});
Line.hasMany(Journey,{foreignKey: {name:'idLine', AllowNull:false}});
Journey.hasMany(Journey_Reservation,{foreignKey: {name:'idJourney', AllowNull:false}});
Reservation.hasMany(Journey_Reservation,{foreignKey: {name:'idReservation', AllowNull:false}});
Date.hasMany(Reservation,{foreignKey: {name:'idDate', AllowNull:false}});
Login.hasMany(Reservation,{foreignKey: {name:'idLogin', AllowNull:false}});

sequelize.sync({force: true}).then(() => {
    // Table created
    sequelize.close();
});
