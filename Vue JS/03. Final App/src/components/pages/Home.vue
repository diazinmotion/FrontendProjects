<template>
    <div class="wrapper">
        <div id="starter-slideshow" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
                <li v-for="(v, i) in photos" :key="i" data-target="#starter-slideshow" :data-slide-to="i" :class="{ 'active': i == 0 }"></li>
            </ol>
            <div class="carousel-inner">
                <div v-for="(v, i) in photos" :key="i" class="carousel-item" :class="{ 'active': i == 0 }">
                    <img class="d-block w-100" :src="v.url" :alt="v.alt" style="background-size: cover">
                    <div class="carousel-caption d-none d-md-block">
                        <h5>{{ v.user }}</h5>
                        <p>{{ (v.location) ? v.location : 'No Location' }}</p>
                    </div>
                </div>
            </div>
            <a class="carousel-control-prev" href="#starter-slideshow" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#starter-slideshow" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
        <div class="container">
            <div class="row box-content">
                <div class="col-md-12 pt-4 pb-1">
                    <h2>Start Hacking</h2>
                    <p>
                        This is your landing page, start writing codes and put the available features to the cards below.
                        Don't forget to describe about your project here, like what programming language, framework, library
                        or any kind of functions you do here.
                    </p>
                    <hr>
                </div>
            </div>
            <div class="row box-content">
                <div class="col-md-3">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Feature Name</h5>
                            <p class="card-text">Describe your feature here</p>
                        </div>
                        <div class="card-footer text-right">
                            <small class="text-muted"><a href="">Explore More <i class="fa fa-arrow-right fa-fw"></i></a></small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import qs from 'querystring'
import _ from 'lodash'
import moment from 'moment'

export default {
    data() {
        return {
            photos: []
        }
    },
    created(){
        const apiKey = process.env.VUE_APP_API_UNSPLASH;

        // ?client_id=&count=1&query=water
        const axInstance = axios.create({
            baseURL: 'https://api.unsplash.com',
            headers: {
                'Authorization': `Client-ID ${apiKey}`
            }
        });

        // if cache exists, use from localstorage
        let epochNow = moment(Date.now()).valueOf();

        if(localStorage.photos || (localStorage.expired > epochNow)){
            this.photos = JSON.parse(localStorage.photos)
        }else{
            axInstance({
                method: 'get',
                url: '/photos/random',
                params: {
                    count: 10,
                    query: 'beach',
                    orientation: 'landscape'
                }
            })
            .then(resp => {
                if(resp.status == 200){
                    resp.data.forEach(img => {
                        this.photos.push({
                            url: img.urls.regular,
                            location: img.location.city,
                            user: img.user.name,
                            alt: _.startCase(_.toLower(img.alt_description))
                        });
                    });

                    // add to local storage
                    localStorage.photos     = JSON.stringify(this.photos);
                    localStorage.expired    = moment(Date.now()).add(15, 'm').valueOf();
                }
            })
            .catch(err => {
                console.log(err.message);

                // fallback mechanism
                this.photos.push({
                    url: 'https://via.placeholder.com/1280x300/000000',
                    location: 'Basic looks for the views utilizing familiar css framework',
                    user: '🚀 Gives Your Project a Starter Leap',
                    alt: 'Default Slide'
                })
            })
        }
    }
}
</script>

<style scoped>
    .carousel-item {
        max-height: 400px!important
    }

    .carousel-caption h5, .carousel-caption p {
        font-weight: 500;
        text-shadow: 0 0 3px #000, 0 0 3px #000;
    }
</style>