import {fetchPost,fetchJson} from '../common/fetch.js'
import {$,addClass,removeClass} from '../common/utils.js'
import findTpl from './findTpl.js'

export default async (opts) => {
    const findInfo = await fetchJson('/security-info',{})
    const $chooseMobile = $('choose-mobile')
    const $chooseEmail = $('choose-email')
    const dialog = $('forget-dialog')

    const forget = async (type) => {
        const $verifyInput = $('forget-verify-input');
        const $forgetBtn = $('forget-confirm-btn');
        const $number = $('forget-verify-number');
        const $close = $('forget-dialog-close');
        const typeAlias = (type === '邮箱') ? 'email' : 'mobile';
        const typeTool = (type === '邮箱') ? '邮件' : '短信';

        const sendVerifyCode = await fetchJson('/send-forget-verifycode', {type: typeAlias});

        if (sendVerifyCode.code === 200) {
            $verifyInput.oninput = () => {
                const MSGLENGTH = 6;
                let value = $verifyInput.value;
                //过滤非数字输入
                $verifyInput.value = value.replace(/\D/g, '');
                //长度过滤
                if ($verifyInput.value.length > (MSGLENGTH - 1)) {
                    $forgetBtn.removeAttribute('disabled');
                    removeClass($forgetBtn, 'disabled');
                    addClass($forgetBtn, 'btn-primary');
                    if (value.length > MSGLENGTH) {
                        $verifyInput.value = value.substring(0, MSGLENGTH);
                    }
                }
                else {
                    removeClass($forgetBtn, 'btn-primary');
                    addClass($forgetBtn, 'disabled');
                    $forgetBtn.setAttribute('disabled', 'disabled');
                }
            }

            $forgetBtn.onclick = async () => {
                let data = await fetchPost('/forget', {
                    mobile: $number.innerText,
                    verifyCode: $verifyInput.value,
                });
                if (data.code === 200) {
                    opts.success && opts.success();
                    location.replace('common-success.html?text=重置链接已发送至您的'+ type + '，请收到后按提示操作');
                }else {
                    alert('验证码输入错误');
                }
            }

            $close.onclick = () => {
                dialog.style.display = 'none';
            }

            dialog.style.display = 'block';
        }else{
            alert('验证' + typeTool + '发送失败');
        }
    }

    $chooseMobile.onclick = () => {
        dialog.innerHTML = findTpl('手机',findInfo.data.mobile)
        forget('mobile')
    }

    $chooseEmail.onclick = () => {
        dialog.innerHTML = findTpl('邮箱',findInfo.data.email)
        forget('email')
    }
}
