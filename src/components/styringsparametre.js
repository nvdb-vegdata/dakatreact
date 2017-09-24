import React, { Component } from 'react';

class StyringsParametre extends Component {

  constructor(props) {
      super(props);
      this.state = {};
    }

  render() {
    const listItems = Object.keys(this.props.sparams).map((k) => {
        let verdi = this.props.sparams[k];
        if (verdi === true) verdi="Ja";
        if (verdi === false) verdi="Nei";
        return <div><dt className="StyringsParameter__Tittel" key={k}>{k}</dt><dl className="StyringsParameter__Verdi">{verdi}</dl></div>;
      })
    return (
      <section className="ObjektType__Styringsparametre">
        <h2>StyringsParametre:</h2>
        <dl>
          {listItems}
        </dl>
      </section>
    );
  }

};


export default StyringsParametre;
