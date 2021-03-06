
//Make the request to the API for creating the lines by the admin and super admin
function autocomp(id){
    $('#'+id).autocomplete({
        source: function (request, response) {
            $.get('https://timetable.search.ch/api/completion.en.json', {term: request.term}, function(data) {
                response($.map(data, function(station) {
                    return station.label
                }));
            }, 'json');
        },
    });
}