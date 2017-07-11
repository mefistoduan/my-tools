<?php
/**
 * Created by PhpStorm.
 * User: mefisto
 * Date: 2017/2/21 0021
 * Time: 10:43
 */

$mysql_server_name = 'localhost';

$mysql_username = 'root';

$mysql_pwd = 'root';

$mysql_database = 'test';

$conn = mysqli_connect($servername,$username,$password,$mysql_database) or die('can not connect');

if(mysqli_connect_error()) {
    echo '连接数据库失败！';
    exit;
}
else {
    return $conn;
}



