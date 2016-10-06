var SearchableCompanyComponent = React.createClass({
    propTypes: {
        ticker: React.PropTypes.string
    },
    getInitialState: function() {
        return { ticker: this.props.ticker || "AAPL" };
    },
    componentDidMount: function()
    {
        this.setState({ ticker: this.props.ticker || "AAPL" });
    },
    componentWillUnmount: function()
    {
        // maybe I'll need something later
    },
    changeSymbol: function(ticker)
    {
        // setState will trigger a re-render
        this.setState({ticker:  ticker});
    },
    render: function()
    {
        return (
            <div className="company-component" data-ticker={this.state.ticker}>
                <Search selectCallback={this.changeSymbol} />
                <CompanyQuote ticker={this.state.ticker} />
            </div>
        );
    }
});