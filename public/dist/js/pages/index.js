ReactDOM.render(React.createElement(
    "div",
    { className: "clear-fix" },
    React.createElement(SearchableCompanyComponent, { ticker: "INFO" }),
    React.createElement(SearchableCompanyComponent, { ticker: "GOOGL" }),
    React.createElement(SearchableCompanyComponent, { ticker: "AAPL" }),
    React.createElement(SearchableCompanyComponent, { ticker: "IBM" })
), document.getElementById('InvestmentCompare'));