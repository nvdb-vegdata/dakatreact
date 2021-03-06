import React, { Component } from 'react';

class ObjektTypeInfo extends Component {

  //https://www.vegvesen.no/vegkart/vegkart/#kartlag:geodata/hva:(~(id:5,filter:(~),farge:'0_0))/hvor:(land:(~'Norge))/@600000,7210461,3

    vegkarturl = "https://www.vegvesen.no/vegkart/vegkart/#kartlag:geodata/";
    filter = "hva:(~(id:{0},filter:(~),farge:'0_0))/hvor:(land:(~'Norge))";
    posisjon = "/@600000,7210461,3";

  constructor(props) {
      super(props);
      this.state = {'statistikk': {'antall': "Henter ..."}};
    }

  render() {
    let vegkarturl = "https://www.vegvesen.no/vegkart/vegkart/#kartlag:geodata/";
    let filter = "hva:(~(id:"+this.props.info.ftid+",filter:(~),farge:'0_0))/hvor:(land:(~'Norge))";
    let posisjon = "/@600000,7210461,3";
    let url = vegkarturl + filter + posisjon;
    return (
      <section className="ObjektType__Definisjoner">
        <h2>Generelt:</h2>
        <dl className="ObjektType__Definisjoner ObjekttypeDefinisjon">
          <dt className="ObjekttypeDefinisjon-Tittel">Antall objekter i NVDB:</dt>
          <dd className="ObjekttypeDefinisjon__Antall-Statistikk">
            {this.state.statistikk.antall}
          </dd>
          <dd className="ObjekttypeDefinisjon-Verdi">
            <a target="_blank" href={url}>Se forekomster i vegkart.</a>
          </dd>
          <dt className="ObjekttypeDefinisjon-Tittel">Beskrivelse:</dt>
            <dd className="ObjekttypeDefinisjon-Verdi">{this.props.info.beskrivelse}</dd>
          <dt className="ObjekttypeDefinisjon-Tittel">Vegnettstilknytning:</dt>
            <dd className="ObjekttypeDefinisjon-Verdi">{this.props.info.stedfesting}</dd>
          {this.props.info.veiledning &&
            <div>
              <dt className="ObjekttypeDefinisjon-Tittel">Veiledning:</dt>
              <dd className="ObjekttypeDefinisjon-Verdi">{this.props.info.veiledning}</dd>
            </div>
          }
        </dl>
      </section>
    );
  }

  hentObjekttypeStatistikk(ftid) {
    var that = this;
    var url = 'https://www.vegvesen.no/nvdb/api/v2/vegobjekter/'+ftid+'/statistikk/';
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
      if ((!this.props.info.hasOwnProperty('ftid')) || (nextProps.info.ftid !== this.props.info.ftid)) {
        this.hentObjekttypeStatistikk(nextProps.info.ftid);
      }
    }

    componentDidMount() {
      if(this.props.info.hasOwnProperty('ftid'))
        this.hentObjekttypeStatistikk(this.props.info.ftid);
    }


};


export default ObjektTypeInfo;
