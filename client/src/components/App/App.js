import React, { Component } from "react";
import {BrowserRouter, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Home from "../Home/Home";
import AddCoins from "../AddCoins/AddCoins";
import Blog from "../Blog/Blog";
import FAQ from "../FAQ/FAQ";
import FVArticle from "../Resources/FVArticle";
import XBTFairValueCalc from "../Resources/XBTFairValueCalc";
import ContactUs from "../ContactUs/ContactUs";
import cryptoLogo from "./cryptoLogo.png";
import AppBar from "material-ui/AppBar";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import Paper from "material-ui/Paper";
import { Toolbar, ToolbarTitle } from "material-ui/Toolbar";
import "./App.css";
import axios from "axios";
import NumberFormat from "react-number-format";
import NAVBar from "../NAVBar.js";
import RaisedButtonSimple from "../Buttons/RaisedButton.js";
import ArrowDropRight from "material-ui/svg-icons/navigation-arrow-drop-right";
import backgroundImage from "../../images/charnaTop.jpg";
import crypto_logo from "../../images/crypto_logo.png";

const paperStyle = {
  height: "85%",
  width: "85%",
  margin: "7%",
  textAlign: "center",
  display: "inline-block",
  backgroundImage: {backgroundImage}
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cryptos: [],
      open: false,
      show: null
    };
  }

  componentDidMount() {
    this.props.fetchUser();
    this.updateData();
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  showHome = () => {
    this.setState({ show: "home", open: false });
  };

  showAddCoins = () => {
    this.setState({ show: "addCoins", open: false });
  };

  showBlog = () => {
    this.setState({ show: "blog", open: false });
  };

  showFAQ = () => {
    this.setState({ show: "faq", open: false });
  };

  showFVArticle = () => {
    this.setState({ show: "fvArticle", open: false });
  };

  showXBT_FV = () => {
    this.setState({ show: "xbt_fv", open: false });
  };

  showContact = () => {
    this.setState({ show: "contact", open: false });
  };

  renderContent(){
    switch(this.props.auth) {
      case null:
        return;
      case false:
        return <a href="/auth/google">Login With Google</a>;
      default:
        return <a href="/api/logout">Logout</a>;
    }
  }

  render() {
    console.log(this.props);
    let content = null;

    switch (this.state.show) {
      case "home":
        content = <Home />;
        break;

      case "addCoins":
        content = <AddCoins />;
        break;

      case "blog":
        content = <Blog />;
        break;

      case "faq":
        content = <FAQ />;
        break;

      case "fvArticle":
        content = <FVArticle />;
        break;

      case "xbt_fv":
        content = <XBTFairValueCalc />;
        break;

      case "contact":
        content = <ContactUs />;
        break;

      //default:
        //content = <h1>Waiting</h1>;
    }

    return (
      <div className="App">
        
        <AppBar 
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          title= "Crypto-Tracker"
          onLeftIconButtonClick={this.handleToggle}
        />

        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={open => this.setState({ open })}
        >
          <AppBar title= "Crypto-Tracker" />
          <MenuItem onClick={this.showHome}>Home</MenuItem>
          <MenuItem onClick={this.showAddCoins}>Add Coins</MenuItem>
          <MenuItem onClick={this.showBlog}>Blog</MenuItem>
          <MenuItem
            primaryText="Resources"
            rightIcon={<ArrowDropRight />}
            menuItems={[
              <MenuItem
                onClick={this.showFVArticle}
                primaryText="Bitcoin Futures Article"
              />,
              <MenuItem
                onClick={this.showXBT_FV}
                primaryText="Bitcoin Futures Fair Value Calculator"
              />
            ]}
          />

          <MenuItem onClick={this.showFAQ}>FAQ</MenuItem>
          <MenuItem onClick={this.showContact}>Contact</MenuItem>
          <MenuItem onClick={this.renderContent()}>{this.renderContent()}</MenuItem>
        </Drawer>

        <Paper style={paperStyle} zDepth={5}>
          {content}
        </Paper>

        <Paper style={paperStyle} zDepth={5}>
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
                />
              </span>
            </div>
          ))}
          <RaisedButtonSimple handleClick={this.updateData} />
        </Paper>  
      </div>
    );
  }

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
  };
}

function mapStateToProps({ auth }) {
  return {auth};
}

export default connect(mapStateToProps, actions) (App);
