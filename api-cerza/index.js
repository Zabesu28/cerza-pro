// Importation des prérequis (Express, cors et le fichier de connexion à la BDD).
const express = require("express");
const cors = require("cors");
const db = require("./connect_bdd.js");
const moment = require('moment');

// Déclaration des variables qui contiendront le serveur Express et le port du serveur.
const app = express();
const port = 4000;

// Lancement du serveur Express sur le port précédement saisi
app.listen(port, () => {
  console.log("L'API 'Cerza' est maintenant lancée sur le port " + port + " !");
  console.log(
    "Pour y accéder, veuillez saisir l'url : http://localhost:" + port + "/"
  );
});

// Configuration du serveur Express :
//      - Cors : Permet d'éviter les problèmes de Cors Policy sur certaines requêtes HTTP
//      - Choix de l'encodage des réponces de l'API, ici en JSON.
//      - Choix de l'encodage de l'URL.

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connection à la BDD
db.connect(function (err) {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL !");
});

// Routes
// - GET :

app.get("/ListAlerte", (req, res) => {
  let sql = "SELECT idAlerte, descriptionAlerte, active, dateAlerte, idEmployeAlerte, idNiveauAlerte FROM alerte ORDER by idAlerte";
  db.query(sql,(err, results) =>{
      if(err) {throw err}
      console.log(results);
      res.json({results});    
  })
});

app.get('/ListAlerte/:id', (req, res) => {

  const id = parseInt(req.params.id) // prend l'id dans la route
  let sql = "SELECT idAlerte, descriptionAlerte, active, dateAlerte, idEmployeAlerte, idNiveauAlerte, nomEmploye, prenomEmploye, libelleNiveau FROM alerte INNER JOIN Employes ON idEmployeAlerte = idEmploye INNER JOIN Niveau ON idNiveauAlerte = idNiveau WHERE idAlerte ="+id
  db.query(sql,(err, results) =>{
      if(err) {throw err}
      console.log(results);
      res.json({results});
  })
});

app.get("/ListAlerteUser", (req, res) => {
  let sql = "SELECT idAlerte, descriptionAlerte, active, dateAlerte, idEmployeAlerte, nomEmploye, prenomEmploye, idNiveauAlerte, libelleNiveau FROM alerte INNER JOIN Employes ON idEmployeAlerte = idEmploye INNER JOIN Niveau ON idNiveauAlerte = idNiveau ORDER by active, idAlerte ASC";
  db.query(sql,(err, results) =>{
      if(err) {throw err}
      console.log(results);
      res.json({results});    
  })
});

app.get("/ListEmployesCB", (req, res) => {
  let sql = "SELECT idEmploye, nomEmploye, prenomEmploye FROM employes";
  db.query(sql,(err, results) =>{
      if(err) {throw err}
      console.log(results);
      res.json({results});    
  })
});

app.get("/ListEmployesCBModif/:id", (req, res) => {
  const id = parseInt(req.params.id) // prend l'id dans la route
  let sql = "SELECT idEmploye, nomEmploye, prenomEmploye FROM employes WHERE idEmploye NOT IN(SELECT idEmploye FROM employes WHERE idEmploye ="+id+")";
  db.query(sql,(err, results) =>{
      if(err) {throw err}
      console.log(results);
      res.json({results});    
  })
});

app.get("/ListNiveauCBModif/:id", (req, res) => {
  const id = parseInt(req.params.id) // prend l'id dans la route
  let sql = "SELECT idNiveau, libelleNiveau FROM niveau WHERE idNiveau NOT IN(SELECT idNiveau FROM niveau WHERE idNiveau ="+id+")";
  db.query(sql,(err, results) =>{
      if(err) {throw err}
      console.log(results);
      res.json({results});    
  })
});

app.get("/ListNiveau", (req, res) => {
  let sql = "SELECT idNiveau, libelleNiveau FROM niveau";
  db.query(sql,(err, results) =>{
      if(err) {throw err}
      console.log(results);
      res.json({results});    
  })
});

// - POST :

app.post("/AddAlerte", (req, res) => {
  const descriptionAlerte =  req.body.descriptionAlerte;
  const active =  0;
  const dateAlerte = moment(Date()).format('YYYY-MM-DD HH:mm:ss');
  const idEmployeAlerte = req.body.idEmploye;
  const idNiveauAlerte = req.body.idNiveau;
  let sql = "INSERT INTO alerte (descriptionAlerte, active, idEmployeAlerte, idNiveauAlerte, dateAlerte) VALUES ('" + descriptionAlerte + "','" + active + "','" + idEmployeAlerte + "','" + idNiveauAlerte + "','" + dateAlerte + "')"
  db.query(sql,(err, results) =>{
      if(err) {throw err}
      console.log(results);
  })
})

// - PUT :

app.put("/ModifAlerte/:id", (req, res) => {
  res.send(req.body);
  const id = parseInt(req.params.id)
  const descriptionAlerte =  req.body.descriptionAlerte;
  const idEmployeAlerte = parseInt(req.body.idEmployeAlerte);
  const idNiveauAlerte = parseInt(req.body.idNiveauAlerte);
  let sql = "UPDATE alerte SET descriptionAlerte ='"+descriptionAlerte+"', idEmployeAlerte ="+idEmployeAlerte+", idNiveauAlerte="+idNiveauAlerte+" WHERE idAlerte ="+id 
  db.query(sql,(err, results) =>{
      if(err) {throw err}
      console.log(results);
      
  })
})

app.put("/ModifAlerteCheckbox/:id", (req, res) => {
  res.send(req.body);
  const id = parseInt(req.params.id)
  const check = parseInt(req.body.active);
  console.log(req.body)
  let sql = "UPDATE alerte SET active ="+check+" WHERE idAlerte = "+id 
  db.query(sql,(err, results) =>{
      if(err) {throw err}
      console.log(results);
      
  })
})

// - DELETE :

app.delete("/DeleteAlerte/:id", (req, res) => {
  const id = parseInt(req.params.id)
  let sql = "DELETE FROM alerte WHERE idAlerte = "+id
  db.query(sql,(err, results) =>{
      if(err) {throw err}
      console.log(results);
  })
})
