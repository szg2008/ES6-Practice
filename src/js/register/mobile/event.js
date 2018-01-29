import Slider from '../../common/slider.js'
import {$,addClass,removeClass } from '../../common/utils'
import {fetchPost} from '../../common/fetch.js'
import { check } from '../../common/form-check.js'
export default (opts) => {
    let mobileVerifyToken;
    const $mobileInput = $('register-mobile-input')
    const $verifyInput = $('register-verify-input')
    const $verifyBtn = $('register-verify-btn')
    const $mobileBtn = $('register-mobile-btn')
    const $verifyForm = $('register-verify-form')
    const $mobileForm = $('register-mobile-form')
    const $verifyMobile = $('register-verify-mobile')
    const $dialog = $('register-verify-dialog')
    const $dialogClose = $('register-verify-dialog-close')

    const slider = new Slider({
        container:$('register-verify-wrapper'),
        success: async ($wrapper,$text,offsetArr) => {
            const offsetMsg = offsetArr.join(':')
            let data = await fetchPost('/getMobileVerifyToken',{
                offsetMsg:offsetMsg
            })
            if(data.code === 200){
                mobileVerifyToken = data.mobileVerifyToken
                addClass($wrapper,'success')
                $text.innerHTML = '验证成功'

            }else{
                addClass($wrapper,'failed')
                $text.innerHTML = '验证失败'
            }
            $verifyBtn.removeAttribute('disabled')
            removeClass($verifyBtn,'disabled')
        }
    })
    $verifyBtn.onclick = async () => {
        let checkResults = check($verifyForm)
        if(checkResults.length){
            const type = checkResults[0].type
            if(type === 'present'){
                alert('请填写你的手机号')
            }else if(type === 'mobile'){
                alert('请填写正确格式的手机号')
            }
        }else{
            let data = await fetchPost('/register/getVerifyCode',{
                mobile:$mobileInput.value,
                mobileVerifyToken:mobileVerifyToken
            })
            if(data.code === 200){
                $dialog.style.display = 'block'
                $verifyMobile.innerHTML = data.mobile
                mobileVerifyToken = ''
                slider.reset()
            }else{
                alert('手机号验证失败')
            }
        }
    }
    $dialogClose.onclick = () => {
        $dialog.style.display = 'none'
        mobileVerifyToken = ''
        slider.reset()
    }
    $verifyInput.oninput = () => {
        const MSGLENGTH = 6
        let value = $verifyInput.value
        $verifyInput.value = $verifyInput.value.replace(/\D/g,'')//非数字置空
        if($verifyInput.value.length > (MSGLENGTH - 1)){
            $mobileBtn.removeAttribute('disabled')
            removeClass($mobileBtn,'disabled')
            addClass($mobileBtn,'btn-primary')
            if(value.length > MSGLENGTH){
                $verifyInput.value = value.substring(0,MSGLENGTH)
            }
        }else{
            $mobileBtn.setAttribute('disabled','disabled')
            addClass($mobileBtn,'disabled')
            removeClass($mobileBtn,'btn-primary')
        }
    }
    $mobileBtn.onclick = async () => {
        let data = await fetchPost('/register/mobile',{
            mobile:$verifyMobile.innerText,
            verifyCode:$verifyInput.value,
            mobileVerifyToken:mobileVerifyToken
        })

        if(data.code === 200){
            opts.success && opts.success(data.token)
        }else{
            alert('验证码错误')
        }
    }
}
