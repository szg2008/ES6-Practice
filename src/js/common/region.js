import { $ } from './utils.js'
import {fetchJson} from './fetch.js'

const render = Symbol('render')


class Region{
    constructor(opts){
        if(!opts.container){
            throw '请填写container配置'
        }
        if(!opts.name){
            throw '请填写name配置'
        }else{
            this[render](opts)
        }
    }

    async [render](opts) {
        let regionData = await fetchJson('/region-data',{})
        regionData = regionData.data
        const tpl = `
            <div class="region-select-wrapper">
                <select id="region-province-select"></select>
                <select id="region-city-select"></select>
                <select id="region-area-select"></select>
                <input id="region-selected" name="${ opts.name }" type="hidden" valid="${ opts.present ? 'present' : ''}">
            </div>
        `
        opts.container.innerHTML = tpl

        const $provinceSelect = $('region-province-select')
        const $citySelect = $('region-city-select')
        const $areaSelect = $('region-area-select')
        const $result = $('region-selected')

        let provinceSelected
        let citySelected
        let areaSelected

        let provinceOptions = '<option></option>'

        for(let item of regionData) {
            provinceOptions += `<option value="${item.id}">${item.name}</option>`
        }

        $provinceSelect.innerHTML = provinceOptions

        const provinceChange = () => {
            const i = parseInt($provinceSelect.value)
            const citys = regionData[i - 1].city
            let cityOptions = ''
            provinceSelected = i
            for(let item of citys){
                cityOptions += `<option value="${item.id}">${item.name}</option>`
            }
            $citySelect.innerHTML = cityOptions
        }

        const cityChange = () => {
            let areas = regionData[provinceSelected - 1].city.filter((item) => {
                return item.id === parseInt($citySelect.value)
            })[0].district
            let areaOptions = ''
            citySelected = parseInt($citySelect.value)
            for(let item of areas){
                areaOptions += `<option value="${item.id}">${item.name}</option>`
            }
            $areaSelect.innerHTML = areaOptions
        }

        const areaChange = () => {
            areaSelected = parseInt($areaSelect.value)
            $result.value = provinceSelected + ',' + citySelected + ',' + areaSelected
        }

        $provinceSelect.onchange = (e) => {
            provinceChange()
            cityChange()
            areaChange()
        }
        $citySelect.onchange = (e) => {
            cityChange()
            areaChange()
        }
        $areaSelect.onchange = (e) => {
            areaChange()
        }
    }
}

export default Region
