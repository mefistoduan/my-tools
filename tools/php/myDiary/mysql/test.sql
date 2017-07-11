/*
Navicat MySQL Data Transfer

Source Server         : root
Source Server Version : 50635
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50635
File Encoding         : 65001

Date: 2017-07-11 11:00:56
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for blog
-- ----------------------------
DROP TABLE IF EXISTS `blog`;
CREATE TABLE `blog` (
  `title` varchar(255) NOT NULL,
  `content` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of blog
-- ----------------------------
INSERT INTO `blog` VALUES ('Gates', 'Bill');
INSERT INTO `blog` VALUES ('321', '321');

-- ----------------------------
-- Table structure for s_user
-- ----------------------------
DROP TABLE IF EXISTS `s_user`;
CREATE TABLE `s_user` (
  `user_name` varchar(255) DEFAULT NULL,
  `pwd` varchar(255) DEFAULT NULL,
  `id` int(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of s_user
-- ----------------------------
INSERT INTO `s_user` VALUES ('23', '23', '1');
INSERT INTO `s_user` VALUES ('dfs', 'fsdf', '3');
INSERT INTO `s_user` VALUES ('vc', 'vd', '4');
INSERT INTO `s_user` VALUES ('111', '111', '5');
INSERT INTO `s_user` VALUES ('1', '1', '6');
INSERT INTO `s_user` VALUES ('alice', '345', '7');
