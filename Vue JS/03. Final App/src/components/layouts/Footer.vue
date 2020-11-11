<template>
    <footer class="page-footer bg-gray mt-4">
        <div class="container box-footer">
            <div class="row">
                <div class="col-md-3 mt-md-0 justify-content-center text-center">
                    <h3 class="clearfix"><i class="fab fa-vuejs fa-3x"></i></h3>
                    <b class="clearfix">Vue JS</b>
                    <small>Technology Behind This Project</small>
                </div>
                <div class="col-md-9 mt-4 justify-content-center">
                    <h5 class="text-primary">About Project</h5>
                    <p>
                        Well, this is only a boilerplate or sort of starter view for web application development. In
                        fact, you dont use this app on production environment.
                        You know, so that you dont have to look for bootsrap 4 template anymore.
                    </p>
                </div>
            </div>
        </div>
        <div class="footer-copyright text-center py-2 bg-gray-darker">
            <small>
                &COPY; 2020 Web Sample Project by <a href="https://github.com/diazinmotion">diazinmotion</a>
            </small>
        </div>
    </footer>
</template>

<script>
export default {
    data() {
        return {
            
        }
    }
}
</script>

<style>
    .bg-gray {
        background: #eee;
    }

    .bg-gray-darker {
        background: #ddd;
    }

    .box-footer {
        padding-top: 40px;
        padding-bottom: 40px;
    }
</style>