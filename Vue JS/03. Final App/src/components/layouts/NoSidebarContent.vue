<template>
    <div class="wrapper">
        <app-navbar></app-navbar>
        <slot/>
        <app-footer></app-footer>
    </div>
</template>

<script>
import Navbar from '../layouts/Navbar'
import Footer from '../layouts/Footer'

export default {
    components: {
        'app-navbar': Navbar,
        'app-footer': Footer
    },
    data() {
        return {
            
        }
    }
}
</script>