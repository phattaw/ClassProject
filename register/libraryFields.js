"use strict";
var fields = {
    screenName: {
        required:"A screen name is required."
    },
    email: {
        message: "Must be a valid email address.",
        required: "Email address is required.",
        isEmail: "Email address is invalid."
    },
    password: {
        required: "Password is required."
    },
    verify: {
        required: "Please retype your password.",
        noMatch: ["Passwords do not match.", "password"]
    },
    firstName: {
        required: "First name is required."
    },
    lastName: {
        required: "Last name is required."
    },
};