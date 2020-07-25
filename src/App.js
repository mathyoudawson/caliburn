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
    this.props.decrementMethod();
    node.classList.add("vapeInUse");
  }

  vapeOff(node){
    // let switchElement = document.querySelector("#switch");
    // switchElement.classList.add("vapeInUse");
    node.classList.remove("vapeInUse");
  }

  componentDidMount(){
    let switchElement = document.querySelector("#switch");
    switchElement.addEventListener("mousedown",  () => { this.vapeOn(switchElement); });
    switchElement.addEventListener("mouseup",  () => { this.vapeOff(switchElement); });
  }

  render(){
    return(
      <div id="switch" className="switch">
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
        <Switch decrementMethod={this.props.decrementMethod}/>
      </div>
    );
  }
}

class Vape extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      battery: 100,
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
          <h1>This is the vape</h1>
          <Pod />
          <Device decrementMethod={this.decrementBattery}/>
        </div>
      </div>
    );
  }
}

export default Vape;
