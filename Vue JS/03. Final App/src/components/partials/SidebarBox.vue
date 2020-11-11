<template>
    <div class="row pb-4">
        <div class="col">
            <div class="card border-primary">
                <div class="card-header text-center">
                    <span class="font-weight-bold">{{ properties.title }}</span>
                </div>
                <div class="card-body text-center" v-html="properties.content"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['properties'],
    data() {
        return {

        }
    }
}
</script>
