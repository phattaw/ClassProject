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

    var storeEmail = "";
    var storePassword = "";
    var storeConfirm = "";

    console.log("document ready is ready");
    var email = "";
    var password = "";
    var confirmPassword = "";

$("#submitBtn").on("click", function(event){
    event.preventDefault();
    var emailValid;
    var passwordValid;
    var confirmValid;

    email = $("#submitEmail").val();
    var emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //console.log("Reg Exp test for email is " + emailRegExp.test(email));
    //console.log("email is " + email);
    
    if (emailRegExp.test(email)){
        $("#emailError").text("Valid email");
        emailValid = true;
    } 
    else{
        $("#emailError").text("Not a valid email. Try again");
        emailValid = false;
        $("#submitEmail").val("");
    }

    password = $("#submitPassword").val().trim().toLowerCase();
    var passwordRegExp = /^[a-zA-Z0-9]{6,12}$/i;
   
    //console.log("password is " + password);
    
    if (passwordRegExp.test(password)){
        $("#passwordError").text("Valid password");
        passwordValid = true;
       // console.log("passwordValid after regexp is " + passwordValid);
    } 
    else{
        $("#passwordError").text("Your password is nonconforming. Try again");
        passwordValid = false;
        $("#submitPassword").val("");
    }

    confirmPassword = $("#submitConfirmPassword").val().trim().toLowerCase();
    var confirmPasswordRegExp = /^[a-zA-Z0-9]{6,12}$/i;
    if (confirmPasswordRegExp.test(confirmPassword)){
        confirmValid = true;
        //console.log("confirmValid after regEx is" +confirmValid);
        }

    //console.log("confirmPassword is " + confirmPassword);

    if (password === confirmPassword&&confirmValid&&passwordValid){
        $("#confirmError").text("Passwords match");
        confirmValid = true;
    } 
    
    else{
        $("#confirmError").text("Passwords don't match. Try again");
        confirmValid = false;
        $("#submitConfirmPassword").val("");
        $("#submitPassword").val("");
    }  
    storeEmail= email;
    storePassword = password;
    storeConfirm = confirmPassword;

    if(emailValid&&passwordValid&&confirmValid){
        database.ref().push({
            email: storeEmail,
            password: storePassword,
            confirm: storeConfirm
          });
    }

   database.ref().on("value", function(snapshot) {
        console.log(snapshot.val());
        console.log("email in storage is " + snapshot.val().email);
        console.log("password in storage is " + snapshot.val().password);
        console.log("confirm in storage is " + snapshot.val().confirm);        
});
})
})