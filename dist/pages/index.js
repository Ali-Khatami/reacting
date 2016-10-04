"use strict";

ReactDOM.render(React.createElement(
    "div",
    { "class": "company-components" },
    React.createElement(CompanyQuote, { ticker: "AAPL" })
), document.body);