import React, { Component } from 'react';
import _ from 'lodash';
import axios from "axios";
import SearchBar from './search_bar';
import NumberFormat from "react-number-format";
import { Toolbar, ToolbarTitle } from "material-ui/Toolbar";
import RaisedButtonSimple from "../Buttons/RaisedButton.js";
import './AddCoins.css';
//import AddBtn from './button';


class AddCoins extends Component {
	constructor(props) {
		super(props);

		
		this.state = {
			coinList: [],
			selectedCoins: [],
			google: null,
			cryptos: []
		};
	}

  componentDidMount() {
    //this.getCoins();
    this.getUserId();
    //this.getCurrentPriceData();
    
  }

  coinSearch = (term) => {
  	axios
      .get(
        `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${term}&tsyms=USD`
      )
      .then(res => {
			const cryptos = res.data;
        	console.log("coin search res" , cryptos);
        	this.setState({selectedCoins: cryptos});
        	});
      }
  

  handleClick = (key)  => {
  	 console.log("you clicked the button", key);


  	 const newState = {
  	 	coinList: this.state.coinList.concat(key)
  	 }

  	 this.setState(newState)

  	 console.log("coinList:", this.state.coinList);

  	 var object = {
  	 	googleId: this.state.google,
  	 	coins: this.state.coinList.concat(key)
  	 }

  	 axios.post('/api/add_coins', object)
  	 .then(function (response){
  	 	console.log('axios post res', response);

  	 }).catch(function (error){
  	 	console.log('axios err ',error);
  	 });
  }

  

	render() {

		const coinSearch = _.debounce((term)=> {this.coinSearch(term) }, 3000);

		console.log(this.state);

		return(
			<div>
				<div id="add_coin_input">
					<h1>Choose Coins to add to your dashboard</h1>
					<SearchBar onSearchTermChange={this.coinSearch} />
					{Object.keys(this.state.selectedCoins).map(key => (
			            <div id="crypto-container">
			            <button 
			            	className="btn btn-default"
					       	onClick={() => this.handleClick(key)}>
					       	Add Coin
				       	</button>
			              <span className="left">{key}</span>
			              <span className="right">
			                <NumberFormat
			                  value={this.state.selectedCoins[key].USD}
			                  displayType={"text"}
			                  decimalPrecision={2}
			                  thousandSeparator={true}
			                  prefix={"$"}
			                />
			              </span>
			            </div>
			          ))}
		          	<br/><br/>
		         </div>
		         
					<div className="coinList">
			          <Toolbar style={{ justifyContent: 'center'}}>
			            <ToolbarTitle text="My Cryptocurrency Watch List" />
			          </Toolbar>  
			          <br />
			          {console.log("AddCoins this.state.cryptos test ", this.state.cryptos)}
			          {Object.keys(this.state.cryptos).map(key => (
			            <div id="myCoinList">
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
		          	<br/><br/>
		
					</div> {/*close className="coinList" */}



			</div>
		)
	} // closes render() {

   getUserId = () => {
	axios.get('/api/current_user').then(res => {
	console.log('current user',res.data);
	console.log( 'google id :', res.data.googleId);
	this.setState({google: res.data.googleId});
	this.setState({cryptos: res.data.coins});
	console.log("CRYPTOS#######", this.state.cryptos);

		const symbols = this.state.cryptos;
  		//const tickers = [];
  		//tickers.push(symbols);
  		console.log("********************" + this.state.cryptos);
	    console.log("getCurrentPriceData funtion called");
	    const URL = 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=';
	    const ending = "&tsyms=USD";
	    console.log("URL:", URL+ [...symbols] + ending);
	    axios
	      .get(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${symbols}&tsyms=USD`)
	      .then(res => {
	        const cryptoPrices = res.data;
	        console.log('getCurrentPriceData / cryptos: ', cryptoPrices);
	        this.setState({ cryptos: cryptoPrices });
		      
		});
	});
}

  getCoins = () => {
    console.log("getCoins funtion called");
    axios
      .get(
        "https://cors.io/?https://www.cryptocompare.com/api/data/coinlist/")
      .then(res => {
        const coinList = res.data.Data;
        console.log('coinList: ', coinList);
        //this.setState({ coinList: coinList });
      });
  };

  /*getCurrentPriceData = () => {
  		const symbols = this.state.cryptos;
  		//const tickers = [];
  		//tickers.push(symbols);
  		console.log("********************" + this.state.cryptos);
	    console.log("getCurrentPriceData funtion called");
	    const URL = 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=';
	    const ending = "&tsyms=USD";
	    console.log("URL:", URL+ [...symbols] + ending);
	    axios
	      .get(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${symbols}&tsyms=USD`)
	      .then(res => {
	        const cryptoPrices = res.data;
	        console.log('getCurrentPriceData / cryptos: ', cryptoPrices);
	        //this.setState({ cryptos: cryptos });
	      });
	}; // close getCurrentPriceData = () => {*/

} // closes class AddCoins extends Component 

export default AddCoins;