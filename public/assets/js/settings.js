//上传网站图片
$('#logo').on('change',function () {
    //添加二进制表单
    let formData = new FormData()
    formData.append('avatar',this.files[0])
    $.ajax({
        url:'/upload',
        type:'post',
        data: formData,
        contentType: false,
        processData: false,
        success: function (data) {
            console.log(data);
            //将获取到的图片地址放在隐藏域中
            $('#hiddenLogo').val(data[0].avatar)
            //将图片显示出来
            $('#image').attr('src',data[0].avatar)
        }
    })
})

//为表单绑定提交事件
$('.form-horizontal').on('submit',function (e) {
    e.preventDefault()
     //获取表单内容
     let formData = $(this).serialize()
     console.log(formData);
     $.ajax({
         url: '/settings',
         type: 'post',
         data: formData,
         success: function (data) {
             location.reload()
         }
     })
})

//渲染页面 如果之前就设置了 页面一打开就要显示 所以直接向服务器发起请求
$.ajax({
    url:'/settings',
    type: 'get',
    success: function (data) {
        console.log(data);
        //判断是否有数据 有就渲染页面
        if(data){
            //将图片地址放在隐藏域
            $('#hiddenLogo').val(data.logo)
            //将隐藏域中的图片给显示的
            $('#image').prop('src',$('#hiddenLogo').val())
            console.log(image);
            //将站点名称显示在表单
            $('#site_name').val(data.title)
            //站点描述
            $('#site_description').val(data.description)
            //站点关键字
            $('#site_keywords').val(data.keywords)
            //评论复选框1
            //判断是否选中状态 
            // $('#comment_status').prop('checked',data.comment)
            //  $('#comment_reviewed').prop('checked',data.review) 
            if( $('#comment_status').prop('checked')){
                $('#comment_status').prop('value','true')
            }else{
                $('#comment_status').prop('value','false')
            }
        }
        
    }
    
})