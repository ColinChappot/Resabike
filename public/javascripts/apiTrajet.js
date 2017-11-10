
// Make a request to the API and display it in the table for the user

function search(i18n,error) {
    var from  = document.getElementById('from').value;
    var to = document.getElementById('to').value;
    var date = document.getElementById('date').value;
    var time = '6:00'; // heure --> hh:mm
    var test = true;
    var temp
    var day = new Date().getDate()
    var month = new Date().getMonth()+1
    var year = new Date().getFullYear()
    var hour = new Date().getHours()


    var num = 25; // nombre de return
    var pre = -1; // c'est le nombre de station précédent l'horaire donnée qui sont affiché. On a mis -1 parce que l'api retourne une station précédent par défaut


    if (from && to) { // si la station "from" et la station "to" ne sont pas vide
        $.get('https://timetable.search.ch/api/route.en.json', {from: from, to: to, date: date, time: time, num: num, pre: pre}, function(data) {
            $('#auto tbody').empty();
            if(data.connection == null)
            {
                line = '<tr><td>'+error+' </td><tr>'
                $('#auto tbody').append(line);
            }
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
                    line += departure.format('DD.MM.YYYY') +'</td><td>'+departure.format('HH:mm')+
                        '</td><td>' + this.from +  '</td><td>' +(this.duration/60)+ ' min'+'</td><td>'
                        +  this.to +  '</td><td>' + arrival.format('HH:mm') + '</td>'
                    if(year < departure.format('YYYY'))
                    {
                        line = display(line,this.from,this.to,departure.format('DD.MM.YYYY'),departure.format('HH:mm'),i18n)
                    }
                    else
                    {
                        if(year > departure.format('YYYY'))
                        {
                            return
                        }
                        if(month < departure.format('MM'))
                        {
                            line = display(line,this.from,this.to,departure.format('DD.MM.YYYY'),departure.format('HH:mm'),i18n)
                        }
                        else
                        {
                            if(month < departure.format('MM'))
                            {
                                return
                            }
                            if(hour > 17)
                            {
                                day++
                            }
                            if(day < departure.format('DD'))
                            {
                                line = display(line, this.from,this.to,departure.format('DD.MM.YYYY'),departure.format('HH:mm'),i18n)
                            }
                        }
                    }
                line += '</tr>';

                    $('#auto tbody').append(line);
                }
            });
        }, 'json');
    }
};

function display(line,from,to,departureD, departureH,i18n) {

    line+= '<td>'+'<form action="/user" method="POST">' +
    '<input type="text" name="from" hidden="true" value="'+from+'"/>' +
    '<input type="text" name="to" hidden="true" value="'+to+'"/>' +
    '<input type="text" name="date" hidden="true" value="'+departureD+'"/>'+
    '<input type="text" name="time" hidden="true" value="'+departureH+'"/>'+
    '<input type="submit", value="'+i18n+'"/>'+
    '</form>' + '</td>'

    return line;
};