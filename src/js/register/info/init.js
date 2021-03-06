import '../../common/polyfill.js'
import render from './render.js'
import bindEvent from './event.js'
import { checkOptions } from '../../common/utils.js'

const regInfo = (opts = {}) => {
    if(!checkOptions(opts)) {
        return
    }
    const defaultOptions = {
        btnText:'下一步'
    }
    const options = Object.assign(defaultOptions,opts)
    render(options).then(() => {
        bindEvent(options)
    })

}

export { regInfo }
