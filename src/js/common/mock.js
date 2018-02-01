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

FetchMock.mock('/register/info', (url, opts) => {
    return { code: 200, message: 'success' }
});

FetchMock.mock('/register/payment', (url, opts) => {
    return { code: 200, message: 'success' }
});

FetchMock.mock('/profile', (url, opts) => {
    return { code: 200, message: 'success',data:{
        nickname:'xiaoming',
        mobile:'14322210900',
        email:'11@qq.com',
        realname:'小红',
        sex:2,
        birthday:'2018-10-20',
        regionCode:'9,73,723',
        regionString:'上海市静安区'
    } }
});
FetchMock.mock('/delivery-address', {
    code: 200,
    message: 'success',
    data: [{
        name: '张三',
        regionSting: '北京市东城区',
        regionCode: '1,1,1',
        detailAddress: '和平北街334号',
        postalcode: '100000',
        mobile: 18512567389,
        telephone: '',
        addrId: 345
    },
    {
        name: '张三',
        regionSting: '北京市西城区',
        regionCode: '1,1,2',
        detailAddress: '和平西街234号',
        postalcode: '100000',
        mobile: 18512567389,
        telephone: '',
        addrId: 346
    },
    {
        name: '李四',
        regionSting: '上海市静安区',
        regionCode: '9,73,723',
        detailAddress: '和平北街334号',
        postalcode: '100000',
        mobile: 18517384387,
        telephone: '',
        addrId: 347
    }]
})

FetchMock.mock('/save-delivery', (url, opts) => {
    return { code: 200, message: 'success' }
});
FetchMock.mock('/del-delivery', (url, opts) => {
    return { code: 200, message: 'success' }
});

FetchMock.mock('/security-info', {
    code: 200,
    message: 'success',
    data: {
        nickname: 'xiaoming',
        mobile: '18567286637',
        email: 'xiaomong@163.com',
        password: 1,
        identity: 1,
        secretQuestion: 0
    }
});

FetchMock.mock('/forget', (url, opts) => {
    return { code: 200, message: 'success' }
});

FetchMock.mock('/send-forget-verifycode', (url, opts) => {
    return { code: 200, message: 'success' }
});
