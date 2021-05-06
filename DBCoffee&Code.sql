/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

CREATE DATABASE IF NOT EXISTS `finaldb` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `finaldb`;

CREATE TABLE IF NOT EXISTS `categoria` (
  `categoriaId` int(11) NOT NULL AUTO_INCREMENT,
  `categoria` varchar(50) DEFAULT NULL,
  `desc` varchar(55) DEFAULT NULL,
  PRIMARY KEY (`categoriaId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `clientes` (
  `clienteId` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) DEFAULT NULL,
  `telefono` int(11) DEFAULT NULL,
  `nit` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`clienteId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `informacions` (
  `infoId` int(11) NOT NULL AUTO_INCREMENT,
  `empresa` varchar(60) DEFAULT NULL,
  `direccion` varchar(60) DEFAULT NULL,
  `telefono` varchar(60) DEFAULT NULL,
  `nit` varchar(60) DEFAULT NULL,
  `nrc` varchar(60) DEFAULT NULL,
  `giro` varchar(60) DEFAULT NULL,
  `sucursal` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`infoId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `mesas` (
  `mesaId` int(11) NOT NULL AUTO_INCREMENT,
  `num_mesa` varchar(255) DEFAULT NULL,
  `descripcion` varchar(60) DEFAULT NULL,
  `estado` enum('0','1') DEFAULT '0',
  PRIMARY KEY (`mesaId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `ordendetalles` (
  `ordendetId` int(11) NOT NULL AUTO_INCREMENT,
  `nombreProducto` varchar(60) DEFAULT NULL,
  `precio` double(5,2) DEFAULT NULL,
  `unidades` int(11) DEFAULT NULL,
  `ordenId` int(11) DEFAULT NULL,
  PRIMARY KEY (`ordendetId`),
  KEY `ordenId` (`ordenId`),
  CONSTRAINT `ordendetalles_ibfk_1` FOREIGN KEY (`ordenId`) REFERENCES `ordens` (`ordenId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `ordens` (
  `ordenId` int(11) NOT NULL AUTO_INCREMENT,
  `clienteId` int(11) DEFAULT NULL,
  `mesaId` int(11) DEFAULT NULL,
  `descuento` double(5,2) DEFAULT 0.00,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `estado` enum('0','1','2') DEFAULT '1',
  `tipo_pago` enum('e','t') DEFAULT NULL,
  `total` double(5,2) DEFAULT 0.00,
  `efectivo` double(5,2) DEFAULT 0.00,
  `cambio` double(5,2) DEFAULT 0.00,
  `tipo_orden` enum('M','L','P') DEFAULT 'M',
  `socket` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ordenId`),
  KEY `clienteId` (`clienteId`),
  KEY `mesaId` (`mesaId`),
  CONSTRAINT `ordens_ibfk_1` FOREIGN KEY (`clienteId`) REFERENCES `clientes` (`clienteId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ordens_ibfk_2` FOREIGN KEY (`mesaId`) REFERENCES `mesas` (`mesaId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `productos` (
  `productoId` int(11) NOT NULL AUTO_INCREMENT,
  `producto` varchar(255) DEFAULT NULL,
  `precio` double(5,2) DEFAULT NULL,
  `desc` varchar(255) DEFAULT NULL,
  `estado` enum('1','2') DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `promoId` int(11) DEFAULT 1,
  `categoriaId` int(11) DEFAULT NULL,
  PRIMARY KEY (`productoId`),
  KEY `promoId` (`promoId`),
  KEY `categoriaId` (`categoriaId`),
  CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`promoId`) REFERENCES `promociones` (`promoId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `productos_ibfk_2` FOREIGN KEY (`categoriaId`) REFERENCES `categoria` (`categoriaId`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `promociones` (
  `promoId` int(11) NOT NULL AUTO_INCREMENT,
  `desc` varchar(255) DEFAULT NULL,
  `valor` varchar(150) DEFAULT NULL,
  `estado` enum('0','1') DEFAULT '1',
  PRIMARY KEY (`promoId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `ticketventa` (
  `tikectId` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ordenId` int(11) DEFAULT NULL,
  PRIMARY KEY (`tikectId`),
  KEY `ordenId` (`ordenId`),
  CONSTRAINT `ticketventa_ibfk_1` FOREIGN KEY (`ordenId`) REFERENCES `ordens` (`ordenId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `usuarios` (
  `usuarioId` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(255) DEFAULT NULL,
  `pass` varchar(150) DEFAULT NULL,
  `tipo` enum('1','2') DEFAULT NULL,
  PRIMARY KEY (`usuarioId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
