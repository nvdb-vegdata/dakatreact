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
      <div className="ObjektTypeRelasjoner">
        <h3>Relasjoner:</h3>
        <p><b>Foreldre</b></p>
        <ul>
        {foreldre}
        </ul>
        <p><b>Barn</b></p>
        <ul>
        {barn}
        </ul>

      </div>
    );
  }



};



export default ObjektTypeRelasjoner;
