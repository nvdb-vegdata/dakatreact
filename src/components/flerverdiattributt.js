import React, { Component } from 'react';
import { isWebUri } from 'valid-url';

class FlerVerdiAttributt extends Component {

  state={statistikk: {antall: "Laster..."}};

  //https://www.vegvesen.no/nvdb/api/v2/vegobjekter/{FTID}/statistikk?egenskap=%22{ETID}!=null%22

  render(){

    let verdi = this.props.verdi;
    let verdinavn = verdi.navn;
    let verdibeskrivelse = "";
    if (verdi.beskrivelse) {
      if (isWebUri(verdi.beskrivelse)) {
        verdinavn=<a target="_blank" href={verdi.beskrivelse}>{verdi.navn}</a>;
      } else {
        verdibeskrivelse = verdi.beskrivelse;
      }
    }
    return(
      <div>
        <dt className="Egenskap__Verdiliste-Tittel">
          {verdi.id}
        </dt>
        <dd className="Egenskap__Verdiliste-Verdi">{verdinavn}</dd>
          <dd className="Egenskap__Verdiliste-Verdi-Statistikk">{this.state.statistikk.antall}</dd>
          {verdi.objektliste_dato && <dd className="Egenskap__Verdiliste-Verdi"> Objektlistedato: {verdi.objektliste_dato}</dd>}
         {verdibeskrivelse &&
           <dd className="Egenskap__Verdiliste-Verdi Beskrivelse">{verdibeskrivelse}</dd>
         }
       </div>
    );
  }



  hentAttributtverdiStatistikk(ftid, etid, etval) {
    var that = this;
    var url = 'https://www.vegvesen.no/nvdb/api/v2/vegobjekter/'+ftid+'/statistikk?egenskap="'+etid+'='+etval+'"';
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
      this.hentAttributtverdiStatistikk(nextProps.ftid, nextProps.etid, nextProps.verdi.id);
    }
  }

  componentDidMount() {
      this.hentAttributtverdiStatistikk(this.props.ftid, this.props.etid, this.props.verdi.id);
  }

};

export default FlerVerdiAttributt;
