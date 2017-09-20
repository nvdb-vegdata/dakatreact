import React, { Component } from 'react';
import Egenskap from './egenskap.js';

class EgenskapsListe extends Component {

  render(){

    let listItems = this.props.egenskaper.map((d) => <Egenskap key={d.id} ftid={this.props.ftid} egenskap={d}/>);

    return(
      <div className="EgenskapsListe">
        <h3>Egenskaper</h3>
        <dl>
          {listItems}
        </dl>
      </div>
    );
  }

};

export default EgenskapsListe;
