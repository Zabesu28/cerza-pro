import React, { Component, useEffect, useState } from 'react';

class AddAlerte extends Component {
  

    state = {
        alerte: [],
        employe: [],
        niveau: []
      }

      
      componentDidMount(){
        fetch('http://localhost:4000/ListEmployesCB')
        .then((response) => {
          return response.json()
        })
        .then((result) => {
          setTimeout(() => {     
            this.setState({employe: result.results})
            console.log(this.state.employe);
          }, 1500) 
          console.log(result.results.length);
        })

        fetch('http://localhost:4000/ListNiveau')
    .then((response) => {
      return response.json()
    })
    .then((result) => {
      setTimeout(() => {     
        this.setState({niveau: result.results})
        console.log(this.state.niveau);
      }, 1500) 
      console.log(result.results.length);
    })

      }

  render() {
  return (

     <form method="POST" action="http://localhost:4000/AddAlerte">
  <label>
    Description
    <input type="textarea" name="descriptionAlerte" />
  </label>
  <label>
    Employe:
    <select name="idEmploye"> 
  {(this.state.employe.map(unEmploye => <option value={unEmploye.idEmploye}>{unEmploye.nomEmploye}</option>))}
</select>

  </label>
  <label>
    Niveau:
    <select name="idNiveau"> 
    {(this.state.niveau.map(unNiveau => <option value={unNiveau.idNiveau}>{unNiveau.libelleNiveau}</option>))}
</select>
  </label>
  <input type="submit" value="Ajouter"/>
</form>

  ); 
}

}


export default AddAlerte;