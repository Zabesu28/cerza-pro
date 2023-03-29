import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AddAlerte = () => {
  
  const [employe, setEmploye] = useState([]);
  const [niveau, setNiveau] = useState([]);
      

  const handlesubmit = (e) => {
    e.preventDefault();
    const descriptionAlerte = e.target.elements.descriptionAlerte.value
    const idEmploye = e.target.elements.idEmploye.value
    const idNiveau = e.target.elements.idNiveau.value
    let isValid = true;

  if (descriptionAlerte == "") {
    isValid = false;
    alert("La description de l'alerte est obligatoire");
  }

  if (idEmploye == "0") {
    isValid = false;
    alert("Vous devez sélectionner un employé");
  }

  if (idNiveau == "0") {
    isValid = false;
    alert("Vous devez sélectionner un niveau");
  }

  if (isValid) {
    // Envoyer la requête POST
    axios.post('http://localhost:4000/AddAlerte/', {
      descriptionAlerte,
      idEmploye,
      idNiveau
    })
    .then((response) => {
      console.log(response);
      alert("L'alerte a été ajoutée avec succès");
      // Réinitialiser les champs du formulaire
      e.target.reset();
      window.location.replace('http://localhost:3000/gestionAlerte')
    })
    .catch((error) => {
      console.log(error);
      alert("Une erreur s'est produite lors de l'ajout de l'alerte");
    });
  }

}
      
      useEffect(() => {
        fetch('http://localhost:4000/ListEmployesCB')
        .then((response) => {
          return response.json()
        })
        .then((result) => {
          setTimeout(() => {     
            setEmploye(result.results)
            console.log(employe);
          }, 1500) 
          console.log(result.results.length);
        })

        fetch('http://localhost:4000/ListNiveau')
    .then((response) => {
      return response.json()
    })
    .then((result) => {
      setTimeout(() => {     
        setNiveau(result.results)
        console.log(niveau);
      }, 1500) 
      console.log(result.results.length);
    })
  }, 
  []
  );

  return (

     <form method="POST" onSubmit={handlesubmit}>
  <label>
    Description
    <input type="textarea" name="descriptionAlerte" />
  </label>
  <label>
    Employe:
    <select name="idEmploye">
  {employe.length === 0 ? (
    <option value="0">Chargement...</option>
  ) : (
    <>
      <option value="0">Sélectionner une valeur</option>
      {employe.map((unEmploye) => (
        <option value={unEmploye.idEmploye}>{unEmploye.nomEmploye} {unEmploye.prenomEmploye}</option>
      ))}
    </>
  )}
</select>


  </label>
  <label>
    Niveau:
    <select name="idNiveau">
  {niveau.length === 0 ? (
    <option value="0">Chargement...</option>
  ) : (
    <>
      <option value="0">Sélectionner une valeur</option>
      {(niveau.map(unNiveau => <option value={unNiveau.idNiveau}>{unNiveau.libelleNiveau}</option>))}
    </>
  )}
</select>
 
  </label>
  <input type="submit" value="Ajouter"/>
  <button><Link to="/gestionAlerte">Retour</Link></button>
</form>

  ); 
}


export default AddAlerte;