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