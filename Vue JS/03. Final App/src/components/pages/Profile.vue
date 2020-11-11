<template>
    <div class="content-wrapper">
        <h2>{{ this.$route.name }}</h2>
        <p>This is a random list of profile you can get. This data is generated everytime you access this page.</p>
        <p>The Profiles below are saved to your database.</p>
        <div class="row">
            <div class="col-md-12">
                <hr>
                <div v-if="feedback" class="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Oops...</strong> {{ feedback }}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
            <div class="col-md-3">
                <div class="form-group">
                    <label>Number of Profile</label>
                    <input v-model="profileCount" v-on:keyup="getProfiles" name="number_profile" type="number" class="form-control"/>
                    <small class="text-muted">Range: 1 - 20</small>
                </div>
            </div>
            <div class="col-md-5">
                <div class="form-group">
                    <label>Branch</label>
                    <select v-model="profileLocale" v-on:change="getProfiles" name="locale" class="form-control">
                        <option value="en_US">United States</option>
                        <option value="id_ID">Indonesia</option>
                        <option value="ja">Japan</option>
                        <option value="ko">South Korea</option>
                    </select>
                </div>
            </div>
            <div class="col-md-3">
                <div class="form-group">
                    <label>Profile Type</label>
                    <select v-model="profileType" v-on:change="getProfiles" name="type" class="form-control">
                        <option value="seed">Seeding</option>
                        <option value="saved">Saved</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="row">
            <div v-for="(v, i) in profileList" :key="i" class="col-md-4 mb-4">
                <div class="card">
                    <img class="card-img-top" :src="v.avatar" :alt="v.name">
                    <div class="card-body pb-0">
                        <h5 class="card-title font-weight-bold">
                            <router-link :to="'/profile/detail/'+ kebabCase(v.social)">{{ v.name }}</router-link> <i v-if="! v.isNew" class="fa fa-check-circle text-success fa-fw" title="Saved"></i>
                        </h5>
                        <p class="card-text mb-0 pb-0 ">{{ v.city }}, {{ v.country }}</p>
                        <small class="text-muted">{{ v.job }}</small>
                        <div class="text-center mt-4">
                            <hr/>
                            <ul class="list-inline">
                                <li class="list-inline-item social-link bg-primary">
                                    <a :href="'mailto:' + v.email"><i class="fa fa-envelope fa-fw"></i></a>
                                </li>
                                <li class="list-inline-item social-link bg-primary">
                                    <a :href="'https://twitter.com/' + v.social" target="_blank" rel="noopener noreferrer"><i class="fab fa-twitter fa-fw"></i></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import faker from 'faker'
import db from '../../firebase/init'

export default {
    data() {
        return {
            profileLocale: 'en_US',
            profileType: 'seed',
            profileCount: 1,
            profileList: [],
            feedback: null
        }
    },
    methods: {
        generateRandomProfile(){
            if(this.profileCount > 10){
                this.profileCount = 10
                this.feedback = 'You can only generate maximum of 10 profile.'
            }else{
                faker.locale = this.profileLocale;

                for(let i = 0; i < this.profileCount; i++) {
                    let temp_data = {
                        name: faker.name.findName(),
                        city: faker.address.city(),
                        country: faker.address.country(),
                        avatar: faker.internet.avatar(),
                        email: faker.internet.email(),
                        job: faker.name.jobTitle(),
                        social: faker.internet.userName(),
                        isNew: true
                    }
                    
                    this.profileList.push(temp_data)
                }
                this.feedback = null
            }
        },
        async getProfiles(){
            // empty the profile list
            this.profileList = []

            if(this.profileType == 'seed'){
                this.generateRandomProfile()
            }else{
                // pull data from firestore 
                const snapshot = await db.collection('profiles').limit(this.profileCount).get()
                if(! snapshot.empty){
                    snapshot.forEach(doc => {
                        let data = doc.data()

                        let temp_data = {
                            name: data.name,
                            city: data.city,
                            country: data.country,
                            avatar: data.picture,
                            email: data.email,
                            job: data.job,
                            social: data.social,
                            isNew: false
                        }
                        
                        this.profileList.push(temp_data)
                    })
                }else{
                    console.log('No Data Found');
                }
            }
        },
        kebabCase(str){
            return _.kebabCase(str);
        }
    },
    created() {
        this.getProfiles()
    }
}
</script>

<style>
    .social-link {
        border-radius: 30px;
        padding: 5px 7px;
        margin: 0 5px;
    }

    .social-link > a {
        color: #fff;
    }
</style>