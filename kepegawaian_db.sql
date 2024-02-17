-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 17, 2024 at 08:22 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kepegawaian_db`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `DeleteEmployee` (IN `p_employee_id` INT)   BEGIN
    DELETE FROM employee WHERE employee_id = p_employee_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `DeletePosition` (IN `p_position_id` INT)   BEGIN
    DELETE FROM position WHERE position_id = p_position_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `FetchEmployees` ()   BEGIN
    SELECT employee.*, position.position_name, position.salary
    FROM employee
    LEFT JOIN position ON employee.position_id = position.position_id
    ORDER BY employee.employee_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `FetchPositions` ()   BEGIN
    SELECT *
    FROM position
    ORDER BY position.position_name;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetEmployeeById` (IN `p_employee_id` INT)   BEGIN
    SELECT * FROM employee WHERE employee_id = p_employee_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetPositionById` (IN `p_position_id` INT)   BEGIN
    SELECT * FROM position WHERE position_id = p_position_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertEmployee` (IN `p_employee_name` VARCHAR(255), IN `p_email` VARCHAR(255), IN `p_position_id` INT)   BEGIN
    INSERT INTO employee (employee_name, email, position_id)
    VALUES (p_employee_name, p_email, p_position_id);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertPosition` (IN `p_position_name` VARCHAR(255), IN `p_salary` INT)   BEGIN
    INSERT INTO position (position_name, salary)
    VALUES (p_position_name, p_salary);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateEmployee` (IN `p_employee_id` INT, IN `p_employee_name` VARCHAR(255), IN `p_email` VARCHAR(255), IN `p_position_id` INT)   BEGIN
    UPDATE employee 
    SET employee_name = p_employee_name, 
        email = p_email, 
        position_id = p_position_id 
    WHERE employee_id = p_employee_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdatePosition` (IN `p_position_id` INT, IN `p_position_name` VARCHAR(255), IN `p_salary` INT)   BEGIN
    UPDATE position 
    SET position_name = p_position_name, 
        salary = p_salary
    WHERE position_id = p_position_id;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `employee_id` int(11) NOT NULL,
  `employee_name` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `position_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`employee_id`, `employee_name`, `email`, `position_id`) VALUES
(101, 'John Smith', 'john.smith@example.com', 3),
(102, 'Emily Johnson', 'emily.johnson@example.com', 5),
(103, 'Michael Davis', 'michael.davis@example.com', 2),
(104, 'Sarah Brown', 'sarah.brown@example.com', 4),
(105, 'David Wilson', 'david.wilson@example.com', 1);

-- --------------------------------------------------------

--
-- Table structure for table `position`
--

CREATE TABLE `position` (
  `position_id` int(11) NOT NULL,
  `position_name` varchar(50) DEFAULT NULL,
  `salary` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `position`
--

INSERT INTO `position` (`position_id`, `position_name`, `salary`) VALUES
(1, 'Software Engineer', 80000),
(2, 'Marketing Manager', 75000),
(3, 'Data Analyst', 70000),
(4, 'Sales Representative', 60000),
(5, 'Human Resources Specialist', 65000);

--
-- Triggers `position`
--
DELIMITER $$
CREATE TRIGGER `BeforeDeletePosition` BEFORE DELETE ON `position` FOR EACH ROW BEGIN
    DECLARE employee_count INT;

    -- Periksa apakah ada pegawai yang memiliki posisi ini
    SELECT COUNT(*) INTO employee_count FROM employee WHERE position_id = OLD.position_id;

    -- Bila ada, penghapusan dibatalkan
    IF employee_count > 0 THEN
        SIGNAL SQLSTATE '45000';
    END IF;
END
$$
DELIMITER ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`employee_id`),
  ADD KEY `FK_Pegawai_Posisi` (`position_id`);

--
-- Indexes for table `position`
--
ALTER TABLE `position`
  ADD PRIMARY KEY (`position_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `employee_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;

--
-- AUTO_INCREMENT for table `position`
--
ALTER TABLE `position`
  MODIFY `position_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `FK_Pegawai_Posisi` FOREIGN KEY (`position_id`) REFERENCES `position` (`position_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
