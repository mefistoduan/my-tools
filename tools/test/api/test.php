<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/7/3 0003
 * Time: 16:49
 */
$data = array();
$data[0]=[
    'jian' =>'asd',//减免
    'zeng' =>'赠送轮胎检查一次',//赠送
];
$data[1]=[
    'jian' =>'wxf',//减免
    'zeng' =>'赠次',//赠送
];
$data[2]=[
    'jian' =>'tch',//减免
    'zeng' =>'检查一次',//赠送
];

$count=count($data);

echo json_encode(array("recordsTotal"=> $count,"data" => $data,"rs" => $data,"rtnCode" => 0),JSON_UNESCAPED_UNICODE);