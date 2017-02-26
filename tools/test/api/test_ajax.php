<?php
$data = array();
$discount = array();
$discount[0]=[
    'jian' =>'周一到周四减免两元',//减免
    'zhe' =>'',//打折
    'zeng' =>'赠送轮胎检查一次',//赠送
    'dui' =>'',//兑换
];
$discount[1]=[
    'jian' =>'',//减免
    'zhe' =>'生日打九折',//打折
    'zeng' =>'',//赠送
    'dui' =>'',//兑换
];
$discount[2]=[
    'jian' =>'',//减免
    'zhe' =>'生日打九折',//打折
    'zeng' =>'',//赠送
    'dui' =>'',//兑换
];
$discount[3]=[
    'jian' =>'',//减免
    'zhe' =>'生日打九折',//打折
    'zeng' =>'',//赠送
    'dui' =>'',//兑换
];
$discount[4]=[
    'jian' =>'',//减免
    'zhe' =>'生日打九折',//打折
    'zeng' =>'赠送轮胎检查一次',//赠送
    'dui' =>'',//兑换
];
$discount[5]=[
    'jian' =>'',//减免
    'zhe' =>'生日打九折',//打折
    'zeng' =>'',//赠送
    'dui' =>'',//兑换
];
$data[0] = [
    'alid' => '0001',//店铺编号
    'pic' => 'shop0001.png',//图片地址
    'shopname' =>'百维',
    'shoploc' => '济南高新区天辰路2815号（天辰路与奥体中路交界口东行100米路北）',
    'contactphone' =>'0531-55502888 ',
    'cciprice' => '12.00',//洗车价格
    'ccframe' => '09:30,10:30,14:00,15:00,16:00',//可预约时间列表
    'orderstate' => '1',//是否开放预约，1开放0不开放
    'shopstar' => '5',//店铺五星评价等级，0-5
    'longitude ' =>'117.32',//经度
    'latitude ' => '36.74',//纬度
    'costnum' =>'2',//之前消费次数
    'discount' => $discount[0],//优惠列表
    'distance' => '912m',//距离
    'favorite' => '1',//是否收藏0不收藏1收藏
    'business' => '美容、快修',//其他经营范围
];
$data[1] = [
    'alid' => '0006',//店铺编号
    'pic' => '0006.png',//图片地址
    'shopname' =>'卡诺嘉',
    'shoploc' => '济南高新区崇华路贤文花园南区',
    'contactphone' =>'13589057230 ',
    'cciprice' => '15.00',//洗车价格
    'ccframe' => '09:30,10:30,14:00,15:00,16:00',//可预约时间列表
    'orderstate' => '0',//是否开放预约，1开放0不开放
    'shopstar' => '5',//店铺五星评价等级，0-5
    'longitude ' =>'116.72',//经度
    'latitude ' => '36.84',//纬度
    'costnum' =>'1',//之前消费次数
    'discount' => $discount[1],//优惠列表
    'distance' => '1.912km',//距离
    'favorite' => '1',//是否收藏0不收藏1收藏
    'business' => '贴膜',//其他经营范围
];
$data[2] = [
    'alid' => '0009',//店铺编号
    'pic' => '0009.png',//图片地址
    'shopname' =>'安瑞德',
    'shoploc' => '济南高新区沁园路与颖秀路交叉口向东50米路南',
    'contactphone' =>'18766418060 ',
    'cciprice' => '15.00',//洗车价格
    'ccframe' => '09:30,10:30,14:00,15:00,16:00',//可预约时间列表
    'orderstate' => '0',//是否开放预约，1开放0不开放
    'shopstar' => '5',//店铺五星评价等级，0-5
    'longitude ' =>'117.72',//经度
    'latitude ' => '36.84',//纬度
    'costnum' =>'1',//之前消费次数
    'discount' => $discount[2],//优惠列表
    'distance' => '1.12km',//距离
    'favorite' => '1',//是否收藏0不收藏1收藏
    'business' => '',//其他经营范围
];
$data[3] = [
    'alid' => '0021',//店铺编号
    'pic' => '0021.png',//图片地址
    'shopname' =>'东城',
    'shoploc' => '济南市高新区燕山新居北门对面',
    'contactphone' =>'18354113662 ',
    'cciprice' => '15.00',//洗车价格
    'ccframe' => '09:30,10:30,14:00,15:00,16:00',//可预约时间列表
    'orderstate' => '1',//是否开放预约，1开放0不开放
    'shopstar' => '4',//店铺五星评价等级，0-5
    'longitude ' =>'117.72',//经度
    'latitude ' => '36.84',//纬度
    'costnum' =>'3',//之前消费次数
    'discount' => $discount[3],//优惠列表
    'distance' => '1.912km',//距离
    'favorite' => '1',//是否收藏0不收藏1收藏
    'business' => '贴膜',//其他经营范围
];
$data[4] = [
    'alid' => '0019',//店铺编号
    'pic' => '0019.png',//图片地址
    'shopname' =>'寅丰',
    'shoploc' => '济南市高新区国际会展中心会展路18号',
    'contactphone' =>'0531-67890668 ',
    'cciprice' => '21.00',//洗车价格
    'ccframe' => '09:30,10:30,14:00,15:00,16:00',//可预约时间列表
    'orderstate' => '0',//是否开放预约，1开放0不开放
    'shopstar' => '5',//店铺五星评价等级，0-5
    'longitude ' =>'117.172',//经度
    'latitude ' => '36.84',//纬度
    'costnum' =>'1',//之前消费次数
    'discount' => $discount[4],//优惠列表
    'distance' => '3.6km',//距离
    'favorite' => '1',//是否收藏0不收藏1收藏
    'business' => '贴膜',//其他经营范围
];
$data[5] = [
    'alid' => '0016',//店铺编号
    'pic' => '0016.png',//图片地址
    'shopname' =>'达奥信',
    'shoploc' => '济南历城区山大北路35号',
    'contactphone' =>'15589057230 ',
    'cciprice' => '25.00',//洗车价格
    'ccframe' => '09:30,10:30,14:00,15:00,16:00',//可预约时间列表
    'orderstate' => '0',//是否开放预约，1开放0不开放
    'shopstar' => '5',//店铺五星评价等级，0-5
    'longitude ' =>'117.322',//经度
    'latitude ' => '36.54',//纬度
    'costnum' =>'1',//之前消费次数
    'discount' => $discount[5],//优惠列表
    'distance' => '912m',//距离
    'favorite' => '1',//是否收藏0不收藏1收藏
    'business' => '保险代理',//其他经营范围
];
//var_dump($data);
$count=count($data);

echo json_encode(array("recordsTotal"=> $count,"data" => $data),JSON_UNESCAPED_UNICODE);