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
      <section className="EgenskapsListe__Egenskaper Egenskap">
        <dt className="Egenskap__Tittel">{e.id}</dt>
        <dt className="Egenskap__Tittel">{e.navn}</dt>
        {e.hasOwnProperty('viktighet') && <dt className="Egenskap__Tittel">{e.viktighet_tekst}</dt>}
        <dd className="Egenskap__Verdi-Statistikk">{this.state.statistikk.antall}</dd>
        <dd className="Egenskap__Verdi">{e.beskrivelse}</dd>
        {e.veiledning && <dd className="Egenskap__Verdi Egenskap__Verdi-Veiledning">{e.veiledning}</dd>}
        {e.objektliste_dato &&
          <dd className="Egenskap__Verdi">
            Objektlistedato: {e.objektliste_dato}
         </dd>}
         {e.sosinvdbnavn &&
           <dd className="Egenskap__Verdi">
             SOSI NVDB Navn: {e.sosinvdbnavn}
          </dd>}
        <dd className="Egenskap__Verdi Egenskap__Verdi-Datatype">
          {e.datatype_tekst}: {e.enhet && '('+e.enhet.navn+')'}
          {e.hasOwnProperty('min_anbefalt') && <span className="Egenskap__Verdi-Datatype Egenskap__Datatype-MinAnbefalt">, Min Anbefalt: {e.min_anbefalt}</span>}
          {e.hasOwnProperty('maks_anbefalt') && <span className="Egenskap__Verdi-Datatype Egenskap__Datatype-MaksAnbefalt">, Maks Anbefalt: {e.maks_anbefalt}</span>}
          {e.hasOwnProperty('min') && <span className="Egenskap__Verdi-Datatype Egenskap__Datatype-Min">, Min: {e.min}</span>}
          {e.hasOwnProperty('maks') && <span className="Egenskap__Verdi-Datatype Egenskap__Datatype-Maks">, Maks: {e.maks}</span>}
          {e.hasOwnProperty('feltlengde') && <span className="Egenskap__Verdi-Datatype Egenskap__Datatype-Feltlengde">, Feltlengde: {e.feltlengde}</span>}
          {e.hasOwnProperty('desimaler') && <span className="Egenskap__Verdi-Datatype Egenskap__Datatype-Desimaler">, Desimaler: {e.desimaler}</span>}
        </dd>
        {listItems &&
          <section className="FlerverdiAttributtListe">
            <dl>
              {listItems}
            </dl>
          </section>
        }
      </section>
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
