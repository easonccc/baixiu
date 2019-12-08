//向服务器端发送请求获取轮播图数据
$.ajax({
    type: 'get',
    url: '/slides',
    success: function (data) {
        console.log(data);
        //将轮播图片渲染至页面
        let html = template('bannerTpl', { data })
        // console.log(html);
        $('#bannerWrapper').html(html)
        //
        var swiper = Swipe(document.querySelector('.swipe'), {
            auto: 3000,
            transitionEnd: function (index) {
                // index++;

                $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
            }
        });

        // 上/下一张
        $('.swipe .arrow').on('click', function () {
            var _this = $(this);

            if (_this.is('.prev')) {
                swiper.prev();
            } else if (_this.is('.next')) {
                swiper.next();
            }
        })
    }
})

//获取最新发布数据
$.ajax({
    url: '/posts/lasted',
    type: 'get',
    success: function (data) {
        console.log(data);
        let html = template('newPublishTpl',{data})
        console.log(html);
        $('#newPublish').html(html)
    }
})