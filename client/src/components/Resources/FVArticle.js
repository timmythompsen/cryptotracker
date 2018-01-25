import React, { Component } from "react";
// import bitcoin_image from "./bitcoin_image.jpg";

class FvArticle extends Component {
  render() {
    return (
      <div className="regulations">

          <h1>How the U.S. and the world regulate bitcoin & other cryptocurrencies</h1>
          <h3>Regulators all over the world have begun to address the challenges presented by virtual currencies that mostly bypass regulated banks, financial firms, exchanges and central clearinghouses.</h3>

          {/*<div className="FvArticleImage">
            <img src={bitcoin_image} alt="bitcoin" width="100%" height="200px" />
          </div>*/}


          <p>
            The CBOE and CME in Chicago recently released Bitcoin futures
            contracts. A futures contract is a “derivative” product because the
            contract derives its value from an underlying instrument – in this
            case the Bitcoin itself. Generally, futures traders speak of the
            futures contract, and cash, with cash meaning the actual underlying
            instrument. To avoid confusion, I will use BTC to refer to the
            underlying Bitcoin itself as the cash instrument. Please note that
            this has nothing to do with “Bitcoin Cash – BCH” which is a newly
            created coin that was spun off from the original Bitcoin (BTC). I will
            refer to the Bitcoin futures as XBT, which is the CBOE code for their
            Bitcoin futures contract. Other derivative products include options,
            warrants and convertible bonds. The notorious mortgage-backed
            Securities(MBS), collateralize debt obligations (CDOs) and credit
            default swaps (CDS) that led to the financial crisis in 2008 are also
            derivatives. With MBS, CDO, and CDS products, the buyer has
            “counter-party risk”, meaning that if the issuer has financial
            difficulties, the buyer could lose all their money. However, Bitcoin
            futures(XBT) are traded on a centralized exchange that take on the
            role as counter-party and assures settlement of the contracts.
          </p>

          
      </div>
    );
  }
}

export default FvArticle;
