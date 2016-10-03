<?php
header("Content-Type: text/html;charset=utf-8");


//链接数据库
$ip = 'localhost';
$user_name = 'root';
$pwd = 'root';
$bd_name = 'excel';
$mysql = mysql_connect($ip,$user_name,$pwd,$bd_name);
mysql_query('set names utf8');
mysql_select_db('excel');



//获取输入的信息
$name = $job = $project = $goal = $data = "";
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = $_POST["data"];
    $project = $_POST["project"];
    $goal = $_POST["goal"];
    $name = $_POST["name"];
    $job = $_POST["job"];
}

//勤用报错效果好，23333
//echo mysql_error();

//批量输入
for ($i=0;$i<count($_POST["project"]);$i++){
    if ($_POST["project"][$i]!='')
    {
    $sql="INSERT INTO base(data,project,goal,name,job) VALUES ( '$data','$project[$i]','$goal[$i]','$name','$job')";//省略字段和值
    mysql_query($sql);
    }
}
echo "it's work!";


