<?php
/**
 * Created by PhpStorm.
 * User: mefisto
 * Date: 2016/10/3
 * Time: 21:26
 */
header("Content-Type: text/html;charset=utf-8");


//链接数据库
$ip = 'localhost';
$user_name = 'root';
$pwd = 'root';
$bd_name = 'excel';
$mysql = mysql_connect($ip,$user_name,$pwd,$bd_name);
mysql_query('set names utf8');
mysql_select_db('excel');

//链接excelPHP
$dir =dirname(__FILE__);//找到当前脚本所在的路径
require $dir.'./PHPExcel/PHPExcel.php';
$objPHPExcel = new PHPExcel();
$objSheet = $objPHPExcel->getActiveSheet();





//获取输入的信息
$name = $job = $project = $goal = $data = "";
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $dataStart = $_POST["start"];
    $dataStart = $_POST["end"];
}

//查询该事件范围内的结果


