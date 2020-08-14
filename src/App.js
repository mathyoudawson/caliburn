import React, { useState, useEffect } from 'react';
import './App.css';
import Charger from './Charger';
// TODO: split larger componenets into different files (later)

class Pod extends React.Component {
  render(){
    return(
      <div className="pod">
      </div>
    );
  }
}

class Switch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vapeOn: false,
    };
  }

  // not working needs to be driven by vape charging logic or move that logic here?
  async vapeIsCharging(node) {
    if(this.props.charging) {
      let colourClass = this.lightColorByBattery(100)
      node.classList.add(colourClass);
      setTimeout(1000);
      node.classList.remove(colourClass);
    }
    else {
      return;
    }

    setTimeout(this.vapeIsCharging(node), 1000);
  }

  vapeOn(node){
    // the decrement logic and figuring out when vape is dead should live in vape or device
    this.props.handleVapeOnChange(true);

    this.vapeInUse(node);
    this.props.useVape();
  }

  lightColourByBattery(battery){
    if(battery > 50) {
      return "vapeHighBattery";
    }
    else if (battery > 20) {
      return "vapeMidBattery";
    }
    else {
      return "vapeLowBattery";
    }
  }

  async vapeInUse(node){
    let battery = this.props.battery;

    // maybe this can live somewhere better. violates SR
    if(battery <= 0) {
      this.vapeDead(node);
    }
    else {
      node.classList.add(this.lightColourByBattery(battery));
    }
  }

  async vapeDead(node){

    for (let i = 0; i < 5; i++) {
      node.classList.add("vapeLowBattery");
      await new Promise(r => setTimeout(r, 200));
      node.classList.remove("vapeLowBattery");
      await new Promise(r => setTimeout(r, 200));
    }
  }

  vapeOff(node){
    this.props.handleVapeOnChange(false);
    // let switchElement = document.querySelector("#switch");
    // switchElement.classList.add("vapeInUse");
    node.classList.remove("vapeHighBattery");
    node.classList.remove("vapeMidBattery");
    node.classList.remove("vapeLowBattery");
  }

  componentDidMount(){
    let switchElement = document.querySelector("#switch");
    let lightElement = document.querySelector(".light");
    switchElement.addEventListener("mousedown",  () => { this.vapeOn(lightElement); });
    switchElement.addEventListener("mouseup",  () => { this.vapeOff(lightElement); });
    this.vapeIsCharging(lightElement);
  }

  render(){
    return(
      <div className="flexCol">
        <div id="switch" className="switch"></div>
        <div className="light"></div>
      </div>
    );
  }
}

class Device extends React.Component {
  render(){
    return(
      <div className="device">
        <Switch useVape={this.props.useVape}
                battery={this.props.battery}
                handleVapeOnChange={this.props.handleVapeOnChange}
                charging={this.props.charging}
        />
        <div className="deviceText flexCol">
          <p>
            C<br />
            A<br />
            L<br />
            I<br />
            B<br />
            U<br />
            R<br />
            N<br />
          </p>
        </div>
      </div>
    );
  }
}

class Vape extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      battery: 1,
      juice: 100,
      charging: false,
    };
    this.useVape = this.useVape.bind(this);
    this.handleVapeOnChange = this.handleVapeOnChange.bind(this);
    this.handleChargingOnChange = this.handleChargingOnChange.bind(this);
    this.handleCharging = this.handleCharging.bind(this);
  }

  // this method needs to query the state of the vape every second. You can hold done the button and light wont change colour.
  useVape(){
    if (this.vapeIsUnusable()) { return };

    this.setState({battery: this.state.battery - 1, juice: this.state.juice - 0.5});

    setTimeout(this.useVape, 1000);
  }

  vapeIsUnusable(){
    // might want to do something special when juice is 0, eg. black smoke if vapor is implemented
    return (this.state.vapeOn === false || this.state.battery <= 0 || this.state.juice <= 0)
  }

  handleVapeOnChange(state){
    this.setState({vapeOn: state});
  }

  handleChargingOnChange(charging) {
    this.setState({charging: charging});
    if (this.state.charging) {
      this.handleCharging();
    }
  }

  // TODO: flash lights when charging. need to look into callbacks to safely call a child's method from parents (should live in light)
  handleCharging() {
    if(this.vapeIsUnchargable()) { return };

    console.log(this.refs);
    this.setState({battery: this.state.battery + 1});
    // call vaping logic here!

    setTimeout(this.handleCharging, 3000);
  }

  vapeIsUnchargable(){
    return (this.state.charging === false || this.state.battery >= 100)
  }

  render(){
    return(
      <div>
        <div className="information">
          <h2><strong>Battery: </strong>{this.state.battery}</h2>
          <h2><strong>Juice: </strong>{this.state.juice}</h2>
        </div>
        <div className="vape">
          <div>
            <Pod />
            <Device useVape={this.useVape}
                    battery={this.state.battery}
                    handleVapeOnChange={this.handleVapeOnChange}
                    charging={this.state.charging}
            />
          </div>
        </div>
        <Charger handleChargingOnChange={this.handleChargingOnChange}/>
      </div>
    );
  }
}

export default Vape;
