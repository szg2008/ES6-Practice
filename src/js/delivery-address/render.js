import {fetchPost} from '../common/fetch.js'
import Region from '../common/region.js'
import { $, getUrlParams } from '../common/utils.js'
let regionData
const tpl = (opts = {}) => {
    const data = opts.data
    let currentData
    if(opts.addrId){
        currentData = data.find((item) => {
            return parseInt(opts.addrId) === item.addrId
        })
        regionData = currentData.regionCode ? currentData.regionCode.split(',').map((item) => parseInt(item)) : ''
    }else{
        currentData = {}
    }
    let tpl =  `
        <div id="delivery-address-wrapper" class="delivery-address-wrapper">
            <form onsubmit="return false" id="delivery-address-form" class="delivery-address-form">
                <input type="hidden" id="delivery-address-id" name="addrId" value="${currentData.addrId || ''}"/>
                <label>
                    <span>省市区：</span>
                    <div id="delivery-address-region"></div>
                </label>
                <label>
                <span>详细地址：</span>
                <textarea id="delivery-address-detail" name="detailAddress"  placeholder="详细地址" valid="present" rows="3" cols="20">${currentData.detailAddress || ''}</textarea>
            </label>
            <label>
                <span>邮政编码：</span>
                <input id="delivery-address-email" name="postalcode" type="text" placeholder="邮政编码" value="${currentData.postalcode || ''}">
            </label>
            <label>
                <span>收货人姓名：</span>
                <input id="delivery-address-name" name="name" type="text" placeholder="真实姓名" value="${currentData.name || ''}" valid="present">
            </label>
            <label>
                <span>手机号码：</span>
                <input id="delivery-address-mobile" name="mobile" type="text" placeholder="手机号码" value="${currentData.mobile || ''}" valid="present, mobile">
            </label>
            <label>
                <span>固定电话：</span>
                <input id="delivery-address-telphone" name="telphone" type="text" placeholder="固话号码" value="${currentData.telephone || ''}">
            </label>
            <label>
                <span>&nbsp;</span>
                <input id="save-delivery-address" type="submit" value="保存">
            </label>
            </form>
            <div id="delivery-address-list" class="delivery-address-list">
                <table>
                    <tr>
                        <th>
                            收货人
                        </th>
                        <th>
                            所在地区
                        </th>
                        <th>
                            详细地址
                        </th>
                        <th>
                            邮编
                        </th>
                        <th>
                            手机/固话
                        </th>
                        <th>
                            操作
                        </th>
                    <tr>`
        data.forEach((item) => {
            tpl += `
                <tr>
                    <td>${ item.name }</td>
                    <td>${ item.regionSting }</td>
                    <td>${ item.detailAddress }</td>
                    <td>${ item.postalcode }</td>
                    <td>${ item.mobile || item.telephone }</td>
                    <td>
                        <a href="javascript:void(0);" class="del-delivery-address" data-id="${item.addrId}">删除</a> | <a href="delivery-address.html?addrId=${item.addrId}">修改</a>
                    </td>
                <tr>`
        })
    tpl +=      `</table>
            </div>
        </div>
    `
    return tpl
}
export default async (conf) => {
    const result = await fetchPost('/delivery-address',{})
    if(result.code === 200){
        conf.container.innerHTML = tpl({
            data:result.data,
            addrId:conf.addrId || getUrlParams('addrId')
        })
        const region = new Region({
            container:$('delivery-address-region'),
            name:'region',
            present:true,
            initData:regionData
        })
    }else{
        alert('数据拉取失败')
    }

}
