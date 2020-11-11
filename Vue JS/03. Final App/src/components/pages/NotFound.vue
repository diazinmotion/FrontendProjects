<template>
    <div class="content-wrapper">
        <div class="row" style="height:600px;">
            <div class="col-md-10 offset-md-1 justify-content-center align-self-center">
                <div class="card align-middle">
                    <div class="card-body text-center p-5">
                        <h2 class="font-weight-bold text-danger">404 - Not Found</h2>
                        <small class="clearfix">
                            Uh, sorry for the inconvenience, it seems you are lost.<br>
                            Here, let me cheer you up and help you back to the right place.
                            <a href="/">Back to Home</a>
                        </small>
                        <small><em class="text-muted text-italic">{{ currentQuote }}</em></small>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'

export default {
    data() {
        return {
            currentQuote: 'Loading...',
            quotesList: []
        }
    },
    methods: {
        async generateQuotes(){
            try {
                const instance = axios.create({ baseURL: 'https://type.fit/api/' })

                const resp = await instance({
                    method: 'get',
                    url: 'quotes'
                })

                if(resp.status == 200){
                    this.quotesList = resp.data
                }
            }catch(error){
                console.log(error.message);
            }

            setInterval(() => {
                let dataCount = this.quotesList.length
                let index = _.random(0, (dataCount - 1))

                this.currentQuote = this.quotesList[index].text + ' -' + this.quotesList[index].author
            }, 10000)
        }
    },
    created() {
        this.generateQuotes()
    }
}
</script>

<style>
    
</style>