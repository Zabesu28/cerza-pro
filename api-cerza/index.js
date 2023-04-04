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
app.get('/getLesQuestions', (req, res) => {
  db.query("select idQuestion, libelleQuestion from questionnaire",
  function (err, result) {
    if (err) throw err;
    res.status(200).json(result);
  })
})

app.get('/getEspecesLibelle', (req, res) => {
  db.query("select idEspece, libelleEspece from especes",
  function (err, result) {
        if (err) throw err;
        res.status(200).json(result);
  }) 
});

app.get('/getAnimaux/:idEspece', (req, res) => {
  const idEspece = parseInt(req.params.idEspece);
  db.query("select idAnimal, nomAnimal from animaux where idEspeceAnimal ="+idEspece,
  function (err, result) {
    if (err) throw err;
    res.status(200).json(result);
  })
});

app.get('/getAnimal/:id', (req, res) => {
  const id = parseInt(req.params.id);
  db.query("select idAnimal, nomAnimal, dateNaissAnimal, sexeAnimal, libelleEspece, codeEnclosAnimal from animaux inner join especes on idEspeceAnimal = idespece where idAnimal ="+id,
  function (err, result) {
    if (err) throw err;
    res.status(200).json(result);
  })
})

app.get('/getEspeces', (req, res) => {
  db.query("select idEspece, libelleEspece, description, imageEspece from especes",
  function (err, result) {
        if (err) throw err;
        res.status(200).json(result);
  }) 
});

app.get('/getEspeces/:id', (req, res) => {
  const id = parseInt(req.params.id);
  db.query("select libelleEspece, regime, poidsMin, poidsMax, description from especes where idEspece = "+id,
  function (err, result) {
    if (err) throw err;
    res.status(200).json(result);
  })
});

app.get('/getImages/:idEspece', (req, res) => {
  const idEspece = parseInt(req.params.idEspece);
  db.query("select idImage, lienImage from images where idEspeceImage = "+idEspece,
  function (err, result) {
    if (err) throw err;
    res.status(200).json(result);
  })
});


app.get('/getDernierQuestionnaire/:idAnimal', (req, res) => {
  const idAnimal = parseInt(req.params.idAnimal);
  db.query("select libelleQuestion, idQuestionRepondre, reponse, dateRepondre FROM repondre INNER JOIN questionnaire ON idQuestion = idQuestionRepondre WHERE idAnimalRepondre = "+idAnimal+" and dateRepondre = (SELECT MAX(dateRepondre) FROM repondre WHERE idAnimalRepondre = "+idAnimal+") ORDER BY idQuestionRepondre",
  function (err, result) {
    if (err) throw err;
    res.status(200).json(result);
  })
})

// - POST :
app.post('/insertReponses', (req, res) => {
  const data = {
    idAnimal: req.body.idAnimal,
    idQuestion: req.body.idQuestion,
    date: req.body.date,
    reponse: req.body.reponse,
  };
  db.query("Insert into repondre values('"+data.idAnimal+"', '"+data.idQuestion+"', '"+data.date+"','"+data.reponse+"')",
  function (err, result) {
    if (err) throw err;
    res.status(200).json(result);
  })
})
// - PUT :

// - DELETE :
