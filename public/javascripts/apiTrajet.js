function search() {
    var from  = document.getElementById('from').value;
    var to = document.getElementById('to').value;
    var date = '10/17/2017'; //date --> mm/jj/aaaa
    var time = '17:12'; // heure --> hh:mm

    var num = 8; // nombre de return
    var pre = -1; // c'est le nombre de station précédent l'horaire donnée qui sont affiché. On a mis -1 parce que l'api retourne une station précédent par défaut


    if (from && to) { // si la station "from" et la station "to" ne sont pas vide
        $.get('https://timetable.search.ch/api/route.en.json', {from: from, to: to, date: date, time: time, num: num, pre: pre}, function(data) {
            $('#stationboard tbody').empty();
            $(data.connections).each(function () {
                var departure,arrival, line = '<tr><td>';
                departure = moment(this.departure);
                arrival = moment(this.arrival);

                line += departure.format('HH:mm') + '</td><td>' + this.from +  '</td><td>'+"----->  " +(this.duration/60)+ ' min'+"  ----->"+'</td><td>' +  this.to +  '</td><td>' + arrival.format('HH:mm') + '</td></tr>';
                $('#stationboard tbody').append(line);
            });
        }, 'json');
    }
};