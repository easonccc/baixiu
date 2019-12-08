//向服务器发送请求获取数量信息
/* //获取文章数量
$.ajax({
    url: '/posts/count',
    type: 'get',
    success: function (data) {
        //在相应的位置显示
        //草稿
        let draftCount = data.draftCount
        $('#draftCount').html(draftCount)
        //文章
        let postCount = data.postCount
        $('#postCount').html(postCount)
    }
})

//获取分类
$.ajax({
    url:'/categories/count',
    type: 'get',
    success: function (data) {
        // console.log(data);
        $('#categoryCount').html(data.categoryCount)
        
    }
})

//评论
$.ajax({
    url : '/comments/count',
    type : 'get',
    success: function (data) {
        console.log(data);
        $('#commentCount').html(data.commentCount)
        //获取所有评论的状态
        
    }
}) */

//多发并行 
$.when(
    $.ajax({
        url: '/posts/count',
        type: 'get',
    }),
    $.ajax({
        url:'/categories/count',
        type: 'get',
    }),
    $.ajax({
        url : '/comments/count',
        type : 'get',
    }),
).done(function (r1,r2,r3) {
     //草稿
    let draftCount = r1[0].draftCount
    $('#draftCount').html(draftCount)
     //文章
    let postCount =  r1[0].postCount
    $('#postCount').html(postCount)
    //分类
    $('#categoryCount').html(r2[0].categoryCount)
    //评论
    $('#commentCount').html(r3[0].commentCount)
})