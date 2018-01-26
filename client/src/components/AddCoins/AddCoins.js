import React, { Component } from 'react';
import _ from 'lodash';
import axios from "axios";
import SearchBar from './search_bar';
import NumberFormat from "react-number-format";
import AddBtn from './button';


class AddCoins extends Component {
	constructor(props) {
		super(props);

		this.state = {
			coinList: [],
			selectedCoins: [],
		};
	}

  componentDidMount() {
    this.getCoins();
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
  

  handleClick = (key) => {
  	 console.log("you clicked the button", key);

  	 const newState = {
  	 	coinList: this.state.coinList.concat(key)
  	 }

  	 this.setState(newState)

  	 axios.post('/api/add_coins', newState)
  	 .then(function (response){
  	 	console.log(response);
  	 }).catch(function (error){
  	 	console.log(error);
  	 });
  }

	render() {

		const coinSearch = _.debounce((term)=> {this.coinSearch(term) }, 3000);

		console.log(this.state);

		return(
			<div>
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
			</div>
		)
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


}

export default AddCoins;