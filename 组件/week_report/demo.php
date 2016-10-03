<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/10/2
 * Time: 13:51
 */

$dir =dirname(__FILE__);
//找到当前脚本所在的路径

require $dir.'./PHPExcel/PHPExcel.php';
$objPHPExcel = new PHPExcel();
$objSheet = $objPHPExcel->getActiveSheet();
//获取当前操作的sheet
$objSheet->setTitle('demo');
//设置sheet名称
$objSheet->setCellValue('a1','name')->setCellValue('b1','age');
$objSheet->setCellValue('a2','joey')->setCellValue('b1','six');
//内容填充,方法1

$array = array(
    array('id','value'),
    array('',''),
    array('003','78'),
    array('021','13'),
);
$objSheet->fromArray($array);
//内容填充方法2
$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel,'Excel2007');
$objWriter ->save($dir.'./demo2.xlsx');

?>