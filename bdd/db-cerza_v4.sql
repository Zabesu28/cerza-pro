-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 11 avr. 2023 à 11:03
-- Version du serveur : 8.0.27
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
  `idAlerte` int NOT NULL AUTO_INCREMENT,
  `descriptionAlerte` text NOT NULL,
  `active` tinyint(1) NOT NULL,
  `dateAlerte` datetime NOT NULL,
  `idEmployeAlerte` int NOT NULL,
  `idNiveauAlerte` int NOT NULL,
  PRIMARY KEY (`idAlerte`),
  KEY `fk11` (`idEmployeAlerte`),
  KEY `fk13` (`idNiveauAlerte`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `alerte`
--

INSERT INTO `alerte` (`idAlerte`, `descriptionAlerte`, `active`, `dateAlerte`, `idEmployeAlerte`, `idNiveauAlerte`) VALUES
(1, 'FFFfrdd', 0, '2023-04-11 10:38:45', 1, 2),
(3, 'Marche stp', 1, '2023-04-11 12:49:56', 1, 3);

-- --------------------------------------------------------

--
-- Structure de la table `animaux`
--

DROP TABLE IF EXISTS `animaux`;
CREATE TABLE IF NOT EXISTS `animaux` (
  `idAnimal` int NOT NULL AUTO_INCREMENT,
  `nomAnimal` varchar(50) NOT NULL,
  `dateNaissAnimal` date NOT NULL,
  `sexeAnimal` tinyint NOT NULL,
  `idEspeceAnimal` int NOT NULL,
  `codeEnclosAnimal` varchar(10) NOT NULL,
  PRIMARY KEY (`idAnimal`),
  KEY `fk1` (`idEspeceAnimal`),
  KEY `fk2` (`codeEnclosAnimal`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;

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
(17, 'Tanjiro', '2017-11-17', 1, 6, 'E2'),
(10, 'Nino', '2019-01-11', 0, 4, 'O1'),
(16, 'Roxy', '2018-07-21', 0, 5, 'N2'),
(12, 'Miku', '2019-01-11', 0, 4, 'O1'),
(15, 'Rudeus', '2020-07-21', 1, 5, 'N2'),
(14, 'Futaro', '2018-11-27', 1, 4, 'O1'),
(18, 'Kanao', '2017-11-18', 0, 6, 'E2');

-- --------------------------------------------------------

--
-- Structure de la table `attribuer`
--

DROP TABLE IF EXISTS `attribuer`;
CREATE TABLE IF NOT EXISTS `attribuer` (
  `idEmployeAttribuer` int NOT NULL,
  `idMissionAttribuer` int NOT NULL,
  `dateAttribuer` datetime NOT NULL,
  `codeEnclosAttribuer` varchar(10) NOT NULL,
  `commentaire` text,
  `dateValidation` datetime DEFAULT NULL,
  `idEtatAttribuer` int NOT NULL,
  PRIMARY KEY (`idEmployeAttribuer`,`idMissionAttribuer`,`dateAttribuer`,`codeEnclosAttribuer`),
  KEY `fk15` (`idMissionAttribuer`),
  KEY `fk42` (`idEtatAttribuer`),
  KEY `fk100` (`codeEnclosAttribuer`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `attribuer`
--

INSERT INTO `attribuer` (`idEmployeAttribuer`, `idMissionAttribuer`, `dateAttribuer`, `codeEnclosAttribuer`, `commentaire`, `dateValidation`, `idEtatAttribuer`) VALUES
(2, 1, '2023-04-11 10:53:20', 'D4F', 'FFF', '2023-04-11 12:53:56', 2);

-- --------------------------------------------------------

--
-- Structure de la table `effectuer`
--

DROP TABLE IF EXISTS `effectuer`;
CREATE TABLE IF NOT EXISTS `effectuer` (
  `idEnclosEffectuer` int NOT NULL,
  `idMissionEffectuer` int NOT NULL,
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
  `idEmploye` int NOT NULL AUTO_INCREMENT,
  `nomEmploye` varchar(100) NOT NULL,
  `prenomEmploye` varchar(100) NOT NULL,
  `login` varchar(100) NOT NULL,
  `mdp` varchar(255) NOT NULL,
  `idFonctionEmploye` int NOT NULL,
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
  `idEspece` int NOT NULL AUTO_INCREMENT,
  `libelleEspece` varchar(50) NOT NULL,
  `regime` varchar(50) NOT NULL,
  `poidsMin` float NOT NULL,
  `poidsMax` float NOT NULL,
  `description` text,
  `imageEspece` text,
  PRIMARY KEY (`idEspece`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `especes`
--

INSERT INTO `especes` (`idEspece`, `libelleEspece`, `regime`, `poidsMin`, `poidsMax`, `description`, `imageEspece`) VALUES
(1, 'Le Tatou', 'Fruits, herbe et insectes', 5, 5, 'Tout droit sorti de la Préhistoire, le Tatou à six bandes se reconnaît aisément grâce aux écailles dermiques très dures qui le recouvrent. Ces dernières lui permettent de protéger la totalité de son corps. Il lui suffit de s’enrouler sur lui même à la manière du hérisson lorsqu‘il se sent menacé.\n\nLe Tatou à six bandes terrasse allègrement le sol de la savane sèche sud-américaine. Ce faisant, il permet à de nombreuses espèces de micro-mammifères, reptiles et petits carnivores de trouver asile dans ses galeries abandonnées !\n\nLe Tatou à six bandes fait partie de ces quelques espèces supportant sans trop de difficultés les modifications soudaines de leur habitat. Pour cette raison, il n’est pas, aujourd’hui, considéré comme menacé dans le milieu naturel.', 'https://img.20mn.fr/VJg36V4ZSN-D8rQXfIlL4A/1200x768_photo-non-datee-tatu-bola-tatou-boule-mammifere-voie-disparition'),
(2, 'L\'Axolotl', 'Crustacés', 0.06, 0.11, 'Petite créature aquatique munie de trois paires de branchies externes d’aspect plumeuses. Il possède une nageoire dorsale qui débute à l’arrière de la tête, qui va contourner la queue. Son habitat se trouve dans les plans d’eau de haute altitude.\n\nAujourd’hui menacé par la destruction de son habitat, par l’introduction de poissons prédateur comme la carpe et sa commercialisation. Il est actuellement sur la liste rouge des espèces menacées dans le statut : danger critique d’extinction.', 'https://i.f1g.fr/media/cms/3000x2001_crop/2022/09/29/6b1c9952afaa2619b915b2bc74d1f0155e819b577588dd9dd7c4d8824c279c87.jpg'),
(3, 'L\'Emeu d\'Australie', 'Omnivore', 30, 55, 'L’Emeu migre à la recherche de nourriture et d’eau. La création de point d’eau artificiels par l’homme pour le bétail a favorisé les déplacements des émeus.\n\nL’Emeu est un oiseau diurne qui passe la majeure partie de son temps à rechercher sa nourriture. Les émeus vivent seuls ou en groupes. Côté reproduction, c’est le mâle qui couve les œufs et prend l’entière responsabilité des soins aux poussins.\n\nEn Australie, des conflits les opposent aux agriculteurs car les émeus apprécient les cultures. Ce n’est pas une espèce menacée : son effectif varie entre 630 000 et 730 000 individus.', 'https://sam2g.fr/wp-content/uploads/2020/05/emeu.jpg'),
(4, 'Le roulroul coronné', 'Fruits, insectes et vers', 0.25, 0.25, 'Les Roulrouls Couronnés profitent souvent de la compagnie des porcs sauvages pour trouver à manger plus facilement. En effet, la terre retournée par ces derniers leur offre un beau garde-manger !\n\nBien que le Roulroul Couronné apparaisse comme l’une des perdrix les plus adaptables du Sud Est asiatique, ses effectifs se réduisent car la forêt où il vit disparaît.\n\nEn évitant de consommer de l’huile de palme dont la culture provoque la destruction de milliers d’hectares de forêt tropicale du Sud Est asiatique, nous protégeons la faune et la flore.', 'https://i.pinimg.com/736x/a8/8a/cd/a88acd192057620c213f390e4189c765--partridge-mergui-archipelago.jpg'),
(5, 'Le gourami géant', 'Poissons, crustacés, batraciens', 9, 11, 'Dans la nature, à peine les œufs pondus, le mâle les rassemble dans le nid qu’il a édifié et chasse la femelle . Après l’éclosion, c’est aussi lui qui protège les petits alevins pendant les premières semaines de leur vie.\r\n\r\nLa population du Gourami Géant n’est pas menacé. Il peuple communément les habitats qui lui sont favorables sur toute son aire de répartition.\r\n\r\nBien qu’aucune action de conservation ne soit nécessaire pour le moment, l’Union International pour la Conservation de la Nature recommande tout de même de surveiller les effectifs et la qualité de l’habitat du Gourami Géant.', 'https://www.fishipedia.fr/wp-content/uploads/2013/08/Osphronemus_goramy_2-725x483.jpg'),
(6, 'Le tamarin lion à tête dorée', 'Frugivore', 0.5, 0.7, 'Bien que présent dans de nombreux zoos (environ 50 zoos européens) ces tamarins appartiennent tous au gouvernement brésilien qui en gère lui-même les programmes de reproduction.\r\n\r\nLe Tamarin lion a tète dorée se rencontre dans les derniers vestiges de la forêt atlantique brésilienne. Ce petit singe, reconnaissable à sa crinière or et roux, vit en groupe. Les adultes reproducteurs, unis pour la vie, accompagnés de trois à quatre de leur petit occupent un territoire bien déterminé et apparemment défendu.\r\n\r\nLargement capturé pour le commerce des animaux domestiques, les tamarins lions à tet dorée doivent également faire face à la destruction de leur habitat. Gravement menacés, ces singes occupent les zones forestières n’ayant pas disparu au profit de plantations ou de terre pâturables.', 'https://www.consoglobe.com/wp-content/uploads/2020/12/tamarin-lion_shutterstock_282860960.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `etats`
--

DROP TABLE IF EXISTS `etats`;
CREATE TABLE IF NOT EXISTS `etats` (
  `idEtat` int NOT NULL AUTO_INCREMENT,
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
  `idFonction` int NOT NULL AUTO_INCREMENT,
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
  `idImage` int NOT NULL AUTO_INCREMENT,
  `lienImage` text NOT NULL,
  `idEspeceImage` int NOT NULL,
  PRIMARY KEY (`idImage`),
  KEY `fk43` (`idEspeceImage`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `images`
--

INSERT INTO `images` (`idImage`, `lienImage`, `idEspeceImage`) VALUES
(1, 'http://t3.gstatic.com/licensed-image?q=tbn:ANd9GcTcYNRR3fWU52JVGfcrjg2deAvhRwcMF9q-rgcRd-ClV-Ps-s8h040e7CySA74Lg1h2', 2),
(2, 'https://minecraft.fr/wp-content/uploads/2021/06/axolotl-minecraft-bleu.png', 2),
(3, 'https://static.wikia.nocookie.net/minecraft_fr_gamepedia/images/7/72/Cyan_Axolotl_JE1.png/revision/latest?cb=20201217102733', 2);

-- --------------------------------------------------------

--
-- Structure de la table `missions`
--

DROP TABLE IF EXISTS `missions`;
CREATE TABLE IF NOT EXISTS `missions` (
  `idMission` int NOT NULL AUTO_INCREMENT,
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
  `idNiveau` int NOT NULL AUTO_INCREMENT,
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
-- Structure de la table `questionnaire`
--

DROP TABLE IF EXISTS `questionnaire`;
CREATE TABLE IF NOT EXISTS `questionnaire` (
  `idQuestion` int NOT NULL AUTO_INCREMENT,
  `libelleQuestion` varchar(255) NOT NULL,
  PRIMARY KEY (`idQuestion`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `questionnaire`
--

INSERT INTO `questionnaire` (`idQuestion`, `libelleQuestion`) VALUES
(1, 'L\'animal mange t-il bien ?'),
(2, 'L\'animal est-il énergique ?'),
(3, 'L\'animal possède-t-il des blessures ?'),
(4, 'L\'animal se tient-il loin des autres ?');

-- --------------------------------------------------------

--
-- Structure de la table `repondre`
--

DROP TABLE IF EXISTS `repondre`;
CREATE TABLE IF NOT EXISTS `repondre` (
  `idAnimalRepondre` int NOT NULL,
  `idQuestionRepondre` int NOT NULL,
  `dateRepondre` datetime NOT NULL,
  `reponse` int NOT NULL,
  PRIMARY KEY (`idAnimalRepondre`,`idQuestionRepondre`,`dateRepondre`),
  KEY `fk70` (`idQuestionRepondre`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `repondre`
--

INSERT INTO `repondre` (`idAnimalRepondre`, `idQuestionRepondre`, `dateRepondre`, `reponse`) VALUES
(16, 3, '2023-04-04 09:23:05', 5),
(16, 4, '2023-04-04 09:23:05', 4),
(16, 2, '2023-04-04 09:23:05', 3),
(16, 1, '2023-04-04 09:23:05', 4),
(7, 1, '2023-04-01 00:18:05', 5),
(7, 3, '2023-04-01 00:18:05', 2),
(7, 4, '2023-04-01 00:18:05', 5),
(7, 2, '2023-04-01 00:18:05', 5);

-- --------------------------------------------------------

--
-- Structure de la table `soigner`
--

DROP TABLE IF EXISTS `soigner`;
CREATE TABLE IF NOT EXISTS `soigner` (
  `idAnimalSoigner` int NOT NULL,
  `idSoinSoigner` int NOT NULL,
  `dateSoigner` datetime NOT NULL,
  `traitement` text NOT NULL,
  `idEmployeSoigner` int NOT NULL,
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
  `idSoin` int NOT NULL AUTO_INCREMENT,
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
