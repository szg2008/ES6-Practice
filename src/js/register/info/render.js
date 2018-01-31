import Region from '../../common/region.js'
import { $ } from '../../common/utils.js'
import {fetchJson} from '../../common/fetch.js'
const tpl = (data = {},opts = {}) => {
    return `<div id="register-info-wrapper" class="register-info-wrapper">
                <form id="register-info-form" class="register-info-form" onsubmit="return false">
                    <label>
                        <span>昵称</span>
                        <input type="text" name="nickname" placeholder="昵称" valid="present" value="${data.nickname || ''}"/>
                    </label>
                    <label>
                        <span>电子邮箱</span>
                        <input type="text" name="email" placeholder="电子邮箱" valid="present, email" value="${data.email || ''}"/>
                    </label>
                    <label>
                        <span>真实姓名</span>
                        <input type="text" name="realname" placeholder="真实姓名" value="${data.realname || ''}"/>
                    </label>
                    <label>
                        <span>性别</span>
                        <select id="register-info-sex" name="sex">
                            <option value="1" ${data.sex == 1?'selected':''}>男</option>
                            <option value="2" ${data.sex == 2?'selected':''} >女</option>
                        </select>
                    </label>
                    <label>
                        <span>生日</span>
                        <input type="date" name="birthday" value="${data.birthday || ''}"/>
                    </label>
                    <label>
                        <span>居住地</span>
                        <div id="register-info-address"></div>
                    </label>
                    <label>
                        <span></span>
                        <input type="submit" id="register-info-btn" value="${opts.btnText}"/>
                    </label>
                </form>
            </div>
        `
}
export default async (conf) => {
    if(!conf.update){
        conf.container.innerHTML = tpl(conf)
        const region = new Region({
            container:$('register-info-address'),
            name:'region'
        })
    }else{
        const result = await fetchJson('/profile',{})
        if(result.code === 200){
            conf.container.innerHTML = tpl(result.data,conf)
            const regionData = result.data.regionCode ? result.data.regionCode.split(',').map((item) => parseInt(item)) : ''
            const region = new Region({
                container:$('register-info-address'),
                name:'region',
                initData:regionData
            })
        }
    }

}
