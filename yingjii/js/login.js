/**
 * Created by Administrator on 2017/1/4 0004.
 */

(function (global) {

    $(function () {
        global.pfun.autoSize();
        global.pfun.switchLng();
        global.plogin.init();
    });

    global.pfun = {
        // �Զ����㵯��ҳ�沼�ֵĸ߿�����
        autoSize: function () {
            var pwidth = document.documentElement.clientWidth,
                pheight = document.documentElement.clientHeight;

            pwidth = 1920;
            pheight = 1080;

            $("body").width(pwidth).height(pheight);

            // �ֱ��ʴ��ڻ�С��1920*1080pʱ���Զ��Ŵ���
            if(window.screen.width != pwidth || window.screen.height != pheight) {
                var scaleX = parseFloat(parseFloat(window.screen.width / pwidth).toFixed(3));
                var scaleY = parseFloat(parseFloat(window.screen.height / pheight).toFixed(3));
                var scale = (scaleX < scaleY) ? scaleX : scaleY;

                // ���ź���߳ߴ�
                var scaleWidth = parseInt((pwidth*scale).toFixed(0), 10);
                var scaleHeight = parseInt((pheight*scale).toFixed(0), 10);

                var originX = window.screen.width - scaleWidth > 0 ? parseFloat((window.screen.width - scaleWidth)/2) : 0;
                var originY = window.screen.height - scaleHeight > 0 ? parseFloat((window.screen.height - scaleHeight)/2) : 0;

                var nX = originX === 0 ? 0 : parseFloat((originX/scale).toFixed(1));
                var nY = originY === 0 ? 0 : parseFloat((originY/scale).toFixed(1));

                console.log(`sW: ${window.screen.width}��scW: ${scaleWidth}��sH: ${window.screen.height}��scH: ${scaleHeight}`);
                console.log(`originX: ${originX}��originY: ${originY}`);
                console.log(`nX: ${nX}��nX: ${nY}`);

                $("body").css({
                    'transform': 'scale(' + scale + ') translate(' + (nX) + 'px, ' + (nY) + 'px)',
                    'transform-origin': '0 0'
                });
            }
        },
        // �л���Ӣ������
        switchLng: function () {
            $(".logo").attr("lng", language);
            $(".logo").bind("click", function () {
                var url = window.location.href;
                var idx = url.indexOf('l=');
                // Ĭ�����Լ����޵�ַ����ֵ
                if(idx == -1) {
                    if(language === 'en-au') {
                        if(url.indexOf('?') >= 0) { url += '&l=zh-cn'; }
                        else { url += '?l=zh-cn'; }
                    }
                    else {
                        if(url.indexOf('?') >= 0) { url += '&l=en-au'; }
                        else { url += '?l=en-au'; }
                    }
                }
                else {
                    if(language === 'en-au') { url = url.replace('en-au', 'zh-cn'); }
                    else { url = url.replace('zh-cn', 'en-au'); }
                }
                // ˢ��ҳ��
                window.location.href = url;
            });
        }
    };

    // ��¼
    global.plogin = {
        init: function () {
            // ��ȡ�û��洢
            if(document.cookie && document.cookie != "") {
                var utxt = document.cookie;
                var split = utxt.split('|');
                $("#txtUser").val(split[0]);
                $("#txtPwd").val(split[1]);
            }
            // ���¼�
            global.plogin.bindToLogin();
        },
        bindToLogin: function () {
            $("#btnSubmit").bind("click", global.plogin.CheckLogin);
            document.onkeydown = function(e){
                var c = e || window.event || arguments.callee.caller.arguments[0];
                if(c && c.keyCode==13){
                    global.plogin.CheckLogin()
                }
            }
        },
        CheckLogin: function () {
            var txtUser = $.trim($("#txtUser").val());
            var txtPwd = $.trim($("#txtPwd").val());

            if(txtUser == null || txtUser == "" || txtPwd == null || txtPwd == "") {
                alert(dlang.error_empty);
                return;
            }
            var tmpUser = global.users['p' + txtUser];
            if(tmpUser) {
                var tmpPwd = global.plogin.AsciiToUnicode(txtPwd);
                if((tmpUser.user && tmpUser.user == txtUser) && (tmpUser.pwd && tmpUser.pwd == tmpPwd)) {
                    global.plogin.SuccessLogin();
                }
                else {
                    alert(dlang.error_up);
                    return;
                }
            }
            else {
                alert(dlang.error_up);
                return;
            }
        },
        SuccessLogin: function () {
            var url = 'index.html?l=' + language;
            // �洢��¼״̬
            if(window.sessionStorage) {
                window.sessionStorage.setItem("login", 'success');
            }
            // �����û���Ϣ
            var sxtime = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toGMTString();
            document.cookie = $.trim($("#txtUser").val()) + "|" + $.trim($("#txtPwd").val()) + ";expires=" + sxtime;
            // ��ת��ҳ
            window.location.href = url;
        },
        AsciiToUnicode: function (content) {
            var result = '';
            for (var i=0; i<content.length; i++){
                result += '&#' + content.charCodeAt(i) + ';';
            }
            return result;
        }
    };

})(window);