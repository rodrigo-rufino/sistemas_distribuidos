-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 10-Jun-2019 às 19:20
-- Versão do servidor: 10.3.15-MariaDB
-- versão do PHP: 7.2.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `ec021_av2_musicfy`
--
DROP DATABASE IF EXISTS `ec021_av2_musicfy`;
CREATE DATABASE IF NOT EXISTS `ec021_av2_musicfy` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `ec021_av2_musicfy`;

-- --------------------------------------------------------

--
-- Estrutura da tabela `genero`
--

DROP TABLE IF EXISTS `genero`;
CREATE TABLE `genero` (
  `genero_id` int(11) NOT NULL,
  `descricao` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `genero`
--

INSERT INTO `genero` (`genero_id`, `descricao`) VALUES
(1, 'Rock'),
(2, 'Sertanejo'),
(3, 'MPB'),
(4, 'Pop Rock');

-- --------------------------------------------------------

--
-- Estrutura da tabela `musica`
--

DROP TABLE IF EXISTS `musica`;
CREATE TABLE `musica` (
  `musica_id` int(11) NOT NULL,
  `titulo` text NOT NULL,
  `artista` text NOT NULL,
  `genero_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `musica`
--

INSERT INTO `musica` (`musica_id`, `titulo`, `artista`, `genero_id`) VALUES
(1, 'Tempo Perdido', 'Legião Urbana', 1),
(2, 'Céu Azul', 'Charlie Brown Jr.', 1),
(3, 'Pais e Filhos', 'Legião Urbana', 1),
(4, 'Só Hoje', 'Jota Quest', 1),
(5, 'Só Os Loucos Sabem', 'Charlie Brown Jr.', 1),
(6, 'Bohemian Rhapsody', 'Queen', 1),
(7, 'Love of My Life', 'Queen', 1),
(8, 'Primeiros Erros', 'Capital Inicial', 1),
(9, 'Sweet Child O\' Mine', 'Guns N\' Roses', 1),
(10, 'Wish You Were Here', 'Pink Floyd', 1),
(11, 'Evidências', 'Chitãozinho & Xororó', 2),
(12, 'Notificação Preferida', 'Zé Neto e Cristiano', 2),
(13, 'Todo Mundo Vai Sofrer', 'Marília Mendonça', 2),
(14, 'Boate Azul', 'Bruno e Marrone', 2),
(15, 'Largado Às Traças', 'Zé Neto e Cristiano', 2),
(16, 'Cem Mil', 'Gusttavo Lima', 2),
(17, 'Cobaia (part. Maiara e Maraisa)', 'Lauana Prado', 2),
(18, 'Estado Decadente', 'Zé Neto e Cristiano', 2),
(19, 'Na Hora de Amar', 'Gusttavo Lima', 2),
(20, 'Solteiro Não Trai', 'Gustavo Mioto', 2),
(21, 'Trem-Bala', 'Ana Vilela', 3),
(22, 'Velha Infância', 'Tribalistas', 3),
(23, 'Sozinho', 'Caetano Veloso', 3),
(24, 'Chão de Giz', 'Zé Ramalho', 3),
(25, 'Anunciação', 'Alceu Valença', 3),
(26, 'Asa Branca', 'Luiz Gonzaga', 3),
(27, 'Gostava Tanto de Você', 'Tim Maia', 3),
(28, 'Eu Te Devoro', 'Djavan', 3),
(29, 'Sinônimo', 'Zé Ramalho', 3),
(30, 'La Belle De Jour', 'Alceu Valença', 3),
(31, 'Zombie', 'The Cranberries', 4),
(32, 'Lost on You', 'LP', 4),
(33, 'Iris', 'Goo Goo Dolls', 4),
(34, 'With Or Without You', 'U2', 4),
(35, 'Counting Stars', 'OneRepublic', 4),
(36, 'La Flaca', 'Jarabe De Palo', 4),
(37, 'Linger', 'The Cranberries', 4),
(38, 'De Musica Ligera', 'Soda Stereo', 4),
(39, 'The Only Exception', 'Paramore', 4),
(40, 'Flaca', 'Andrés Calamaro', 4);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `genero`
--
ALTER TABLE `genero`
  ADD PRIMARY KEY (`genero_id`);

--
-- Índices para tabela `musica`
--
ALTER TABLE `musica`
  ADD PRIMARY KEY (`musica_id`),
  ADD KEY `genero_fk` (`genero_id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `genero`
--
ALTER TABLE `genero`
  MODIFY `genero_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `musica`
--
ALTER TABLE `musica`
  MODIFY `musica_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `musica`
--
ALTER TABLE `musica`
  ADD CONSTRAINT `genero_fk` FOREIGN KEY (`genero_id`) REFERENCES `genero` (`genero_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
