$.ajaxPrefilter(function (options) {

    //拼接根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    console.log(options.url);

    //统一为有权限的接口，设置请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.Headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    //统一为ajax请求挂在 complete 函数
    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 清空token并且返回login页面
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})