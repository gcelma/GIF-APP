$('form').submit(function(e) {
    e.preventDefault();
    $('.load_results').remove();
    var query = $('input').val();
    $('form').trigger('reset');
    // Start 1st call to API ------>
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
    // End 1st call to API ------>


    function successFn(result) {
        var images = result.data;
        for(var i=0; i<images.length; i++) {
            $("#results").append("<button type='button' class='btn btn-lg btn-success btn-block mt-3 load_results' data-toggle='modal' data-target='#servicesmodal' id=" + images[i].id + ">"+images[i].title+"</button>");     
        }
        $(".load_results").on("click", function(e) {
            // Start 2nd call to API ------>
            $.ajax({
                url: "https://api.giphy.com/v1/gifs/"+ $(this).attr('id') +"?api_key=GBC86EsEN48kClOhAfgZt6kaCZQOgl0F",
                type: "GET",
                dataType: "json",
                success: successFn,
                error: errorFn,
                complete: function(xhr, status){
                    console.log("The request is completed");
                }
            });
            // End 2nd call to API ------>


            function successFn(result) {
                $(".modal-title").remove();
                $(".modal-body img").remove();
                $(".modal-header button").before("<h5 class='modal-title'>"+ result.data.title +"</h5>");
                $(".modal-body").append("<p><img src="+result.data.images.downsized.url+"></p>");
            }

            function errorFn(xhr, status, strErr) {
                console.log("There was an error");
            }
        });
    }

    function errorFn(xhr, status, strErr) {
        console.log("There was an error");
    }
});

