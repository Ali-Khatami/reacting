ReactDOM.render(
    <div className="clear-fix">
        <SearchableCompanyComponent ticker="INFO" />
        <SearchableCompanyComponent ticker="GOOGL" />
        <SearchableCompanyComponent ticker="AAPL" />
        <SearchableCompanyComponent ticker="IBM" />
    </div>,
    document.getElementById('InvestmentCompare')
);