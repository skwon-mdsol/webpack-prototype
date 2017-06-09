"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
require("./index.css");
var Hello = function (props) {
    return React.createElement("h1", null,
        "Hello from ",
        props.compiler,
        " to ",
        props.framework);
};
ReactDOM.render(React.createElement(Hello, { compiler: "wooo", framework: "react" }), document.getElementById('root'));
//# sourceMappingURL=index.js.map