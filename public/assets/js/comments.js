//向服务器发送请求 获取评论列表信息
$.ajax({
    url: '/comments',
    type: 'get',
    success: function (data) {
        console.log(data);
        //渲染评论列表
        let html = template('commentsTpl',data)
        console.log(html);
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
        console.log(html);
        $('#commentsList').html(html)
        //渲染分页
        let page = template('pagenationTpl',data)
        $('#pagenation').html(page)
    }
  })
}


