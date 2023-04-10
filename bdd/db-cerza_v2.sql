-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 24 mars 2023 à 13:39
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
  `descriptionAlerte` text NOT NULL,
  `active` tinyint(1) NOT NULL,
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
  `codeEnclosAnimal` varchar(10) NOT NULL,
  PRIMARY KEY (`idAnimal`),
  KEY `fk1` (`idEspeceAnimal`),
  KEY `fk2` (`codeEnclosAnimal`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `animaux`
--

INSERT INTO `animaux` (`idAnimal`, `nomAnimal`, `dateNaissAnimal`, `sexeAnimal`, `idEspeceAnimal`, `codeEnclosAnimal`) VALUES
(1, 'Jessie', '2018-01-01', 0, 1, 'N1'),
(2, 'James', '2017-04-03', 1, 1, 'N1'),
(3, 'Rem', '2014-01-01', 0, 2, 'E1'),
(4, 'Ram', '2014-01-01', 0, 2, 'E1'),
(5, 'Subaru', '2015-10-08', 1, 2, 'E1'),
(6, 'Megumin', '2016-05-05', 0, 3, 'S1'),
(7, 'Darkness', '2013-04-04', 0, 3, 'S1'),
(8, 'Kazuma', '2014-06-06', 1, 3, 'S1'),
(9, 'Ichika', '2019-01-11', 0, 4, 'O1'),
(10, 'Nino', '2019-01-11', 0, 4, 'O1'),
(11, 'Itsuki', '2019-01-11', 0, 4, 'O1'),
(12, 'Miku', '2019-01-11', 0, 4, 'O1'),
(13, 'Yotsuba', '2019-01-11', 0, 4, 'O1'),
(14, 'Futaro', '2018-11-27', 1, 4, 'O1');

-- --------------------------------------------------------

--
-- Structure de la table `attribuer`
--

DROP TABLE IF EXISTS `attribuer`;
CREATE TABLE IF NOT EXISTS `attribuer` (
  `idEmployeAttribuer` int(11) NOT NULL,
  `idMissionAttribuer` int(11) NOT NULL,
  `dateAttribuer` datetime NOT NULL,
  `commentaire` text,
  `idEtatAttribuer` int(11) NOT NULL,
  PRIMARY KEY (`idEmployeAttribuer`,`idMissionAttribuer`,`dateAttribuer`),
  KEY `fk15` (`idMissionAttribuer`),
  KEY `fk42` (`idEtatAttribuer`)
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
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `employes`
--

INSERT INTO `employes` (`idEmploye`, `nomEmploye`, `prenomEmploye`, `login`, `mdp`, `idFonctionEmploye`) VALUES
(1, 'ZABETH', 'Romain', 'zabethr', 'pass', 1),
(2, 'NOLLE', 'Damien', 'nolled', 'pass', 4),
(3, 'FENEROL', 'Miguel', 'fenerolm', 'pass', 2),
(4, 'POQUET', 'Hugo', 'poqueth', 'pass', 3),
(5, 'MICHELET', 'Max', 'micheletm', 'pass', 3),
(6, 'SKWERES', 'Oliwer', 'skwereso', 'pass', 3);

-- --------------------------------------------------------

--
-- Structure de la table `enclos`
--

DROP TABLE IF EXISTS `enclos`;
CREATE TABLE IF NOT EXISTS `enclos` (
  `code` varchar(10) NOT NULL,
  `descriptifEnclos` text,
  PRIMARY KEY (`code`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `enclos`
--

INSERT INTO `enclos` (`code`, `descriptifEnclos`) VALUES
('N1', ''),
('N2', ''),
('E1', ''),
('E2', ''),
('S1', ''),
('S2', ''),
('O1', ''),
('O2', '');

-- --------------------------------------------------------

--
-- Structure de la table `especes`
--

DROP TABLE IF EXISTS `especes`;
CREATE TABLE IF NOT EXISTS `especes` (
  `idEspece` int(11) NOT NULL AUTO_INCREMENT,
  `libelleEspece` varchar(50) NOT NULL,
  `regime` varchar(50) NOT NULL,
  `poidsMin` float NOT NULL,
  `poidsMax` float NOT NULL,
  `description` text,
  `imageEspece` text,
  PRIMARY KEY (`idEspece`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `especes`
--

INSERT INTO `especes` (`idEspece`, `libelleEspece`, `regime`, `poidsMin`, `poidsMax`, `description`, `imageEspece`) VALUES
(1, 'Le Tatou', 'Fruits, herbe et insectes', 5, 5, NULL, 'https://img.20mn.fr/VJg36V4ZSN-D8rQXfIlL4A/1200x768_photo-non-datee-tatu-bola-tatou-boule-mammifere-voie-disparition'),
(2, 'L\'Axolotl', 'Crustacés', 0.06, 0.11, NULL, 'https://i.f1g.fr/media/cms/3000x2001_crop/2022/09/29/6b1c9952afaa2619b915b2bc74d1f0155e819b577588dd9dd7c4d8824c279c87.jpg'),
(3, 'L\'Emeu d\'Australie', 'Omnivore', 30, 55, NULL, 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Emu_1_-_Tidbinbilla.jpg/290px-Emu_1_-_Tidbinbilla.jpg'),
(4, 'Le roulroul coronné', 'Fruits, insectes et vers', 0.25, 0.25, NULL, 'https://www.tropiquarium.ch/_wp/wp-content/uploads/2014/04/rouroul.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `etats`
--

DROP TABLE IF EXISTS `etats`;
CREATE TABLE IF NOT EXISTS `etats` (
  `idEtat` int(11) NOT NULL AUTO_INCREMENT,
  `libelleEtat` varchar(100) NOT NULL,
  PRIMARY KEY (`idEtat`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `etats`
--

INSERT INTO `etats` (`idEtat`, `libelleEtat`) VALUES
(1, 'En cours'),
(2, 'Validée');

-- --------------------------------------------------------

--
-- Structure de la table `fonctions`
--

DROP TABLE IF EXISTS `fonctions`;
CREATE TABLE IF NOT EXISTS `fonctions` (
  `idFonction` int(11) NOT NULL AUTO_INCREMENT,
  `libelleFonction` varchar(100) NOT NULL,
  PRIMARY KEY (`idFonction`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `fonctions`
--

INSERT INTO `fonctions` (`idFonction`, `libelleFonction`) VALUES
(1, 'Administrateur'),
(2, 'Vétérinaire'),
(3, 'Soigneur animalier'),
(4, 'Agent de sécurité');

-- --------------------------------------------------------

--
-- Structure de la table `images`
--

DROP TABLE IF EXISTS `images`;
CREATE TABLE IF NOT EXISTS `images` (
  `idImage` int(11) NOT NULL AUTO_INCREMENT,
  `lienImage` text NOT NULL,
  `idEspeceImage` int(11) NOT NULL,
  PRIMARY KEY (`idImage`),
  KEY `fk43` (`idEspeceImage`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `missions`
--

DROP TABLE IF EXISTS `missions`;
CREATE TABLE IF NOT EXISTS `missions` (
  `idMission` int(11) NOT NULL AUTO_INCREMENT,
  `libelleMission` varchar(100) NOT NULL,
  PRIMARY KEY (`idMission`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `missions`
--

INSERT INTO `missions` (`idMission`, `libelleMission`) VALUES
(1, 'Nettoyer l\'enclos'),
(2, 'Remplir les mangeoires'),
(3, 'Faire le diagnostic de santé');

-- --------------------------------------------------------

--
-- Structure de la table `niveau`
--

DROP TABLE IF EXISTS `niveau`;
CREATE TABLE IF NOT EXISTS `niveau` (
  `idNiveau` int(11) NOT NULL AUTO_INCREMENT,
  `libelleNiveau` varchar(100) NOT NULL,
  PRIMARY KEY (`idNiveau`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `niveau`
--

INSERT INTO `niveau` (`idNiveau`, `libelleNiveau`) VALUES
(1, 'Grave'),
(2, 'Très grave'),
(3, 'Très très grave'),
(4, 'Très très très grave');

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
  `idSoin` int(11) NOT NULL AUTO_INCREMENT,
  `libelleSoin` varchar(100) NOT NULL,
  PRIMARY KEY (`idSoin`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `soins`
--

INSERT INTO `soins` (`idSoin`, `libelleSoin`) VALUES
(1, 'Traitement de plaies'),
(2, 'Vaccination'),
(3, 'Nutrition');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
