var CompanyQuote = React.createClass({
    propTypes: {
        ticker: React.PropTypes.string
    },
    componentDidMount: function() {
        this.getData(this.props.ticker || "AAPL")
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
    componentWillReceiveProps: function(newProps){
        
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

         this.setState({loading: true});

        this.QuoteRequest = $.ajax({
            url: `http://dev.markitondemand.com/MODApis/Api/v2/Quote/jsonp`,
            type: 'GET',
            dataType: 'jsonp',
            data: {
                symbol: ticker
            }
        }).always((data)=>{
            setTimeout(()=>{
                this.setState({loading: false});
            }, 2000);
        }).done((data)=>{
            setTimeout(()=>{
                this.setState({quoteData: data});
            }, 2000);
        }).fail(()=>{
            console.log(arguments);
        });

        return this.QuoteRequest
    },
    render: function() {
        return (
            <div className="company-app">
                <div className={'loader loader-block ' + (!this.state || !this.state.loading ? "hidden" : "")}>Getting Quote...</div>
                {(!this.state || !this.state.quoteData || !this.state.quoteData.Name) ?
                    <p>Loading data for {this.props.ticker} please wait...</p>
                :
                    <div className="app-content">
                        <h1>
                            {this.state.quoteData.Name} ({this.state.quoteData.Symbol})
                        </h1>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Last Price</th>
                                    <td>{this.state.quoteData.LastPrice}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        );
    }
});