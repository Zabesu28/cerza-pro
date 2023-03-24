// Importation des prérequis (Express, crypto (pour le cryptages des mot de passe), cors et le fichier de connexion à la BDD).
const express = require("express");
const cors = require("cors");
const db = require("./connect_bdd.js");
const { createHash } = require("crypto");

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
// Permet de vérifier la connexion au site de cerza
app.post("/verifCnx", (req, res) => {
  const data = {
    login: req.body.identifiant,
    mdp: createHash("sha256").update(req.body.password).digest("hex"),
  };

  db.query(
    "SELECT COUNT(*) AS nb_compte_cnx_valide FROM employes WHERE login = '" +
      data.login +
      "' AND mdp ='" +
      data.mdp +
      "'",
    function (err, result) {
      if (err) throw err;

      if (result[0].nb_compte_cnx_valide == 0) {
        res.json({ cnx_valid: false });
      } else {
        db.query(
          "SELECT libelleFonction FROM employes INNER JOIN fonctions ON idFonctionEmploye = idFonction WHERE login = '" +
            data.login +
            "' AND mdp ='" +
            data.mdp +
            "' ORDER BY libelleFonction ASC",
          function (err, result) {
            if (err) throw err;

            res.json({
              cnx_valid: true,
              cnx_login: data.login,
              cnx_droit: result[0].libelleFonction,
            });
          }
        );
      }
    }
  );
});

// Inscrire un utilisateur
app.post("/inscrUtil", (req, res) => {
  const data = {
    nomEmploye: req.body.nom,
    prenomEmploye: req.body.prenom,
    login: req.body.identifiant,
    mdp: createHash("sha256").update(req.body.password).digest("hex"),
    idFonctionEmploye: req.body.fonction,
  };

  const query =
    "insert into employes (nomEmploye,prenomEmploye,login,mdp,idFonctionEmploye) values (?,?,?,?,?)";

  db.query(query, Object.values(data), (error) => {
    if (error) {
      res.json({ status: "failure", reason: error.code });
    } else {
      res.json({ satuts: "succes", data: data });
    }
  });
});

// Verifier si un utilisateur existe en regardant par son nom ET son prénom OU par son identifiant
app.post("/verifUtilExist", (req, res) => {
  const data = {
    nomEmploye: req.body.nom,
    prenomEmploye: req.body.prenom,
    login: req.body.identifiant,
  };

  if (data.nomEmploye != "" && data.prenomEmploye != "" && data.login == "") {
    res.json({ cas: "1" });
  } else if (
    data.nomEmploye == "" &&
    data.prenomEmploye == "" &&
    data.login != ""
  ) {
    res.json({ cas: "2" });
  } else if (
    data.nomEmploye != "" &&
    data.prenomEmploye != "" &&
    data.login != ""
  ) {
    res.json({ cas: "3" });
  } else {
    res.json({ error: "zebi" });
  }
  console.log(data);
});

// - PUT :

// - DELETE :
