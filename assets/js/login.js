$(function () {
    // 点击了 去注册账号
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    // 点击了 去登录
    $('#link_login').on('click', function () {
        $('.reg-box').hide();
        $('.login-box').show();
    })




    // 从 layui中获得from对象
    var form = layui.form
    var layer = layui.layer;
    //校验规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            // 获取到第一次密码的值
            var pwd = $('.reg-box [name="repassword"]').val()
            if (value !== pwd) {
                return '两次输入的密码不一致'
            }
        }
    })


    // 监听注册表单的提交事件
    $('#from_reg').on('submit', function (e) {
        e.preventDefault();

        var data = {
            username: $('#from_reg [name=username]').val(),
            password: $('#from_reg [name=password]').val()
        }
        $.post('/api/reguser'), data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功，请登录');
            //自动跳转到登陆表单
            $('#link_login').click();
        }
    })

    //监听登录表单的提交事件
    $('#from_login').on('submit', function (e) {
        e.preventDefault();
        // 发起ajax请求
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('登录成功！')
                // 登录成功后跳转到后台主页
                location.href = "../home/index.html"
                // 并且保存回来的token
                localStorage.setItem('token', res.token)
            }
        });
    })
})


