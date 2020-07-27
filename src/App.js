import React from 'react';
import './App.css';

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

  vapeOn(node){
    // the decrement logic and figuring out when vape is dead should live in vape or device
    this.props.handleVapeOnChange(true);
    console.log(this.state)

      this.props.decrementBattery();
      this.vapeInUse(node);
  }

  async vapeInUse(node){
    let battery = this.props.battery;
    if(battery > 50) {
      node.classList.add("vapeHighBattery");
      // await new Promise(r => setTimeout(r, 300));
      // node.classList.remove("vapeHighBattery");
    }
    else if (battery > 20) {
      node.classList.add("vapeMidBattery");
      // await new Promise(r => setTimeout(r, 300));
      // node.classList.remove("vapeMidBattery");
    }
    else if (battery > 0) {
      node.classList.add("vapeLowBattery");
      // await new Promise(r => setTimeout(r, 300));
      // node.classList.remove("vapeLowBattery");
    }
    else {
      this.vapeDead(node);
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
        <Switch decrementBattery={this.props.decrementBattery}
                battery={this.props.battery}
                handleVapeOnChange={this.props.handleVapeOnChange}
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
      battery: 10,
      juice: 100,
    };
    this.decrementBattery = this.decrementBattery.bind(this);
    this.handleVapeOnChange = this.handleVapeOnChange.bind(this);
  }

  // this method needs to query the state of the vape every second. You can hold done the button and light wont change colour. Won't check for less than one battery
  decrementBattery(){
    if (this.state.vapeOn === false || this.state.battery <= 0){ return };

    this.setState({battery: this.state.battery - 1});

    setTimeout(this.decrementBattery, 1000);
  }

  handleVapeOnChange(state){
    console.log('change');
    this.setState({vapeOn: state});

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
            <Device decrementBattery={this.decrementBattery}
                    battery={this.state.battery}
                    handleVapeOnChange={this.handleVapeOnChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Vape;
