//向服务器发送请求 获取评论列表信息
$.ajax({
    url: '/comments',
    type: 'get',
    success: function (data) {
        console.log(data);
        //渲染评论列表
        let html = template('commentsTpl',data)
        // console.log(html);
        $('#commentsList').html(html)
        //渲染分页
        let page = template('pagenationTpl',data)
        $('#pagenation').html(page)
    }
})

//封装分页的函数
function changePage(p) {
    //向服务器发送请求 获取评论列表信息
  $.ajax({
    url: '/comments',
    type: 'get',
    data:{
        page: p
    },
    success: function (data) {
        console.log(data);
        //渲染评论列表
        let html = template('commentsTpl',data)
        // console.log(html);
        $('#commentsList').html(html)
        //渲染分页
        let page = template('pagenationTpl',data)
        $('#pagenation').html(page)
    }
  })
}

//为审核按钮添加点击事件 
$('#commentsList').on('click','.stateEidt',function () {
    //获取到当前选择数据的id
    let id = $(this).attr('data-id')
    //获取当前的状态
    let status = $(this).attr('data-states')
    $.ajax({
        url: '/comments/'+id,
        type: 'put',
        data : {
            //修改状态
            state: status == 0 ? 1 : 0
        },
        success: function (data) {
            location.reload()
        }
    })
    //阻止默认行为
    return false
})

//评论删除
$('#commentsList').on('click','.commonDel',function () {
    //获取当前id
    let id = $(this).siblings('.stateEidt').attr('data-id')
    //发送请求删除
    $.ajax({
        url: '/comments/'+id,
        type: 'delete',
        success :function (data) {
            // console.log(data);
            location.reload()
        }
    })
    //阻止默认行为
    return false
})


