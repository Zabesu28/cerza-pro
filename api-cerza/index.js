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
// Permet de récupérer les comptes de tous les utilisateurs
app.get("/utilisateurs", (req, res) => {
  db.query(
    "SELECT idEmploye, nomEmploye, prenomEmploye, login, libelleFonction FROM employes INNER JOIN fonctions ON idFonctionEmploye = idFonction",
    function (err, result) {
      if (err) throw err;
      res.json(result);
    }
  );
});

// Permet de récupérer le compte d'un utilisateur spécifique
app.get("/utilisateurs/:id", (req, res) => {
  const id = parseInt(req.params.id);

  db.query(
    "SELECT idEmploye, nomEmploye, prenomEmploye, login, libelleFonction FROM employes INNER JOIN fonctions ON idFonctionEmploye = idFonction WHERE idEmploye = " +
      id,
    function (err, result) {
      if (err) throw err;
      res.json(result);
    }
  );
});

app.get("/fonctions", (req, res) => {
  db.query(
    "SELECT idFonction, libelleFonction FROM fonctions",
    function (err, result) {
      if (err) throw err;
      res.json(result);
    }
  );
});

// Permet de récupérer les fonctions

// - POST :
// Permet de vérifier la connexion au site de cerza
app.post("/getIdFonctionByLibelle", (req, res) => {
  const data = {
    libelleFonction: req.body.libFonction,
  };

  db.query(
    "SELECT idFonction FROM fonctions WHERE libelleFonction = '" +
      data.libelleFonction +
      "'",
    function (err, result) {
      if (err) throw err;
      res.json(result);
    }
  );
});

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

// Ajout d'un utilisateur
app.post("/ajoutUtil", (req, res) => {
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

// Verifier si un utilisateur existe en regardant par son nom ET son prénom OU par son identifiant OU par les trois en même temps
app.post("/verifUtilExist", (req, res) => {
  const data = {
    nomEmploye: req.body.nom,
    prenomEmploye: req.body.prenom,
    login: req.body.identifiant,
  };

  if (
    typeof data.nomEmploye != "undefined" &&
    typeof data.prenomEmploye != "undefined" &&
    typeof data.login != "undefined"
  ) {
    if (data.nomEmploye != "" && data.prenomEmploye != "" && data.login == "") {
      db.query(
        "SELECT COUNT(*) AS nb_compte_exist FROM employes WHERE nomEmploye = '" +
          data.nomEmploye +
          "' AND prenomEmploye ='" +
          data.prenomEmploye +
          "'",
        function (err, result) {
          if (err) throw err;

          if (result[0].nb_compte_exist == 0) {
            res.json({ isExist: false });
          } else {
            res.json({ isExist: true });
          }
        }
      );
    } else if (
      data.nomEmploye == "" &&
      data.prenomEmploye == "" &&
      data.login != ""
    ) {
      db.query(
        "SELECT COUNT(*) AS nb_compte_exist FROM employes WHERE login = '" +
          data.login +
          "'",
        function (err, result) {
          if (err) throw err;

          if (result[0].nb_compte_exist == 0) {
            res.json({ isExist: false });
          } else {
            res.json({ isExist: true });
          }
        }
      );
    } else if (
      data.nomEmploye != "" &&
      data.prenomEmploye != "" &&
      data.login != ""
    ) {
      db.query(
        "SELECT COUNT(*) AS nb_compte_exist FROM employes WHERE nomEmploye = '" +
          data.nomEmploye +
          "' AND prenomEmploye ='" +
          data.prenomEmploye +
          "' AND login = '" +
          data.login +
          "'",
        function (err, result) {
          if (err) throw err;

          if (result[0].nb_compte_exist == 0) {
            res.json({ isExist: false });
          } else {
            res.json({ isExist: true });
          }
        }
      );
    } else {
      res.status(400).json({
        error:
          "Veuillez saisir soit le prénom ET le nom, soit l'identifiant uniquement ou soit les trois en même temps !",
      });
    }
  } else {
    res.status(400).json({
      error:
        "Veuillez saisir le body complet de la requête HTTP ('nom', 'prenom' et 'identifiant') !",
    });
  }
});

// - PUT :
// Modifier les informations d'un utilisateur
app.put("/modifUtil/:id", (req, res) => {
  const idModif = parseInt(req.params.id);

  const data = {
    nomEmploye: req.body.nom,
    prenomEmploye: req.body.prenom,
    login: req.body.identifiant,
    mdp: req.body.password,
    idFonctionEmploye: req.body.fonction,
  };

  let cptUpdate = 0;

  if (typeof data.nomEmploye !== "undefined" && data.nomEmploye != "") {
    db.query(
      "UPDATE employes SET nomEmploye = '" +
        data.nomEmploye +
        "' WHERE idEmploye = " +
        idModif,
      function (err, result) {
        if (err) throw err;
      }
    );

    cptUpdate++;
  }

  if (typeof data.prenomEmploye !== "undefined" && data.prenomEmploye != "") {
    db.query(
      "UPDATE employes SET prenomEmploye = '" +
        data.prenomEmploye +
        "' WHERE idEmploye = " +
        idModif,
      function (err, result) {
        if (err) throw err;
      }
    );

    cptUpdate++;
  }

  if (typeof data.login !== "undefined" && data.login != "") {
    db.query(
      "UPDATE employes SET login = '" +
        data.login +
        "' WHERE idEmploye = " +
        idModif,
      function (err, result) {
        if (err) throw err;
      }
    );

    cptUpdate++;
  }

  if (typeof data.mdp !== "undefined" && data.mdp != "") {
    db.query(
      "UPDATE employes SET mdp = '" +
        createHash("sha256").update(data.mdp).digest("hex") +
        "' WHERE idEmploye = " +
        idModif,
      function (err, result) {
        if (err) throw err;
      }
    );

    cptUpdate++;
  }

  if (
    typeof data.idFonctionEmploye !== "undefined" &&
    data.idFonctionEmploye != ""
  ) {
    db.query(
      "UPDATE employes SET idFonctionEmploye = '" +
        data.idFonctionEmploye +
        "' WHERE idEmploye = " +
        idModif,
      function (err, result) {
        if (err) throw err;
      }
    );

    cptUpdate++;
  }

  if (cptUpdate == 0) {
    res.status(400).json({
      status: "failure",
      reason:
        "Aucune modification n'a été réalisée, veuillez saisir au moins un élément pour réaliser une modification !",
    });
  } else {
    res.json({
      status: "succes",
      nb_update: cptUpdate,
    });
  }
});

// - DELETE :
// Supprimer un utilisateur
app.delete("/supprUtil/:id", (req, res) => {
  const idSuppr = parseInt(req.params.id);

  db.query(
    "DELETE FROM employes WHERE idEmploye = " + idSuppr,
    function (err, result) {
      if (err) throw err;

      res.json(result);
    }
  );
});
