//获取随机推荐
$.ajax({
    url: '/posts/random',
    type: 'get',
    success: function (data) {
        console.log(data);
        //在这个公共文件进行模板拼接
        let randomTpl = `
        {{each data}}
        <li>
            <a href="javascript:;">
            <p class="title">{{$value.title}}</p>
             <p class="reading">阅读(819)</p>
             <div class="pic">
            <img src="{{$value.thumbnail}}" alt="" />
          </div>
        </a>
      </li>
      {{/each}}
        `
        //渲染至页面
        let html = template.render(randomTpl,{data})
        $('.random').html(html)
    }
})

//获取最新评论
$.ajax({
    url: '/comments/lasted',
    type:'get',
    success: function (data) {
        console.log(data);
        //在这个公共文件进行模板拼评论列表
        let commentsTpl = `
            {{each data}}
            <li>
            <a href="javascript:;">
              <div class="avatar">
                <img src="{{$value.author.avatar}}" alt="" />
              </div>
              <div class="txt">
                <p><span>{{$value.author.nickName}}</span>{{$value.createAt.split('T')[0]}}说:</p>
                <p>{{$value.content}}</p>
              </div>
            </a>
          </li>
          {{/each}}
        `
        // console.log(commentsTpl);
        let html = template.render(commentsTpl,{data})
        $('.discuz').html(html)
    }
})