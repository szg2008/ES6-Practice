import '../../common/polyfill.js'
import render from './render.js'
import bindEvent from './event.js'
import { checkOptions } from '../../common/utils.js'

const regPayment = (opts = {}) => {
    if(!checkOptions(opts)) {
        return
    }
    let defalutOptions = {
        paymentPlaceholder:'请输入您的xx宝账号',
        paymentPasswordPlaceholder:'请输入您的xx宝密码'
    }
    let options = Object.assign(defalutOptions,opts)
    render(options)
    bindEvent(options)
}

export { regPayment }
