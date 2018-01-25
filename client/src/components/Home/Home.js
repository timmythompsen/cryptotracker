import React, { Component } from 'react';
import RaisedButtonSimple from "../Buttons/RaisedButton.js";
import axios from "axios";
import NumberFormat from "react-number-format";
import { Toolbar, ToolbarTitle } from "material-ui/Toolbar";
import CryptoChart from "../CryptoChart/CryptoChart.js";
import Paper from "material-ui/Paper";
import backgroundImage from "../../images/charnaTop.jpg";


// import "./Home.css";

const paperStyle = {
  height: "85%",
  width: "85%",
  margin: "7%",
  textAlign: "center",
  display: "inline-block",
  backgroundImage: {backgroundImage}
};

class Home extends Component {

  constructor() {
    super();

    this.state = {
      cryptos: [],
      stateHistData: [],
      open: false,
      show: null,
      chartData: {}      
    };
  }; // close constructor(props)

  componentWillMount() {
    this.getChartData();
    this.getCryptoChartData();
  }

  componentDidMount() {
    // this.props.fetchUser();
    this.getCurrentPriceData();
  } 

	render() {
		return(
			<div className="Home">

				<div className="coinList">
		          <Toolbar style={{ justifyContent: 'center'}}>
		            <ToolbarTitle text="Current Cryptocurrency Quotes" />
		          </Toolbar>  
		          <br />
		          {Object.keys(this.state.cryptos).map(key => (
		            <div id="crypto-container">
		              <span className="left">{key}</span>
		              <span className="right">
		                <NumberFormat
		                  value={this.state.cryptos[key].USD}
		                  displayType={"text"}
		                  decimalPrecision={2}
		                  thousandSeparator={true}
		                  prefix={"$"}
		                />  {/* close number format */}
		              </span> {/* close span className="right" */}
	            	</div> // close div id="crypto-container"
	          	))} {/* close map(key=>; then map(key =>(; then {Object.keys */}
	          	<RaisedButtonSimple handleClick={this.getCurrentPriceData} />
	          	<br/><br/>
	
				</div> {/*close className="coinList" */}

				<Paper style={paperStyle} zDepth={5}>
				<div className="Chart">
					<CryptoChart chartData={this.state.chartData} />
				</div> {/* close className="Chart" */}	
				</Paper>

			</div> // close className="Home"

		) // close return(
	} // close render() {}


	// ===== FUNCTIONS ===== //

	  getCurrentPriceData = () => {
	    console.log("getCurrentPriceData funtion called");
	    axios
	      .get(
	        "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC,BCH,IOT&tsyms=USD"
	      )
	      .then(res => {
	        const cryptos = res.data;
	        console.log('getCurrentPriceData / cryptos: ', cryptos);
	        this.setState({ cryptos: cryptos });
	      });
	  }; // close updateData = () => {

	  getCryptoChartData() {
	    console.log("getCryptoChartData funtion called");
	    axios
	      .get(
	        "https://min-api.cryptocompare.com/data/histohour?fsym=BTC&tsym=USD&limit=24&aggregate=1"
	      )
	      .then(res => {
	        const histData = res.data;
	        console.log('histData: ', histData);
	        this.setState({ stateHistData: histData });
	        console.log('stateHistData: ', this.state.stateHistData);
	      });
	  }; // close getCryptoChartData()

		 getChartData() {
	    // Ajax call here
	    this.setState({
	      chartData:  {
	        labels: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
	        datasets: [
	          {
	            label: 'Population',
	            data: [
	              617594,
	              181045,
	              153060,
	              106519,
	              95072,
	              80000
	            ],
	            backgroundColor: [
	              'rgba(255,99,132,0.6)',
	              'rgba(54,162,235,0.6)',
	              'rgba(255,206,86,0.6)',
	              'rgba(75,192,192,0.6)',
	              'rgba(153,102,255,0.6)',
	              'rgba(255,159,64,0.6)',
	              'rgba(255,99,132,0.6)'
	            ],
	            borderWidth:1,
	            borderColor:'#777',
	            hoverBorderWidth:3,
	            hoverBorderColor: '#000'
	        }]
	      } // close chartData:{}
	    }) // close this.setState
	  } // close getChartData()
	
	// ===== END FUNCTIONS ===== //	  	  	

} // close class Home extends Component

export default Home;