/* //页面一上来就向服务器端发送请求索要文章列表数据
$.ajax({
    url:'/posts',
    type: 'get',
    success: function (parmas) {
        // console.log(parmas);
        //parmas是一个对象 但是我们查找的是这个parmas里面的一个数组 所以在下面模板中的第二个参数需要以对象形式传递
        //拼接模板引擎
        let html = template('listUserTpl',parmas)              
        // console.log(html);
        //拼接分页模板引擎
        let pages = template('pageTpl',parmas)
        $('#listUser').html(html)
        $('#pagenation').html(pages)
    }
}) */

//处理日期格式的函数
function  formDate(date) {
    //date是要处理的日期 是一个字符串类型
    //需要将日期字符串转换成日期对象
     newDate = new Date(date) 
     //拼接字符串 并将其返回

     //检测到调用getFullYear()等方法后得到的是number数据类型 
     //padStart()是字符串的方法 所以需要将其转换为字符串
     //实验得到 不能用加引号的方式转换为字符串 要用toString强制转换
    // return typeof(newDate.getMonth()+1) //number 

    // return (newDate.getMonth()+1).toString().padStart(2,'0')
    // return typeof("newDate.getMonth()+1")
     return newDate.getFullYear()+'-'+(newDate.getMonth()+1).toString().padStart(2,'0')+'-'+newDate.getDate().toString().padStart(2,'0')
}

//定义点击页码跳转的函数
function changePage(page) {
    // 向服务器端发送请求索要文章列表数据
$.ajax({
    url:'/posts',
    type: 'get',
    //传递分页信息
    data:{
        page:page
    },
    success: function (parmas) {
        console.log(parmas);
        //parmas是一个对象 但是我们查找的是这个parmas里面的一个数组 所以在下面模板中的第二个参数需要以对象形式传递
        //拼接模板引擎
        let html = template('listUserTpl',parmas)              
        // console.log(html);
        //拼接分页模板引擎
        let pages = template('pageTpl',parmas)
        $('#listUser').html(html)
        $('#pagenation').html(pages)
    }
})
}

//文章数据列表筛选功能
//向服务器发送请求索要文章分类信息
$.ajax({
    url:'/categories',
    type:'get',
    success: function (data) {
        // console.log(data);//数组
        let html = template('classTpl',{data})
        // console.log(html);
        $('#classSlect').html(html)
    }
})


//查询文章的函数
function queryPost(obj,page) {
    obj.page = page || 1
    $.ajax({
        url:'/posts',
        type: 'get',
        data: obj,
        success: function (parmas) {
            // console.log(parmas);
            //parmas是一个对象 但是我们查找的是这个parmas里面的一个数组 所以在下面模板中的第二个参数需要以对象形式传递
            //拼接模板引擎
            let html = template('listUserTpl',parmas)              
            // console.log(html);
            //拼接分页模板引擎
            let pages = template('pageTpl',parmas)
            $('#listUser').html(html)
            $('#pagenation').html(pages)
        }
    })
}

//收集form数据的函数
function serialzeObj(form) {
    let arr = form.serializeArray()
    let obj = {}
    arr.forEach((item)=>{
        obj[item.name] = item.value
    })
    return obj
}

queryPost({},1)

//当用户提交筛选文章表单时
$('#filterForm').on('submit',function (e) {
/*     //获取到用户选择的信息
    let formData = $(this).serialize()
    // 向服务器端发送请求索要文章列表数据
    $.ajax({
        url:'/posts',
        type: 'get',
        data: formData,
        success: function (parmas) {
            // console.log(parmas);
            //parmas是一个对象 但是我们查找的是这个parmas里面的一个数组 所以在下面模板中的第二个参数需要以对象形式传递
            //拼接模板引擎
            let html = template('listUserTpl',parmas)              
            // console.log(html);
            //拼接分页模板引擎
            let pages = template('pageTpl',parmas)
            $('#listUser').html(html)
            $('#pagenation').html(pages)
        }
    })
 */
    //阻止表单默认行为
    // e.preventDefault()
    let ob = serialzeObj($(this))
    console.log(ob);
    queryPost(ob,1)
    

    // //阻止表单默认行为
    return false
})

//当点击编辑按钮时
$('#listUser').on('click','.articleEdit',function () {
    let id = $(this).attr('data-id')
    console.log(id);
    //发送服务器请求
    $.ajax({
        url:'/posts/'+id,
        type:'put',
        success: function (data) {
            location.href= '/admin/post-add.html?id='+ id
        }
    }) 

})

//当点击删除按钮时
$('#listUser').on('click','.articleDle',function () {
    if(confirm('确认删除吗？')){
        //获取编辑按钮上的自定义属性id
        let id = $(this).siblings('.articleEdit').attr('data-id')
        //向服务器发起请求
        $.ajax({
            url:'/posts/'+id,
            type: 'delete',
            success: function (data) {
                console.log(data);
                location.reload()
            }
        })
        
    }
})