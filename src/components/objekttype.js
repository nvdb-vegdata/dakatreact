import React, { Component } from 'react';
import ObjektTypeInfo from './objekttypeinfo.js';
import EgenskapsListe from './egenskapsliste.js';
import ObjektTypeRelasjoner from './relasjoner.js';
import StyringsParametre from './styringsparametre.js';

class ObjektType extends Component {

  state = {};


  render() {
    let header="";
    let info={};
    let relasjoner = {};
    let styringsparametre = {};
    if (this.state.objekttypedef) {
      let ft = this.state.objekttypedef;
      header = ft.navn + ' ('+ft.id+')';
      info = {
        ftid: ft.id,
        beskrivelse: ft.beskrivelse,
        stedfesting: ft.stedfesting,
        veiledning: ft.veiledning
      };
      relasjoner = ft.relasjonstyper;
      styringsparametre = ft.styringsparametere;
    }

    return (
      <div>
          {this.state.objekttypedef &&
            <article className="ObjektType">
              <h1 className="ObjektType__Overskrift">{header}</h1>
              <ObjektTypeInfo info={info}/>
              <EgenskapsListe ftid={this.state.objekttypedef.id} egenskaper={this.state.objekttypedef.egenskapstyper}/>
              <ObjektTypeRelasjoner relasjoner={relasjoner}/>
              <StyringsParametre sparams={styringsparametre}/>
            </article>
          }
    </div>
    );
  }

  hentObjekttypeDef(ftid) {
    var that = this;
    var url = 'https://www.vegvesen.no/nvdb/api/v2/vegobjekttyper/'+ftid;
    fetch(url)
      .then(function(response){
        return response.json();
      })
      .then(function(jsonResponse){
        that.setState({objekttypedef : jsonResponse, 'loaded': true});
      })
      .catch((error) => {
        console.error(error);
      });
  }



  componentWillReceiveProps(nextProps) {
    if (nextProps.ftid !== this.props.ftid){
      this.hentObjekttypeDef(nextProps.ftid);
    }
  }

  componentDidMount() {
    this.hentObjekttypeDef(this.props.ftid);
  }
};


export default ObjektType;
