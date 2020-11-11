<template>
    <div id="app">
        <component :is="layout">
            <router-view/>
        </component>
    </div>
</template>

<script>
import Content from './components/layouts/Content'
import NoSidebarContent from './components/layouts/NoSidebarContent'

const default_layout = 'sidebar';

export default {
    name: "app",
    components: {
        'sidebar-layout': Content,
        'no-sidebar-layout': NoSidebarContent,
    },
    computed: {
        layout(){
            let layout = this.$route.meta.layout || default_layout;
            return `${layout}-layout`
        }
    }
};
</script>

<style>
    .box-content {
        margin-top: 20px;
    }
</style>
