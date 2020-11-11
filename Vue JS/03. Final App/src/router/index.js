import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/pages/Home'
import Profile from '../components/pages/Profile'
import ProfileDetail from '../components/pages/ProfileDetail'
import About from '../components/pages/About'
import NotFound from '../components/pages/NotFound'

Vue.use(VueRouter)

export default new VueRouter({
    mode: "history",
    routes: [
        {
            path: '/',
            name: 'Home',
            meta: { layout: 'no-sidebar'},
            component: Home
        },
        {
            path: '/profile',
            name: 'Profile',
            component: Profile
        },
        {
            path: '/profile/detail/:userid',
            name: 'Profile Detail',
            component: ProfileDetail
        },
        {
            path: '/about',
            name: 'About',
            component: About
        },
        {
            path: '*',
            name: 'Not Found',
            component: NotFound
        },
    ]
})