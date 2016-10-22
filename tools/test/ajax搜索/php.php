<?php
//连接数据库
$conn=mysql_connect("localhost","root","vertrigo") or die("数据库服务器连接错误".mysql_error());
    	/*mysql_select_db("test",$conn) or die("数据库访问错误".mysql_error());
 		mysql_query("set character set utf-8");
	//传过来的数据
		$data=$_POST['data'];
		print_r($data);exit();
		$result = mysql_query("SELECT * FROM user where name='$data'");
		//循环输出
		  while($row = mysql_fetch_array($result))
		  {
			  //在这里你可以随意编写输出格式
		  echo $row['id'];
		  echo "<br />";
		  }*/
?>
