<template>
    <div class="wrapper">
        <app-navbar></app-navbar>
        <div class="container">
            <div class="row box-content" style="min-height: 100vh;">
                <div class="col-md-9">
                    <slot />
                </div>
                <div class="col-md-3">
                    <sidebar-box v-bind:properties="{ title: 'Weather', content: weather }"/>
                    <sidebar-box v-bind:properties="{ title: 'Exchange Rates', content: currency }"/>
                    <sidebar-box v-bind:properties="{ title: 'Get Connected!', content: social }"/>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <hr>
                    <div class="footnote">
                        <b class="clearfix">Disclaimer:</b>
                        <span>The following data that being shown are gathered from various sources. All product names, logos, and brands are property of their respective owners. Click the links to learn more about the source.</span>
                        <ul class='list-inline'>
                            <li v-for="(v, i) in api_source" :key="i" class='list-inline-item'>
                                <a :href="v.url" target="_blank" rel="noopener noreferrer">{{ v.name }}</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <app-footer></app-footer>
    </div>
</template>

<script>
import Navbar from '../layouts/Navbar'
import Footer from '../layouts/Footer'
import SidebarBox from '../partials/SidebarBox'
import axios from 'axios'
import _ from 'lodash'
import moment from 'moment'

export default {
    components: {
        'app-navbar': Navbar,
        'app-footer': Footer,
        'sidebar-box': SidebarBox
    },
    data() { 
        return {
            weather: null,
            social: null,
            currency: null,
            api_source: [
                {
                    name: 'OpenWeatherMap',
                    url: 'https://openweathermap.org/api'
                },
                {
                    name: 'Foreign exchange rates API',
                    url: 'https://exchangeratesapi.io'
                },
                {
                    name: 'Unsplash',
                    url: 'https://unsplash.com/developers'
                },
                {
                    name: 'Type.fit',
                    url: 'https://type.fit/api/quotes'
                }
            ]
        }
    },
    methods: {
        async getWeather(city = null) {
            // create fallback for city
            city = (city) ? city : 'Jakarta';

            let apiKey      = process.env.VUE_APP_API_WEATHER
            let temp        = 0
            let icon        = null
            let mainWeather = null

            // get cities temperature
            try {
                const ax = axios.create({
                    baseURL: 'http://api.openweathermap.org/data/2.5/',
                })

                let resp = await ax({
                    method: 'get',
                    url: 'weather',
                    params: {
                        q: city,
                        appid: apiKey,
                        units: 'metric'
                    }
                })

                if(resp.status == 200){
                    mainWeather = resp.data.weather[0].main
                    icon        = resp.data.weather[0].icon
                    temp        = resp.data.main.temp
                }
            }catch(err){
                console.log(err.message)
            }

            this.weather = `<div class="clearfix"><img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="${mainWeather} Icons" /></div>
                            <span class="clearfix">${temp} °C &middot; ${mainWeather}</span>
                            <small class="font-weight-bold">${_.upperFirst(city)}</small>`
        },
        getSocialIcons(){
            let list    = '';
            let social  = [
                {
                    name: 'Github',
                    link: 'https://github.com/vuejs/vue',
                    icon: 'fab fa-github'
                },
                {
                    name: 'Twitter',
                    link: 'https://twitter.com/vuejs',
                    icon: 'fab fa-twitter'
                },
            ]

            social.forEach(v => {
                list += `<li class="list-inline-item" style="padding:0 10px;"><a href="${v.link}" title="${v.name}"><i class="${v.icon} fa-2x"></i></a></li>`
            });

            this.social = `<ul class="list-inline">${list}</ul>`
        },
        async getCurrentRate(){
            let rates   = 0
            let date    = 0

            try {
                const ax = axios.create({
                    baseURL: 'https://api.exchangeratesapi.io/',
                })

                let resp = await ax({
                    method: 'get',
                    url: 'latest',
                    params: {
                        base: 'USD',
                        symbols: 'IDR'
                    }
                })

                if(resp.status == 200){
                    rates   = _.round(resp.data.rates.IDR, 0).toLocaleString()
                    date    = moment(resp.data.rates.date).format('DD MMM YYYY')
                }
            }catch(err){
                console.log(err.message)
            }

            this.currency = `<h4 class="clearfix">${rates}</h4>
                            <span class="font-weight-bold clearfix">USD - IDR</span>
                            <small>Last Update: ${date}</small>`
        }
    },
    created(){
        this.getWeather('Jakarta')
        this.getSocialIcons()
        this.getCurrentRate()
    }
}
</script>
<style scoped>
    .footnote {
        font-size: 11px;
    }

    .footnote .list-inline .list-inline-item {
        padding-right: 10px;
    }
</style>