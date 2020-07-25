import React from 'react';
import './App.css';

class Pod extends React.Component {
  render(){
    return(
      <div className="pod">
        <p>pod</p>
      </div>
    );
  }
}

class Switch extends React.Component {
  vapeOn(node){
    // let switchElement = document.querySelector("#switch");
    // switchElement.classList.add("vapeInUse");
      console.log(this.props)
    if(this.props.battery <= 1){
      console.log('ded')
      this.vapeDead(node);
    }
    else {
      this.props.decrementMethod();
      this.vapeInUse(node);
    }
  }

  async vapeInUse(node){
    let battery = this.props.battery;
    if(battery > 50) {
      node.classList.add("vapeHighBattery");
    await new Promise(r => setTimeout(r, 1000));
      node.classList.remove("vapeHighBattery");
    }
    else if (battery > 20) {
      node.classList.add("vapeMidBattery");
      await new Promise(r => setTimeout(r, 1000));
      node.classList.remove("vapeMidBattery");
    }
    else {
      node.classList.add("vapeLowBattery");
      await new Promise(r => setTimeout(r, 1000));
      node.classList.remove("vapeLowBattery");
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
    // let switchElement = document.querySelector("#switch");
    // switchElement.classList.add("vapeInUse");
    node.classList.remove("vapeInUse");
  }

  componentDidMount(){
    let switchElement = document.querySelector("#switch");
    let lightElement = document.querySelector(".light");
    switchElement.addEventListener("mousedown",  () => { this.vapeOn(lightElement); });
    // switchElement.addEventListener("mouseup",  () => { this.vapeOff(lightElement); });
  }

  render(){
    return(
      <div id="switch" className="switch">
        <div className="light">light</div>
        <p>Switch</p>
      </div>
    );
  }
}

class Device extends React.Component {
  render(){
    return(
      <div className="device">
        <p>Device</p>
        <Switch decrementMethod={this.props.decrementMethod} battery={this.props.battery}/>
      </div>
    );
  }
}

class Vape extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      battery: 60,
      juice: 100,
    };
    this.decrementBattery = this.decrementBattery.bind(this);
  }

  decrementBattery(){
    this.setState({battery: this.state.battery - 1});
  }

  render(){
    return(
      <div>
        <div className="information">
          <h2><strong>Battery: </strong>{this.state.battery}</h2>
          <h2><strong>Juice: </strong>{this.state.juice}</h2>
        </div>
        <div className="vape">
          <Pod />
          <Device decrementMethod={this.decrementBattery} battery={this.state.battery}/>
        </div>
      </div>
    );
  }
}

export default Vape;
