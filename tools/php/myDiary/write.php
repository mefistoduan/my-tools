<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/7/7 0007
 * Time: 10:30
 */
include_once('db_config.php');

header("Content-type:text/html;charset=utf-8");

$title = trim($_POST['title']);
$content = trim($_POST['content']);

if(!$title || !$content) {
    echo '标题或内容不能为空！';
    exit;
}

$result = mysqli_query($conn,"insert into blog values ($title, $content)");
