import {$} from '../../common/utils.js'
import {fetchPost} from '../../common/fetch.js'
export default (conf) => {
    const $form = $('register-payment-form')
    $form.onsubmit = async (e) => {
        e.preventDefault()
        let formValue = {}
        Array.from($form.elements).forEach((item) => {
            if(item.name){
                formValue[item.name] = item.value
            }
        })

        let data = await fetchPost('/register/payment',formValue)
        if(data.code === 200){
            conf.success && conf.success(data)
        }
    }
}
