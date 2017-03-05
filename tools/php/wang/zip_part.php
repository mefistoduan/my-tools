<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/3/5 0005
 * Time: 10:56
 */
$zip_name = '123.zip';

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
    addFileToZip('files/', $zip); //调用方法，对要打包的根目录进行操作，并将ZipArchive的对象传递给方法
    $zip->close(); //关闭处理的zip文件
}