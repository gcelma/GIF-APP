$('form').submit(function(e) {
    e.preventDefault();
    $('.load_results').remove();
    var query = $('input').val();
    $('form').trigger('reset');

    $.ajax({
        url: "https://api.giphy.com/v1/gifs/search?api_key=GBC86EsEN48kClOhAfgZt6kaCZQOgl0F&q="+ query +"&limit=5&rating=G&lang=en",
        type: "GET",
        dataType: "json",
        success: successFn,
        error: errorFn,
        complete: function(xhr, status){
            console.log("The request is completed");
        }
    });

    function successFn(result) {
        var images = result.data;
        for(var i=0; i<images.length; i++) {
            $("#results").append("<button class='btn btn-lg btn-success btn-block mt-3 load_results' type='submit'>"+images[i].title+"</button>");     
        }
    }

    function errorFn(xhr, status, strErr) {
        console.log("There was an error");
    }
});