<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
            <router-link :to="{name: 'Home'}" class="navbar-brand"><i class="fab fa-js fa-fw"></i> VueJS Demo</router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse left" id="navbarSupportedContent">
                <ul class="navbar-nav flex-row ml-md-auto d-none d-md-flex">
                    <li v-for="(v, i) in app_menu" :key="i" class="nav-item active">
                        <router-link :to="v.path" class="nav-link">{{ v.name }}</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            app_menu: [
                {
                    'name': 'Home',
                    'path': '/'
                },
                {
                    'name': 'Profile',
                    'path': '/profile'
                },
                {
                    'name': 'About',
                    'path': '/about'
                },
            ]
        }
    }
}
</script>