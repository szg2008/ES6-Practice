import { getId } from '../common/utils.js'
const template = (opts = {}) => {
    const autocompleteTpl = `
        <div id="no-autocomplete">
            <input type='text' />
            <input type="password" />
        </div>
    `
    const showRemember = opts.showRemember ? 'block' : 'none';
    const autocompleteAdapter = opts.autocomplete ? '' : autocompleteTpl
    const autocompleteValue = opts.autocomplete ? 'on' : 'off'
    const tpl = `
        <div id="login-wrapper">
            <p id="login-error" class="login-error"></p>
            <form id="login-form" onsubmit="return false">
                ${autocompleteAdapter}
                <label class="login-account-wrapper">
                    <span class="account-label">${opts.accountLabel}</span>
                    <input id="login-account" name="account" type="text" valid="present" placeholder="${opts.accountPlaceholder}" autocomplete="${autocompleteValue}"/>
                    <span id="clear-account" class="del"></span>
                </label>
                <label class="login-password-wrapper">
                    <span class="password-label">${opts.passwordLabel}</span>
                    <input id="login-password" name="password" type="password" valid="present" placeholder="${opts.passwordPlaceholder}" autocomplete="${autocompleteValue}"/>
                </label>
                <label class="login-remember-wrapper" style="display:${showRemember}">
                    <span>记住密码：</span>
                    <input id="login-remember" name="remember" type="checkbox"/>
                </label>

                <input id="login-btn" class="login-btn" type="submit" value="${opts.loginBtnText}"/>
                <div class="login-extra-wrapper">
                    <a href="forget.html">忘记密码</a>
                    <a href="register-mobile.html">免费注册</a>
                </div>
            </form>
        </div>
    `;
    return tpl
}

export default (conf = {}) => {
    //document.getElementById('login-wrapper')
    conf.container.innerHTML = template(conf)
    const $noAutocomplete = getId('no-autocomplete')
    if($noAutocomplete){
        $noAutocomplete.style.opacity = '0'
        $noAutocomplete.style.height = '0'
    }
}
