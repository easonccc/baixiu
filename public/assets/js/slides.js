//实现图片上传功能
$('#image').on('change',function() {
    //使用formData创建一个表单 
    let formData = new FormData()
    //将图片加到这个表单中    
    formData.append('avatar',this.files[0])
    console.log(formData);
    //向服务器发送请求
    $.ajax({
        url: '/upload',
        type:'post',
        data: formData,
        contentType: false,
        processData : false,
        success: function (data) {
            console.log(data);
            //将图片保存到隐藏域中 表单的值等于这个图片地址
            $('#hiddenImage').val(data[0].avatar)
        }
    })
})

//为图片轮播表单添加提交事件
$('#addFoucs').on('submit',function () {
    //获取表单中的值
    let formData = $(this).serialize()
    $.ajax({
        url:'/slides',
        type: 'post',
        data: formData,
        success: function (data) {
            console.log(data);
            location.reload()
        }
    })
    return false
})

//向服务器发送请求 获取轮播图片列表的数据
$.ajax({
    url:'/slides',
    type: 'get',
    success: function (data) {
        console.log(data);
        //渲染至页面
        let html = template('imageListTpl',{data})
        // console.log(html);
        $('#imageList').html(html)
    }
})

//删除功能
$('#imageList').on('click','.imageDel',function () {
    //获得当前选择项的id
    let id = $(this).attr('data-id')
    $.ajax({
        url: '/slides/'+id,
        type: 'delete',
        success: function (data) {
            console.log(data);
            location.reload()
        }
    })
})
