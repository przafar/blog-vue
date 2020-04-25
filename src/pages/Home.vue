<template>
    <div class="container button"> 
        <input class="form-control input" type="text" v-model="search" placeholder="Search by Author" aria-label="Search">
        <Loader class="loading" v-if="loading"/>
        <ul class="row routers">
            <li v-for="(blog, index) in filteredBlogs" :key="index">
                <transition name="router-anim" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
                    <router-link :key="blog.id" :to="{ name: 'post', params: { id: blog.id }, hash: '#scroll' }"  class="classes">
                        <figure>
                            <img :src="blog.image" alt="">
                            <figcaption class="postname">
                                {{ blog.name }}
                            </figcaption>
                        </figure>
                    </router-link>
                </transition>
                <transition>
                    <div class="author">
                        <p>{{ blog.data }} by <b> {{ blog.author }}</b></p>
                    </div>
                </transition>
            </li>
            
        </ul>
        <footer>Made width <b class="vue">Vue</b> by <b>przafar</b></footer>
    </div>
</template>
<script>
    import Loader from './Loaders'
    export default {
        data() {
            return {
                search: '',
                blogs: [],
                endpoint: 'http://localhost:3000/blogs',
                loading: true
            }
        },
        methods: {
            getAllPosts: function() {
                this.$http.get(this.endpoint).then(function(response) {
                   setTimeout(() => {
                        this.blogs = response.data
                        this.loading = false
                   }, 1000)
                }, function(error){
                    
                })
            }
        },
        created: function() {
            this.getAllPosts()
        },
        computed: {
            filteredBlogs: function(){
                return this.blogs.filter((blog) => {
                    return blog.author.match(this.search)
                })
            }
        },
        components: {
            Loader
        }
    }    
</script>
<style scoped>
    .routers {
        margin-top: 30px;
    }
    .routers li {
        display: inline-block;

    }
    .classes img {
        background-repeat: no-repeat;
        background-position: center;
        background-size: 300px 355px;
        height: 380px;
        width: 296px;
        margin-left: 40px;
        transition: .5s ease-in-out;
        cursor: pointer;
    }
    .classes img:hover {
        -webkit-filter: brightness(40%);
        filter: brightness(40%);
    }
    .postname {
        position: absolute;
        display: inline-block;
        margin-left: -280px;
        color: #ffffff;
        font-size: 38px;
        width: 170px;
        font-weight: bold;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

    }
    .classes {
        margin-top: 60px;
        margin-bottom: 50px;
    }
    footer {
        margin-top: 10px;
        margin-bottom: 20px;
    }
    .input {
        margin-top: 100px;
        width: 100%;
        height: 45px;
        font-size: 18px;
        font-family: Arial, Helvetica, sans-serif;
    }
    .author {
        display: block;
        font-size: 16px;
        margin-top: 0px;
        margin-left: 40px;
        margin-bottom: 50px;
        font-family: Arial, Helvetica, sans-serif;
        word-spacing: 2.5px;
    }
    .author b {
        border-bottom: 0.8px solid black;
        cursor: pointer;
    }
    .loading {
        margin-top: 200px;
        margin-bottom: 200px;
        margin-left: 500px;
    }
    .vue {
        color: #4fc08d;
    }

</style>