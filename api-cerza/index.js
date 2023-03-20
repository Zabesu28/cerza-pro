// Importation des prérequis (Express, cors et le fichier de connexion à la BDD).
const express = require("express");
const cors = require("cors");
const db = require("./connect_bdd.js");

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

// - POST :

// - PUT :

// - DELETE :
