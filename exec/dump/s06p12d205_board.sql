-- MySQL dump 10.17  Distrib 10.3.24-MariaDB, for Win64 (AMD64)
--
-- Host: stg-yswa-kr-practice-db-master.mariadb.database.azure.com    Database: s06p12d205
-- ------------------------------------------------------
-- Server version	5.6.47.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `board`
--

DROP TABLE IF EXISTS `board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `board` (
  `board_seq` bigint(20) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `board_content` varchar(1000) COLLATE utf8mb4_bin NOT NULL,
  `board_status` tinyint(1) DEFAULT 0,
  `board_title` varchar(100) COLLATE utf8mb4_bin NOT NULL,
  `deadline` date NOT NULL,
  `user_seq` bigint(20) NOT NULL,
  PRIMARY KEY (`board_seq`),
  KEY `FKt29xuf02pq4gjqnvhabquxg6x` (`user_seq`),
  CONSTRAINT `FKt29xuf02pq4gjqnvhabquxg6x` FOREIGN KEY (`user_seq`) REFERENCES `user` (`user_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board`
--

LOCK TABLES `board` WRITE;
/*!40000 ALTER TABLE `board` DISABLE KEYS */;
INSERT INTO `board` VALUES (7,'2022-02-16 01:33:54.105000','리액트 숙련자 분 모십니다.',1,'프론트엔드 리액트 개발자 원해요 원해','2022-02-18',6),(10,'2022-02-16 01:35:36.377000','1일 1커밋!!~~ 메세지 주세요!',1,'알고리즘 스터디원 구합니다!!','2022-02-24',9),(11,'2022-02-16 01:36:16.492000','곧 프로젝트 진행 예정인데 간단한 프로젝트에 참여하실 백엔드 한분, 프론트 한분을 모집합니다.\n\n프로젝트 : 간단한 웹페이지 구현\n총 모집 인원 : 2명(백엔드 1, 프론트 1)\n\n',1,'백엔드 프론트 각각 한분씩 모집합니다!!','2022-02-18',8),(15,'2022-02-16 01:38:00.808000','메세지 주세요~~',1,'특화 프로젝트 NFT 같이하실 프론트엔드분 구합니다!!','2022-02-18',12),(22,'2022-02-16 01:59:20.896000','자바 ORM 표준 JPA 프로그래밍 스터디 같이 하실 분 구합니다~',0,'JPA 공부 같이 하실 분 구합니다!!!','2022-02-11',1),(61,'2022-02-17 05:02:58.424000','빅데이터 프로젝트 같이 하실 분 모집합니다! Front-End 1분 모집 중 ! ',1,'빅데이터 프로젝트 같이 하실 분 모집합니다!','2022-02-19',1);
/*!40000 ALTER TABLE `board` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-17 16:47:58
