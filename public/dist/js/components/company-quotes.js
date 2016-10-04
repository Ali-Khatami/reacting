var CompanyQuote = React.createClass({
    displayName: 'CompanyQuote',

    propTypes: {
        ticker: React.PropTypes.string
    },
    componentDidMount: function () {
        this.getData(this.props.ticker || "AAPL");
    },
    componentWillUnmount: function () {
        // sometimes ajax request abortions throw errors
        try {
            this.QuoteRequest.abort();
        } catch (e) {}
    },
    componentWillReceiveProps: function (newProps) {

        if (newProps && newProps.ticker) {
            this.getData(newProps.ticker);
        }
    },
    getData: function (ticker) {
        // sometimes ajax request abortions throw errors
        try {
            this.QuoteRequest.abort();
        } catch (e) {}

        this.setState({ loading: true });

        this.QuoteRequest = $.ajax({
            url: `http://dev.markitondemand.com/MODApis/Api/v2/Quote/jsonp`,
            type: 'GET',
            dataType: 'jsonp',
            data: {
                symbol: ticker
            }
        }).always(data => {
            setTimeout(() => {
                this.setState({ loading: false });
            }, 2000);
        }).done(data => {
            setTimeout(() => {
                this.setState({ quoteData: data });
            }, 2000);
        }).fail(() => {
            console.log(arguments);
        });

        return this.QuoteRequest;
    },
    render: function () {
        return React.createElement(
            'div',
            { className: 'company-app' },
            React.createElement(
                'div',
                { className: 'loader loader-block ' + (!this.state || !this.state.loading ? "hidden" : "") },
                'Getting Quote...'
            ),
            !this.state || !this.state.quoteData || !this.state.quoteData.Name ? React.createElement(
                'p',
                null,
                'Loading data for ',
                this.props.ticker,
                ' please wait...'
            ) : React.createElement(
                'div',
                { className: 'app-content' },
                React.createElement(
                    'h1',
                    null,
                    this.state.quoteData.Name,
                    ' (',
                    this.state.quoteData.Symbol,
                    ')'
                ),
                React.createElement(
                    'table',
                    null,
                    React.createElement(
                        'tbody',
                        null,
                        React.createElement(
                            'tr',
                            null,
                            React.createElement(
                                'th',
                                null,
                                'Last Price'
                            ),
                            React.createElement(
                                'td',
                                null,
                                this.state.quoteData.LastPrice
                            )
                        )
                    )
                )
            )
        );
    }
});