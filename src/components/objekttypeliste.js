import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ObjektType from './objekttype.js'

class ObjektTypeListe extends Component {

  constructor(props) {
      super(props);
      this.state = {
        objekttypeliste: [],
      };
    }

  render() {
    const listItems = this.state.objekttypeliste.map((d) => {
        let filter = new RegExp(this.state.soktekst, 'gi');
        let objekttypenavn = d.navn;
        let url = '/dakatr/'+d.id;
        return <li key={d.id}><Link  to={url}>{d.id}: {d.navn}</Link></li>;
      })

      let dill = "Velg objekttype"
      if (this.props.match.params.ftid) {
         dill = "";
      }

    return (
      <div className="ApplikasjonsOmrade">
      <div className="ObjektTypeListe">
      <h1>{dill}</h1>
        <ul>
        {listItems }
        </ul>
      </div>

      {this.props.match.params.ftid &&
          <ObjektType ftid={this.props.match.params.ftid}/>
      }
      </div>
    );
  }

  componentDidMount() {
    var that = this;
    var url = 'https://www.vegvesen.no/nvdb/api/v2/vegobjekttyper/';
    fetch(url)
      .then(function(response){
        return response.json();
      })
      .then(function(jsonResponse){
        that.setState({objekttypeliste : jsonResponse});
      })
      .catch((error) => {
        console.error(error);
      });
  }
};


export default ObjektTypeListe;
