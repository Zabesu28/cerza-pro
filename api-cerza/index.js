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

// Permet de récupérer les fonctions
app.get("/fonctions", (req, res) => {
  db.query(
    "SELECT idFonction, libelleFonction FROM fonctions",
    function (err, result) {
      if (err) throw err;
      res.json(result);
    }
  );
});

// Permet de récupérer une fonction spécifique via son id
app.get("/fonctions/:id", (req, res) => {
  const id = parseInt(req.params.id);

  db.query(
    "SELECT libelleFonction FROM fonctions WHERE idFonction = " + id,
    function (err, result) {
      if (err) throw err;
      res.json(result);
    }
  );
});

// Permet de récupérer toutes les missions
app.get("/missions", (req, res) => {
  db.query(
    "SELECT idMission, libelleMission FROM missions",
    function (err, result) {
      if (err) throw err;
      res.json(result);
    }
  );
});

// Permet de récupérer tous les enclos
app.get("/enclos", (req, res) => {
  db.query("SELECT code, descriptifEnclos FROM enclos", function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// Permet de récupérer la dernière mission ajoutée
app.get("/LastMissionIdAdd", (req, res) => {
  db.query(
    "SELECT MAX(idMission) AS idLastMission FROM missions",
    function (err, result) {
      if (err) throw err;
      res.json(result);
    }
  );
});

// Permet de récupérer tous les états possibles pour une mission
app.get("/etatsMission", (req, res) => {
  db.query("SELECT idEtat, libelleEtat FROM etats", function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// Permet de récupérer un état spécifique pour une mission
app.get("/etatsMission/:id", (req, res) => {
  const idEtat = parseInt(req.params.id);

  db.query(
    "SELECT idEtat, libelleEtat FROM etats WHERE idEtat = " + idEtat,
    function (err, result) {
      if (err) throw err;
      res.json(result);
    }
  );
});

// - POST :
// Permet de vérifier si une mission est attibuée, si c'est le cas, on retourne l'employé, la date d'atribution, le code de l'enclos, le commentaire, la date de validation et l'etat attribuer
app.post("/missions/:id/isAttribuer", (req, res) => {
  const idMission = parseInt(req.params.id);

  db.query(
    "SELECT COUNT(*) as nbMissionAttribuer FROM attribuer WHERE idMissionAttribuer = " +
      idMission,
    function (err, result) {
      if (err) throw err;
      if (result[0].nbMissionAttribuer == 0) {
        res.json({ isAttribuer: false });
      } else {
        db.query(
          "SELECT nomEmploye, prenomEmploye, dateAttribuer, codeEnclosAttribuer, commentaire, dateValidation, libelleEtat FROM attribuer INNER JOIN etats ON idEtatAttribuer = idEtat INNER JOIN employes ON idEmployeAttribuer = idEmploye WHERE idMissionAttribuer = " +
            idMission,
          function (err, result) {
            if (err) throw err;

            let dateValid = "";
            const dtAttrFormat = new Date(result[0].dateAttribuer);
            const options = {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            };

            if (result[0].dateValidation !== null) {
              const dtValidFormat = new Date(result[0].dateValidation);

              dateValid =
                dtValidFormat.toLocaleDateString("fr-FR", options) +
                " à " +
                dtValidFormat.toLocaleTimeString("fr-FR");
            }

            res.json({
              isAttribuer: true,
              data: [
                {
                  Employe: [
                    {
                      nomEmploye: result[0].nomEmploye,
                      prenomEmploye: result[0].prenomEmploye,
                    },
                  ],
                  dateAttribuer:
                    dtAttrFormat.toLocaleDateString("fr-FR", options) +
                    " à " +
                    dtAttrFormat.toLocaleTimeString("fr-FR"),
                  dateValidation: dateValid,
                  codeEnclos: result[0].codeEnclosAttribuer,
                  commentaire: result[0].commentaire,
                  etat: result[0].libelleEtat,
                },
              ],
            });
          }
        );
      }
    }
  );
});

// Permet de récupérer l'id d'une fonction via son libellé
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

// Permet de récupérer l'id (BDD) d'un utilisateur via son identifiant (login)
app.post("/getIdUtilByIdentifiant", (req, res) => {
  const data = {
    login: req.body.identifiant,
  };

  db.query(
    "SELECT idEmploye FROM employes WHERE login = '" + data.login + "'",
    function (err, result) {
      if (err) throw err;
      res.json(result);
    }
  );
});

// Permet de récupérer l'id (BDD) d'un utilisateur via son nom et son prénom
app.post("/getIdUtilByNomPrenom", (req, res) => {
  const data = {
    nomEmploye: req.body.nom,
    prenomEmploye: req.body.prenom,
  };

  db.query(
    "SELECT idEmploye FROM employes WHERE nomEmploye = '" +
      data.nomEmploye +
      "' AND prenomEmploye = '" +
      data.prenomEmploye +
      "'",
    function (err, result) {
      if (err) throw err;
      res.json(result);
    }
  );
});

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

// Permet d'ajouter une mission
app.post("/ajoutMission", (req, res) => {
  const data = {
    libelleMission: req.body.libMission,
  };

  const query = "insert into missions (libelleMission) values (?)";

  db.query(query, Object.values(data), (error) => {
    if (error) {
      res.json({ status: "failure", reason: error.code });
    } else {
      res.json({ satuts: "succes", data: data });
    }
  });
});

// Permet d'ajouter une mission attribuée
app.post("/ajoutMission/attribuer", (req, res) => {
  const data = {
    idEmployeAttribuer: req.body.idEmploye,
    idMissionAttribuer: req.body.idMission,
    codeEnclosAttribuer: req.body.codeEnclos,
  };

  const query =
    "insert into attribuer (idEmployeAttribuer, idMissionAttribuer, dateAttribuer, codeEnclosAttribuer, commentaire, dateValidation, idEtatAttribuer) values (?,?,CONCAT(CURDATE(), ' ', CURTIME()),?,'',NULL,(SELECT idEtat FROM etats WHERE libelleEtat = 'En cours'))";

  db.query(query, Object.values(data), (error) => {
    if (error) {
      res.json({ status: "failure", reason: error.code });
    } else {
      res.json({ satuts: "succes", data: data });
    }
  });
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

// Modifier une mission
app.put("/modifMission/:id", (req, res) => {
  const idModif = parseInt(req.params.id);

  const data = {
    libelleMission: req.body.libMission,
  };

  let cptUpdate = 0;

  if (typeof data.libelleMission !== "undefined" && data.libMission != "") {
    db.query(
      "UPDATE missions SET libelleMission = '" +
        data.libelleMission +
        "' WHERE idMission = " +
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

// Modifier une mission attribuée
app.put("/modifMission/attribuer/:id", (req, res) => {
  const idModif = parseInt(req.params.id);

  const data = {
    idEmployeAttribuer: req.body.idEmploye,
    codeEnclosAttribuer: req.body.codeEnclos,
  };

  let cptUpdate = 0;

  if (
    typeof data.idEmployeAttribuer !== "undefined" &&
    data.idEmployeAttribuer != ""
  ) {
    db.query(
      "UPDATE attribuer SET idEmployeAttribuer = '" +
        data.idEmployeAttribuer +
        "' WHERE idMissionAttribuer = " +
        idModif,
      function (err, result) {
        if (err) throw err;
      }
    );

    cptUpdate++;
  }

  if (
    typeof data.codeEnclosAttribuer !== "undefined" &&
    data.codeEnclosAttribuer != ""
  ) {
    db.query(
      "UPDATE attribuer SET codeEnclosAttribuer = '" +
        data.codeEnclosAttribuer +
        "' WHERE idMissionAttribuer = " +
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
    db.query(
      "UPDATE attribuer SET dateAttribuer = CONCAT(CURDATE(), ' ', CURTIME()), commentaire = '', dateValidation = NULL, idEtatAttribuer = (SELECT idEtat FROM etats WHERE libelleEtat = 'En cours') WHERE idMissionAttribuer = " +
        idModif,
      function (err, result) {
        if (err) throw err;
      }
    );

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

// Supprimer une mission
app.delete("/supprMission/:id", (req, res) => {
  const idSuppr = parseInt(req.params.id);

  db.query(
    "SELECT COUNT(*) AS nbMissionAttribuer FROM attribuer WHERE idMissionAttribuer = " +
      idSuppr,
    function (err, result) {
      if (err) throw err;

      if (result[0].nbMissionAttribuer !== 0) {
        db.query(
          "DELETE FROM attribuer WHERE idMissionAttribuer = " + idSuppr,
          function (err, result) {
            if (err) throw err;
          }
        );
      }
    }
  );

  db.query(
    "DELETE FROM missions WHERE idMission = " + idSuppr,
    function (err, result) {
      if (err) throw err;

      res.json(result);
    }
  );
});

// Supprimer une mission attribuée
app.delete("/supprMission/attribuer/:id", (req, res) => {
  const idSuppr = parseInt(req.params.id);

  db.query(
    "DELETE FROM attribuer WHERE idMissionAttribuer = " + idSuppr,
    function (err, result) {
      if (err) throw err;

      res.json(result);
    }
  );
});
