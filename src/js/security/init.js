import '../common/polyfill.js'
import render from './render.js'

const security = (opts = {}) => {
    const defaultOptions = {

    }

    const options = Object.assign(defaultOptions,opts)
    render(options)
}

export {security}
