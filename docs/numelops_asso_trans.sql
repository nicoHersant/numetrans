-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Client :  localhost:3306
-- Généré le :  Jeu 12 Mars 2020 à 15:30
-- Version du serveur :  5.7.29-0ubuntu0.18.04.1
-- Version de PHP :  7.2.24-0ubuntu0.18.04.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `numelops_asso_trans`
--

-- --------------------------------------------------------

--
-- Structure de la table `nascontent`
--

CREATE TABLE `nascontent` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `state` varchar(20) NOT NULL DEFAULT 'deactivate',
  `lang` varchar(8) NOT NULL,
  `robots` varchar(18) DEFAULT NULL,
  `type` varchar(20) NOT NULL DEFAULT 'page',
  `tpl` varchar(80) NOT NULL,
  `url` varchar(60) DEFAULT NULL,
  `title` varchar(70) NOT NULL,
  `description` varchar(160) DEFAULT NULL,
  `content` longtext,
  `user_update` bigint(20) UNSIGNED DEFAULT NULL,
  `date_update` datetime DEFAULT NULL,
  `user_insert` bigint(20) UNSIGNED NOT NULL,
  `date_insert` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Contenu de la table `nascontent`
--

INSERT INTO `nascontent` (`id`, `state`, `lang`, `robots`, `type`, `tpl`, `url`, `title`, `description`, `content`, `user_update`, `date_update`, `user_insert`, `date_insert`) VALUES
(1, 'deactivate', 'fr', NULL, 'page', 'home', 'home', 'Numelops', NULL, NULL, NULL, NULL, 1, '2020-03-12 15:22:41');

-- --------------------------------------------------------

--
-- Structure de la table `nasmeta`
--

CREATE TABLE `nasmeta` (
  `id` bigint(20) UNSIGNED NOT NULL DEFAULT '0',
  `type` varchar(32) NOT NULL,
  `cle` varchar(255) NOT NULL DEFAULT '',
  `val` text,
  `ordre` smallint(6) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `nastag`
--

CREATE TABLE `nastag` (
  `id` bigint(20) UNSIGNED NOT NULL DEFAULT '0',
  `zone` varchar(32) NOT NULL,
  `encode` varchar(255) NOT NULL DEFAULT '',
  `name` text NOT NULL,
  `ordre` smallint(6) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `nasuser`
--

CREATE TABLE `nasuser` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `state` varchar(20) NOT NULL DEFAULT 'active',
  `auth` varchar(255) NOT NULL,
  `name` varchar(60) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `info` text,
  `password` char(64) DEFAULT NULL,
  `salt` char(16) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL COMMENT 'token light',
  `oauth` text COMMENT 'Token api externe',
  `date_update` datetime DEFAULT NULL,
  `date_insert` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Contenu de la table `nasuser`
--

INSERT INTO `nasuser` (`id`, `state`, `auth`, `name`, `email`, `info`, `password`, `salt`, `token`, `oauth`, `date_update`, `date_insert`) VALUES
(1, 'active', 'edit-admin,edit-user,edit-config,edit-nav,edit-header,edit-footer,add-media,edit-media,add-media-public,edit-public,add-article,edit-article,add-page,edit-page', NULL, 'nicolas.hersant@gmail.com', NULL, '6ea03c607d5f887d91be7c73d64ed5f2758c2d283bfbf04637c1572d5385e204', '54ac24c29eb0d00', 'ede4fd4cbe977dc838ebd51edcb96d52414c36a25e3f4b99657ee78937fe6033', NULL, '2020-03-12 15:29:09', '2020-03-12 15:22:41');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `nascontent`
--
ALTER TABLE `nascontent`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `url` (`url`),
  ADD KEY `state` (`state`),
  ADD KEY `type` (`type`),
  ADD KEY `lang` (`lang`);

--
-- Index pour la table `nasmeta`
--
ALTER TABLE `nasmeta`
  ADD PRIMARY KEY (`id`,`type`,`cle`),
  ADD KEY `type` (`type`,`cle`),
  ADD KEY `ordre` (`ordre`);

--
-- Index pour la table `nastag`
--
ALTER TABLE `nastag`
  ADD PRIMARY KEY (`id`,`zone`,`encode`),
  ADD KEY `type` (`zone`,`encode`),
  ADD KEY `ordre` (`ordre`);

--
-- Index pour la table `nasuser`
--
ALTER TABLE `nasuser`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `state` (`state`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `nascontent`
--
ALTER TABLE `nascontent`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT pour la table `nasuser`
--
ALTER TABLE `nasuser`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
