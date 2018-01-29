import { $ } from '../common/utils.js'
import {fetchPost} from '../common/fetch.js'
import { check } from '../common/form-check.js'
export default (opts = {}) => {
    const $loginForm = $('login-form')
    const $loginBtn = $('login-btn')
    const $remember = $('login-remember');
    const $clearAccount = $('clear-account');
    const $account = $('login-account');
    const $password = $('login-password');
    const $error = $('login-error');
    //表单验证
    $loginForm.onsubmit = async (e) => {
        e.preventDefault()
        //点击登录
        const checkResults = check($loginForm)
        if(!checkResults.length){
            let remember = '0'
            if($remember.getAttribute('checked')){
                remember = '1'
            }
            const data = await fetchPost('/login',{
                account:$account.value,
                password:$password.value,
                remember:remember
            })
            if(data.code === 200){
                opts.success && opts.success()
            }else{
                $error.innerHTML = data.message
            }
        }else{
            const name = checkResults[0].name
            const type = checkResults[0].type
            if(type === 'present'){
                if(name === 'account'){
                    $error.innerHTML = '请填写您的用户名'
                }
                if(name === 'password'){
                    $error.innerHTML = '请填写您的密码'
                }
            }
        }
    }
    /*
     * 点击清空用户名
     */
    $clearAccount.onclick = () => {
        $account.value = ''
        $clearAccount.style.display = 'none'
    };


    /*
     * 有输入的时候展示清空按钮, 并清空错误信息
     */
    $account.oninput = () => {
        if($account.value.length){
            $clearAccount.style.display = 'block'
        }else{
            $clearAccount.style.display = 'none'
        }
        $error.innerHTML = ''
    }

    $password.oninput = () => {
        $error.innerHTML = ''
    }

}
