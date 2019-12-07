//为表单提交添加事件 添加功能
$('#addCategory').on('submit',function(){
    //获取用户输入的内容
    let formData = $(this).serialize()
    //向服务器端发送请求
    $.ajax({
        url:'/categories',
        type: 'post',
        data: formData,
        success: function(data){
            location.reload()
        }
    })
    //阻止表单默认行为
    return false
})

//分类数据展示功能
//发送ajax请求 向服务器端所有分类列表数据
$.ajax({
    type:'get',
    url: '/categories',
    success: function(data){
        // console.log(data);
        //将服务器返回的数据渲染到页面中
        let html = template('categoriesTpl',{data})
        $('#tbody').html(html)
    }
})

//分类数据修改功能
$('#tbody').on('click','.edit',function(){
    //找到当前选择的数据的id
    let id = $(this).attr('data-id')
    console.log(id);
    $.ajax({
        url: '/categories/'+ id,
        type:'get',
        success: function(data){
            //模板第二个参数必须是对象 data本身就是一个对象
            let html = template('editTpl',data)
            console.log(html);
            $('#categorierEidt').html(html)
        }
    })
})

//为修改后的表单绑定提交事件
$('#categorierEidt').on('submit','#editCategory',function(){
    //获取用户修改的信息
    let formData = $(this).serialize()
    //获取到要修改分类的id
    let id = $(this).attr('data-id')
    //向服务器发送请求
    $.ajax({
        type:'put',
        url: '/categories/'+ id, 
        data:formData,
        success: function(){
            location.reload()
        }
    })
    //阻止表单默认行为
    return false
})

//删除功能
$('#tbody').on('click','.del',function(){
    //获当前用户点击的这条数据的id
    let id = $(this).siblings('.edit').attr('data-id')
    //再次确认是否删除 如果是就进行下列操作
    if(confirm('您确定删除吗？')){
        $.ajax({
            url:'/categories/'+id,
            type:'delete',
            success: function(data){
                console.log(data);
                location.reload()
            }
        })
    }
})
























