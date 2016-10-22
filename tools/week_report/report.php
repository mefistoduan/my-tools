<?php
/**
 * Created by PhpStorm.
 * User: mefisto
 * Date: 2016/10/3
 * Time: 21:26
 */
header("Content-Type: text/html;charset=utf-8");


//链接数据库
$ip = 'localhost';
$user_name = 'root';
$pwd = 'root';
$bd_name = 'excel';
$mysql = mysql_connect($ip,$user_name,$pwd,$bd_name);
mysql_query('set names utf8');
mysql_select_db('excel',$mysql);

//链接excelPHP
$dir =dirname(__FILE__);//找到当前脚本所在的路径
require $dir.'./PHPExcel/PHPExcel.php';
$objPHPExcel = new PHPExcel();
$objSheet = $objPHPExcel->getActiveSheet();


//获取输入的信息
$name = $job = $project = $goal = $data = "";
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $dataStart = $_POST["start"];
    $dataEnd = $_POST["end"];
}
//查询该事件范围内的结果
//$vsql = "select * from base where data='".$dataStart."'";
$vsql = "select * from base where data  between ".$dataStart." and '$dataEnd'";
$result = mysql_query($vsql);
while($row = mysql_fetch_array($result))
{
//    echo $row['id'] . " " . $row['data']. " " . $row['project']. " " . $row['goal']. " " . $row['name']. " " . $row['job'];

//    写入excel
//获取当前操作的sheet
    $objSheet = $objPHPExcel->getActiveSheet();
    //设置sheet名称
    $objSheet->setTitle('周一');
    $array = array(
        array('2016-10-14日报'),
        array('序号','项目','目标','措施','结果','人员','职位','时间','审核人','审核日期','审核结果','备注'),
        array('01','美鲜','cold','','完成','段长鹏','前端','10-14','','','',''),
    );

}
$objSheet->fromArray($array);
$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel,'Excel2007');
$objWriter ->save($dir.'./test4.xlsx');
echo '请于本目录下查看生成的excel文件';
?>
