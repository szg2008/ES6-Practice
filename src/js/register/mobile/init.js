import '../../common/polyfill.js'
import render from './render.js'
import bindEvent from './event.js'
import { checkOptions } from '../../common/utils.js'

const regMobile = (opts = {}) => {
    if(!checkOptions(opts)) {
        return
    }
    const defaultOpts = {

    }

    const options = Object.assign(defaultOpts,opts)

    render(options)
    bindEvent(options)
}

export { regMobile }
