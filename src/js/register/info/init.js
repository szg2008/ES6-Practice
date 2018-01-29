import '../../common/polyfill.js'
import render from './render.js'
import bindEvent from './event.js'

const regInfo = (opts = {}) => {
    const defalutOptions = {

    }
    const options = Object.assign(defalutOptions,opts)
    render(options)
    bindEvent(options)
}

export { regInfo }
