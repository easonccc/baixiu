//向服务器端发送请求获取文章分类数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (data) {
        // console.log(data);
        let html = template('categoryTpl', { data })
        $('#category').html(html)
    }
})

//图片上传功能
$('#feature').on('change', function () {
    //获取到用户选择的文件
    let file = this.files[0]
    //通过formData实现图片上传
    let formData = new FormData()
    formData.append('cover', file)
    //请求服务器
    $.ajax({
        url: '/upload',
        type: 'post',
        data: formData,
        //告诉ajax方法不要处理data属性对应的参数
        processData: false,
        //不设置参数类型 在formData参数中已经设定好了
        contentType: false,
        success: function (data) {
            // console.log(data);
            //将文件上传的图片地址保存在隐藏域中
            $('#thumbnail').val(data[0].cover)
        }
    })

})

//文件添加功能
//当添加文章表单提交的时候
$('#addForm').on('submit', function () {
    //获取表单中的内容
    let formData = $(this).serialize()
    // console.log(typeof(formData)); //string
    console.log(formData);
    $.ajax({
        url: '/posts',
        type: 'post',
        data: formData,
        success: function () {
            location.href = '/admin/posts.html'
        },
        error: function (err, val) {
            console.log(err);
        }
    })
    //阻止表单默认行为
    return false
})

//获取浏览器地址中的id参数
let id = getUrlParams('id')
//对浏览器状态进行判断 如果不等于-1 说明是编辑状态
if (id != -1) {
    //向服务器请求当前数据
    $.ajax({
        url: '/posts/' + id,
        type: 'put',
        success: function (data) {
            //向服务器端发送请求获取文章分类数据
            $.ajax({
                type: 'get',
                url: '/categories',
                success: function (categories) {
                    data.categories = categories
                    //渲染页面
                    let html = template('articleEditTpl',data)
                    $('#articleBox').html(html)
                    console.log(data.updateAt);
                }
            })
        }
    })
}

//提交修改文章表单
$('#articleBox').on('submit','#articleEdit',function (e) {
    //获取表单数据
    let formData = $(this).serialize()
    //获取对应的id
    let id = $(this).attr('data-id')
    $.ajax({
        url:'/posts/'+id,
        type:'put',
        data: formData,
        success: function (data) {
            console.log(data);
            location.href = '/admin/posts.html'
        }
    })

    //阻止默认跳转行为
    e.preventDefault()
})

//从浏览器的地址中获取查询参数
function getUrlParams(params) {
    //location下面有个属性search 可以查询到地址信息
    //   console.log(location.search)
    //截取到需要的id字符串 substr第一个参数是开始截取的索引 第二个参数是结束的索引(不写表示到最末尾) 分割字符串 split方法是以这个参数进行分割 分割成数组
    let arr = location.search.substr(1).split('&')
    //循环数据
    for (let i = 0; i < arr.length; i++) {
        let newArr = arr[i].split('=')
        if (newArr[0] == params) {
            return newArr[1]
        }
    }
    //如果查找不到传递的参数就返回-1
    return -1
}

