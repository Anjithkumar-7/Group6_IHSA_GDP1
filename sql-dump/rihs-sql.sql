-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: rihs
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` text COLLATE utf8mb4_general_ci NOT NULL,
  `password` text COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'admin','admin');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `announcements`
--

DROP TABLE IF EXISTS `announcements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `announcements` (
  `AnnouncementID` int NOT NULL AUTO_INCREMENT,
  `EventID` int DEFAULT NULL,
  `Title` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Content` text COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`AnnouncementID`) USING BTREE,
  KEY `EventID` (`EventID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `announcements`
--

LOCK TABLES `announcements` WRITE;
/*!40000 ALTER TABLE `announcements` DISABLE KEYS */;
/*!40000 ALTER TABLE `announcements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classes`
--

DROP TABLE IF EXISTS `classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classes` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `EventID` int DEFAULT NULL,
  `classname` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `isAdded` int NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `EventID` (`EventID`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classes`
--

LOCK TABLES `classes` WRITE;
/*!40000 ALTER TABLE `classes` DISABLE KEYS */;
INSERT INTO `classes` VALUES (18,2,'Class 2B – Novice Hunter Seat Equitation- Section A',0),(19,2,'Class 3 – Limit Hunter Seat Equitation on the Flat- Section A',0),(20,2,'Class 1 – Introductory Hunter Seat Equitation',0),(21,2,'Class 2B – Novice Hunter Seat Equitation- Section B',0),(22,2,'Class 2A – Pre-Novice Hunter Seat Equitation- Section B',0),(23,2,'Class 3 – Limit Hunter Seat Equitation on the Flat- Section C',0),(24,2,'Class 2A – Pre-Novice Hunter Seat Equitation- Section A',0),(25,2,'Class 7 – Open Hunter Seat Equitation on the Flat',0),(26,2,'Class 3 – Limit Hunter Seat Equitation on the Flat- Section B',0),(27,2,'Class 1 – Introductory Hunter Seat Equitation- Section Heat B',0),(28,2,'Class 2B – Novice Hunter Seat Equitation- Section C',0),(29,2,'Class 2B – Pre-Novice Hunter Seat Equitation- Section C',0),(30,2,'Class 4 – Limit Hunter Seat Equitation over Fences- Section A',0),(31,2,'Class 5 – Intermediate Hunter Seat Equitation on the Flat',0),(32,2,'Class 6 – Intermediate Hunter Seat Equitation over Fences',0),(33,2,'Class 8 – Open Hunter Seat Equitation over Fences',0),(34,2,'Class 4 – Limit Hunter Seat Equitation over Fences- Section B',0);
/*!40000 ALTER TABLE `classes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `combinations`
--

DROP TABLE IF EXISTS `combinations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `combinations` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `EventID` int DEFAULT NULL,
  `ClassName` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `RiderName` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `HorseName` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `EventID` (`EventID`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `combinations`
--

LOCK TABLES `combinations` WRITE;
/*!40000 ALTER TABLE `combinations` DISABLE KEYS */;
INSERT INTO `combinations` VALUES (15,2,'Class 1 – Introductory Hunter Seat Equitation','Jaycie Doerr','Oscar'),(16,2,'Class 1 – Introductory Hunter Seat Equitation','Scott Hoglund','Daisy'),(17,2,'Class 1 – Introductory Hunter Seat Equitation','Cierra Luckett','Scarlet'),(18,2,'Class 1 – Introductory Hunter Seat Equitation','Kaitlyn Rechtermann','Gwen'),(19,2,'Class 1 – Introductory Hunter Seat Equitation','Kaitlyn Rhime','Bruce'),(20,2,'Class 1 – Introductory Hunter Seat Equitation','Stacy Behnke','Sparkle'),(21,2,'Class 1 – Introductory Hunter Seat Equitation','Emily Oravetz','Rowan'),(22,2,'Class 1 – Introductory Hunter Seat Equitation','Emily Simmons','Sunny'),(23,2,'Class 2B – Novice Hunter Seat Equitation- Section A','Anna Taylor','Gordon'),(24,2,'Class 2B – Novice Hunter Seat Equitation- Section A','Isabelle Ruiz','Bruce'),(25,2,'Class 2B – Novice Hunter Seat Equitation- Section A','Emma Lowe','Pepper'),(26,2,'Class 2B – Novice Hunter Seat Equitation- Section A','Anna Rogula','Trash'),(27,2,'Class 2B – Novice Hunter Seat Equitation- Section A','Taylor Akins','Admiral'),(28,2,'Class 2B – Novice Hunter Seat Equitation- Section A','Lauren Andrews','Lottie');
/*!40000 ALTER TABLE `combinations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `EventID` int NOT NULL AUTO_INCREMENT,
  `EventName` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `EventDate` text COLLATE utf8mb4_general_ci,
  `EventLocation` text COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`EventID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (1,'Event1','2023-10-02 11:22','Manhattan'),(2,'Event2','2023-10-03 14:33','Manhattan'),(3,'test event three','2023-11-15 16:15','Missouri');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `horsepoints`
--

DROP TABLE IF EXISTS `horsepoints`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `horsepoints` (
  `id` int NOT NULL AUTO_INCREMENT,
  `horsename` varchar(100) NOT NULL,
  `points` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `horsename_UNIQUE` (`horsename`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `horsepoints`
--

LOCK TABLES `horsepoints` WRITE;
/*!40000 ALTER TABLE `horsepoints` DISABLE KEYS */;
INSERT INTO `horsepoints` VALUES (1,'Gordon',55);
/*!40000 ALTER TABLE `horsepoints` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `horses`
--

DROP TABLE IF EXISTS `horses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `horses` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `EventID` int DEFAULT NULL,
  `Name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Provider` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Spurs` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Rein_hold` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Class` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Remarks` text COLLATE utf8mb4_general_ci,
  `file_name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `EventID` (`EventID`)
) ENGINE=InnoDB AUTO_INCREMENT=195 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `horses`
--

LOCK TABLES `horses` WRITE;
/*!40000 ALTER TABLE `horses` DISABLE KEYS */;
INSERT INTO `horses` VALUES (98,2,'Bruce',NULL,NULL,NULL,'Class 1 – Introductory Hunter Seat Equitation',NULL,'SundayHorseDetails (1).xlsx'),(99,2,'Daisy',NULL,NULL,NULL,'Class 1 – Introductory Hunter Seat Equitation',NULL,'SundayHorseDetails (1).xlsx'),(100,2,'Gwen',NULL,NULL,NULL,'Class 1 – Introductory Hunter Seat Equitation',NULL,'SundayHorseDetails (1).xlsx'),(101,2,'Oscar',NULL,NULL,NULL,'Class 1 – Introductory Hunter Seat Equitation',NULL,'SundayHorseDetails (1).xlsx'),(102,2,'Sparkle',NULL,NULL,NULL,'Class 1 – Introductory Hunter Seat Equitation',NULL,'SundayHorseDetails (1).xlsx'),(103,2,'Rowan',NULL,NULL,NULL,'Class 1 – Introductory Hunter Seat Equitation',NULL,'SundayHorseDetails (1).xlsx'),(104,2,'Sunny',NULL,NULL,NULL,'Class 1 – Introductory Hunter Seat Equitation',NULL,'SundayHorseDetails (1).xlsx'),(105,2,'Scarlet',NULL,NULL,NULL,'Class 1 – Introductory Hunter Seat Equitation',NULL,'SundayHorseDetails (1).xlsx'),(106,2,'Gwen',NULL,NULL,NULL,'Class 2A – Pre-Novice Hunter Seat Equitation- Section A',NULL,'SundayHorseDetails (1).xlsx'),(107,2,'Oscar',NULL,NULL,NULL,'Class 2A – Pre-Novice Hunter Seat Equitation- Section A',NULL,'SundayHorseDetails (1).xlsx'),(108,2,'Pepper',NULL,NULL,NULL,'Class 2A – Pre-Novice Hunter Seat Equitation- Section A',NULL,'SundayHorseDetails (1).xlsx'),(109,2,'Rowan',NULL,NULL,NULL,'Class 2A – Pre-Novice Hunter Seat Equitation- Section A',NULL,'SundayHorseDetails (1).xlsx'),(110,2,'Smolder',NULL,NULL,NULL,'Class 2A – Pre-Novice Hunter Seat Equitation- Section A',NULL,'SundayHorseDetails (1).xlsx'),(111,2,'Gwen',NULL,NULL,NULL,'Class 2A – Pre-Novice Hunter Seat Equitation- Section B',NULL,'SundayHorseDetails (1).xlsx'),(112,2,'Oscar',NULL,NULL,NULL,'Class 2A – Pre-Novice Hunter Seat Equitation- Section B',NULL,'SundayHorseDetails (1).xlsx'),(113,2,'Rowan',NULL,NULL,NULL,'Class 2A – Pre-Novice Hunter Seat Equitation- Section B',NULL,'SundayHorseDetails (1).xlsx'),(114,2,NULL,NULL,NULL,NULL,NULL,NULL,'SundayHorseDetails (1).xlsx'),(115,2,NULL,NULL,NULL,NULL,NULL,NULL,'SundayHorseDetails (1).xlsx'),(116,2,NULL,NULL,NULL,NULL,NULL,NULL,'SundayHorseDetails (1).xlsx'),(117,2,'Bruce',NULL,NULL,NULL,'Class 2B – Novice Hunter Seat Equitation- Section A',NULL,'SundayHorseDetails (1).xlsx'),(118,2,NULL,NULL,NULL,NULL,NULL,NULL,'SundayHorseDetails (1).xlsx'),(119,2,'Lottie',NULL,NULL,NULL,'Class 2B – Novice Hunter Seat Equitation- Section A',NULL,'SundayHorseDetails (1).xlsx'),(120,2,'Pepper',NULL,NULL,NULL,'Class 2B – Novice Hunter Seat Equitation- Section A',NULL,'SundayHorseDetails (1).xlsx'),(121,2,'Trash',NULL,NULL,NULL,'Class 2B – Novice Hunter Seat Equitation- Section A',NULL,'SundayHorseDetails (1).xlsx'),(122,2,NULL,NULL,NULL,NULL,NULL,NULL,'SundayHorseDetails (1).xlsx'),(123,2,NULL,NULL,NULL,NULL,NULL,NULL,'SundayHorseDetails (1).xlsx'),(124,2,'Lottie',NULL,NULL,NULL,'Class 2B – Novice Hunter Seat Equitation- Section B',NULL,'SundayHorseDetails (1).xlsx'),(125,2,'Pepper',NULL,NULL,NULL,'Class 2B – Novice Hunter Seat Equitation- Section B',NULL,'SundayHorseDetails (1).xlsx'),(126,2,'Oscar',NULL,NULL,NULL,'Class 2B – Novice Hunter Seat Equitation- Section B',NULL,'SundayHorseDetails (1).xlsx'),(127,2,'Smolder',NULL,NULL,NULL,'Class 2B – Novice Hunter Seat Equitation- Section B',NULL,'SundayHorseDetails (1).xlsx'),(128,2,NULL,NULL,NULL,NULL,NULL,NULL,'SundayHorseDetails (1).xlsx'),(129,2,'Bruce',NULL,NULL,NULL,'Class 2B – Novice Hunter Seat Equitation- Section C',NULL,'SundayHorseDetails (1).xlsx'),(130,2,NULL,NULL,NULL,NULL,NULL,NULL,'SundayHorseDetails (1).xlsx'),(131,2,'Trash',NULL,NULL,NULL,'Class 2B – Novice Hunter Seat Equitation- Section C',NULL,'SundayHorseDetails (1).xlsx'),(132,2,'Oscar',NULL,NULL,NULL,'Class 2B – Novice Hunter Seat Equitation- Section C',NULL,'SundayHorseDetails (1).xlsx'),(133,2,NULL,NULL,NULL,NULL,NULL,NULL,'SundayHorseDetails (1).xlsx'),(134,2,'Alice',NULL,NULL,NULL,'Class 3 – Limit Hunter Seat Equitation on the Flat- Section A',NULL,'SundayHorseDetails (1).xlsx'),(135,2,'Gwen',NULL,NULL,NULL,'Class 3 – Limit Hunter Seat Equitation on the Flat- Section A',NULL,'SundayHorseDetails (1).xlsx'),(136,2,'Sunny',NULL,NULL,NULL,'Class 3 – Limit Hunter Seat Equitation on the Flat- Section A',NULL,'SundayHorseDetails (1).xlsx'),(137,2,'Trash',NULL,NULL,NULL,'Class 3 – Limit Hunter Seat Equitation on the Flat- Section A',NULL,'SundayHorseDetails (1).xlsx'),(138,2,'TD',NULL,NULL,NULL,'Class 3 – Limit Hunter Seat Equitation on the Flat- Section A',NULL,'SundayHorseDetails (1).xlsx'),(139,2,NULL,NULL,NULL,NULL,NULL,NULL,'SundayHorseDetails (1).xlsx'),(140,2,'Marty',NULL,NULL,NULL,'Class 3 – Limit Hunter Seat Equitation on the Flat- Section A',NULL,'SundayHorseDetails (1).xlsx'),(141,2,'Sunny',NULL,NULL,NULL,'Class 3 – Limit Hunter Seat Equitation on the Flat- Section B',NULL,'SundayHorseDetails (1).xlsx'),(142,2,'TD',NULL,NULL,NULL,'Class 3 – Limit Hunter Seat Equitation on the Flat- Section B',NULL,'SundayHorseDetails (1).xlsx'),(143,2,NULL,NULL,NULL,NULL,NULL,NULL,'SundayHorseDetails (1).xlsx'),(144,2,'Bruce',NULL,NULL,NULL,'Class 3 – Limit Hunter Seat Equitation on the Flat- Section B',NULL,'SundayHorseDetails (1).xlsx'),(145,2,'Smolder',NULL,NULL,NULL,'Class 3 – Limit Hunter Seat Equitation on the Flat- Section B',NULL,'SundayHorseDetails (1).xlsx'),(146,2,'Roanie',NULL,NULL,NULL,'Class 3 – Limit Hunter Seat Equitation on the Flat- Section B',NULL,'SundayHorseDetails (1).xlsx'),(147,2,'Alice',NULL,NULL,NULL,'Class 3 – Limit Hunter Seat Equitation on the Flat- Section C',NULL,'SundayHorseDetails (1).xlsx'),(148,2,NULL,NULL,NULL,NULL,NULL,NULL,'SundayHorseDetails (1).xlsx'),(149,2,'Bruce',NULL,NULL,NULL,'Class 3 – Limit Hunter Seat Equitation on the Flat- Section C',NULL,'SundayHorseDetails (1).xlsx'),(150,2,'Smolder',NULL,NULL,NULL,'Class 3 – Limit Hunter Seat Equitation on the Flat- Section C',NULL,'SundayHorseDetails (1).xlsx'),(151,2,'Roanie',NULL,NULL,NULL,'Class 3 – Limit Hunter Seat Equitation on the Flat- Section C',NULL,'SundayHorseDetails (1).xlsx'),(152,2,'Admiral',NULL,NULL,NULL,'Class 4 – Limit Hunter Seat Equitation over Fences- Section A',NULL,'SundayHorseDetails (1).xlsx'),(153,2,'Lottie',NULL,NULL,NULL,'Class 4 – Limit Hunter Seat Equitation over Fences- Section A',NULL,'SundayHorseDetails (1).xlsx'),(154,2,'Rowan',NULL,NULL,NULL,'Class 4 – Limit Hunter Seat Equitation over Fences- Section A',NULL,'SundayHorseDetails (1).xlsx'),(155,2,'Roanie',NULL,NULL,NULL,'Class 4 – Limit Hunter Seat Equitation over Fences- Section A',NULL,'SundayHorseDetails (1).xlsx'),(156,2,'Smolder',NULL,NULL,NULL,'Class 4 – Limit Hunter Seat Equitation over Fences- Section A',NULL,'SundayHorseDetails (1).xlsx'),(157,2,'Sunny',NULL,NULL,NULL,'Class 4 – Limit Hunter Seat Equitation over Fences- Section A',NULL,'SundayHorseDetails (1).xlsx'),(158,2,'Admiral',NULL,NULL,NULL,'Class 4 – Limit Hunter Seat Equitation over Fences- Section B',NULL,'SundayHorseDetails (1).xlsx'),(159,2,'Lottie',NULL,NULL,NULL,'Class 4 – Limit Hunter Seat Equitation over Fences- Section B',NULL,'SundayHorseDetails (1).xlsx'),(160,2,'Roanie',NULL,NULL,NULL,'Class 4 – Limit Hunter Seat Equitation over Fences- Section B',NULL,'SundayHorseDetails (1).xlsx'),(161,2,'Smolder',NULL,NULL,NULL,'Class 4 – Limit Hunter Seat Equitation over Fences- Section B',NULL,'SundayHorseDetails (1).xlsx'),(162,2,'TD',NULL,NULL,NULL,'Class 4 – Limit Hunter Seat Equitation over Fences- Section B',NULL,'SundayHorseDetails (1).xlsx'),(163,2,'Trash',NULL,NULL,NULL,'Class 4 – Limit Hunter Seat Equitation over Fences- Section B',NULL,'SundayHorseDetails (1).xlsx'),(164,2,'Dayo',NULL,NULL,NULL,'Class 5 – Intermediate Hunter Seat Equitation on the Flat',NULL,'SundayHorseDetails (1).xlsx'),(165,2,'Clifford',NULL,NULL,NULL,'Class 5 – Intermediate Hunter Seat Equitation on the Flat',NULL,'SundayHorseDetails (1).xlsx'),(166,2,'Willard',NULL,NULL,NULL,'Class 5 – Intermediate Hunter Seat Equitation on the Flat',NULL,'SundayHorseDetails (1).xlsx'),(167,2,'Clifford',NULL,NULL,NULL,'Class 6 – Intermediate Hunter Seat Equitation over Fences',NULL,'SundayHorseDetails (1).xlsx'),(168,2,'Gonzo',NULL,NULL,NULL,'Class 6 – Intermediate Hunter Seat Equitation over Fences',NULL,'SundayHorseDetails (1).xlsx'),(169,2,'Redd',NULL,NULL,NULL,'Class 6 – Intermediate Hunter Seat Equitation over Fences',NULL,'SundayHorseDetails (1).xlsx'),(170,2,'Willard',NULL,NULL,NULL,'Class 6 – Intermediate Hunter Seat Equitation over Fences',NULL,'SundayHorseDetails (1).xlsx'),(171,2,'Roanie',NULL,NULL,NULL,'Class 6 – Intermediate Hunter Seat Equitation over Fences',NULL,'SundayHorseDetails (1).xlsx'),(172,2,'Dayo',NULL,NULL,NULL,'Class 6 – Intermediate Hunter Seat Equitation over Fences',NULL,'SundayHorseDetails (1).xlsx'),(173,2,'Dayo',NULL,NULL,NULL,'Class 7 – Open Hunter Seat Equitation on the Flat',NULL,'SundayHorseDetails (1).xlsx'),(174,2,'Willard',NULL,NULL,NULL,'Class 7 – Open Hunter Seat Equitation on the Flat',NULL,'SundayHorseDetails (1).xlsx'),(175,2,'Clifford',NULL,NULL,NULL,'Class 7 – Open Hunter Seat Equitation on the Flat',NULL,'SundayHorseDetails (1).xlsx'),(176,2,'Gonzo',NULL,NULL,NULL,'Class 7 – Open Hunter Seat Equitation on the Flat',NULL,'SundayHorseDetails (1).xlsx'),(177,2,'Dayo',NULL,NULL,NULL,'Class 8 – Open Hunter Seat Equitation over Fences',NULL,'SundayHorseDetails (1).xlsx'),(178,2,'Merlin',NULL,NULL,NULL,'Class 8 – Open Hunter Seat Equitation over Fences',NULL,'SundayHorseDetails (1).xlsx'),(179,2,'Clifford',NULL,NULL,NULL,'Class 8 – Open Hunter Seat Equitation over Fences',NULL,'SundayHorseDetails (1).xlsx'),(180,2,'Admiral',NULL,NULL,NULL,'Class 2B – Novice Hunter Seat Equitation- Section A',NULL,'SundayHorseDetails (1).xlsx'),(181,2,'Sparkle',NULL,NULL,NULL,'Class 2B – Novice Hunter Seat Equitation- Section C',NULL,'SundayHorseDetails (1).xlsx'),(182,2,'Redd',NULL,NULL,NULL,'Class 5 – Intermediate Hunter Seat Equitation on the Flat',NULL,'SundayHorseDetails (1).xlsx'),(183,2,'Moxie',NULL,NULL,NULL,'Class 6 – Intermediate Hunter Seat Equitation over Fences',NULL,'SundayHorseDetails (1).xlsx'),(184,2,'Marty',NULL,NULL,NULL,'Class 6 – Intermediate Hunter Seat Equitation over Fences',NULL,'SundayHorseDetails (1).xlsx'),(185,2,'Gordon',NULL,NULL,NULL,'Class 2A – Pre-Novice Hunter Seat Equitation- Section B',NULL,'SundayHorseDetails (1).xlsx'),(186,2,'Sparkle',NULL,NULL,NULL,'Class 2A – Pre-Novice Hunter Seat Equitation- Section B',NULL,'SundayHorseDetails (1).xlsx'),(187,2,'TD',NULL,NULL,NULL,'Class 2A – Pre-Novice Hunter Seat Equitation- Section B',NULL,'SundayHorseDetails (1).xlsx'),(188,2,'Gordon',NULL,NULL,NULL,'Class 2B – Novice Hunter Seat Equitation- Section A',NULL,'SundayHorseDetails (1).xlsx'),(189,2,'Gordon',NULL,NULL,NULL,'Class 2B – Novice Hunter Seat Equitation- Section B',NULL,'SundayHorseDetails (1).xlsx'),(190,2,'Sparkle',NULL,NULL,NULL,'Class 2B – Novice Hunter Seat Equitation- Section B',NULL,'SundayHorseDetails (1).xlsx'),(191,2,'Gordon',NULL,NULL,NULL,'Class 2B – Novice Hunter Seat Equitation- Section C',NULL,'SundayHorseDetails (1).xlsx'),(192,2,'Admiral',NULL,NULL,NULL,'Class 3 – Limit Hunter Seat Equitation on the Flat- Section B',NULL,'SundayHorseDetails (1).xlsx'),(193,2,'Marty',NULL,NULL,NULL,'Class 3 – Limit Hunter Seat Equitation on the Flat- Section C',NULL,'SundayHorseDetails (1).xlsx'),(194,2,'Admiral',NULL,NULL,NULL,'Class 3 – Limit Hunter Seat Equitation on the Flat- Section C',NULL,'SundayHorseDetails (1).xlsx');
/*!40000 ALTER TABLE `horses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `photos`
--

DROP TABLE IF EXISTS `photos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `photos` (
  `PhotoID` int NOT NULL AUTO_INCREMENT,
  `EventID` int DEFAULT NULL,
  `Link` text COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`PhotoID`),
  KEY `EventID` (`EventID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photos`
--

LOCK TABLES `photos` WRITE;
/*!40000 ALTER TABLE `photos` DISABLE KEYS */;
/*!40000 ALTER TABLE `photos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `riderpoints`
--

DROP TABLE IF EXISTS `riderpoints`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `riderpoints` (
  `id` int NOT NULL AUTO_INCREMENT,
  `riderId` int NOT NULL,
  `points` int DEFAULT NULL,
  `ridername` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `riderId_UNIQUE` (`riderId`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `riderpoints`
--

LOCK TABLES `riderpoints` WRITE;
/*!40000 ALTER TABLE `riderpoints` DISABLE KEYS */;
INSERT INTO `riderpoints` VALUES (5,365,100,'Jaycie Doerr'),(7,142,12,'Scott Hoglund'),(8,405,15,'Stacy Behnke'),(9,387,22,'Emily Simmons'),(10,382,15,'Cierra Luckett');
/*!40000 ALTER TABLE `riderpoints` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `riders`
--

DROP TABLE IF EXISTS `riders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `riders` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `EventID` int DEFAULT NULL,
  `RiderId` int DEFAULT NULL,
  `Name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Height` int DEFAULT NULL,
  `Weight` int DEFAULT NULL,
  `Experience` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `School` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Class` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Remarks` text COLLATE utf8mb4_general_ci,
  `file_name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `EventID` (`EventID`)
) ENGINE=InnoDB AUTO_INCREMENT=173 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `riders`
--

LOCK TABLES `riders` WRITE;
/*!40000 ALTER TABLE `riders` DISABLE KEYS */;
INSERT INTO `riders` VALUES (87,2,386,'Anna Taylor',NULL,NULL,NULL,'Black Hawk College','Class 2B – Novice Hunter Seat Equitation- Section A',NULL,'Sunday Rider details (1).xlsx'),(88,2,227,'Eilish O\'Rourke',NULL,NULL,NULL,'Black Hawk College','Class 3 – Limit Hunter Seat Equitation on the Flat- Section A',NULL,'Sunday Rider details (1).xlsx'),(89,2,387,'Emily Simmons',NULL,NULL,NULL,'Black Hawk College','Class 1 – Introductory Hunter Seat Equitation',NULL,'Sunday Rider details (1).xlsx'),(90,2,355,'Katie Aeschbach',NULL,NULL,NULL,'Black Hawk College','Class 2B – Novice Hunter Seat Equitation- Section B',NULL,'Sunday Rider details (1).xlsx'),(91,2,222,'Lauryn Kuehl',NULL,NULL,NULL,'Black Hawk College','Class 2A – Pre-Novice Hunter Seat Equitation- Section B',NULL,'Sunday Rider details (1).xlsx'),(92,2,106,'Sarah Alarie',NULL,NULL,NULL,'Black Hawk College','Class 3 – Limit Hunter Seat Equitation on the Flat- Section C',NULL,'Sunday Rider details (1).xlsx'),(93,2,371,'Ellee Abraham',NULL,NULL,NULL,'Illinois State University','Class 3 – Limit Hunter Seat Equitation on the Flat- Section C',NULL,'Sunday Rider details (1).xlsx'),(94,2,395,'Keziah Gragg',NULL,NULL,NULL,'Illinois State University','Class 2B – Novice Hunter Seat Equitation- Section B',NULL,'Sunday Rider details (1).xlsx'),(95,2,401,'Rosalind Flater',NULL,NULL,NULL,'Illinois State University','Class 2A – Pre-Novice Hunter Seat Equitation- Section A',NULL,'Sunday Rider details (1).xlsx'),(96,2,397,'Catherine Chartier',NULL,NULL,NULL,'Kansas State University','Class 7 – Open Hunter Seat Equitation on the Flat',NULL,'Sunday Rider details (1).xlsx'),(97,2,393,'Emily Oravetz',NULL,NULL,NULL,'Kansas State University','Class 1 – Introductory Hunter Seat Equitation',NULL,'Sunday Rider details (1).xlsx'),(98,2,344,'Jillian Camp',NULL,NULL,NULL,'Kansas State University','Class 3 – Limit Hunter Seat Equitation on the Flat- Section B',NULL,'Sunday Rider details (1).xlsx'),(99,2,336,'Lauren Andrews',NULL,NULL,NULL,'Kansas State University','Class 2B – Novice Hunter Seat Equitation- Section A',NULL,'Sunday Rider details (1).xlsx'),(100,2,108,'Lauren Kastner',NULL,NULL,NULL,'Kansas State University','Class 3 – Limit Hunter Seat Equitation on the Flat- Section A',NULL,'Sunday Rider details (1).xlsx'),(101,2,392,'Leota Works',NULL,NULL,NULL,'Kansas State University','Class 1 – Introductory Hunter Seat Equitation- Section Heat B',NULL,'Sunday Rider details (1).xlsx'),(102,2,403,'Talor Sutton',NULL,NULL,NULL,'Kansas State University','Class 3 – Limit Hunter Seat Equitation on the Flat- Section C',NULL,'Sunday Rider details (1).xlsx'),(103,2,382,'Cierra Luckett',NULL,NULL,NULL,'Missouri State University','Class 1 – Introductory Hunter Seat Equitation',NULL,'Sunday Rider details (1).xlsx'),(104,2,247,'Ibrahim Al-hadhrami',NULL,NULL,NULL,'Missouri State University','Class 2A – Pre-Novice Hunter Seat Equitation- Section B',NULL,'Sunday Rider details (1).xlsx'),(105,2,268,'Kate Babel',NULL,NULL,NULL,'Missouri State University','Class 3 – Limit Hunter Seat Equitation on the Flat- Section A',NULL,'Sunday Rider details (1).xlsx'),(106,2,210,'Lily Boyer',NULL,NULL,NULL,'Missouri State University','Class 2B – Novice Hunter Seat Equitation- Section B',NULL,'Sunday Rider details (1).xlsx'),(107,2,370,'Morgan Meroney',NULL,NULL,NULL,'Missouri State University','Class 2A – Pre-Novice Hunter Seat Equitation- Section A',NULL,'Sunday Rider details (1).xlsx'),(108,2,373,'Phoenix Bay',NULL,NULL,NULL,'Missouri State University','Class 2A – Pre-Novice Hunter Seat Equitation- Section A',NULL,'Sunday Rider details (1).xlsx'),(109,2,380,'riley roberts',NULL,NULL,NULL,'Missouri State University','Class 3 – Limit Hunter Seat Equitation on the Flat- Section B',NULL,'Sunday Rider details (1).xlsx'),(110,2,329,'Sarah Fabris',NULL,NULL,NULL,'Missouri State University','Class 1 – Introductory Hunter Seat Equitation- Section Heat B',NULL,'Sunday Rider details (1).xlsx'),(111,2,307,'Alissa Melville',NULL,NULL,NULL,'Northern Illinois University','Class 2B – Novice Hunter Seat Equitation- Section C',NULL,'Sunday Rider details (1).xlsx'),(112,2,374,'Taylor Akins',NULL,NULL,NULL,'Northern Illinois University','Class 2B – Novice Hunter Seat Equitation- Section A',NULL,'Sunday Rider details (1).xlsx'),(113,2,205,'Kaitlyn Rechtermann',NULL,NULL,NULL,'Northwest Missouri State University','Class 1 – Introductory Hunter Seat Equitation',NULL,'Sunday Rider details (1).xlsx'),(114,2,404,'Morgan Norris',NULL,NULL,NULL,'Northwest Missouri State University','Class 2A – Pre-Novice Hunter Seat Equitation- Section A',NULL,'Sunday Rider details (1).xlsx'),(115,2,358,'Abbey Spengel',NULL,NULL,NULL,'Southeast Missouri State University','Class 2B – Novice Hunter Seat Equitation- Section C',NULL,'Sunday Rider details (1).xlsx'),(116,2,340,'Emily Rust',NULL,NULL,NULL,'Southeast Missouri State University','Class 2B – Novice Hunter Seat Equitation- Section B',NULL,'Sunday Rider details (1).xlsx'),(117,2,101,'Anna Cooper',NULL,NULL,NULL,'Truman State University','Class 3 – Limit Hunter Seat Equitation on the Flat- Section C',NULL,'Sunday Rider details (1).xlsx'),(118,2,354,'Lauren Munns',NULL,NULL,NULL,'Truman State University','Class 2B – Pre-Novice Hunter Seat Equitation- Section C',NULL,'Sunday Rider details (1).xlsx'),(119,2,313,'Catherine Hanes',NULL,NULL,NULL,'Truman State University','Class 3 – Limit Hunter Seat Equitation on the Flat- Section B',NULL,'Sunday Rider details (1).xlsx'),(120,2,328,'Lilly Siderowf',NULL,NULL,NULL,'Washington University in St. Louis','Class 4 – Limit Hunter Seat Equitation over Fences- Section A',NULL,'Sunday Rider details (1).xlsx'),(121,2,248,'Rebecca Silver',NULL,NULL,NULL,'Washington University in St. Louis','Class 5 – Intermediate Hunter Seat Equitation on the Flat',NULL,'Sunday Rider details (1).xlsx'),(122,2,328,'Lilly Siderowf',NULL,NULL,NULL,'Washington University in St. Louis','Class 5 – Intermediate Hunter Seat Equitation on the Flat',NULL,'Sunday Rider details (1).xlsx'),(123,2,400,'Abigail Moore',NULL,NULL,NULL,'University of Kansas','Class 2A – Pre-Novice Hunter Seat Equitation- Section B',NULL,'Sunday Rider details (1).xlsx'),(124,2,398,'Alana Richey',NULL,NULL,NULL,'University of Kansas','Class 2B – Novice Hunter Seat Equitation- Section B',NULL,'Sunday Rider details (1).xlsx'),(125,2,394,'Anna Rogula',NULL,NULL,NULL,'University of Kansas','Class 2B – Novice Hunter Seat Equitation- Section A',NULL,'Sunday Rider details (1).xlsx'),(126,2,399,'Ashley Zellers',NULL,NULL,NULL,'University of Kansas','Class 2A – Pre-Novice Hunter Seat Equitation- Section A',NULL,'Sunday Rider details (1).xlsx'),(127,2,388,'Madison Slade',NULL,NULL,NULL,'University of Kansas','Class 3 – Limit Hunter Seat Equitation on the Flat- Section A',NULL,'Sunday Rider details (1).xlsx'),(128,2,381,'Ruth Sweet',NULL,NULL,NULL,'University of Kansas','Class 3 – Limit Hunter Seat Equitation on the Flat- Section A',NULL,'Sunday Rider details (1).xlsx'),(129,2,402,'Sophia Tieking',NULL,NULL,NULL,'University of Kansas','Class 2B – Novice Hunter Seat Equitation- Section C',NULL,'Sunday Rider details (1).xlsx'),(130,2,320,'Jordan Dombrowicki',NULL,NULL,NULL,'Southern Illinois University Carbondale','Class 2B – Novice Hunter Seat Equitation- Section C',NULL,'Sunday Rider details (1).xlsx'),(131,2,319,'Sage McDowell',NULL,NULL,NULL,'Southern Illinois University Carbondale','Class 3 – Limit Hunter Seat Equitation on the Flat- Section C',NULL,'Sunday Rider details (1).xlsx'),(132,2,142,'Scott Hoglund',NULL,NULL,NULL,'Southern Illinois University Carbondale','Class 1 – Introductory Hunter Seat Equitation',NULL,'Sunday Rider details (1).xlsx'),(133,2,391,'Alison Bradley',NULL,NULL,NULL,'Washington University in St. Louis','Class 6 – Intermediate Hunter Seat Equitation over Fences',NULL,'Sunday Rider details (1).xlsx'),(134,2,306,'Jessie Claire Goodwin',NULL,NULL,NULL,'Washington University in St. Louis','Class 7 – Open Hunter Seat Equitation on the Flat',NULL,'Sunday Rider details (1).xlsx'),(135,2,171,'Kathryn Owens',NULL,NULL,NULL,'Washington University in St. Louis','Class 3 – Limit Hunter Seat Equitation on the Flat- Section B',NULL,'Sunday Rider details (1).xlsx'),(136,2,383,'Isabella Zipf',NULL,NULL,NULL,'Kansas State University','Class 6 – Intermediate Hunter Seat Equitation over Fences',NULL,'Sunday Rider details (1).xlsx'),(137,2,364,'Natalie Pearce',NULL,NULL,NULL,'Washington University in St. Louis','Class 3 – Limit Hunter Seat Equitation on the Flat- Section C',NULL,'Sunday Rider details (1).xlsx'),(138,2,396,'Sasha Delinger',NULL,NULL,NULL,'Washington University in St. Louis','Class 8 – Open Hunter Seat Equitation over Fences',NULL,'Sunday Rider details (1).xlsx'),(139,2,364,'Natalie Pearce',NULL,NULL,NULL,'Washington University in St. Louis','Class 6 – Intermediate Hunter Seat Equitation over Fences',NULL,'Sunday Rider details (1).xlsx'),(140,2,262,'Emily Jeston',NULL,NULL,NULL,'Black Hawk College','Class 2A – Pre-Novice Hunter Seat Equitation- Section B',NULL,'Sunday Rider details (1).xlsx'),(141,2,208,'Emma Lowe',NULL,NULL,NULL,'Western Illinois University','Class 2B – Novice Hunter Seat Equitation- Section A',NULL,'Sunday Rider details (1).xlsx'),(142,2,365,'Jaycie Doerr',NULL,NULL,NULL,'Western Illinois University','Class 1 – Introductory Hunter Seat Equitation',NULL,'Sunday Rider details (1).xlsx'),(143,2,306,'Jessie Claire Goodwin',NULL,NULL,NULL,'Washington University in St. Louis','Class 8 – Open Hunter Seat Equitation over Fences',NULL,'Sunday Rider details (1).xlsx'),(144,2,397,'Catherine Chartier',NULL,NULL,NULL,'Kansas State University','Class 8 – Open Hunter Seat Equitation over Fences',NULL,'Sunday Rider details (1).xlsx'),(145,2,341,'Ella Garver',NULL,NULL,NULL,'Kansas State University','Class 7 – Open Hunter Seat Equitation on the Flat',NULL,'Sunday Rider details (1).xlsx'),(146,2,391,'Alison Bradley',NULL,NULL,NULL,'Washington University in St. Louis','Class 7 – Open Hunter Seat Equitation on the Flat',NULL,'Sunday Rider details (1).xlsx'),(147,2,388,'Madison Slade',NULL,NULL,NULL,'University of Kansas','Class 6 – Intermediate Hunter Seat Equitation over Fences',NULL,'Sunday Rider details (1).xlsx'),(148,2,380,'riley roberts',NULL,NULL,NULL,'Missouri State University','Class 6 – Intermediate Hunter Seat Equitation over Fences',NULL,'Sunday Rider details (1).xlsx'),(149,2,342,'Kaitlyn Rhime',NULL,NULL,NULL,'Kansas State University','Class 1 – Introductory Hunter Seat Equitation',NULL,'Sunday Rider details (1).xlsx'),(150,2,171,'Kathryn Owens',NULL,NULL,NULL,'Washington University in St. Louis','Class 4 – Limit Hunter Seat Equitation over Fences- Section B',NULL,'Sunday Rider details (1).xlsx'),(151,2,385,'Holly Olson',NULL,NULL,NULL,'Truman State University','Class 4 – Limit Hunter Seat Equitation over Fences- Section B',NULL,'Sunday Rider details (1).xlsx'),(152,2,319,'Sage McDowell',NULL,NULL,NULL,'Southern Illinois University Carbondale','Class 4 – Limit Hunter Seat Equitation over Fences- Section B',NULL,'Sunday Rider details (1).xlsx'),(153,2,108,'Lauren Kastner',NULL,NULL,NULL,'Kansas State University','Class 4 – Limit Hunter Seat Equitation over Fences- Section B',NULL,'Sunday Rider details (1).xlsx'),(154,2,371,'Ellee Abraham',NULL,NULL,NULL,'Illinois State University','Class 4 – Limit Hunter Seat Equitation over Fences- Section B',NULL,'Sunday Rider details (1).xlsx'),(155,2,381,'Ruth Sweet Sweet',NULL,NULL,NULL,'University of Kansas','Class 4 – Limit Hunter Seat Equitation over Fences- Section A',NULL,'Sunday Rider details (1).xlsx'),(156,2,124,'Sydnie Andell',NULL,NULL,NULL,'Truman State University','Class 4 – Limit Hunter Seat Equitation over Fences- Section A',NULL,'Sunday Rider details (1).xlsx'),(157,2,403,'Talor Sutton',NULL,NULL,NULL,'Kansas State University','Class 4 – Limit Hunter Seat Equitation over Fences- Section A',NULL,'Sunday Rider details (1).xlsx'),(158,2,227,'Eilish O\'Rourke',NULL,NULL,NULL,'Black Hawk College','Class 4 – Limit Hunter Seat Equitation over Fences- Section A',NULL,'Sunday Rider details (1).xlsx'),(159,2,405,'Stacy Behnke',NULL,NULL,NULL,'Illinois State University','Class 1 – Introductory Hunter Seat Equitation',NULL,'Sunday Rider details (1).xlsx'),(160,2,384,'William Boston',NULL,NULL,NULL,'Illinois State University','Class 2A – Pre-Novice Hunter Seat Equitation- Section B',NULL,'Sunday Rider details (1).xlsx'),(161,2,225,'Meghan McCracken',NULL,NULL,NULL,'Truman State University','Class 2A – Pre-Novice Hunter Seat Equitation- Section B',NULL,'Sunday Rider details (1).xlsx'),(162,2,312,'Isabelle Ruiz',NULL,NULL,NULL,'Illinois State University','Class 2B – Novice Hunter Seat Equitation- Section A',NULL,'Sunday Rider details (1).xlsx'),(163,2,356,'Anna Loucks',NULL,NULL,NULL,'Truman State University','Class 2B – Novice Hunter Seat Equitation- Section B',NULL,'Sunday Rider details (1).xlsx'),(164,2,354,'Lauren Munn',NULL,NULL,NULL,'Truman State University','Class 2B – Novice Hunter Seat Equitation- Section C',NULL,'Sunday Rider details (1).xlsx'),(165,2,124,'Sydnie Andell',NULL,NULL,NULL,'Truman State University','Class 3 – Limit Hunter Seat Equitation on the Flat- Section A',NULL,'Sunday Rider details (1).xlsx'),(166,2,385,'Holly Olson',NULL,NULL,NULL,'Truman State University','Class 3 – Limit Hunter Seat Equitation on the Flat- Section B',NULL,'Sunday Rider details (1).xlsx'),(167,2,392,'Leota Works',NULL,NULL,NULL,'Kansas State University','Class 3 – Limit Hunter Seat Equitation on the Flat- Section B',NULL,'Sunday Rider details (1).xlsx'),(168,2,392,'Leota Works',NULL,NULL,NULL,'Kansas State University','Class 4 – Limit Hunter Seat Equitation over Fences- Section A',NULL,'Sunday Rider details (1).xlsx'),(169,2,329,'Sarah Fabris',NULL,NULL,NULL,'Missouri State University','Class 4 – Limit Hunter Seat Equitation over Fences- Section B',NULL,'Sunday Rider details (1).xlsx'),(170,2,383,'Isabella Zipf',NULL,NULL,NULL,'Kansas State University','Class 5 – Intermediate Hunter Seat Equitation on the Flat',NULL,'Sunday Rider details (1).xlsx'),(171,2,101,'Anna Cooper',NULL,NULL,NULL,'Truman State University','Class 6 – Intermediate Hunter Seat Equitation over Fences',NULL,'Sunday Rider details (1).xlsx'),(172,2,347,'Sophia Karney',NULL,NULL,NULL,'Missouri State University','Class 6 – Intermediate Hunter Seat Equitation over Fences',NULL,'Sunday Rider details (1).xlsx');
/*!40000 ALTER TABLE `riders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedules`
--

DROP TABLE IF EXISTS `schedules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schedules` (
  `ScheduleID` int NOT NULL AUTO_INCREMENT,
  `EventID` int DEFAULT NULL,
  PRIMARY KEY (`ScheduleID`),
  KEY `EventID` (`EventID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedules`
--

LOCK TABLES `schedules` WRITE;
/*!40000 ALTER TABLE `schedules` DISABLE KEYS */;
/*!40000 ALTER TABLE `schedules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `showadmin`
--

DROP TABLE IF EXISTS `showadmin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `showadmin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `eventId` int NOT NULL,
  `status` tinyint(1) NOT NULL,
  `email` varchar(45) NOT NULL,
  `createdBy` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `showadmin_admin_idx` (`createdBy`),
  CONSTRAINT `showadmin_admin` FOREIGN KEY (`createdBy`) REFERENCES `admin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `showadmin`
--

LOCK TABLES `showadmin` WRITE;
/*!40000 ALTER TABLE `showadmin` DISABLE KEYS */;
INSERT INTO `showadmin` VALUES (1,'event1admin','event1password','event1',1,1,'event1admin@rihs.com',1),(3,'event1admin1','event1password1','event1_admin1',1,1,'event1admin1@rihs.com',1),(14,'event2user1','event2user1','event2user1',2,1,'event2user1-admin@rihs.com',1),(15,'newadmin2event','Test@123','newuserevent2',2,1,'newadmin2event2@rihs.com',1);
/*!40000 ALTER TABLE `showadmin` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-13  5:02:41
