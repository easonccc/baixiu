//向服务器端发送请求获取文章分类数据
$.ajax({
    type:'get',
    url: '/categories',
    success: function(data){
        // console.log(data);
        let html = template('categoryTpl',{data})
        $('#category').html(html)
    }
})

//图片上传功能
$('#feature').on('change',function(){
    //获取到用户选择的文件
    let file = this.files[0]
    //通过formData实现图片上传
    let formData = new FormData()
    formData.append('cover',file)
    //请求服务器
    $.ajax({
        url: '/upload',
        type: 'post',
        data: formData,
        //告诉ajax方法不要处理data属性对应的参数
        processData: false,
        //不设置参数类型 在formData参数中已经设定好了
        contentType: false,
        success: function(data){
            // console.log(data);
            //将文件上传的图片地址保存在隐藏域中
            $('#thumbnail').val(data[0].cover)
        }
    })

})

//文件添加功能
//当添加文章表单提交的时候
$('#addForm').on('submit',function(){
    //获取表单中的内容
    let formData = $(this).serialize()
    // console.log(typeof(formData)); //string
    console.log(formData);
    
    $.ajax({
        url:'/posts',
        type:'post',
        data:formData,
        success: function(){
            location.href = '/admin/posts.html'
        },
        error:function (err,val) {
            console.log(err);
        }
    })
    //阻止表单默认行为
    return false
})