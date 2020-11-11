<template>
    <div class="content-wrapper">
        <h2>About</h2>
        <p>This project is designed to demonstrate the frontend development based on Vue JS. Below are dependencies that being used during development.</p>
        <hr>
        <div class="box-list">
            <b><i class="fa fa-box fa-fw"></i> Dependencies:</b>
            <ol>
                <li v-for="(v, i) in dependencies" :key="i">
                    <a :href="'https://www.npmjs.com/package/' + v.name">{{ v.name }}</a> ({{ v.version }})
                </li>
            </ol>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'
import dep from '../../../package.json'

export default {
    data() {
        return {
            dependencies: []
        }
    },
    methods: {
        getDependencies(){
            let d = dep.dependencies

            for(const i in d){
                this.dependencies.push({
                    name: i,
                    version: d[i].replace(/[\^]/g, '')
                })
            }
        }
    },
    created() {
        this.getDependencies()
    }
}
</script>

<style>
    
</style>