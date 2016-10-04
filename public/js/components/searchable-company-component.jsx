var SearchableCompanyComponent = React.createClass({
    propTypes: {
        ticker: React.PropTypes.string
    },
    componentDidMount: function()
    {
        // anything to do here?
    },
    componentWillUnmount: function()
    {
        // maybe I'll need something later
    },
    changeSymbol: function(ticker)
    {
        console.log("callback called", ticker);
        this.props.ticker = ticker;
        // we need to re-render now that we have a new ticker
        this.forceUpdate();
    },
    render: function()
    {
        console.log(this.props.ticker);

        return (
            <div className="company-component" data-ticker={this.props.ticker}>
                <Search selectCallback={this.changeSymbol} />
                <CompanyQuote ticker={this.props.ticker} />
            </div>
        );
    }
});