import {connect} from "react-redux";
import {offshoreTransfer, resetTransferProcess, transfer} from "../../../actions";
import {Transfer} from "universal/pages/_wallet/transfer";
import React, {Component} from "react";
import {transferProcess, transferSucceed} from "../../../reducers/transferProcess";
import {history} from "utility/history";
import {Ticker} from "universal/reducers/types";
import {DesktopAppState} from "platforms/desktop/reducers";


class TransferDesktopContainer extends Component<any, any> {


  private sendTicker: Ticker = Ticker.XHV;


  componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {

    if (this.props.transferSucceed) {

      resetTransferProcess();
      history.push("/wallet/assets/" + this.sendTicker);
    }

  }




  onSendFunds = (address: string, amount: number, paymentId: string, ticker: Ticker = Ticker.XHV) => {

    this.sendTicker = ticker;
    if (ticker === Ticker.XHV) {
      this.props.transfer(address, amount, paymentId)
    }
    if (ticker === Ticker.xUSD) {
        this.props.offshoreTransfer(address, amount, paymentId);
    }
  };

  render() {
    return (
        <Transfer isProcessing={this.props.tx.isProcessing} address={this.props.address} sendFunds={this.onSendFunds}/>
    )
  }

}



export const mapStateToProps = (state: DesktopAppState) => ({
  address: state.address.main,
  transferSucceed:transferSucceed,
  tx: transferProcess

});

export const TransferDesktop = connect(
    mapStateToProps,
    { transfer, resetTransferProcess, offshoreTransfer }
)(TransferDesktopContainer);
