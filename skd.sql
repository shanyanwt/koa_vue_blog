/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 80017
Source Host           : 127.0.0.1:3306
Source Database       : skd

Target Server Type    : MYSQL
Target Server Version : 80017
File Encoding         : 65001

Date: 2019-09-04 10:46:30
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for skd_admin
-- ----------------------------
DROP TABLE IF EXISTS `skd_admin`;
CREATE TABLE `skd_admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) DEFAULT NULL COMMENT '角色ID',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '姓名',
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '手机号',
  `email` varchar(255) DEFAULT NULL COMMENT '邮箱',
  `password` varchar(255) DEFAULT NULL COMMENT '管理员密码',
  `qq` varchar(255) DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL COMMENT '性别：0男 1 女',
  `content` text,
  `status` int(4) DEFAULT '0' COMMENT '状态；0：启用，1：启用',
  `create_time` varchar(20) DEFAULT NULL COMMENT '创建时间',
  `update_time` varchar(20) DEFAULT NULL COMMENT '更新时间',
  `last_login_time` datetime DEFAULT NULL COMMENT '上次登录时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='管理员表';
  INSERT INTO `skd_admin` VALUES (null, null, 'admin', null, 'shanyanwt@163.com', '3aceb9fb5f01c2b83c8c2482cc256f51', null, '0', null, '0', '1567476440', '1567476440', null);

-- ----------------------------
-- Table structure for skd_article
-- ----------------------------
DROP TABLE IF EXISTS `skd_article`;
CREATE TABLE `skd_article` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '文章ID',
  `user_ip` varchar(20) DEFAULT NULL COMMENT '暂时使用用户ip未注册时使用',
  `email` varchar(30) DEFAULT NULL COMMENT '作者邮箱',
  `title` varchar(255) NOT NULL COMMENT '文章标题',
  `content` text COMMENT '文章内容P标签HTML',
  `summary` varchar(255) DEFAULT '' COMMENT '摘要',
  `cover` varchar(100) DEFAULT NULL COMMENT '封面img图片',
  `classify` varchar(100) DEFAULT NULL COMMENT '文章类型分类： java，js,vue',
  `type` int(4) NOT NULL COMMENT '文章分类，0：首页头部推荐，1：普通文章，2：资讯，3：公告',
  `status` int(4) DEFAULT '0' COMMENT '状态；0：启用，1：禁用',
  `number` int(20) DEFAULT '0' COMMENT '阅读数量',
  `create_time` varchar(20) DEFAULT NULL COMMENT '创建时间',
  `update_time` varchar(20) DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='文章列表';

-- ----------------------------
-- Table structure for skd_role
-- ----------------------------
DROP TABLE IF EXISTS `skd_role`;
CREATE TABLE `skd_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '读者ID',
  `article_id` varchar(255) NOT NULL COMMENT '已读文章ID',
  `content` text,
  `status` int(4) DEFAULT '0' COMMENT '状态；0：启用，1：禁用',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8 COMMENT='角色表';