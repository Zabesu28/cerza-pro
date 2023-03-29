import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';





const ModifAlerte = () => {
  // state variables
  const [descriptionAlerte, descriptionAlertechange] = useState('');
  const [idEmployeAlerte, idEmployechange] = useState(0);
  const [nomEmploye, nomEmployechange] = useState('');
  const [prenomEmploye, prenomEmployechange] = useState('');
  const [idNiveauAlerte, idNiveauchange] = useState(0);
  const [libelleNiveau, libelleNiveauchange] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const [employes, setEmployes] = useState([]);
  const [niveau, setNiveau] = useState([]);

    useEffect(() => {
     fetch('http://localhost:4000/ListAlerte/' + id).then((res) => {
          return res.json();
      }).then((res) => {
          console.log(res.results);
          descriptionAlertechange(res.results[0].descriptionAlerte);
          idEmployechange(res.results[0].idEmployeAlerte);
          nomEmployechange(res.results[0].nomEmploye);
          prenomEmployechange(res.results[0].prenomEmploye);
          idNiveauchange(res.results[0].idNiveauAlerte);
          libelleNiveauchange(res.results[0].libelleNiveau);
      }).catch((err) => {
          console.log(err.message);
      })

      fetch('http://localhost:4000/ListEmployesCBModif/'+idEmployeAlerte)
        .then((response) => {
          return response.json()
        })
        .then((result) => {    
            setEmployes(result.results)
            console.log(employes); 
          console.log(result.results);
          console.log(result.results.length);
        })

        fetch('http://localhost:4000/ListNiveauCBModif/'+idNiveauAlerte)
        .then((response) => {
          return response.json()
        })
        .then((result) => {   
            setNiveau(result.results)
            console.log(niveau);
          console.log(result.results);
          console.log(result.results.length);
        })
      }, 
    []
    );
    

  const handlesubmit = (e) => {
      e.preventDefault();
      const empobj = { descriptionAlerte, idEmployeAlerte, idNiveauAlerte };

    let isValid = true;

  if (descriptionAlerte == "") {
    isValid = false;  
    alert("La description de l'alerte est obligatoire");
  }

  if (idEmployeAlerte == "0") {
    isValid = false;
    alert("Vous devez sélectionner un employé");
  }

  if (idNiveauAlerte == "0") {
    isValid = false;
    alert("Vous devez sélectionner un niveau");
  }

  if (isValid) {
    // Envoyer la requête PUT
    axios.put('http://localhost:4000/ModifAlerte/' + id, empobj, {
        method: 'PUT',
        headers: {
          'content-Type': 'application/json'
        },
        body: JSON.stringify(empobj)
        
      })
    .then((response) => {
      console.log(response);
      alert("L'alerte a été modifié avec succès");
      // Réinitialiser les champs du formulaire
      e.target.reset();
      window.location.replace('http://localhost:3000/gestionAlerte')
    })
    .catch((error) => {
      console.log(error);
      alert("Une erreur s'est produite lors de la modification de l'alerte");
    });
  }
  console.log(empobj);
  }
  return (
    
    <form method="PUT" onSubmit={handlesubmit}>
    <label>
      Description
      <input type="textarea" name="descriptionAlerte" value={descriptionAlerte} onChange={e => descriptionAlertechange(e.target.value)}/>
    </label>
    <select name="idEmployeAlerte" onChange={e => {
      idEmployechange(e.target.value); 
      // nomEmployechange(e.target.value); 
      // prenomEmployechange(e.target.value);
      }}> 
  <option value={idEmployeAlerte} >{nomEmploye + " " + prenomEmploye +" (valeur de base)"}</option>
  {(employes/*.filter(unEmploye => unEmploye.idEmploye != idEmployeAlerte)*/.map(leEmploye => <option value={leEmploye.idEmploye}>{leEmploye.nomEmploye + " " + leEmploye.prenomEmploye}</option>))}
    </select>
    
    <select name="idNiveauAlerte" onChange={e => {
      idNiveauchange(e.target.value);
      // libelleNiveau(e.target.value);
    }}> 
  <option value={idNiveauAlerte}>{libelleNiveau +" (valeur de base)"}</option>
  {(niveau/*.filter(unNiveau => unNiveau.idNiveau != idNiveauAlerte)*/.map(unNiveau => <option value={unNiveau.idNiveau}>{unNiveau.libelleNiveau}</option>))}
    </select>
    <input type="submit" value="Modifier"/>
    <button><Link to="/gestionAlerte">Retour</Link></button>
  </form>
  );
};



export default ModifAlerte;