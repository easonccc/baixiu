//页面一上来就向服务器端发送请求索要文章列表数据
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
})

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
        console.log(data);
        let html = template('classTpl',{data})
        // console.log(html);
        $('#classSlect').html(html)
    }
})

//当用户提交筛选文章表单时
$('#filterForm').on('submit',function () {
    //获取到用户选择的信息
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


    //阻止表单默认行为
    return false
})