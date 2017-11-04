function search() {
    var from  = document.getElementById('from').value;
    var to = document.getElementById('to').value;
    var date = document.getElementById('date').value;
    var time = '6:00'; // heure --> hh:mm
    var test = true;
    var temp




    var num = 25; // nombre de return
    var pre = -1; // c'est le nombre de station précédent l'horaire donnée qui sont affiché. On a mis -1 parce que l'api retourne une station précédent par défaut


    if (from && to) { // si la station "from" et la station "to" ne sont pas vide
        $.get('https://timetable.search.ch/api/route.en.json', {from: from, to: to, date: date, time: time, num: num, pre: pre}, function(data) {
            $('#auto tbody').empty();
            $(data.connections).each(function () {
                var departure,arrival, line = '<tr><td>';
                departure = moment(this.departure);
                arrival = moment(this.arrival);


                if(test == true)
                {
                    temp = departure.format('DD.MM.YYYY')
                    test=false;
                }
                if(temp != departure.format('DD.MM.YYYY'))
                {
                    return
                }
                else
                {
                    line += departure.format('DD.MM.YYYY') +'</td><td>'+departure.format('HH:mm')+ '</td><td>' + this.from +  '</td><td>' +(this.duration/60)+ ' min'+'</td><td>' +  this.to +  '</td><td>' + arrival.format('HH:mm') + '</td>'+
                        '<td>'+'<form action="/user" method="POST">' +
                            '<input type="text" name="from" hidden="true" value="'+this.from+'"/>' +
                            '<input type="text" name="to" hidden="true" value="'+this.to+'"/>' +
                            //'<input type="text" name="name" hidden="true" value="'+this.legs[0].line+'"/>'+
                            '<input type="text" name="date" hidden="true" value="'+departure.format('DD.MM.YYYY')+'"/>'+
                            '<input type="text" name="time" hidden="true" value="'+departure.format('HH:mm')+'"/>'+
                           // '<input type="text" name="timeEnd" hidden="true" value="'+departure.format('HH:mm')+'"/>'+
                           // '<input type="text" name="journeyNumber" hidden="true" value="'+this.legs[0].number+'"/>'+
                           // '<input type="text" name="stops" hidden="true" value="'+this.legs[0].stops+'"/>'+
                            '<button type="submit">réserver</button>'+
                        '</form>' + '</td>'+
                        '</tr>';

                    $('#auto tbody').append(line);
                }
            });
        }, 'json');
    }
};
