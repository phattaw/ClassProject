$(document).ready(function () {

    let topics = ["clippers"]

    for (let i = 0; i < topics.length; i++) {
        addGifs(topics[i]);
    }

    function addGifs(animal, limit) {
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            animal + "&api_key=dc6zaTOxFJmzC&limit=" + limit;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                let animalDiv = $("<div class='col-xs-12, col-sm-4'>");
                let p = $("<p>");
                p.text("Rating: " + results[i].rating);
                let animalImage = $("<img>");
                animalImage.attr("src", results[i].images.fixed_height_still.url);
                animalImage.attr("data-still", results[i].images.fixed_height_still.url);
                animalImage.attr("data-animate", results[i].images.fixed_height.url);
                animalImage.attr("data-state", "still");
                animalImage.addClass("gif");
                animalImage.click(toggleGifState);

                animalDiv.append(p);
                animalDiv.append(animalImage);

                $("#gifs_appear_here").prepend(animalDiv);
            }
        });
    }

    $("#search").on("click", function doSearch(event) {
        event.preventDefault();

        let search_term = $("#search_term").val();

        addButton(search_term, search_term);

    });

    $("#clear").on("click", function doSearch(event) {
        $("#gifs_appear_here").empty();
    });

    function toggleGifState() {
        var state = $(this).attr("data-state")

        if (state === 'still') {
            var animate = $(this).attr("data-animate");
            $(this).attr("src", animate);
            $(this).attr("data-state", 'animate');

        }
        else {
            var still = $(this).attr("data-still");
            $(this).attr("src", still);
            $(this).attr("data-state", 'still');
        }

    }

    function addButton(search_term, title_text) {
        let searchable_btn = $("<button>");
        searchable_btn.attr("data-animal", search_term);
        searchable_btn.text(title_text);
        searchable_btn.addClass("user_button");
        searchable_btn.click(addThisGifs);
        $("#button_div").append(searchable_btn);
    }

    var currentDate = moment().format('YYYY-MM-DD');
    $("#linkMLB").click(function () {
        sessionStorage.clear();
        sessionStorage.setItem("selectedSport", "MLB");
    });
    $("#linkNFL").click(function () {
        sessionStorage.clear();
        sessionStorage.setItem("selectedSport", "NFL");
    });
    $("#linkNBA").click(function () {
        sessionStorage.clear();
        sessionStorage.setItem("selectedSport", "NBA");
    });

    function switchSport() {
        var sport = sessionStorage.getItem("selectedSport");
        var queryURL = "https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=cb91c595aa9c4e9ba1bd60c318ed1211";
        if (sport) {
            queryURL = "https://newsapi.org/v2/everything?q=" + sport + "&from=" + currentDate + "&sortBy=publishedAt&apiKey=cb91c595aa9c4e9ba1bd60c318ed1211";
        }


        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(displayNews);
        sessionStorage.clear();
    }
    switchSport();

    function displayNews(data) {
        console.log(data);
        jQuery.each(data.articles, function (i, article) {

            if (article) {
                if (article.urlToImage) {
                    $("#newsFeed").append("<div>" + "<img src='" + article.urlToImage + "'>" + "</div>");
                }
                if (article.title) {
                    $("#newsFeed").append("<div>" + "<a href='" + article.url + "'>" + article.title + "</a></div>");
                }
                if (article.description) {
                    $("#newsFeed").append("<div>" + article.description + "</div>");
                }
            }
        });

    }

});