import React, { Component } from 'react';

class FlerVerdiAttributt extends Component {

  state={statistikk: {antall: "Laster..."}};

  //https://www.vegvesen.no/nvdb/api/v2/vegobjekter/{FTID}/statistikk?egenskap=%22{ETID}!=null%22

  render(){

    let verdi = this.props.verdi;
    return(
      <div className="FlerVerdiAttributt">
        <dt>
          {verdi.id} {verdi.navn} <span className="FlerVerdiAttributtVerdiStatistikk">{this.state.statistikk.antall}</span>
      </dt>
        {verdi.objektliste_dato &&
          <dd className="Objektlistedato">
            Objektlistedato: {verdi.objektliste_dato}
         </dd>}
         {verdi.beskrivelse &&
           <dd className="FlerVerdiAttributtBeskrivelse">{verdi.beskrivelse}</dd>
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
