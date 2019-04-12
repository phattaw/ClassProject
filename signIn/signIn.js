$(document).ready (function() {
  var config = {
      apiKey: "AIzaSyBZdLgU-CE2cKuwZZ9cJ64cNJHbNDjonZg",
      authDomain: "class-project-1-856d5.firebaseapp.com",
      databaseURL: "https://class-project-1-856d5.firebaseio.com",
      projectId: "class-project-1-856d5",
      storageBucket: "class-project-1-856d5.appspot.com",
      messagingSenderId: "865560392389"
      
    };
   
    firebase.initializeApp(config);
    var database = firebase.database();
    var googleName = "";
    var provider = new firebase.auth.GoogleAuthProvider();

    $("#submitBtn").on("click", function(){
        googleName = $("#submitGoogle").val();

      firebase.auth().signInWithPopup(provider).then(function(result){
        console.log('here');
        var token = result.credential.accessToken;
        var user = result.user;
        if (result.user){
          window.location.href = "../index.html";
        }
        else{
          $("#passwordError").val("You couldn't be Google verified");
        }
        console.log(result);
        console.log(token);
      })
    
  })


});
