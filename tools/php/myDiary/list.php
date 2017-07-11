<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/7/5 0005
 * Time: 17:50
 */
require_once('db_config.php');

header('content-type:application/json;charset=utf8');



$result = mysqli_query($conn,"SELECT * FROM s_user ");


$results = array();

$i = 0;

while($row=mysqli_fetch_array($result,MYSQL_ASSOC)){
    $results[$i]=$row;
    $i++;
}

$count=count($results);

echo json_encode(array("recordsTotal"=> $count,'data'=>$results));

mysqli_free_result($result);

mysqli_close($result);

