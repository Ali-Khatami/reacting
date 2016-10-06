var CompanyQuote = React.createClass({
    displayName: 'CompanyQuote',

    propTypes: {
        ticker: React.PropTypes.string
    },
    getInitialState: function () {
        return {
            loading: true,
            quoteData: {}
        };
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

        this.setState({ loading: true, quoteData: {} });

        this.QuoteRequest = $.ajax({
            url: `http://dev.markitondemand.com/MODApis/Api/v2/Quote/jsonp`,
            type: 'GET',
            dataType: 'jsonp',
            data: {
                symbol: ticker
            }
        }).always(data => {
            this.setState({ loading: false });
        }).done(data => {
            this.setState({ quoteData: data });
        }).fail(() => {
            console.log('Failed to get quote data');
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
            React.createElement(
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
                            { className: 'key-values' },
                            React.createElement(
                                'td',
                                { role: 'presentation' },
                                numeral(this.state.quoteData.LastPrice).format('$0,0.00')
                            ),
                            React.createElement(
                                'td',
                                { role: 'presentation' },
                                numeral(this.state.quoteData.Change).format('0,0.00'),
                                ' (',
                                numeral(this.state.quoteData.ChangePercent).format('0,0.00'),
                                '%)'
                            )
                        ),
                        React.createElement(
                            'tr',
                            null,
                            React.createElement(
                                'th',
                                { scope: 'row' },
                                'Open'
                            ),
                            React.createElement(
                                'td',
                                null,
                                numeral(this.state.quoteData.Open).format('$0,0.00')
                            )
                        ),
                        React.createElement(
                            'tr',
                            null,
                            React.createElement(
                                'th',
                                { scope: 'row' },
                                'Range'
                            ),
                            React.createElement(
                                'td',
                                null,
                                numeral(this.state.quoteData.Low).format('$0,0.00'),
                                ' - ',
                                numeral(this.state.quoteData.High).format('$0,0.00')
                            )
                        ),
                        React.createElement(
                            'tr',
                            null,
                            React.createElement(
                                'th',
                                { scope: 'row' },
                                'Change YTD'
                            ),
                            React.createElement(
                                'td',
                                null,
                                numeral(this.state.quoteData.ChangeYTD).format('0,0.00'),
                                ' (',
                                numeral(this.state.quoteData.ChangePercentYTD).format('0,0.00'),
                                '%)'
                            )
                        ),
                        React.createElement(
                            'tr',
                            null,
                            React.createElement(
                                'th',
                                { scope: 'row' },
                                'Market Cap'
                            ),
                            React.createElement(
                                'td',
                                null,
                                numeral(this.state.quoteData.MarketCap).format('0.0a')
                            )
                        ),
                        React.createElement(
                            'tr',
                            null,
                            React.createElement(
                                'th',
                                { scope: 'row' },
                                'Volume'
                            ),
                            React.createElement(
                                'td',
                                null,
                                numeral(this.state.quoteData.Volume).format('0.0a')
                            )
                        ),
                        React.createElement(
                            'tr',
                            null,
                            React.createElement(
                                'td',
                                { colSpan: '2' },
                                'Data as of ',
                                this.state.quoteData.Timestamp
                            )
                        )
                    )
                )
            )
        );
    }
});