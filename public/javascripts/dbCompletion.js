function autocomp(id){
    $('#'+id).autocomplete({
        source: function (request, response) {
            $.post('/user/data/', {term: request.term}, function(data) {
                response($.map(data, function(station) {
                    return station.name
                }));
            }, 'json');
        },
    });
}