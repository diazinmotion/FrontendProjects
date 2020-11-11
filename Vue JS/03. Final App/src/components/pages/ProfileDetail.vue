<template>
    <div class="content-wrapper">
        <h2>{{ this.$route.name }}</h2>
        <span class="clearfix">Showing profile page for <b><i class="fa fa-user-circle fa-fw"></i> {{ this.$route.params.userid }}</b></span>
        <small>(The current profile will be saved under this username)</small>
        <div class="row">
            <div class="col-md-12"><hr></div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="card">
                                    <img class="card-img-top" :src="profile.picture" alt="Profile Picture">
                                    <div class="card-body">
                                        <h5 class="card-title font-weight-bold">
                                            {{ (profile.name) ? profile.name : 'N/A' }}
                                        </h5>
                                        <p class="card-text mb-0 pb-0 ">{{ (profile.city) ? profile.city : 'N/A' }}, {{ (profile.country) ? profile.country : 'N/A' }}</p>
                                        <small class="clearfix text-muted">{{ (profile.job) ? profile.job : 'N/A' }}</small>
                                        <div class="box-meta">
                                            <hr>
                                            <b class="clearfix text-primary">Last Updated:</b>
                                            <span v-if="! newProfile">{{ (profile.created_at) ? convertToHumanDate(profile.created_at) : 'N/A' }}</span>
                                            <span v-else>New Member</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-8">
                                <b><i :class="(newProfile) ? 'fa-user-plus' : 'fa-edit'" class="fas fa-fw"></i>{{ (newProfile) ? ' New' : ' Edit' }} Profile</b>
                                <p>Please fill the form below to save the following profile to your database.</p>
                                <form ref="profileForm">
                                    <div class="form-group">
                                        <label>Full Name</label>
                                        <input v-model="profile.name" type="text" name="name" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <label>Job Title</label>
                                        <input v-model="profile.job" type="text" name="job" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>City</label>
                                                <input v-model="profile.city" type="text" name="city" class="form-control">
                                            </div>
                                            <div class="col-md-6">
                                                <label>Country</label>
                                                <input v-model="profile.country" type="text" name="country" class="form-control">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Email</label>
                                                <input v-model="profile.email" type="email" name="email" class="form-control">
                                            </div>
                                            <div class="col-md-6">
                                                <label>Twitter Username</label>
                                                <input v-model="profile.social" readonly type="text" name="social" class="form-control">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="clearfix">Profile Picture</label><br>
                                        <a href="javascript:void(0)" v-on:click="generatePicture" class="btn btn-sm btn-info">Surprise Me!</a>
                                        <input v-model="profile.picture" type="hidden" name="picture">
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer text-right">
                        <div class="btn-group">
                            <button type="reset" v-on:click="clearForm" class="btn btn-default btn-sm"><i class="fa fa-redo-alt fa-fw"></i> Reset</button>
                            <button v-on:click="saveProfile" class="btn btn-primary btn-sm"><i class="fa fa-save fa-fw"></i> Save Profile</button>
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
            doc_id: null,
            profile: {
                name: null,
                city: null,
                country: null,
                job: null,
                email: null,
                social: null,
                created_at: null,
                picture: 'https://via.placeholder.com/300'
            },
            newProfile: true,
            feedback: null
        }
    },
    methods: {
        clearForm(){
            this.$refs.profileForm.reset();
        },
        saveProfile(){
            let temp = this.profile
            temp.created_at = Date.now();

            db.collection('profiles').doc(this.doc_id).set(temp)
            .then(resp => {
                this.$router.push({name: 'Profile'})
            })
            .catch(err => {
                console.log(err.message);
            })
        },
        generatePicture(){
            this.profile.picture = faker.internet.avatar()
        },
        convertToHumanDate(date = null){
            return (date) ? moment(date).format('DD MMM YYYY - h:m A') : date
        },
        async getSavedProfile(){
            // pull data from firestore 
            const snapshot = await db.collection('profiles').doc(this.doc_id).get()
            if(! snapshot.empty){
                let data = snapshot.data()

                this.profile = {
                    name: data.name,
                    email: data.email,
                    job: data.job,
                    city: data.city,
                    country: data.country,
                    social: data.social,
                    picture: data.picture,
                    created_at: data.created_at
                }

                this.newProfile = false
            }
        }
    },
    created() {
        this.doc_id = this.$route.params.userid
        this.profile.social = this.doc_id

        this.getSavedProfile()
    }
}
</script>

<style>
    .box-meta {
        font-size: 12px;
    }
</style>