<?php
/**
 * Created by PhpStorm.
 * User: mefisto
 * Date: 2017/2/21 0021
 * Time: 10:42
 */
require_once("db_config.php");
header("Content-Type: text/html;charset=utf-8");

$username = $_POST["username"];
$pwd = $_POST['userpwd'];

if(!isset($username) || !isset($pwd))
{
    echo '没有输入用户名或密码';
    exit();
}
else
{
    $sql="select * from user where user_name='$username' ";

    $result = mysql_query($sql);

    if(!$result)
    {
        echo '没有输入用户名或密码';
        exit();
    }
    else
    {
        $row = mysql_fetch_array($result);
        if($pwd != $row["pwd"])
        {
            echo "password is wrong!";
        }
        else
        {
            echo "login is ok!";
            header("Location:./list.html");//跳转到列表页
            exit();
        }
    }
}


