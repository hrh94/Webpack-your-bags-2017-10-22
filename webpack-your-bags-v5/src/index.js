// import $ from 'jquery';
// $('body').html('Hello');

// import Button from './Components/Button';
// const button = new Button('google.com');
// button.render('a');

import $ from "jquery";
import "./styles.scss";

if (document.querySelectorAll("a").length) {
    require.ensure([], () => {
        const Button = require("./Components/Button").default;
        const button = new Button("google.com");

        button.render("a");
    });
}

// If we have a title, render the Header component on it
if (document.querySelectorAll("h1").length) {
    require.ensure([], () => {
        const Header = require("./Components/Header").default;

        new Header().render("h1");
    });
}
