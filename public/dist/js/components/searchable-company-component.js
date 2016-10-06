var SearchableCompanyComponent = React.createClass({
    displayName: "SearchableCompanyComponent",

    propTypes: {
        ticker: React.PropTypes.string
    },
    getInitialState: function () {
        return { ticker: this.props.ticker || "AAPL" };
    },
    componentDidMount: function () {
        this.setState({ ticker: this.props.ticker || "AAPL" });
    },
    componentWillUnmount: function () {
        // maybe I'll need something later
    },
    changeSymbol: function (ticker) {
        // setState will trigger a re-render
        this.setState({ ticker: ticker });
    },
    render: function () {
        return React.createElement(
            "div",
            { className: "company-component", "data-ticker": this.state.ticker },
            React.createElement(Search, { selectCallback: this.changeSymbol }),
            React.createElement(CompanyQuote, { ticker: this.state.ticker })
        );
    }
});