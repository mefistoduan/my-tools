<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/7/3 0003
 * Time: 16:49
 */
$data = array();
echo 123;
$data[0]=[
    'jian' =>'asd',//减免
    'zeng' =>'赠送轮胎检查一次',//赠送
];
//$data[1]=[
//    'jian' =>'dsa',//减免
//    'zhe' =>'',//打折
//    'zeng' =>'赠送轮胎检查一次',//赠送
//    'dui' =>''//兑换
//];
//$data[2]=[
//    'jian' =>'fas',//减免
//    'zhe' =>'',//打折
//    'zeng' =>'赠送轮胎检查一次',//赠送
//    'dui' =>''//兑换
//];
//$data[3]=[
//    'jian' =>'dfx',//减免
//    'zhe' =>'',//打折
//    'zeng' =>'赠送轮胎检查一次',//赠送
//    'dui' =>''//兑换
//];

$count=count($data);

echo json_encode(array("recordsTotal"=> $count,"data" => $data),JSON_UNESCAPED_UNICODE);