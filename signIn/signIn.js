$(document).ready (function() {
  var config = {
      apiKey: "AIzaSyBZdLgU-CE2cKuwZZ9cJ64cNJHbNDjonZg",
      authDomain: "class-project-1-856d5.firebaseapp.com",
      databaseURL: "https://class-project-1-856d5.firebaseio.com",
      projectId: "class-project-1-856d5",
      storageBucket: "class-project-1-856d5.appspot.com",
      messagingSenderId: "865560392389"
      //clientId: "890867978712-umdoaue8kh6uirir05e4nc72u34om0l1.apps.googleusercontent.com"
    };
    /*scopes [
      "profile",
      "email",	
      "openid"
    ]
    */
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
          window.location.href = "http://www.w3schools.com";
        }
        else{
          $("#passwordError").val("You couldn't be Google verified");
        }
        console.log(result);
        console.log(token);
      })
    // firebase.auth().getRedirectResult().then(function(result) {
    //   if (result.credential) {
    //     // This gives you a Google Access Token. You can use it to access the Google API.
    //     var token = result.credential.accessToken;
    //     // ...
    //   }
    //   // The signed-in user info.
    //   var user = result.user;
    //   console.log(user);
    // }).catch(function(error) {
    //   // Handle Errors here.
    //   var errorCode = error.code;
    //   console.log(errorCode);
    //   var errorMessage = error.message;
    //   // The email of the user's account used.
    //   var email = error.email;
    //   // The firebase.auth.AuthCredential type that was used.
    //   var credential = error.credential;
    //   // ...
    // });
  })


});
