<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/10/2
 * Time: 14:10
 */

require dirname(__FILE__).'dbconfig.php';

class db{
    public $conn = null;

    public function _construct($config){
        $this->conn=mysql_connect($config['host'],$config['username'],$config['password'] or die(mysql_error()));
//        链接数据库
        mysql_select_db($config['database'],$this->conn)or die(mysql_error());
//        选择数据库
        mysql_query('set names'.$config['charset']) or die(mysql_error());
//        设定mysql编码
    }

    public function getResult($sql){
        $resourse = mysql_query($sql,$this->conn) or die(mysql_error());
        $res = array();
        while(($row = mysql_fetch_assoc($resourse))!=false){
            $res[]=$row;
        }
        return $res;
    }

//    根据查询的sql语句，查询结果集

}