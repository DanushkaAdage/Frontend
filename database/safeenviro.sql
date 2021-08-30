-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 30, 2021 at 09:21 PM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 8.0.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `safeenviro`
--

-- --------------------------------------------------------

--
-- Table structure for table `collectionform`
--

CREATE TABLE `collectionform` (
  `collectionid` int(100) NOT NULL,
  `collectionpoint` text NOT NULL,
  `collectedby` text NOT NULL,
  `wastetype` text NOT NULL,
  `collectingequipment` text NOT NULL,
  `quantity` int(11) NOT NULL,
  `dateandtime` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `collectionform`
--

INSERT INTO `collectionform` (`collectionid`, `collectionpoint`, `collectedby`, `wastetype`, `collectingequipment`, `quantity`, `dateandtime`) VALUES
(1, 'Kegalle', 'Robinson', 'Plastic', 'Truck, Bin', 27, '31/08/2021 12:02:05 PM'),
(2, 'Mawnella', 'Atkin', 'Food', 'Bin', 52, '01/09/2021 01:32:45 PM'),
(3, 'Kandy', 'Mikaelson', 'Paper', 'Truck', 31, '01/09/2021 09:15:15 AM');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` text NOT NULL,
  `password` varchar(500) NOT NULL,
  `email` text NOT NULL DEFAULT '%@%',
  `type` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `type`) VALUES
(1, 'Safe Enviro', '$2b$10$Nqj7IpucYFJli8eHdAZJcuL8oivMVIbFF.NM5jr2NJKP.VSrMZMqK', 'admin@safeenviro.com', 'Admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `collectionform`
--
ALTER TABLE `collectionform`
  ADD PRIMARY KEY (`collectionid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`(200));

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `collectionform`
--
ALTER TABLE `collectionform`
  MODIFY `collectionid` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
