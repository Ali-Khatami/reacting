"use strict;"

class CompanyQuote extends React.Component {
  constructor(props) {
    super();

    this.state = {
      liked: false,
      ticker: props.ticker || "AAPL", // default to AAPL
      quoteData: {
        }
    };
    
    this.getData(this.state.ticker);
    
    //this.handleClick = this.handleClick.bind(this);
  }
  getData(ticker){
      $.ajax({
          url: `http://dev.markitondemand.com/MODApis/Api/v2/Quote/jsonp`,
          type: 'GET',
          dataType: 'jsonp',
          data: {
              symbol: ticker
          }
      }).done((data)=>{
          setTimeout(()=>{
            this.setState({quoteData: data});
          }, 2000);
      }).fail(()=>{
            console.log(arguments);
      });
  }
  handleClick() {
    this.setState({liked: !this.state.liked});
    this.getData("AAPL");
  }
  render() {
    const text = this.state.liked ? 'liked' : 'haven\'t liked';
    return (
        <div class="company-app">
            {(!this.state.quoteData || !this.state.quoteData.Name) ?
                <p>Loading data for {this.state.ticker} please wait...</p>
            :
                <div class="app-content">
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
}

ReactDOM.render(
    <section class="company-quotes row">
        <CompanyQuote ticker="AAPL"/>
        <CompanyQuote ticker="GOOGL"/>
        <CompanyQuote ticker="INFO"/>
    </section>,
    document.body
);