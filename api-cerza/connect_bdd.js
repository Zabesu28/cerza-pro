// Importation des prérequis (MySQL2 et dotenv, ce dernier permettra de récupérer la configuration de la BDD)
const mysql = require("mysql2");
require("dotenv").config();

// Variable qui contiendra la connexion à la BDD
const connection = mysql.createConnection(
  JSON.parse(process.env.MYSQL_DATABASE_CONFIG)
);

// Exportation de la variable contenant la conexion à la BDD pour pouvoir la récupérer dans un autre fichier JS
module.exports = connection;
