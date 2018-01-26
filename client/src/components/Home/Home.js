import React, { Component } from 'react';
import RaisedButtonSimple from "../Buttons/RaisedButton.js";
import axios from "axios";
import NumberFormat from "react-number-format";
import { Toolbar, ToolbarTitle } from "material-ui/Toolbar";
import CryptoChart from "../CryptoChart/CryptoChart.js";
import Paper from "material-ui/Paper";
import backgroundImage from "../../images/charnaTop.jpg";
import moment from 'moment';

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
      stateHistData: {},
      open: false,
      show: null,
      chartData: {
      	labels: [],
      	dataset: [{
      		label: 'Cryptocurrency Trading History',
      		data: []
      	}]
      }      
    };
  }; // close constructor(props)

  componentWillMount() {
    // this.getChartData();
    this.getCryptoChartData();
  }

  componentDidMount() {
    // this.props.fetchUser();
    // this.getCryptoChartData();

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
					{console.log('chart rendered: ', this.state.chartData)}
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

	     var arrayTime = [];
	     var arrayPrice =[];	
	       	
	    console.log("getCryptoChartData funtion called");
	    axios
	      .get(
	        "https://min-api.cryptocompare.com/data/histohour?fsym=BTC&tsym=USD&limit=24&aggregate=1"
	      )
	      .then(res => {
	        const histData = res.data;
	        console.log('histData: ', histData);
	        console.log('values', Object.values(histData.Data))



	        for (var i=0; i<histData.Data.length; i++){
	  			  var chartTimeUnix = moment.unix(histData.Data[i].time);
	  			  var chartTimePretty = chartTimeUnix.format("MM/DD/YY HH:mm");
	  			  console.log('chartTimePretty ', chartTimePretty);
	  			  arrayTime.push(chartTimePretty);
	  			  arrayPrice.push(histData.Data[i].close);	
	  			  console.log('for loop histData[i].time', chartTimeUnix.format("MM/DD/YY HH:mm"));
	      	  console.log('for loop histData[i].close ', histData.Data[i].close);
	        }

	        // console.log('stateHistData: ', this.state.stateHistData);
	      });
	     	console.log('updated state with time and price: ', this.state);
	        this.setState({
	        		chartData:{
		        		labels: arrayTime,
		        		datasets: [
		        			{
		        			label: 'CryptoCurrency Trading History',	
		        			data: arrayPrice
		        		}]
	        	}}); // this.setState({ stateHistData: histData });

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
	            ]
	        }]
	      } // close chartData:{}
	    })// close this.setState

	    	console.log('state updated by getChartData ', this.state)

	  } // close getChartData()

	  
	
	// ===== END FUNCTIONS ===== //	  	  	

} // close class Home extends Component

export default Home;