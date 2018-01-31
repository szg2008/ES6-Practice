const getId = (id) => {
    const dom = document.getElementById(id)
    dom && dom.setAttribute('id',dom.id + '-' + Math.floor(Math.random() * 100000))
    return dom
}

const hasClass = (obj,cls) => {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

const addClass = (obj,cls) => {
    obj.className.trim()
    if(!hasClass(obj,cls)) {
        obj.className += ' ' + cls
    }
}

const removeClass = (obj,cls) => {
    if(hasClass(obj,cls)) {
        const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
        obj.className = obj.className.replace(reg,' ')
    }
}

const isDom = (obj) => {
    try{
        return obj instanceof HTMLElement
    }catch(e){
        return (typeof obj === 'object') && (obj.nodeType === 1) && (typeof obj.style === 'object')
    }
}

const checkOptions = (opts) => {
    if(Object.prototype.toString.call(opts) !== '[object Object]'){
        return false
    }
    if(!opts.container){
        throw new Error('Container can not be empty !')
        return false
    }

    if(!isDom(opts.container)){
        throw new Error('Container must be a HTMLElement')
        return false
    }

    return true
}

const getUrlParams = (key) => {
    const query = location.search.replace(/^\?/,'')
    let obj = {}
    query.split('&').map((item) => {
        let tmp = item.split('=')
        obj[tmp[0]] = tmp[1]
    })

    if(!key){
        return obj
    }else{
        return obj[key]
    }


}
export { getId as $,addClass,removeClass,checkOptions, getUrlParams }
