import React, { Component } from 'react';
import _ from 'lodash';
import axios from "axios";
import SearchBar from './search_bar';

class AddCoins extends Component {
	constructor(props) {
		super(props);

		this.state = {
			coinList: [],
			selectedCoins: []
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
        console.log(cryptos);
        this.setState({ coinList: cryptos });
      });
  }

	render() {

		const videoSearch = _.debounce((term)=> {this.coinSearch(term) }, 3000);

		return(
			<div>
				<h1>Choose Coins to add to your dashboard</h1>
				<SearchBar onSearchTermChange={this.coinSearch} />
				{Object.keys(this.state.coinList).map(key => (
					
					<table id="coinList-container">
						<tr>
							<th>{key}</th>
							<th>{this.state.coinlist[key].CoinName}</th>
							<th><input type="checkbox" /></th>
						</tr>
					</table>	
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