<?php
$con = mysql_connect("localhost","root","");
if (!$con)
{
	die('数据库连接失败: ' . mysql_error());
}
else
{
	mysql_query("SET NAMES UTF8");
	mysql_query("set character_set_client=utf8");
	mysql_query("set character_set_results=utf8");
	mysql_select_db("test", $con);
	$result = mysql_query("SELECT * FROM guestbook");
	//在表格中输出显示结果
	echo 'hello world!';
	echo "<table border='1'>
<tr>
<th>id</th>
<th>nikename</th>
<th>face</th>
<th>createtime</th>
</tr>";
//	while($row = mysql_fetch_array($result))
//	{
//		echo "<tr>";
//		echo "<td>" . $row['id'] . "</td>";
//		echo "<td>" . $row['nickname'] . "</td>";
//		echo "<td>" . $row['face'] . "</td>";
//		echo "<td>" . $row['createtime'] . "</td>";
//		echo "</tr>";
//	}
//	echo "</table>";
	while($row = mysql_fetch_array($result))
	{
		echo "<tr>";
		echo "<td>" . $row['id'] . "</td>"."<td>" . $row['nickname'] . "</td>"."<td>" . $row['face'] . "</td>";
		echo "</tr>";
	}
	echo "</table>";



}
mysql_close($con);
?>