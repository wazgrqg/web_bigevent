$(function () {
    //获取用户信息
    getUserInfo()

    //点击后退按钮，返回login页面，并清空token
    $('backOff').on('click', function () {

        layer.confirm('确认退出登录吗？', { icon: 3, title: '提示' }, function (index) {
            localStorage.removeItem('token')
            location.href = '/login.html'

            layer.close(index);
        });

    })
})

//发起请求，获取用户信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // Headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 200) {
                return layer.msg('获取用户信息失败')
            }

            // 调用renderAvatar 渲染用户头像
            renderAvatar(res.data)
        }
        // complete: function (res) {
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 清空token并且返回login页面
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }
        // }
    })
}

//渲染用户头像
function renderAvatar(user) {
    //1.获取用户的信息
    var name = user.nickname || user.username;
    // 2. 设置欢迎的文本
    $('.welcome').html('欢迎&nbsp;&nbsp;' + name)
    //渲染用户头像
    if (user.user_pic !== null) {
        //显示图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    }
    else {
        //显示文字头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()

    }
}