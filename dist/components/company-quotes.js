'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CompanyQuote = function (_React$Component) {
    _inherits(CompanyQuote, _React$Component);

    function CompanyQuote(props) {
        _classCallCheck(this, CompanyQuote);

        var _this = _possibleConstructorReturn(this, (CompanyQuote.__proto__ || Object.getPrototypeOf(CompanyQuote)).call(this));

        _this.state = {
            liked: false,
            ticker: props.ticker || "AAPL", // default to AAPL
            quoteData: {}
        };

        _this.getData(_this.state.ticker);

        //this.handleClick = this.handleClick.bind(this);
        return _this;
    }

    _createClass(CompanyQuote, [{
        key: 'getData',
        value: function getData(ticker) {
            var _this2 = this,
                _arguments = arguments;

            $.ajax({
                url: 'http://dev.markitondemand.com/MODApis/Api/v2/Quote/jsonp',
                type: 'GET',
                dataType: 'jsonp',
                data: {
                    symbol: ticker
                }
            }).done(function (data) {
                setTimeout(function () {
                    _this2.setState({ quoteData: data });
                }, 2000);
            }).fail(function () {
                console.log(_arguments);
            });
        }
    }, {
        key: 'handleClick',
        value: function handleClick() {
            this.setState({ liked: !this.state.liked });
            this.getData("AAPL");
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { 'class': 'company-app' },
                !this.state.quoteData || !this.state.quoteData.Name ? React.createElement(
                    'p',
                    null,
                    'Loading data for ',
                    this.state.ticker,
                    ' please wait...'
                ) : React.createElement(
                    'div',
                    { 'class': 'app-content' },
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
    }]);

    return CompanyQuote;
}(React.Component);

;

exports.default = CompanyQuote;