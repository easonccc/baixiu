//当提交修改密码表单时
$('#sureForm').on('submit',function(){
    //获取到用户在表单中输入的内容
    let formData = $(this).serialize()
    //发送服务器请求 实现密码修改功能
    $.ajax({
        //为什么这里不用将contentType和改为false
        url:'/users/password',
        type:'put',
        data:formData,
        success: function(data){
            location.href = '/admin/login.html'
        }
    })
    //阻止表单默认行为
    return false
})