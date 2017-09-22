import React, { Component } from 'react';
import Egenskap from './egenskap.js';

class EgenskapsListe extends Component {

  render(){

    let listItems = this.props.egenskaper.map((d) => <Egenskap key={d.id} ftid={this.props.ftid} egenskap={d}/>);

    return(
      <section className="EgenskapsListe">
        <h2>Egenskaper</h2>
        <dl className="EgenskapsListe__Egenskaper">
          {listItems}
        </dl>
      </section>
    );
  }

};

export default EgenskapsListe;
