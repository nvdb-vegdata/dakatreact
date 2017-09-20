import React, { Component } from 'react';

class StyringsParametre extends Component {

  constructor(props) {
      super(props);
      this.state = {};
    }

  render() {
    const listItems = Object.keys(this.props.sparams).map((k) => {
        let verdi = this.props.sparams[k];
        if (verdi === true) verdi="Ja";
        if (verdi === false) verdi="Nei";
        return <li key={k}>{k}: {verdi}</li>;
      })
    return (
      <div className="StyringsParametre">
        <h3>StyringsParametre:</h3>
        <ul>
          {listItems}
        </ul>
      </div>
    );
  }

};


export default StyringsParametre;
