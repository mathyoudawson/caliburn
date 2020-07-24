import React from 'react';
import './App.css';


class Pod extends React.Component {
  render(){
    return(
      <p>pod</p>
    );
  }
}

class Device extends React.Component {
  render(){
    return(
      <p>Device</p>
    );
  }
}

class Vape extends React.Component {
  render(){
    return(
        <div className="vape">
          <h1>This is the vape</h1>
          <Pod />
          <Device />
        </div>
    );
  }
}

export default Vape;
