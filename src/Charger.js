import React from 'react';
import './App.css';

class Charger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inserted: false,
    };
  }

  componentDidMount(){
    let charger = document.querySelector("#charger");
    let port = document.querySelector("#chargingPort");
    charger.addEventListener("click",  () => { this.insertCharger(charger, port); });
  }

  insertCharger(chargerNode, portNode){
    if (this.state.inserted) {
      chargerNode.classList.add("charger"); 
      portNode.classList.add("chargingPort"); 
      portNode.classList.remove("chargingPortInserted"); 
    }
    else {
      chargerNode.classList.remove("charger"); 
      portNode.classList.remove("chargingPort"); 
      portNode.classList.add("chargingPortInserted"); 
    }

    this.setState({inserted: !this.state.inserted});
  }

  render(){
    return(
      <div id="charger" class="flexCol charger">
        <div id="chargingPort" class="chargingPort"></div>
        <div class="chargingPortCover"></div>
        <div class="chargingCable">
        </div>
      </div>
    );
  }
}

export default Charger;
