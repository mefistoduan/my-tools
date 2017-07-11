<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/7/5 0005
 * Time: 17:50
 */
require_once('db_config.php');

$listid = trim($_POST['listid']);

$result = mysqli_query($conn,"DELETE FROM s_user WHERE id='$listid'");

if($result == true){
    echo 1;
}else {
    echo 0;
}