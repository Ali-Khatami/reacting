var SearchRow = React.createClass({
    displayName: "SearchRow",

    propTypes: {
        selectCallback: React.PropTypes.function
    },
    selectCompany: function (event) {
        this.props.selectCallback($(event.target).data("ticker"));
    },
    render: function () {
        return React.createElement(
            "li",
            { className: "search-result" },
            React.createElement(
                "a",
                { href: "javascript:void(0);", "data-ticker": this.props.symbol, onClick: this.selectCompany },
                this.props.name,
                " (",
                this.props.symbol,
                "-",
                this.props.exchange,
                ")"
            )
        );
    }
});

var Search = React.createClass({
    displayName: "Search",

    propTypes: {
        selectCallback: React.PropTypes.function,
        results: React.PropTypes.array
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState({
            results: this.props.results || null
        });
    },
    getInitialState: function () {
        return {
            results: null,
            cache: {},
            loading: false
        };
    },
    componentDidMount: function () {
        if (this.props.searchValue) {
            this.SearchRequest = this.getResults(this.props.searchValue || "AAPL");
        }
    },
    componentWillUnmount: function () {
        // sometimes ajax request abortions throw errors
        try {
            this.SearchRequest.abort();
        } catch (e) {}
    },
    getResults: function (search) {
        this.setState({ loading: true });

        return $.ajax({
            url: `http://dev.markitondemand.com/MODApis/Api/v2/Lookup/jsonp?callback=?`,
            type: 'GET',
            dataType: 'jsonp',
            data: {
                input: search
            }
        }).always(data => {
            this.setState({ loading: false });
        }).done(data => {
            this.state.cache[search] = data;
            this.setState({ results: data });
        }).fail(() => {
            console.log("An error occured retrieving quote data...");
        });
    },
    handleBlur: function (event) {
        // erase the value
        event.target.value = "";

        // give the click and other events a chance to register
        setTimeout(() => {
            // remove results
            this.setState({ results: null });
        }, 100);
    },
    handleChange: function (event) {
        var searchValue = event.target.value;

        if (this.SearchRequest) {
            try {
                this.SearchRequest.abort();
            } catch (e) {}
        }

        if (this.state.cache[searchValue]) {
            this.setState({ results: this.state.cache[searchValue] });
        } else {
            this.SearchRequest = this.getResults(searchValue);
        }
    },
    render: function () {
        var resultsBlock = null;

        if (this.state.results && this.state.results.length) {
            resultsBlock = React.createElement(
                "div",
                { className: "search-results" },
                React.createElement(
                    "ul",
                    null,
                    this.state.results.map((result, i) => {
                        return React.createElement(SearchRow, { selectCallback: this.props.selectCallback, symbol: result.Symbol, exchange: result.Exchange, name: result.Name });
                    })
                )
            );
        }

        return React.createElement(
            "div",
            { className: "search-component" },
            React.createElement(
                "div",
                { className: "search-input-container" },
                React.createElement("input", { type: "search", onBlur: this.handleBlur, onChange: this.handleChange, placeholder: "Enter ticker or name..." }),
                React.createElement("span", { className: 'loader ' + (!this.state || !this.state.loading ? "hidden" : "") })
            ),
            resultsBlock
        );
    }
});