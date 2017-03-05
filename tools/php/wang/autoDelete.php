<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/3/4 0004
 * Time: 10:08
 * 需求分析：
 * 1.定期自动执行；
 * 2。把指定时间范围的日志文件打包；
 * 3.打包文件放置于其他文件夹内；
 * 4.打包成功验证；
 * 5.删除指定时间范围的日志源文件；
 */
ignore_user_abort(true);//关闭brower也可以执行
set_time_limit(300);//0 无限
$interval = 5;
$zip_name = '123.zip';
$log_name = dirname(__FILE__).'/files/log0301.txt';
$files_loc = 'files/';

if(!file_exists($log_name)) {//如果不存在就退出执行
    echo '<br>file not exists';
    exit();
};

function addFileToZip($path,$zip){
    $handler = opendir($path); //打开当前文件夹由$path指定。
    while(($filename = readdir($handler))!==false){
        if($filename != "." && $filename != ".."){//文件夹文件名字为'.'和‘..’，不要对他们进行操作
            $zip->addFile($path.$filename);
        }
    }
    @closedir($path);
}

$zip = new ZipArchive();
if($zip->open($zip_name, ZipArchive::OVERWRITE)=== TRUE){
    addFileToZip($files_loc, $zip); //调用方法，对要打包的根目录进行操作，并将ZipArchive的对象传递给方法
    $zip->close(); //关闭处理的zip文件
}

unlink($log_name);