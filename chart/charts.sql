-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Cze 05, 2024 at 05:27 AM
-- Wersja serwera: 10.4.28-MariaDB
-- Wersja PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `charts`
--
CREATE DATABASE IF NOT EXISTS `charts` DEFAULT CHARACTER SET utf8 COLLATE utf8_polish_ci;
USE `charts`;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `chart_vals`
--

CREATE TABLE `chart_vals` (
  `day` int(11) NOT NULL,
  `value` float NOT NULL,
  `illness` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chart_vals`
--

INSERT INTO `chart_vals` (`day`, `value`, `illness`) VALUES
(1, 36, 0),
(2, 37, 0),
(3, 36.1, 0),
(4, 37.1, 0),
(5, 36.13, 0),
(6, 36, 0),
(7, 36.59, 0),
(8, 37.08, 0),
(9, 36.97, 0),
(10, 36.01, 0),
(11, 36.13, 0),
(12, 36.63, 0),
(13, 36, 0),
(14, 36, 1),
(15, 37, 0),
(16, 36, 1),
(17, 0, 1),
(18, 0, 1),
(19, 0, 0),
(20, 0, 0),
(21, 0, 0),
(22, 0, 0),
(23, 0, 0),
(24, 0, 0),
(25, 37, 0),
(26, 36.86, 0),
(27, 36.96, 0),
(28, 37.2, 0),
(30, 36, 0);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `chart_vals`
--
ALTER TABLE `chart_vals`
  ADD PRIMARY KEY (`day`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chart_vals`
--
ALTER TABLE `chart_vals`
  MODIFY `day` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
