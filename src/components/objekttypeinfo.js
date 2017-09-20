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
      <div className="ObjektTypeInfo">
        <h3>Generelt:</h3>
        <dl>
          <dt>Antall objekter i NVDB:</dt>
          <dd>
            <span className="ObjektTypeStatistikk">{this.state.statistikk.antall}</span>
            <a target="_blank" href={url}>Se forekomster i vegkart.</a>
          </dd>
          <dt>Beskrivelse:</dt><dd>{this.props.info.beskrivelse}</dd>
          <dt>Vegnettstilknytning:</dt><dd>{this.props.info.stedfesting}</dd>
          {this.props.info.veiledning && <div className="ObjektTypeVeiledning">
            <dt>Veiledning:</dt><dd>{this.props.info.veiledning}</dd>
          </div>}
        </dl>
      </div>
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
