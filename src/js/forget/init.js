import '../common/polyfill.js'
import render from './render.js'
import bindEvent from './event.js'

const forget = (opts = {}) => {
    const defaultOptions = {

    }

    const options = Object.assign(defaultOptions,opts)

    render(options)
    bindEvent(options)

}

export { forget }
