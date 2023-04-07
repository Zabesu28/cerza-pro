-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 17 mars 2023 à 16:07
-- Version du serveur : 5.7.36
-- Version de PHP : 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `db-cerza`
--

-- --------------------------------------------------------

--
-- Structure de la table `alerte`
--

DROP TABLE IF EXISTS `alerte`;
CREATE TABLE IF NOT EXISTS `alerte` (
  `idAlerte` int(11) NOT NULL AUTO_INCREMENT,
  `descriptionAlerte` int(11) NOT NULL,
  `active` int(11) NOT NULL,
  `dateAlerte` datetime NOT NULL,
  `idEmployeAlerte` int(11) NOT NULL,
  `idNiveauAlerte` int(11) NOT NULL,
  PRIMARY KEY (`idAlerte`),
  KEY `fk11` (`idEmployeAlerte`),
  KEY `fk13` (`idNiveauAlerte`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `animaux`
--

DROP TABLE IF EXISTS `animaux`;
CREATE TABLE IF NOT EXISTS `animaux` (
  `idAnimal` int(11) NOT NULL AUTO_INCREMENT,
  `nomAnimal` varchar(50) NOT NULL,
  `dateNaissAnimal` date NOT NULL,
  `sexeAnimal` tinyint(4) NOT NULL,
  `idEspeceAnimal` int(11) NOT NULL,
  `idEnclosAnimal` int(11) NOT NULL,
  PRIMARY KEY (`idAnimal`),
  KEY `fk1` (`idEspeceAnimal`),
  KEY `fk2` (`idEnclosAnimal`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `attribuer`
--

DROP TABLE IF EXISTS `attribuer`;
CREATE TABLE IF NOT EXISTS `attribuer` (
  `idEmployeAttribuer` int(11) NOT NULL,
  `idMissionAttribuer` int(11) NOT NULL,
  `dateAttribuer` datetime NOT NULL,
  PRIMARY KEY (`idEmployeAttribuer`,`idMissionAttribuer`,`dateAttribuer`),
  KEY `fk15` (`idMissionAttribuer`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `effectuer`
--

DROP TABLE IF EXISTS `effectuer`;
CREATE TABLE IF NOT EXISTS `effectuer` (
  `idEnclosEffectuer` int(11) NOT NULL,
  `idMissionEffectuer` int(11) NOT NULL,
  `dateEffectuer` datetime NOT NULL,
  PRIMARY KEY (`idEnclosEffectuer`,`idMissionEffectuer`,`dateEffectuer`),
  KEY `fk8` (`idMissionEffectuer`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `employes`
--

DROP TABLE IF EXISTS `employes`;
CREATE TABLE IF NOT EXISTS `employes` (
  `idEmploye` int(11) NOT NULL AUTO_INCREMENT,
  `nomEmploye` varchar(100) NOT NULL,
  `prenomEmploye` varchar(100) NOT NULL,
  `login` varchar(100) NOT NULL,
  `mdp` varchar(255) NOT NULL,
  `idFonctionEmploye` int(11) NOT NULL,
  PRIMARY KEY (`idEmploye`),
  KEY `fk9` (`idFonctionEmploye`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `enclos`
--

DROP TABLE IF EXISTS `enclos`;
CREATE TABLE IF NOT EXISTS `enclos` (
  `idEnclos` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(10) NOT NULL,
  PRIMARY KEY (`idEnclos`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `especes`
--

DROP TABLE IF EXISTS `especes`;
CREATE TABLE IF NOT EXISTS `especes` (
  `idEspece` int(11) NOT NULL AUTO_INCREMENT,
  `libelleEspece` varchar(50) NOT NULL,
  `regime` varchar(50) NOT NULL,
  `poids_min` int(11) NOT NULL,
  `poids_max` int(11) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`idEspece`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `etats`
--

DROP TABLE IF EXISTS `etats`;
CREATE TABLE IF NOT EXISTS `etats` (
  `idEtat` int(11) NOT NULL AUTO_INCREMENT,
  `libelleEtat` varchar(100) NOT NULL,
  PRIMARY KEY (`idEtat`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `fonctions`
--

DROP TABLE IF EXISTS `fonctions`;
CREATE TABLE IF NOT EXISTS `fonctions` (
  `idFonction` int(11) NOT NULL AUTO_INCREMENT,
  `libelleFonction` varchar(100) NOT NULL,
  PRIMARY KEY (`idFonction`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `missions`
--

DROP TABLE IF EXISTS `missions`;
CREATE TABLE IF NOT EXISTS `missions` (
  `idMission` int(11) NOT NULL AUTO_INCREMENT,
  `libelleMission` varchar(100) NOT NULL,
  `commentaire` text,
  `idEtatMission` int(11) NOT NULL,
  PRIMARY KEY (`idMission`),
  KEY `fk5` (`idEtatMission`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `niveau`
--

DROP TABLE IF EXISTS `niveau`;
CREATE TABLE IF NOT EXISTS `niveau` (
  `idNiveau` int(11) NOT NULL AUTO_INCREMENT,
  `libelleNiveau` varchar(100) NOT NULL,
  PRIMARY KEY (`idNiveau`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `soigner`
--

DROP TABLE IF EXISTS `soigner`;
CREATE TABLE IF NOT EXISTS `soigner` (
  `idAnimalSoigner` int(11) NOT NULL,
  `idSoinSoigner` int(11) NOT NULL,
  `dateSoigner` datetime NOT NULL,
  `traitement` text NOT NULL,
  `idEmployeSoigner` int(11) NOT NULL,
  PRIMARY KEY (`idAnimalSoigner`,`idSoinSoigner`,`dateSoigner`),
  KEY `fk4` (`idSoinSoigner`),
  KEY `fk15` (`idEmployeSoigner`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `soins`
--

DROP TABLE IF EXISTS `soins`;
CREATE TABLE IF NOT EXISTS `soins` (
  `idSoin` int(11) NOT NULL,
  `libelleSoin` varchar(100) NOT NULL,
  PRIMARY KEY (`idSoin`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
