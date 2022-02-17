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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `user_seq` bigint(20) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `user_id` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `user_name` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `user_nickname` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `user_phone` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `user_pw` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `user_type` bigint(20) NOT NULL,
  PRIMARY KEY (`user_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'2022-02-15 08:03:19.608000','wnsd2494@naver.com','김은준','기믄준','01012341234','$2a$10$YEosAZxjV6Yhk7GMMYO00OA1MjZEfmmXvw/hJ71UmqOxvpIjZXENK',1),(6,'2022-02-16 01:33:18.289000','facebook_krite12345@naver.com','facebook_guest','facebook_7Av4YG','-','$2a$10$tPiML6B04YQDHCtf8CEOPuTXymBnxz/DHt.kuItwz81JfHygmhT.i',2),(8,'2022-02-16 01:34:21.158000','rhksvlf0704@gmail.com','문관필','관필','01027980667','$2a$10$ks2.9JsJsk.S5qWVCYKhpu7PjmOXv.y5auxpA9mlQf4ukhtvSNbTC',1),(9,'2022-02-16 01:35:02.264000','gusehd520@gmail.com','육현동','gusehd520','01012341234','$2a$10$QRzN5CUIGVzrvIPNLH8fsuw4zU29sbbNcZCbM4JGHhlj2FS6ak4Ji',1),(12,'2022-02-16 01:36:29.706000','google_gusehd520@gmail.com','google_guest','google_lWp79X','-','$2a$10$GztY6g1aFa5JPRkkkHo6i.aDSjDMid4egFN82A3Y/3SPsK2z4IciG',2),(18,'2022-02-16 01:43:59.180000','google_wnsdl2494@gmail.com','google_guest','google_t6iNJI','-','$2a$10$0u0KH2s785ptapt8VLLoX.FltKG.hn.we/ciGxI2CHBNf4Dd8NPla',2),(37,'2022-02-16 06:45:27.488000','wnsgh0522@naver.com','juno','juno2','01012345678','$2a$10$uP0pUZ2Gf3nMB5ulWq/U6ehDvSDhTKYBiCWABAY49.M1vrsDqBSmy',1),(38,'2022-02-16 06:46:26.052000','test2494@test.com','테스트','테스트22','01012341234','$2a$10$fwArFVb5KNhpYJ1E6N7MNORbPOPZKS7N8z98GnxblI27nZ5CtxDRW',1),(39,'2022-02-16 06:48:22.451000','github_QqBm9ShVvTVd6KHIvXAjdiEJgu93','github_guest','github_YGUrJx','-','$2a$10$3jffRA1WrBA3RnbzzZSp0.y3n9ZGHUbCW.7v6cjTAn2w7z/uZs/Fa',2),(46,'2022-02-16 07:47:39.805000','ssafy@ssafy.com','ssafy','ssafy','0102354253','$2a$10$zhvOEl2TxjMaJIi4dIw9K.mtbDByOyFBB/crs6He.Z/6DJ6f.vCUO',1),(54,'2022-02-16 08:06:53.774000','google_wnsgh6410514@gmail.com','google_guest','google_lu72t0','-','$2a$10$v8GEiD4ap9KwVjVMc3uedeBmLnV6FT4SZeBfmNCzYdrGKtRnuiqFK',2),(58,'2022-02-16 08:33:55.086000','ssafy1@ssafy.com','ssafy','ssafy1','01023456789','$2a$10$C6.svDaBCCvkMM1JXyO1zuUw0VezYdg0mFS85zIg/uAYw7pgP8/iO',1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-17 16:48:00
