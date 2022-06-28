$(function () {
    var form = layui.form
    initUserInfo()

    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称的字符必须在 1~ 6 个字符之间'
            }
        }
    })
})