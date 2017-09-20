import React, { Component } from 'react';
import FlerVerdiAttributt from './flerverdiattributt.js';

class Egenskap extends Component {

  state={statistikk: {antall: "Laster..."}};

  //https://www.vegvesen.no/nvdb/api/v2/vegobjekter/{FTID}/statistikk?egenskap=%22{ETID}!=null%22

  render(){

    let e = this.props.egenskap;
    let listItems = [];
    if (e.hasOwnProperty('tillatte_verdier')){
       listItems = e.tillatte_verdier.map((d) => <FlerVerdiAttributt  key={d.id} ftid={this.props.ftid} etid={e.id} verdi={d}/>);
       /* "standardverdi" : 0.0,
          "min_anbefalt" : 0.0,
          "maks_anbefalt" : 8.0,
          "min" : 0.0,
          "maks" : 99.99,
          "desimaler" : 2,
          "feltlengde" : 5
       */
    }

    return(
      <div className="Egenskap">
        <dt className="EgenskapsTittel">{e.id}: {e.navn} {e.viktighet > 0 && e.viktighet_tekst}</dt>
        <dd className="EgenskapsStatistikk">{this.state.statistikk.antall}</dd>
        <dd className="EgenskapsBeskrivelse">{e.beskrivelse}</dd>
        {e.veiledning && <dd className="EgenskapsVeiledning">{e.veiledning}</dd>}
        {e.objektliste_dato &&
          <dd className="ObjektListeDato">
            Objektlistedato: {e.objektliste_dato}
         </dd>}
         {e.sosinvdbnavn &&
           <dd className="SOSI-NVDB-Navn">
             SOSI NVDB Navn: {e.sosinvdbnavn}
          </dd>}
        <dd className="EgenskapsDatatype">
          {e.datatype_tekst} {e.enhet && '('+e.enhet.navn+')'}
          {e.min_anbefalt && <span className="MinAnbefalt">, Min Anbefalt: {e.min_anbefalt}</span>}
          {e.maks_anbefalt && <span className="MaksAnbefalt">, Maks Anbefalt: {e.maks_anbefalt}</span>}
          {e.min && <span className="Min">, Min: {e.min}</span>}
          {e.maks && <span className="Maks">, Maks: {e.maks}</span>}
          {e.feltlengde && <span className="Feltlengde">, Feltlengde: {e.feltlengde}</span>}
          {e.desimaler && <span className="Desimaler">, Desimaler: {e.desimaler}</span>}
        </dd>

        {listItems &&
          <div className="FlerverdiAttributtListe">
            {listItems}
          </div>
        }
      </div>
    );
  }

  hentEgenskapsStatistikk(ftid, etid) {
    var that = this;
    var url = 'https://www.vegvesen.no/nvdb/api/v2/vegobjekter/'+ftid+'/statistikk?egenskap="'+etid+'!=null"';
    fetch(url)
      .then(function(response){
        return response.json();
      })
      .then(function(jsonResponse){
        that.setState({statistikk : jsonResponse});
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentWillReceiveProps(nextProps) {
    if ((!this.props.hasOwnProperty('ftid')) || (nextProps.ftid !== this.props.ftid)) {
      this.hentEgenskapsStatistikk(nextProps.ftid, this.props.egenskap.id);
    }
  }

  componentDidMount() {
      this.hentEgenskapsStatistikk(this.props.ftid, this.props.egenskap.id);
  }

};

export default Egenskap;
