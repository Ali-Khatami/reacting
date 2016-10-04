var SearchableCompanyComponent = React.createClass({
    displayName: "SearchableCompanyComponent",

    propTypes: {
        ticker: React.PropTypes.string
    },
    componentDidMount: function () {
        // anything to do here?
    },
    componentWillUnmount: function () {
        // maybe I'll need something later
    },
    changeSymbol: function (ticker) {
        console.log("callback called", ticker);
        this.props.ticker = ticker;
        // we need to re-render now that we have a new ticker
        this.forceUpdate();
    },
    render: function () {
        console.log(this.props.ticker);

        return React.createElement(
            "div",
            { className: "company-component", "data-ticker": this.props.ticker },
            React.createElement(Search, { selectCallback: this.changeSymbol }),
            React.createElement(CompanyQuote, { ticker: this.props.ticker })
        );
    }
});