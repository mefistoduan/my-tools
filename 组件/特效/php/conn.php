<?php
/*****************************
*���ݿ�����
*****************************/

$conn = mysql_connect("localhost","root","");
if (!$conn){
	die("�������ݿ�ʧ�ܣ�" . mysql_error());
}

mysql_select_db("test", $conn);
//�ַ�ת��������
mysql_query("set character set 'gbk'");
$res = mysql_query('select * from guestbook limit 1');
$row = mysql_fetch_array($res);
var_dump($row);
//exit();

//д��
mysql_query("set names 'gbk'");
?>