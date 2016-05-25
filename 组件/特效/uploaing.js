/**
 * Created by Administrator on 2016/4/29.
 */
//选择按钮样式修改后修复功能
$(".a-upload").on("change","input[type='file']",function(){
    $this = $(this);
    var filePath=$(this).val();
    if(filePath.indexOf("jpg")!=-1 || filePath.indexOf("png")!=-1){
        $(".fileerrorTip").html("").hide();
        var arr=filePath.split('\\');
        var fileName=arr[arr.length-1];
        $this.closest("li").find("input[type='text']").val(fileName);
    }else{
        //$this.closest("td").find("input[type='text']").html("");
        $this.closest("li").find("input[type='text']").html("您未上传文件，或者您上传文件类型有误！").show();
        return false
    }
});