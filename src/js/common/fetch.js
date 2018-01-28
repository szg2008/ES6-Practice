const fetchPost = (url,params) => {
    return fetch(url,{
        method:'POST',
        headers:{
            'Content-Type':"application/x-www-form-urlencoded"
        },
        credentials:'include',
        params:params
    }).then((res) => {
        if(!res.ok){
            throw Error(res.statusText)
        }
        return res.json()
    })
}
export { fetchPost }
