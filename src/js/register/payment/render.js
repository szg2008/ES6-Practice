const tpl = (opts = {}) => {
    return `
        <div id="register-payment-wrapper" class="register-payment-wrapper">
            <form id="register-payment-form" class="register-payment-form" onsubmit="return false">
                <label>
                    <span>xx宝账号：</span>
                    <input id="register-payment-input" name="username" type="text" placeholder="${opts.paymentPlaceholder}"/>
                </label>
                <label>
                    <span>xx宝密码：</span>
                    <input id="register-payment-password" name="password" type="password" placeholder="${opts.paymentPasswordPlaceholder}"/>
                </label>
                <label>
                    <span></span>
                    <input type="submit" id="register-payment-btn" value="下一步"/>
                </label>
            </form>
        </div>
    `
}

export default (conf) => {
    conf.container.innerHTML = tpl(conf)
}
