$.ajax({
    url:'/posts/recommend',
    type: 'get',
    success: function (data) {
        console.log(data);
    //通过字符串拼接这个模块 让这个模块在公共的js文件
        let hotRecommendTpl = `{{each data}}
        <li>
          <a href="javascript:;">
            <img src="{{$value.thumbnail}}" alt="">
            <span>{{$value.title}}</span>
          </a>
        </li>
        {{/each}}`
   
        let html = template.render(hotRecommendTpl,{data})
        // console.log(html);
        $('#hotRecommend').html(html)
    }
})