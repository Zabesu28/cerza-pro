-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : lun. 17 avr. 2023 à 19:07
-- Version du serveur : 8.0.27
-- Version de PHP : 8.1.0

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

CREATE TABLE `alerte` (
  `idAlerte` int NOT NULL,
  `descriptionAlerte` text NOT NULL,
  `active` tinyint(1) NOT NULL,
  `dateAlerte` datetime NOT NULL,
  `idEmployeAlerte` int NOT NULL,
  `idNiveauAlerte` int NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `alerte`
--

INSERT INTO `alerte` (`idAlerte`, `descriptionAlerte`, `active`, `dateAlerte`, `idEmployeAlerte`, `idNiveauAlerte`) VALUES
(1, 'FFFfrdd', 0, '2023-04-11 10:38:45', 3, 2),
(5, 'oui', 1, '2023-04-17 20:56:22', 1, 3),
(4, 'hjgjhg', 1, '2023-04-17 15:57:22', 6, 2);

-- --------------------------------------------------------

--
-- Structure de la table `animaux`
--

CREATE TABLE `animaux` (
  `idAnimal` int NOT NULL,
  `nomAnimal` varchar(50) NOT NULL,
  `dateNaissAnimal` date NOT NULL,
  `sexeAnimal` tinyint NOT NULL,
  `idEspeceAnimal` int NOT NULL,
  `codeEnclosAnimal` varchar(10) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

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

CREATE TABLE `attribuer` (
  `idEmployeAttribuer` int NOT NULL,
  `idMissionAttribuer` int NOT NULL,
  `dateAttribuer` datetime NOT NULL,
  `codeEnclosAttribuer` varchar(10) NOT NULL,
  `commentaire` text,
  `dateValidation` datetime DEFAULT NULL,
  `idEtatAttribuer` int NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `attribuer`
--

INSERT INTO `attribuer` (`idEmployeAttribuer`, `idMissionAttribuer`, `dateAttribuer`, `codeEnclosAttribuer`, `commentaire`, `dateValidation`, `idEtatAttribuer`) VALUES
(1, 1, '2023-04-11 10:53:20', 'E1', 'FFF', '2023-04-11 12:53:56', 2),
(3, 2, '2023-04-11 10:53:20', 'E2', 'dhfhd', '2023-04-11 12:53:56', 2),
(1, 3, '2023-04-17 20:50:56', 'E1', 'sss', '2023-04-17 21:05:48', 2);

-- --------------------------------------------------------

--
-- Structure de la table `employes`
--

CREATE TABLE `employes` (
  `idEmploye` int NOT NULL,
  `nomEmploye` varchar(100) NOT NULL,
  `prenomEmploye` varchar(100) NOT NULL,
  `login` varchar(100) NOT NULL,
  `mdp` varchar(255) NOT NULL,
  `idFonctionEmploye` int NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `employes`
--

INSERT INTO `employes` (`idEmploye`, `nomEmploye`, `prenomEmploye`, `login`, `mdp`, `idFonctionEmploye`) VALUES
(1, 'ZABETH', 'Romain', 'zabethr', '7546df0d5385f6a05d11c5a0388a5736466f31d5ab210fe486f377bd648459a5', 1),
(3, 'FENEROL', 'Miguel', 'fenerolm', '7546df0d5385f6a05d11c5a0388a5736466f31d5ab210fe486f377bd648459a5', 2),
(5, 'MICHELET', 'Max', 'micheletm', '7546df0d5385f6a05d11c5a0388a5736466f31d5ab210fe486f377bd648459a5', 3),
(6, 'SKWERES', 'Oliwer', 'skwereso', '7546df0d5385f6a05d11c5a0388a5736466f31d5ab210fe486f377bd648459a5', 3);

-- --------------------------------------------------------

--
-- Structure de la table `enclos`
--

CREATE TABLE `enclos` (
  `code` varchar(10) NOT NULL,
  `descriptifEnclos` text
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

CREATE TABLE `especes` (
  `idEspece` int NOT NULL,
  `libelleEspece` varchar(50) NOT NULL,
  `regime` varchar(50) NOT NULL,
  `poidsMin` float NOT NULL,
  `poidsMax` float NOT NULL,
  `description` text,
  `imageEspece` text
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

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

CREATE TABLE `etats` (
  `idEtat` int NOT NULL,
  `libelleEtat` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

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

CREATE TABLE `fonctions` (
  `idFonction` int NOT NULL,
  `libelleFonction` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

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

CREATE TABLE `images` (
  `idImage` int NOT NULL,
  `lienImage` text NOT NULL,
  `idEspeceImage` int NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `images`
--

INSERT INTO `images` (`idImage`, `lienImage`, `idEspeceImage`) VALUES
(10, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvbkdyKxXnvS3Rl55_rEgZH2At0qxEudM62YECbQEbJ53-kMD82X85n_uwYnH22c0ZdjY&usqp=CAU', 2),
(7, 'https://i.f1g.fr/media/cms/3000x2001_crop/2022/09/29/6b1c9952afaa2619b915b2bc74d1f0155e819b577588dd9dd7c4d8824c279c87.jpg', 2),
(8, 'https://lemagdesanimaux.ouest-france.fr/images/dossiers/2020-09/axolotl-070026.jpg', 2),
(9, 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEir-nmL5TDJ4UJQ5Z-T_cQO0JJYzsthRG8jdzSDH7L4nAz2meCKDf5RvUMZu9bt5dXiNr0jOXtdiUf9QzhVjYTWdOXFEeaPdiIj-_wTdjjfvUGAdbobGNt4hYmLway8XAwPWl-H_KJBt0e6s90iQI4SuQTNAPM1GQumqjabBnQlScLaCwS8ZrOswAqp/s980/Axolotl.webp', 2),
(11, 'https://cdn.futura-sciences.com/sources/Dasypus_Armadillo.jpg', 1),
(12, 'https://www.jaitoutcompris.com/img/encyclo/tatou-pb.jpg', 1),
(13, 'https://www.slate.fr/sites/default/files/styles/1060x523/public/tatou.jpg', 1),
(14, 'https://img.20mn.fr/VJg36V4ZSN-D8rQXfIlL4A/1200x768_photo-non-datee-tatu-bola-tatou-boule-mammifere-voie-disparition', 1),
(15, 'https://www.parcanimalierlabarben.com/wp-content/uploads/2014/09/Emeu-fiche.jpg', 3),
(16, 'https://ici.exploratv.ca/upload/site/post/picture/1375/5fff633dea1fb.1680115984.jpg', 3),
(17, 'https://lemagdesanimaux.ouest-france.fr/images/dossiers/2021-07/emeu-australie-084039.jpg', 3),
(18, 'https://www.jaitoutcompris.com/img/encyclo/emeu.jpg', 3),
(19, 'https://upload.wikimedia.org/wikipedia/commons/6/62/Rollulus_rouloul_-Tropical_House_at_Slimbridge%2C_England_-male-8a.jpg', 4),
(20, 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Crested_Wood_Partridge_%28Rollulus_rouloul%29%2C_male_and_female.jpg/640px-Crested_Wood_Partridge_%28Rollulus_rouloul%29%2C_male_and_female.jpg', 4),
(21, 'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/542898981/', 4),
(22, 'https://www.oiseaux-birds.com/galliformes/phasianides/rouloul-couronne/rouloul-couronne-nb2.jpg', 4),
(23, 'https://www.cerza.com/wp-content/uploads/2021/03/Gourami.jpg', 5),
(24, 'https://www.lafermeauxcrocodiles.com/wp-content/uploads/2019/05/gouramigeant.jpg', 5),
(25, 'https://www.cerza.com/wp-content/uploads/2021/03/Gourami-2.jpg', 5),
(27, 'https://www.zoo-mulhouse.com/wp-content/uploads/2018/04/tamarn-lion-a-tete-doree-2.jpg', 6),
(26, 'https://www.cerza.com/wp-content/uploads/2021/03/Gourami-1.jpg', 5),
(28, 'https://www.thoiry.net/wp-content/uploads/2022/04/tamarin-lion-03-copy.jpg', 6),
(29, 'https://www.zoo-mulhouse.com/wp-content/uploads/2018/04/tamarn-lion-a-tete-doree-1.jpg', 6),
(30, 'https://prmeng.rosselcdn.net/sites/default/files/dpistyles_v2/prm_16_9_856w/2022/02/17/node_279840/38883020/public/2022/02/17/B9729996900Z.1_20220217153957_000%2BG20JU1GP8.1-0.jpg?itok=LYM0KbxJ1645110037', 6);

-- --------------------------------------------------------

--
-- Structure de la table `missions`
--

CREATE TABLE `missions` (
  `idMission` int NOT NULL,
  `libelleMission` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

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

CREATE TABLE `niveau` (
  `idNiveau` int NOT NULL,
  `libelleNiveau` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

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

CREATE TABLE `questionnaire` (
  `idQuestion` int NOT NULL,
  `libelleQuestion` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

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

CREATE TABLE `repondre` (
  `idAnimalRepondre` int NOT NULL,
  `idQuestionRepondre` int NOT NULL,
  `dateRepondre` datetime NOT NULL,
  `reponse` int NOT NULL
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

CREATE TABLE `soigner` (
  `idAnimalSoigner` int NOT NULL,
  `idSoinSoigner` int NOT NULL,
  `dateSoigner` datetime NOT NULL,
  `traitement` text NOT NULL,
  `idEmployeSoigner` int NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `soigner`
--

INSERT INTO `soigner` (`idAnimalSoigner`, `idSoinSoigner`, `dateSoigner`, `traitement`, `idEmployeSoigner`) VALUES
(1, 1, '2023-04-17 15:54:51', 'hfdgfhg', 5);

-- --------------------------------------------------------

--
-- Structure de la table `soins`
--

CREATE TABLE `soins` (
  `idSoin` int NOT NULL,
  `libelleSoin` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `soins`
--

INSERT INTO `soins` (`idSoin`, `libelleSoin`) VALUES
(1, 'Traitement de plaies'),
(2, 'Vaccination'),
(3, 'Nutrition');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `alerte`
--
ALTER TABLE `alerte`
  ADD PRIMARY KEY (`idAlerte`),
  ADD KEY `fk11` (`idEmployeAlerte`),
  ADD KEY `fk13` (`idNiveauAlerte`);

--
-- Index pour la table `animaux`
--
ALTER TABLE `animaux`
  ADD PRIMARY KEY (`idAnimal`),
  ADD KEY `fk1` (`idEspeceAnimal`),
  ADD KEY `fk2` (`codeEnclosAnimal`);

--
-- Index pour la table `attribuer`
--
ALTER TABLE `attribuer`
  ADD PRIMARY KEY (`idMissionAttribuer`,`dateAttribuer`,`codeEnclosAttribuer`),
  ADD KEY `fk15` (`idMissionAttribuer`),
  ADD KEY `fk42` (`idEtatAttribuer`),
  ADD KEY `fk100` (`codeEnclosAttribuer`),
  ADD KEY `fk200` (`idEmployeAttribuer`);

--
-- Index pour la table `employes`
--
ALTER TABLE `employes`
  ADD PRIMARY KEY (`idEmploye`),
  ADD KEY `fk9` (`idFonctionEmploye`);

--
-- Index pour la table `enclos`
--
ALTER TABLE `enclos`
  ADD PRIMARY KEY (`code`);

--
-- Index pour la table `especes`
--
ALTER TABLE `especes`
  ADD PRIMARY KEY (`idEspece`);

--
-- Index pour la table `etats`
--
ALTER TABLE `etats`
  ADD PRIMARY KEY (`idEtat`);

--
-- Index pour la table `fonctions`
--
ALTER TABLE `fonctions`
  ADD PRIMARY KEY (`idFonction`);

--
-- Index pour la table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`idImage`),
  ADD KEY `fk43` (`idEspeceImage`);

--
-- Index pour la table `missions`
--
ALTER TABLE `missions`
  ADD PRIMARY KEY (`idMission`);

--
-- Index pour la table `niveau`
--
ALTER TABLE `niveau`
  ADD PRIMARY KEY (`idNiveau`);

--
-- Index pour la table `questionnaire`
--
ALTER TABLE `questionnaire`
  ADD PRIMARY KEY (`idQuestion`);

--
-- Index pour la table `repondre`
--
ALTER TABLE `repondre`
  ADD PRIMARY KEY (`idAnimalRepondre`,`idQuestionRepondre`,`dateRepondre`),
  ADD KEY `fk70` (`idQuestionRepondre`);

--
-- Index pour la table `soigner`
--
ALTER TABLE `soigner`
  ADD PRIMARY KEY (`idAnimalSoigner`,`idSoinSoigner`,`dateSoigner`),
  ADD KEY `fk4` (`idSoinSoigner`),
  ADD KEY `fk15` (`idEmployeSoigner`);

--
-- Index pour la table `soins`
--
ALTER TABLE `soins`
  ADD PRIMARY KEY (`idSoin`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `alerte`
--
ALTER TABLE `alerte`
  MODIFY `idAlerte` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `animaux`
--
ALTER TABLE `animaux`
  MODIFY `idAnimal` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT pour la table `employes`
--
ALTER TABLE `employes`
  MODIFY `idEmploye` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `especes`
--
ALTER TABLE `especes`
  MODIFY `idEspece` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `etats`
--
ALTER TABLE `etats`
  MODIFY `idEtat` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `fonctions`
--
ALTER TABLE `fonctions`
  MODIFY `idFonction` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `images`
--
ALTER TABLE `images`
  MODIFY `idImage` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT pour la table `missions`
--
ALTER TABLE `missions`
  MODIFY `idMission` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `niveau`
--
ALTER TABLE `niveau`
  MODIFY `idNiveau` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `questionnaire`
--
ALTER TABLE `questionnaire`
  MODIFY `idQuestion` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `soins`
--
ALTER TABLE `soins`
  MODIFY `idSoin` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
