var CompanyQuote = React.createClass({
    propTypes: {
        ticker: React.PropTypes.string
    },
    getInitialState: function(){
        return {
            loading: true,
            quoteData: {}
        };
    },
    componentDidMount: function() {
        this.getData(this.props.ticker || "AAPL");
    },
    componentWillUnmount: function() {
        // sometimes ajax request abortions throw errors
        try
        {
            this.QuoteRequest.abort();
        }
        catch(e)
        {

        }
    },
    componentWillReceiveProps: function(newProps)
    {
        if(newProps && newProps.ticker)
        {
            this.getData(newProps.ticker);
        }
    },
    getData: function(ticker){
        // sometimes ajax request abortions throw errors
        try
        {
            this.QuoteRequest.abort();
        }
        catch(e)
        {

        }

        this.setState({loading: true, quoteData: {}});
        
        this.QuoteRequest = $.ajax({
            url: `http://dev.markitondemand.com/MODApis/Api/v2/Quote/jsonp`,
            type: 'GET',
            dataType: 'jsonp',
            data: {
                symbol: ticker
            }
        }).always((data)=>{
                this.setState({loading: false});
        }).done((data)=>{
                this.setState({quoteData: data});
        }).fail(()=>{
            console.log('Failed to get quote data');
        });

        return this.QuoteRequest;
    },
    render: function() {
        return (
            <div className="company-app">
                <div className={'loader loader-block ' + (!this.state || !this.state.loading ? "hidden" : "")}>Getting Quote...</div>
                <div className="app-content">
                    <h1>
                        {this.state.quoteData.Name} ({this.state.quoteData.Symbol})
                    </h1>
                    <table>
                        <tbody>
                            <tr className="key-values">
                                <td role="presentation">{numeral(this.state.quoteData.LastPrice).format('$0,0.00')}</td>
                                <td role="presentation">{numeral(this.state.quoteData.Change).format('0,0.00')} ({numeral(this.state.quoteData.ChangePercent).format('0,0.00')}%)</td>
                            </tr>
                            <tr>
                                <th scope="row">Open</th>
                                <td>{numeral(this.state.quoteData.Open).format('$0,0.00')}</td>
                            </tr>
                            <tr>
                                <th scope="row">Range</th>
                                <td>{numeral(this.state.quoteData.Low).format('$0,0.00')} - {numeral(this.state.quoteData.High).format('$0,0.00')}</td>
                            </tr>
                            <tr>
                                <th scope="row">Change YTD</th>
                                <td>{numeral(this.state.quoteData.ChangeYTD).format('0,0.00')} ({numeral(this.state.quoteData.ChangePercentYTD).format('0,0.00')}%)</td>
                            </tr>
                            <tr>
                                <th scope="row">Market Cap</th>
                                <td>{numeral(this.state.quoteData.MarketCap).format('0.0a')}</td>
                            </tr>
                            <tr>
                                <th scope="row">Volume</th>
                                <td>{numeral(this.state.quoteData.Volume).format('0.0a')}</td>
                            </tr>
                            <tr>
                                <td colSpan="2">Data as of {this.state.quoteData.Timestamp}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
});