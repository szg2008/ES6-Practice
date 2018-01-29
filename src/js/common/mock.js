import FetchMock from 'fetch-mock'
import regionData from './data/region-data.js'
FetchMock.mock('/login',(url,opts) => {
    const params = opts.params
    if(params.account === '18512345678'){
        if(params.password === '111111'){
            return {code:200,message:'success'}
        }else{
            return {code:401,message:'密码错误'}
        }
    }else{
        return {code:400,message:'用户名错误'}
    }
})

FetchMock.mock('/getMobileVerifyToken',(url,opts) => {
    return {
        code:200,
        message:'success',
        mobileVerifyToken:'skjh234kjhsdkjfhwe11223'
    }
})

FetchMock.mock('/register/getVerifyCode',(url,opts) => {
    const params = opts.params
    return {
        code:200,
        message:'success',
        mobile:params.mobile
    }
})

FetchMock.mock('/register/mobile',(url,opts) => {
    const params = opts.params
    if(params.verifyCode === '123456'){
        return {
            code:200,
            message:'success',
            token:'11111111'
        }
    }else{
        return {
            code:400,
            message:'valid verifyCode'
        }
    }

})

FetchMock.mock('/region-data', (url, opts) => {
    return { code: 200, message: 'success', data: regionData }
});
