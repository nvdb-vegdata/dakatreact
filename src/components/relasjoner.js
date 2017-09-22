import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ObjektTypeRelasjoner extends Component {

  constructor(props) {
      super(props);
      this.state = {};
    }

    lagListe(liste) {
      let itemlist = liste.map((d) => {
          let url = '/dakatr/'+d.type.id;
          return <li key={d.type.id}><Link  to={url}>{d.type.id}: {d.type.navn}</Link> ({d.id}, {d.relasjonstype}, {d.innenfor_mor})</li>;
        })
      return itemlist;
    }

  render() {
    let barn = [];
    let foreldre = [];
    if (Object.keys(this.props.relasjoner).length !== 0) {
      barn = this.lagListe(this.props.relasjoner.barn);
      foreldre = this.lagListe(this.props.relasjoner.foreldre);
    }

    return (
      <section className="ObjektType__Relasjoner">
        <h2>Relasjoner:</h2>
        <h3>Foreldre</h3>
        <ul>
        {foreldre}
        </ul>
        <h3>Barn</h3>
        <ul>
        {barn}
        </ul>

      </section>
    );
  }



};



export default ObjektTypeRelasjoner;
