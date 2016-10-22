<?php
/*****************************
*数据库连接
*****************************/

$conn = mysql_connect("localhost","root","");
if (!$conn){
	die("连接数据库失败：" . mysql_error());
}

mysql_select_db("test", $conn);
//字符转换，读库
mysql_query("set character set 'gbk'");
$res = mysql_query('select * from guestbook limit 1');
$row = mysql_fetch_array($res);
var_dump($row);
//exit();

//写库
mysql_query("set names 'gbk'");
?>