-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 04, 2019 at 08:25 PM
-- Server version: 10.1.25-MariaDB
-- PHP Version: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `thesisapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `activitiesdays`
--

CREATE TABLE `activitiesdays` (
  `id` int(11) NOT NULL,
  `daysID` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `activitiesdays`
--

INSERT INTO `activitiesdays` (`id`, `daysID`) VALUES
(1, '269,270,271,272,273,274');

-- --------------------------------------------------------

--
-- Table structure for table `batchnumber`
--

CREATE TABLE `batchnumber` (
  `batchNumber` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `friendID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `batchnumber`
--

INSERT INTO `batchnumber` (`batchNumber`, `userID`, `friendID`) VALUES
(4, 1, 17),
(5, 17, 1),
(6, 1, 17),
(7, 17, 1),
(8, 1, 17),
(9, 17, 1),
(10, 1, 17),
(13, 1, 23),
(14, 1, 24),
(15, 1, 25),
(16, 1, 26),
(17, 26, 1),
(18, 17, 1),
(19, 1, 17),
(20, 17, 1),
(21, 23, 1),
(22, 25, 1),
(24, 24, 1),
(25, 1, 17),
(26, 1, 23),
(27, 1, 26),
(28, 1, 25),
(29, 1, 24),
(30, 26, 17),
(31, 23, 17),
(32, 23, 24),
(33, 23, 25),
(34, 23, 26),
(35, 26, 24),
(36, 26, 25),
(37, 25, 17),
(38, 25, 23),
(39, 25, 24),
(40, 25, 26),
(41, 24, 17),
(42, 24, 23),
(43, 24, 25),
(44, 24, 26),
(45, 17, 26),
(46, 17, 1),
(47, 26, 1),
(48, 1, 26),
(49, 1, 17),
(50, 26, 1),
(51, 23, 1),
(52, 1, 23),
(53, 26, 17),
(54, 26, 23),
(55, 26, 24),
(56, 26, 25),
(57, 23, 25),
(58, 23, 26),
(59, 25, 23),
(60, 25, 24),
(61, 24, 25),
(62, 24, 26),
(63, 17, 23),
(64, 17, 24),
(65, 17, 25),
(66, 17, 26),
(67, 17, 1),
(68, 26, 17),
(69, 26, 23),
(70, 23, 26),
(71, 23, 17),
(72, 23, 25),
(73, 1, 17),
(74, 17, 1),
(75, 1, 17),
(76, 17, 1),
(77, 1, 17),
(78, 17, 1),
(79, 1, 17),
(80, 17, 1),
(81, 17, 23),
(82, 1, 17),
(83, 1, 26),
(84, 17, 1);

-- --------------------------------------------------------

--
-- Table structure for table `chatting`
--

CREATE TABLE `chatting` (
  `id` int(11) NOT NULL,
  `chatingID` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `church`
--

CREATE TABLE `church` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `address` varchar(200) NOT NULL,
  `status` varchar(50) NOT NULL,
  `mission` text NOT NULL,
  `vision` text NOT NULL,
  `hostPastorID` int(11) NOT NULL,
  `image` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `church`
--

INSERT INTO `church` (`id`, `name`, `address`, `status`, `mission`, `vision`, `hostPastorID`, `image`) VALUES
(1, 'Molave AG', 'Molave, Zamboanga del Sur', 'Sovereign', 'Yes', 'Yes', 39, 'agLogo.png'),
(17, 'Mahayag AG', 'Mahayag, Zamboanga del Sur', 'Establish', 'Yes', 'Yes', 58, 'agLogo.png'),
(39, 'Tambulig AG', 'Tambulig, ZDS', 'Sovereign', 'Yes', 'Yes', 50, 'agLogo.png'),
(40, 'Ramon Magsaysay AG', 'Ramon Magsaysay, ZDS', 'Pioneering', 'Yes', 'Yes', 46, 'agLogo.png'),
(41, 'Esperanza AG', 'Esperanza, ZDS', 'Establish', 'Yes', 'Yes', 45, 'agLogo.png');

-- --------------------------------------------------------

--
-- Table structure for table `churchmember`
--

CREATE TABLE `churchmember` (
  `id` int(11) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `middlename` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `bday` date NOT NULL,
  `address` varchar(200) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `civilStatus` varchar(100) NOT NULL,
  `contact` varchar(30) NOT NULL,
  `ministryID` int(11) NOT NULL,
  `churchID` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `image` varchar(200) NOT NULL DEFAULT 'user.ico',
  `status` smallint(5) NOT NULL DEFAULT '0',
  `officialmember` smallint(5) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `churchmember`
--

INSERT INTO `churchmember` (`id`, `firstname`, `middlename`, `lastname`, `bday`, `address`, `gender`, `civilStatus`, `contact`, `ministryID`, `churchID`, `username`, `password`, `image`, `status`, `officialmember`) VALUES
(13, 'Biboy', '', 'Langomez', '0000-00-00', '', '', '', '09502239753', 5, 17, 'biboy', 'biboy123', 'user.ico', 0, 1),
(14, 'Michael', '', 'Langomez', '0000-00-00', '', '', '', '09098358024', 5, 1, 'michael', 'michael123', 'user.ico', 0, 1),
(15, 'Joshua', '', 'Cuevas', '0000-00-00', '', '', '', '090745562879', 5, 1, 'joshua', 'joshua123', 'user.ico', 0, 1),
(16, 'Brian', '', 'Villarubia', '0000-00-00', '', '', '', '09123456789', 5, 1, 'brian', 'brian123', 'user.ico', 1, 1),
(17, 'sdgfjh', '', 'gshdgfjsh', '0000-00-00', '', '', '', '1321654', 3, 1, 'wawa', 'wawa123', 'user.ico', 0, 1),
(18, 'Genesis', '', 'Langomez', '0000-00-00', '', '', '', '32168648', 5, 1, 'genesis', 'genesis123', 'user.ico', 0, 1),
(19, 'Robinson', '', 'Langdiao', '0000-00-00', '', '', '', '8979654', 5, 1, 'binson', 'binson123', 'user.ico', 0, 1),
(20, 'asfsdf', '', 'wqeqwdasdasd', '0000-00-00', '', '', '', '321321654', 3, 17, 'asdasd', 'asdasd123', 'user.ico', 0, 1),
(21, 'Jemian', '', 'Sy', '0000-00-00', '', '', '', '09123456789', 4, 1, 'jemian', 'jemian123', 'user.ico', 0, 1),
(22, 'sharyn', '', 'lavilla', '0000-00-00', '', '', '', '00000000000', 6, 1, 'shai10', 'shai1', 'user.ico', 0, 1),
(23, 'Jephany', '', 'Gumapon', '0000-00-00', '', '', '', '09373929', 5, 1, 'jephany', 'jephany123', 'user.ico', 0, 1),
(24, 'Jeff', '', 'Jeff', '0000-00-00', '', '', '', '847474', 3, 17, 'jeff', 'jef123', 'user.ico', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `delegates`
--

CREATE TABLE `delegates` (
  `id` int(11) NOT NULL,
  `memberID` int(11) NOT NULL,
  `eventID` int(11) NOT NULL,
  `churchID` int(11) NOT NULL,
  `pending` smallint(5) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `delegates`
--

INSERT INTO `delegates` (`id`, `memberID`, `eventID`, `churchID`, `pending`) VALUES
(5, 20, 18, 17, 1),
(6, 16, 18, 1, 1),
(7, 13, 18, 1, 1),
(8, 23, 18, 1, 1),
(9, 17, 18, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `id` int(11) NOT NULL,
  `dateStart` date NOT NULL,
  `dateEnd` date NOT NULL,
  `registrationFee` int(11) NOT NULL,
  `theme` varchar(200) NOT NULL,
  `address` varchar(200) NOT NULL,
  `speaker` varchar(150) NOT NULL,
  `hostChurch` int(11) NOT NULL,
  `ministryID` int(11) NOT NULL,
  `status` smallint(5) NOT NULL DEFAULT '0',
  `approve` smallint(5) NOT NULL DEFAULT '0',
  `active` smallint(5) NOT NULL DEFAULT '0',
  `image` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`id`, `dateStart`, `dateEnd`, `registrationFee`, `theme`, `address`, `speaker`, `hostChurch`, `ministryID`, `status`, `approve`, `active`, `image`) VALUES
(9, '2018-10-29', '2018-10-31', 400, 'Sectional Fellowship', 'Araneta Coleseum', 'Biboy Langomez, II', 1, 5, 1, 1, 0, '0_H918SbNILoTE9IlO.jpg'),
(10, '2018-11-20', '2018-11-23', 100, 'YASM Training', 'molave', 'Guest speaker', 1, 5, 1, 1, 0, 'becausehelives.jpg'),
(11, '2018-11-28', '2018-11-30', 500, 'Youth Rally 2018', 'araneta calcium', 'biboy poh', 1, 5, 1, 1, 0, '2051661-Kent-Beck-Quote-I-m-not-a-great-programmer-I-m-just-a-good.jpg'),
(14, '2019-02-22', '2019-02-23', 100, 'Bakit di ka crush ng crush mo?', 'Mahayag, Zamboanga del Sur', 'Ptr. Kirk Sarabia', 17, 5, 0, 1, 0, 'images (4).jpg'),
(18, '2019-01-21', '2019-01-26', 600, 'I love youth alive', 'Molave', 'Rev. John Smith', 1, 5, 1, 1, 0, '2018-05-31 02.02.32 1.jpg'),
(19, '2019-01-29', '2019-01-31', 10000, 'Ambot', 'asdasd', 'asdasasdas', 41, 5, 0, 0, 0, '2018-04-05 11.39.10 1.jpg'),
(38, '2019-02-18', '2019-02-21', 120, 'Sample theme', 'Araneta Calcium', 'Sir Sir Sir', 40, 5, 0, 1, 0, 'back5.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `eventactivities`
--

CREATE TABLE `eventactivities` (
  `id` int(11) NOT NULL,
  `eventDaysID` int(11) NOT NULL,
  `startTime` varchar(100) NOT NULL,
  `endTime` varchar(100) NOT NULL,
  `description` varchar(200) NOT NULL,
  `inCharge` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `eventactivities`
--

INSERT INTO `eventactivities` (`id`, `eventDaysID`, `startTime`, `endTime`, `description`, `inCharge`) VALUES
(30, 44, '01:00 PM', '05:00 PM', 'Arrival of delegates', 'HOst Church'),
(31, 45, '05:00 AM', '06:00 AM', 'Devotional', 'Ptr. Regie'),
(32, 44, '05:01 PM', '06:00 PM', 'Dinner Time', 'Host Church'),
(33, 46, '05:00 AM', '06:00 AM', 'Devotional', 'Ptr. Henry'),
(34, 47, '05:00 AM', '06:00 AM', 'Devotional', 'Ptr. Ramil'),
(35, 47, '06:01 AM', '07:00 AM', 'Breakfast', 'Host church'),
(36, 47, '07:00 AM', '12:00 PM', 'Home sweet home..', 'Delegates'),
(37, 48, '06:00 AM', '07:00 AM', 'Devotional', 'Name of in charge'),
(38, 73, '06:00 AM', '07:00 AM', 'agsdkhfgdkhj', ''),
(39, 73, '01:00 PM', '03:00 PM', 'Outdoor', 'sdkjsfdf'),
(40, 74, '03:33 PM', '04:44 PM', 'sdfdfgd', 'fgdfg'),
(41, 75, '05:00 AM', '06:00 AM', 'devotional', 'srgrthsWRGE'),
(42, 82, '05:00 AM', '06:00 AM', 'ghsioutgyhsidlkbjzdcjb', 'uivb xvhj bifw'),
(43, 83, '04:00 AM', '05:00 AM', 'Devotional', 'Biboy'),
(44, 83, '05:00 AM', '06:00 AM', 'Self preparation', 'By church'),
(45, 84, '04:00 AM', '05:00 AM', 'Devotional', 'Biboy'),
(46, 84, '11:00 PM', '12:00 PM', 'Lunch', 'By Church'),
(47, 84, '05:00 AM', '06:00 AM', 'Self preparation', 'By church'),
(48, 83, '11:00 PM', '12:00 PM', 'Lunch', 'By church'),
(49, 269, '04:00 AM', '05:00 AM', 'Devotional', 'Biboy'),
(50, 270, '04:00 AM', '05:00 AM', 'Devotional', 'Biboy'),
(51, 271, '04:00 AM', '05:00 AM', 'Devotional', 'Biboy'),
(52, 272, '04:00 AM', '05:00 PM', 'Devotional', 'Biboy'),
(53, 273, '04:00 AM', '05:00 AM', 'Devotional', 'Biboy'),
(54, 274, '04:00 AM', '05:00 AM', 'Devotional', 'Biboy'),
(55, 269, '05:00 AM', '06:00 AM', 'Breakfast', 'By church'),
(56, 269, '06:00 AM', '07:00 AM', 'gsgsdfgdfgdf', 'asdasd');

-- --------------------------------------------------------

--
-- Table structure for table `eventdays`
--

CREATE TABLE `eventdays` (
  `id` int(11) NOT NULL,
  `batchID` int(11) NOT NULL,
  `day` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `eventdays`
--

INSERT INTO `eventdays` (`id`, `batchID`, `day`) VALUES
(44, 9, '1'),
(45, 9, '2'),
(46, 9, '3'),
(47, 9, '4'),
(48, 10, '1'),
(49, 10, '2'),
(50, 10, '3'),
(51, 10, '4'),
(73, 11, '1'),
(74, 11, '2'),
(75, 11, '3'),
(82, 11, '4'),
(83, 14, '1'),
(84, 14, '2'),
(269, 18, '1'),
(270, 18, '2'),
(271, 18, '3'),
(272, 18, '4'),
(273, 18, '5'),
(274, 18, '6');

-- --------------------------------------------------------

--
-- Table structure for table `eventexpenses`
--

CREATE TABLE `eventexpenses` (
  `id` int(11) NOT NULL,
  `eventID` int(11) NOT NULL,
  `description` varchar(200) NOT NULL,
  `price` double(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `eventexpenses`
--

INSERT INTO `eventexpenses` (`id`, `eventID`, `description`, `price`) VALUES
(1, 18, 'Ball', 250.00),
(2, 18, 'Prizes', 300.00);

-- --------------------------------------------------------

--
-- Table structure for table `eventvisitor`
--

CREATE TABLE `eventvisitor` (
  `id` int(11) NOT NULL,
  `churchID` int(11) NOT NULL,
  `eventID` int(11) NOT NULL,
  `fullname` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `eventvisitor`
--

INSERT INTO `eventvisitor` (`id`, `churchID`, `eventID`, `fullname`) VALUES
(1, 1, 18, 'wakoko kokoaw'),
(2, 17, 18, 'Hello World'),
(3, 1, 18, 'My name');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `friendID` int(11) NOT NULL,
  `message` text NOT NULL,
  `seen` smallint(5) NOT NULL DEFAULT '0',
  `datedTime` datetime NOT NULL,
  `batchID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `userID`, `friendID`, `message`, `seen`, `datedTime`, `batchID`) VALUES
(5, 1, 17, 'hi', 1, '2018-12-07 13:14:31', 4),
(6, 17, 1, 'hello..', 1, '2018-12-07 13:16:31', 5),
(7, 17, 1, 'hey! Are you there..?', 1, '2018-12-07 13:17:31', 5),
(9, 1, 17, 'Sorry, Im busy..', 1, '2018-12-07 14:10:27', 6),
(10, 17, 1, 'Ah.. okay just take your time..', 1, '2018-12-07 14:10:27', 7),
(11, 1, 17, 'It\'s okay..', 1, '2018-12-07 14:20:09', 8),
(12, 1, 17, 'hey...', 1, '2018-12-07 14:20:27', 8),
(13, 1, 17, 'hey!', 1, '2018-12-07 14:20:40', 8),
(14, 1, 17, 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\n					tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\n					quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\n					consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\n					cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\n					proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 1, '2018-12-07 14:21:54', 8),
(15, 17, 1, 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\r\n					tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\r\ndeserunt mollit anim id est laborum.', 1, '2018-12-07 14:21:54', 9),
(16, 17, 1, 'Sorry...', 1, '2018-12-07 14:21:54', 9),
(17, 1, 17, 'wakoko', 1, '2018-12-07 14:24:57', 10),
(18, 1, 17, 'jhasfgjahbfsd', 1, '2018-12-08 00:08:05', 10),
(21, 1, 23, 'hi..', 1, '2018-12-08 00:45:27', 13),
(22, 1, 17, 'hi..', 1, '2018-12-08 00:45:42', 10),
(23, 1, 23, 'hey.. Are you there.?', 1, '2018-12-08 00:45:59', 13),
(24, 1, 24, 'hi', 1, '2018-12-08 00:46:05', 14),
(25, 1, 25, 'hi', 1, '2018-12-08 00:46:12', 15),
(26, 1, 26, 'hi', 1, '2018-12-08 00:46:18', 16),
(27, 1, 17, 'helloooooooooww..!!!', 1, '2018-12-08 00:46:29', 10),
(28, 1, 24, 'sdfsdf', 1, '2018-12-08 00:46:37', 14),
(29, 1, 24, 'assd', 1, '2018-12-08 00:46:40', 14),
(30, 1, 25, 'asd', 1, '2018-12-08 00:46:43', 15),
(31, 1, 26, 'asd', 1, '2018-12-08 00:46:45', 16),
(32, 1, 17, 'hai', 1, '2018-12-09 14:59:58', 10),
(33, 26, 1, 'hi.. how are you?', 1, '2018-12-07 14:10:27', 17),
(34, 26, 1, 'hey....', 1, '2018-12-07 14:10:27', 17),
(35, 17, 1, 'hi pastor...', 1, '2018-12-10 05:17:13', 18),
(36, 17, 1, 'wakoko', 1, '2018-12-10 05:25:31', 18),
(37, 1, 17, 'what?', 1, '2018-12-10 05:34:55', 19),
(38, 17, 1, 'wala po...', 1, '2018-12-10 05:35:33', 20),
(39, 26, 1, 'pastor...', 1, '2018-12-10 05:38:37', 17),
(40, 23, 1, 'yes pastor...', 1, '2018-12-10 05:39:15', 21),
(41, 23, 1, 'hmmm', 1, '2018-12-10 05:39:27', 21),
(42, 23, 1, 'aw', 1, '2018-12-10 05:42:36', 21),
(43, 25, 1, 'hello pastor..', 1, '2018-12-10 05:43:28', 22),
(44, 25, 1, 'aw', 1, '2018-12-10 05:43:44', 22),
(45, 25, 1, 'dfjkshdl asldh ;adldhvb kadv lhjdv aldv mnm..', 1, '2018-12-10 05:44:42', 22),
(46, 25, 1, 'hahaii...', 1, '2018-12-10 05:47:37', 22),
(47, 26, 1, 'aw..', 1, '2018-12-10 05:51:50', 17),
(49, 24, 1, 'oie.. pastor kumusta..?', 1, '2018-12-10 06:02:53', 24),
(50, 24, 1, 'helow..', 1, '2018-12-10 06:03:04', 24),
(51, 1, 17, 'ahh okay..', 1, '2018-12-10 06:04:11', 25),
(52, 1, 23, 'oie oie oie..', 1, '2018-12-10 06:04:33', 26),
(53, 1, 26, 'weeeeeeeeeeeeeeeeeeeeeee..', 1, '2018-12-10 06:04:47', 27),
(54, 1, 25, 'ambot nimo day..!', 1, '2018-12-10 06:05:03', 28),
(55, 1, 24, 'helow...!', 1, '2018-12-10 06:05:13', 29),
(56, 26, 17, 'bai...', 1, '2018-12-10 06:05:51', 30),
(57, 23, 17, 'asdadasd', 1, '2018-12-10 06:06:26', 31),
(58, 23, 24, 'asdasd', 1, '2018-12-10 06:06:29', 32),
(59, 23, 25, 'asdasd', 1, '2018-12-10 06:06:32', 33),
(60, 23, 26, 'asdasd', 1, '2018-12-10 06:06:36', 34),
(61, 26, 24, 'fgdffd', 1, '2018-12-10 06:07:01', 35),
(62, 26, 25, 'sdfsdf', 1, '2018-12-10 06:07:06', 36),
(63, 25, 17, 'sdfsdfsdf', 1, '2018-12-10 06:07:35', 37),
(64, 25, 23, 'ffssdfsdfsdf', 1, '2018-12-10 06:07:42', 38),
(65, 25, 24, 'asdsfsdf', 1, '2018-12-10 06:07:46', 39),
(66, 25, 26, 'sdfsdfsdf', 1, '2018-12-10 06:07:50', 40),
(67, 24, 17, 'fsgrhfgbg', 1, '2018-12-10 06:08:33', 41),
(68, 24, 23, 'asdasfdffgfg', 1, '2018-12-10 06:08:53', 42),
(69, 24, 25, 'dbkjnboieu oruedfdf', 1, '2018-12-10 06:09:06', 43),
(70, 24, 26, 'tiouhilkbjd', 1, '2018-12-10 06:09:20', 44),
(71, 17, 26, 'oi...', 1, '2018-12-10 06:09:47', 45),
(72, 17, 1, 'afsdfdsfsdf', 1, '2018-12-10 06:11:20', 46),
(73, 26, 1, 'dfdf', 1, '2018-12-10 06:11:39', 47),
(74, 1, 26, 'trtrtrtr', 1, '2018-12-10 06:11:59', 48),
(75, 1, 17, 'aaasddsdasdadsads', 1, '2018-12-10 06:12:09', 49),
(76, 26, 1, 'wakokokokokokokok', 1, '2018-12-10 06:15:22', 50),
(77, 23, 1, 'ashjkgaskdjhkasjdhfadfsdf', 1, '2018-12-10 06:15:42', 51),
(78, 1, 23, 'asssdf', 1, '2018-12-10 06:16:37', 52),
(79, 26, 17, 'heheh', 1, '2018-12-10 06:18:27', 53),
(80, 26, 23, 'hehehe', 1, '2018-12-10 06:18:39', 54),
(81, 26, 24, 'ghjsghjhjg', 1, '2018-12-10 06:19:46', 55),
(82, 26, 25, 'sdjfhfsdhjf', 0, '2018-12-10 06:19:58', 56),
(83, 23, 25, 'asdasd', 1, '2018-12-10 06:23:45', 57),
(84, 23, 26, 'asd', 1, '2018-12-10 06:23:50', 58),
(85, 25, 23, 'wow', 1, '2018-12-10 06:24:53', 59),
(86, 25, 24, 'aw', 1, '2018-12-10 06:25:11', 60),
(87, 24, 25, 'as', 0, '2018-12-10 06:31:00', 61),
(88, 24, 26, 'fkvjhkfjhs', 0, '2018-12-10 06:31:05', 62),
(89, 17, 23, 'adasd', 1, '2018-12-10 06:32:00', 63),
(90, 17, 24, 'sfdf', 0, '2018-12-10 06:32:04', 64),
(91, 17, 25, 'sdfsdf', 0, '2018-12-10 06:32:16', 65),
(92, 17, 26, 'adwq', 1, '2018-12-10 06:32:19', 66),
(93, 17, 1, 'gerg', 1, '2018-12-10 06:32:37', 67),
(94, 26, 1, 'aw', 1, '2018-12-10 06:32:55', 50),
(95, 26, 17, 'dwa', 1, '2018-12-10 06:33:01', 68),
(96, 26, 23, 'd', 1, '2018-12-10 06:33:05', 69),
(97, 23, 26, 'werwe', 0, '2018-12-10 06:33:41', 70),
(98, 23, 17, 'vioodufoihdbkjfv,ms dvsadv aygdivuydvhb ajdyg ow8y \naw ausydg w9o7g wd\\ aduy g0wpe', 1, '2018-12-10 06:33:50', 71),
(99, 23, 25, 'wow pd', 0, '2018-12-10 06:34:01', 72),
(100, 17, 1, 'oie', 1, '2018-12-10 07:12:15', 67),
(101, 1, 17, 'oie.. mstah..', 1, '2018-12-10 07:12:34', 73),
(102, 1, 17, 'out sah ko ha..', 1, '2018-12-10 07:12:53', 73),
(103, 17, 1, 'cge2...', 1, '2018-12-10 07:12:58', 74),
(104, 17, 1, 'oie...', 1, '2018-12-10 07:25:58', 74),
(105, 17, 1, 'hey..', 1, '2018-12-10 07:26:34', 74),
(106, 1, 17, 'wow..', 1, '2018-12-10 07:27:03', 75),
(107, 1, 17, 'batig nawong', 1, '2018-12-10 09:54:48', 75),
(108, 17, 1, 'dexter igat', 1, '2018-12-10 09:54:37', 76),
(109, 17, 1, 'gsdsdgds', 1, '2018-12-10 09:54:50', 76),
(110, 1, 17, 'udgfskdjhsd[', 1, '2018-12-10 09:55:11', 77),
(111, 1, 17, 'skdjhfks', 1, '2018-12-10 09:55:17', 77),
(112, 1, 17, 'ksjdhfksdf', 1, '2018-12-10 09:55:21', 77),
(113, 17, 1, 'bayot dextear', 1, '2018-12-10 09:55:09', 78),
(114, 1, 17, 'sdfkuksdf', 1, '2018-12-10 09:55:33', 79),
(115, 17, 1, 'gsdgsgsd', 1, '2018-12-10 09:55:27', 80),
(116, 17, 23, 'aashjgaks', 0, '2019-01-14 01:14:04', 81),
(117, 17, 23, 'asjhvsdv', 0, '2019-01-14 01:14:08', 81),
(118, 1, 17, 'asgvfjsh,vsdgsd', 1, '2019-01-22 15:30:59', 82),
(119, 1, 23, 'advjhvbjvnsdvsd', 0, '2019-01-22 15:31:06', 52),
(120, 1, 24, 'asdasd', 0, '2019-01-22 15:31:08', 29),
(121, 1, 26, 'asdasdasd', 0, '2019-01-22 15:31:11', 83),
(122, 17, 1, 'imong mama..', 1, '2019-01-22 17:16:01', 84),
(123, 1, 23, 'halo\nborikat', 0, '2019-01-28 18:05:41', 52),
(124, 1, 23, 'lob ka nko ron', 0, '2019-01-28 18:06:12', 52);

-- --------------------------------------------------------

--
-- Table structure for table `ministry`
--

CREATE TABLE `ministry` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `mission` text NOT NULL,
  `vision` text NOT NULL,
  `assign` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ministry`
--

INSERT INTO `ministry` (`id`, `name`, `mission`, `vision`, `assign`) VALUES
(3, 'Mens', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\n			tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\n			quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\n			consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\n			cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\n			proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '1', 1),
(4, 'Womens', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\n			tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\n			quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\n			consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\n			cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\n			proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '1', 1),
(5, 'Youth Alive', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\n			tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\n			quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\n			consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\n			cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\n			proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '1', 1),
(6, 'Kids', '', '1', 1),
(8, 'Pastors Kids', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\n			tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\n			quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\n			consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\n			cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\n			proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '1', 0);

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `id` int(11) NOT NULL,
  `eventID` int(11) NOT NULL,
  `ministryID` int(11) NOT NULL,
  `seenadmin` smallint(5) NOT NULL DEFAULT '0',
  `seencoordinator` smallint(5) NOT NULL DEFAULT '0',
  `approve` smallint(5) NOT NULL DEFAULT '0',
  `eraseadmin` smallint(5) NOT NULL DEFAULT '0',
  `erasecoordinator` smallint(5) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `notification`
--

INSERT INTO `notification` (`id`, `eventID`, `ministryID`, `seenadmin`, `seencoordinator`, `approve`, `eraseadmin`, `erasecoordinator`) VALUES
(13, 38, 5, 1, 1, 1, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `pastor`
--

CREATE TABLE `pastor` (
  `id` int(11) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `middlename` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `address` varchar(200) NOT NULL,
  `contactNo` varchar(30) NOT NULL DEFAULT '---',
  `code` varchar(100) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `status` smallint(3) NOT NULL DEFAULT '0',
  `host` smallint(5) NOT NULL DEFAULT '0',
  `image` varchar(200) NOT NULL,
  `bday` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pastor`
--

INSERT INTO `pastor` (`id`, `firstname`, `middlename`, `lastname`, `address`, `contactNo`, `code`, `gender`, `status`, `host`, `image`, `bday`) VALUES
(39, 'Antonio', 'Abunas', 'Cuevas, Jr.', 'Molave, Zamboanga del Sur', '09197008269', 'wakoko123', 'Male', 0, 0, 'FB_IMG_15125658445674210.jpg', '1975-07-09'),
(40, 'Shielou Mae', 'Pineda', 'Magbanua', 'Ramon Magsaysay, Zamboanga del Sur', '09467633207', 'm9l35On7', 'Female', 0, 0, 'logo.png', '1990-12-10'),
(41, 'George', 'Malmis', 'Lumasag', 'Culo, Molave, Zamboanga del Sur', '---', '2fj46j29', 'Male', 0, 0, 'logo.png', '1957-01-29'),
(42, 'Feliciano', 'Fiel', 'Libre, Sr.', 'Dapiwak, Zamboanga del Sur', '0907554662', 'P721Rq4w', 'Male', 0, 0, 'logo.png', '1946-01-30'),
(43, 'Nelson', 'Benecil', 'Arnoco', 'Sominot, Zamboanga del Sur', '09499122361', 'u3329080', 'Male', 0, 0, 'logo.png', '1970-08-05'),
(44, 'Daniel', 'Sampayan', 'Pelayo', 'Tungawan, Sominot, Zamboanga del Sur', '09104098114', '1p466w03', 'Male', 0, 0, 'logo.png', '1970-02-19'),
(45, 'Roland', 'Mandao', 'Tumagna', 'Esperanza, Ramon Magsaysay, Zamboanga del Sur', '09107441643', 'UIqoF688', 'Male', 0, 0, 'logo.png', '1981-08-09'),
(46, 'Glenn Jeoriel', 'Dela Cruz', 'Acal', 'Ramon Magsaysay, Zamboanga del Sur', '09381706990', 'ramon123', 'Male', 0, 0, 'logo.png', '1990-10-04'),
(47, 'Regie', 'Lapar', 'Baclaan', 'Molave, Zamboanga del Sur', '09101781234', '7l715rZi', 'Male', 0, 0, 'logo.png', '1983-10-30'),
(48, 'Mariel', 'Obowon', 'Chavez', 'Gonosan, Molave, Zamboanga del Sur', '09265106102', '9L23313c', 'Male', 0, 0, 'logo.png', '1991-03-03'),
(49, 'Arnel', 'Pepito', 'Palahang', 'Lumponid, Midsalip, Zamboanga del Sur', '09091985867', 'M1AuX0H7', 'Male', 0, 0, 'logo.png', '1974-03-01'),
(50, 'Nolly', 'Gorre', 'Reyes', 'Tambulig, Zamboanga del Sur', '09207981343', '3F047U9d', 'Male', 0, 0, 'logo.png', '1978-04-24'),
(51, 'Lorna', 'Sacil', 'Reyes', 'Tambulig, Zamboanga del Sur', '09207981328', '94A9780r', 'Female', 0, 0, 'logo.png', '1981-05-20'),
(52, 'Liezl', 'Tizon', 'Abellano', 'Josefina, Zamboanga del Sur', '09108240159', 'lC5thg22', 'Male', 0, 0, 'logo.png', '1988-03-04'),
(53, 'Paul Edward', 'Cadena', 'Abellano', 'Josefina, Zamboanga del Sur', '09108240159', '527k0X6I', 'Male', 0, 0, 'logo.png', '1990-07-07'),
(54, 'James', 'Albios', 'Dahunan', 'Dumingag, Zamboanga del Sur', '09094354514', 'zUZH5dw9', 'Male', 0, 0, 'logo.png', '1984-09-23'),
(55, 'Henry', 'Mananawong', 'Aguipo', 'Mahayag, Zamboanga del Sur', '09103277150', 'u9kW19Eb', 'Male', 0, 0, 'logo.png', '1987-03-25'),
(56, 'Airess', 'Gorre', 'Aguipo', 'Mahayag, Zamboanga del Sur', '---', 'n32CsW6A', 'Female', 0, 0, 'logo.png', '1988-05-11'),
(57, 'Esther', 'Tuba', 'Retiza', 'Sominot, Zamboanga del Sur', '---', '5d3z77Ki', 'Female', 0, 0, 'logo.png', '1960-08-08'),
(58, 'Marieta', 'Jarabe', 'Escalante', 'Mahayag, Zamboanga del Sur', '09297131463', 'marieta123', 'Female', 0, 0, 'logo.png', '1957-10-13'),
(59, 'Tito', 'Tado', 'Escalante', 'Mahayag, Zamboanga del Sur', '09999609024', 'EOgO5855', 'Male', 0, 0, 'logo.png', '1958-05-06'),
(60, 'Guadencio', 'Guylan', 'Pelayo, Sr.', 'Dumingag, Zamboanga del Sur', '09465780176', 'c7HeoO32', 'Male', 0, 0, 'logo.png', '1940-10-28');

-- --------------------------------------------------------

--
-- Table structure for table `report`
--

CREATE TABLE `report` (
  `id` int(11) NOT NULL,
  `eventID` int(11) NOT NULL,
  `purpose` varchar(200) NOT NULL,
  `price` double(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `sample`
--

CREATE TABLE `sample` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sample`
--

INSERT INTO `sample` (`id`, `name`) VALUES
(1, 'wakoko'),
(2, 'wakoko');

-- --------------------------------------------------------

--
-- Table structure for table `transferrequest`
--

CREATE TABLE `transferrequest` (
  `id` int(11) NOT NULL,
  `toChurchID` int(11) NOT NULL,
  `fromChurchID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `reason` text NOT NULL,
  `approve` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transferrequest`
--

INSERT INTO `transferrequest` (`id`, `toChurchID`, `fromChurchID`, `userID`, `reason`, `approve`) VALUES
(4, 17, 1, 13, 'asdfsdfsdf', 1),
(5, 1, 1, 13, 'wakokoko', 1),
(6, 17, 1, 13, 'awdsddfgfgds', 1),
(7, 1, 17, 13, 'uyyuyu', 1),
(8, 17, 1, 19, 'Iwbshsjbbss', 1),
(9, 1, 40, 22, 'transfer of residence', 1),
(10, 17, 1, 13, 'wala lng..', 1),
(11, 17, 1, 16, 'wakoko123', 1),
(12, 1, 17, 13, 'urgdhdbb', 1),
(13, 1, 17, 16, 'yxvkf', 1),
(14, 1, 17, 19, 'reason', 1),
(15, 17, 1, 13, 'wsefdfsd', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `middlename` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `gender` varchar(20) NOT NULL DEFAULT '---',
  `bday` date DEFAULT '0000-00-00',
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `address` varchar(150) NOT NULL DEFAULT 'Not set..',
  `contactNo` varchar(20) NOT NULL,
  `position` varchar(50) NOT NULL,
  `image` varchar(200) NOT NULL,
  `cover` varchar(200) NOT NULL DEFAULT 'back6.jpg',
  `status` int(5) NOT NULL DEFAULT '0',
  `ministryID` int(11) NOT NULL,
  `typing` smallint(5) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `middlename`, `lastname`, `gender`, `bday`, `username`, `password`, `address`, `contactNo`, `position`, `image`, `cover`, `status`, `ministryID`, `typing`) VALUES
(1, 'Jun', 'A', 'Cuevas', 'Male', '1992-04-15', 'admin', 'admin', 'Molave, Zamboanga del Sur', '09502239753', 'Administrator', 'Developer-Love-4.jpg', 'becausehelives.jpg', 0, 0, 0),
(17, 'Biboy', 'A', 'Langomez', 'Male', '1996-06-12', '', 'biboy', 'Pagadian City', '442312', 'Youth Alive Coordinator', 'C360_2017-12-09-14-14-07-015.jpg', 'expertBackground.jpg', 0, 5, 0),
(23, 'Mario', 'ano', 'Langomez', '---', '0000-00-00', '', 'mens', 'Not set..', '32164', 'Mens Coordinator', 'C360_2018-06-17-08-52-49-755.jpg', 'back6.jpg', 0, 3, 0),
(24, 'yureter', 'terterty', 'tyutyutyu', '---', '0000-00-00', '', 'womens', 'Not set..', '4531231', 'Womens Coordinator', 'C360_2018-04-16-21-25-25-350.jpg', 'back6.jpg', 0, 4, 0),
(26, 'fuijxfxv', 'zxfbz', 'zxfcgnxbzx', '---', '0000-00-00', '', 'kids', 'Not set..', '7863553', 'Kids Coordinator', '37408985_1879125478841183_6552897144708136960_n.jpg', 'back6.jpg', 0, 6, 0);

-- --------------------------------------------------------

--
-- Table structure for table `visitor`
--

CREATE TABLE `visitor` (
  `id` int(11) NOT NULL,
  `eventID` int(11) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `churchID` int(11) NOT NULL,
  `pending` smallint(5) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activitiesdays`
--
ALTER TABLE `activitiesdays`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `batchnumber`
--
ALTER TABLE `batchnumber`
  ADD PRIMARY KEY (`batchNumber`);

--
-- Indexes for table `chatting`
--
ALTER TABLE `chatting`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `church`
--
ALTER TABLE `church`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `hostPastorID` (`hostPastorID`);

--
-- Indexes for table `churchmember`
--
ALTER TABLE `churchmember`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `firstname` (`firstname`,`middlename`,`lastname`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `churchID` (`churchID`),
  ADD KEY `ministryID` (`ministryID`);

--
-- Indexes for table `delegates`
--
ALTER TABLE `delegates`
  ADD PRIMARY KEY (`id`),
  ADD KEY `churchID` (`churchID`),
  ADD KEY `eventID` (`eventID`),
  ADD KEY `memberID` (`memberID`);

--
-- Indexes for table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `dateStart` (`dateStart`,`dateEnd`),
  ADD KEY `hostChurch` (`hostChurch`),
  ADD KEY `ministryID` (`ministryID`);

--
-- Indexes for table `eventactivities`
--
ALTER TABLE `eventactivities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `eventdays`
--
ALTER TABLE `eventdays`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `batchID` (`batchID`,`day`);

--
-- Indexes for table `eventexpenses`
--
ALTER TABLE `eventexpenses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `eventvisitor`
--
ALTER TABLE `eventvisitor`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ministry`
--
ALTER TABLE `ministry`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pastor`
--
ALTER TABLE `pastor`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `firstname` (`firstname`,`middlename`,`lastname`);

--
-- Indexes for table `report`
--
ALTER TABLE `report`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sample`
--
ALTER TABLE `sample`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transferrequest`
--
ALTER TABLE `transferrequest`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `firstname` (`firstname`,`middlename`,`lastname`);

--
-- Indexes for table `visitor`
--
ALTER TABLE `visitor`
  ADD PRIMARY KEY (`id`),
  ADD KEY `churchID` (`churchID`),
  ADD KEY `eventID` (`eventID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activitiesdays`
--
ALTER TABLE `activitiesdays`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `batchnumber`
--
ALTER TABLE `batchnumber`
  MODIFY `batchNumber` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;
--
-- AUTO_INCREMENT for table `chatting`
--
ALTER TABLE `chatting`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `church`
--
ALTER TABLE `church`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;
--
-- AUTO_INCREMENT for table `churchmember`
--
ALTER TABLE `churchmember`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT for table `delegates`
--
ALTER TABLE `delegates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `event`
--
ALTER TABLE `event`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;
--
-- AUTO_INCREMENT for table `eventactivities`
--
ALTER TABLE `eventactivities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;
--
-- AUTO_INCREMENT for table `eventdays`
--
ALTER TABLE `eventdays`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=275;
--
-- AUTO_INCREMENT for table `eventexpenses`
--
ALTER TABLE `eventexpenses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `eventvisitor`
--
ALTER TABLE `eventvisitor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=125;
--
-- AUTO_INCREMENT for table `ministry`
--
ALTER TABLE `ministry`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `pastor`
--
ALTER TABLE `pastor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;
--
-- AUTO_INCREMENT for table `report`
--
ALTER TABLE `report`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `sample`
--
ALTER TABLE `sample`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `transferrequest`
--
ALTER TABLE `transferrequest`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
--
-- AUTO_INCREMENT for table `visitor`
--
ALTER TABLE `visitor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `church`
--
ALTER TABLE `church`
  ADD CONSTRAINT `church_ibfk_1` FOREIGN KEY (`hostPastorID`) REFERENCES `pastor` (`id`);

--
-- Constraints for table `churchmember`
--
ALTER TABLE `churchmember`
  ADD CONSTRAINT `churchmember_ibfk_1` FOREIGN KEY (`churchID`) REFERENCES `church` (`id`),
  ADD CONSTRAINT `churchmember_ibfk_2` FOREIGN KEY (`ministryID`) REFERENCES `ministry` (`id`);

--
-- Constraints for table `delegates`
--
ALTER TABLE `delegates`
  ADD CONSTRAINT `delegates_ibfk_1` FOREIGN KEY (`churchID`) REFERENCES `church` (`id`),
  ADD CONSTRAINT `delegates_ibfk_2` FOREIGN KEY (`eventID`) REFERENCES `event` (`id`),
  ADD CONSTRAINT `delegates_ibfk_3` FOREIGN KEY (`memberID`) REFERENCES `churchmember` (`id`);

--
-- Constraints for table `event`
--
ALTER TABLE `event`
  ADD CONSTRAINT `event_ibfk_1` FOREIGN KEY (`hostChurch`) REFERENCES `church` (`id`),
  ADD CONSTRAINT `event_ibfk_2` FOREIGN KEY (`ministryID`) REFERENCES `ministry` (`id`);

--
-- Constraints for table `visitor`
--
ALTER TABLE `visitor`
  ADD CONSTRAINT `visitor_ibfk_1` FOREIGN KEY (`churchID`) REFERENCES `church` (`id`),
  ADD CONSTRAINT `visitor_ibfk_2` FOREIGN KEY (`eventID`) REFERENCES `event` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
