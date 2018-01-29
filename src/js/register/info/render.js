const tpl = (opts = {}) => {
    return `<div id="register-info-wrapper" class="register-info-wrapper">
                <form id="register-info-form" class="register-info-form" onsubmit="return fasle">
                    <label>
                        <span>昵称</span>
                        <input type="text" name="nickname" placeholder="昵称" valid="present"/>
                    </label>
                    <label>
                        <span>电子邮箱</span>
                        <input type="text" name="email" placeholder="电子邮箱" valid="present, email"/>
                    </label>
                    <label>
                        <span>真实姓名</span>
                        <input type="text" name="realname" placeholder="真实姓名"/>
                    </label>
                    <label>
                        <span>性别</span>
                        <select id="register-info-sex" name="sex">
                            <option value="1">男</option>
                            <option value="2">女</option>
                        </select>
                    </label>
                    <label>
                        <span>生日</span>
                        <input type="date" name="birthday" />
                    </label>
                    <label>
                        <span>居住地</span>
                        <div id="register-info-address"></div>
                    </label>
                    <label>
                        <span></span>
                        <input type="submit" id="register-info-btn" value="下一步"/>
                    </label>
                </form>
            </div>
        `
}
export default (conf) => {
    conf.container.innerHTML = tpl(conf)
}
