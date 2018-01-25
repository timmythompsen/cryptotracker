import React, { Component } from 'react';
import RaisedButtonSimple from "../Buttons/RaisedButton.js";
import axios from "axios";
import NumberFormat from "react-number-format";
import { Toolbar, ToolbarTitle } from "material-ui/Toolbar";

// import "./Home.css";

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      cryptos: [],
      open: false,
      show: null
    };
  } // close constructor(props)

  componentDidMount() {
    // this.props.fetchUser();
    this.updateData();
  } 

	render() {
		return(
			<div className="Home">
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
          <RaisedButtonSimple handleClick={this.updateData} />
		</div>
		) // close return(
	} // close render() {}

	  updateData = () => {
	    console.log("updateData funtion called");
	    axios
	      .get(
	        "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC,BCH,IOT&tsyms=USD"
	      )
	      .then(res => {
	        const cryptos = res.data;
	        console.log(cryptos);
	        this.setState({ cryptos: cryptos });
	      });
	  }; // close updateData = () => {

} // close class Home extends Component

export default Home;