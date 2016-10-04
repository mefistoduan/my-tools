/*
Navicat MySQL Data Transfer

Source Server         : phpstudy
Source Server Version : 50538
Source Host           : localhost:3306
Source Database       : excel

Target Server Type    : MYSQL
Target Server Version : 50538
File Encoding         : 65001

Date: 2016-10-04 17:04:34
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `base`
-- ----------------------------
DROP TABLE IF EXISTS `base`;
CREATE TABLE `base` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `data` date DEFAULT NULL,
  `project` char(255) DEFAULT NULL,
  `goal` char(255) DEFAULT NULL,
  `name` char(255) DEFAULT NULL,
  `job` char(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of base
-- ----------------------------
INSERT INTO `base` VALUES ('1', '2016-10-10', 'cold', 'theme', '段长鹏', '前端');
INSERT INTO `base` VALUES ('2', '0000-00-00', 'qe', 'we', 'qwe', 'qwe');
INSERT INTO `base` VALUES ('4', '2016-10-04', 'Array', 'Array', '段长鹏', '前端');
INSERT INTO `base` VALUES ('13', '2016-10-04', '111111', '11111111', '段长鹏', '前端');
INSERT INTO `base` VALUES ('10', '2016-10-04', '美鲜冷链', '样式修改', '段长鹏', '前端');
INSERT INTO `base` VALUES ('11', '2016-10-04', '美鲜专题', '水果上新', '段长鹏', '前端');
INSERT INTO `base` VALUES ('12', '2016-10-04', '美鲜专题', '国庆大乐购', '段长鹏', '前端');
