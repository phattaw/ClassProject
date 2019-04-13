$(document).ready(function () {

    

    $("#giphy_search").on("click", function doSearch(event) {
        event.preventDefault();

        console.log("event");
        console.log(event);

        let giphy_term = $("#giphy_input").val();

        addGifs(giphy_term, 10);

    });

    function addGifs(animal, limit) {
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            animal + "&api_key=dc6zaTOxFJmzC&limit=" + limit;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                let giphyDiv = $("<div class='col-xs-12, col-sm-4 giphy'>");
                let giphyImage = $("<img>");
                giphyImage.attr("src", results[i].images.fixed_height_still.url);
                giphyImage.attr("data-still", results[i].images.fixed_height_still.url);
                giphyImage.attr("data-animate", results[i].images.fixed_height.url);
                giphyImage.attr("data-state", "still");
                giphyImage.addClass("gif");
                giphyImage.click(toggleGifState);

                giphyDiv.append(giphyImage);

                $("#gifs_appear_here").prepend(giphyDiv);
            }
        });
    }

    $("#seat_geek_search").on("click", function doSearch(event) {
        event.preventDefault();

        let city_term = $("#city").val();
        let team_term = $("#team").val();

        addSeatGeekInfo(city_term, team_term);

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


    // Our seat geek client id is: MTYxMjg4MTR8MTU1NDc2OTA2Mi45NQ
    // Our seat geek secret is: bdd962821bf70152c05b0c1906646ecb7719b5a504b551794d99afe42f1df3d6
    // https://api.seatgeek.com/2/events?client_id=MTYxMjg4MTR8MTU1NDc2OTA2Mi45NQ&client_secret=bdd962821bf70152c05b0c1906646ecb7719b5a504b551794d99afe42f1df3d6

    function addSeatGeekInfo(city, team) {
        var sport = sessionStorage.getItem("selectedSport");
        var queryURL = "https://api.seatgeek.com/2/events?taxonomies.name=sports";

        if(city.length) {
            queryURL += "&q=" + city + "&";
        }

        if(team.length) {
            queryURL += "&q=" + team + "&";
        }

        queryURL += "&client_id=MTYxMjg4MTR8MTU1NDc2OTA2Mi45NQ&client_secret=bdd962821bf70152c05b0c1906646ecb7719b5a504b551794d99afe42f1df3d6"

        console.log("queryURL");
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            $("#seat_geek").empty();

            for(let i = 0; i < response.events.length; i++) {
                let clickable_icon = $("<a>");
                clickable_icon.attr("href", response.events[i].url);

                let icon = $("<img class='seat_geek_icons'>");

                if(sport == null) {
                    icon.attr("src", "./assets/images/sports.png" );
                } else if(sport === "MLB") {
                    icon.attr("src", "./assets/images/baseball.png" );
                } else if(sport === "NFL") {
                    icon.attr("src", "./assets/images/football.png" );
                } else if(sport === "NBA") {
                    icon.attr("src", "./assets/images/basketball.png" );
                }

                clickable_icon.append(icon);

                let gameDiv = $("<div class='col-xs-12, col-sm-4 seat_geek_text'>");

                let title = $("<p>");
                let bold_title = $("<b>").text(response.events[i].short_title);
                title.append(bold_title);
                let city = $("<p>").text(response.events[i].venue.city + ",");
                let state = $("<p>").text(response.events[i].venue.state);
                let gameURL = $("<a>");
                gameURL.attr("href", response.events[i].url);
                gameURL.append(title);

                gameDiv.append(gameURL);
                gameDiv.append(city);
                gameDiv.append(state);

                $("#seat_geek").append(clickable_icon);
                $("#seat_geek").append(gameDiv);
            }

        });
    }
});