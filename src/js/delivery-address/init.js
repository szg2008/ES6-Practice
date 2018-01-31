import '../common/polyfill.js'
import render from './render.js'
import bindEvent from './event.js'

const delivery = (opts = {}) => {
    const defaultOptions = {

    }

    const options = Object.assign(defaultOptions,opts)
    render(options).then(() => {
        bindEvent(options)
    })
}

export { delivery }
