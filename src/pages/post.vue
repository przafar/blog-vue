<template>
    <div class="container">
        <div class="button">
            <button class="back" @click="goBackToCars">
                <svg class="bi bi-x-square" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M14 1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2z" clip-rule="evenodd"/>
                    <path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z" clip-rule="evenodd"/>
                    <path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z" clip-rule="evenodd"/>
                </svg>
            </button>
        </div>
        <div class="check" v-for="(blog, index) in blogs" :key="index">
            <div v-if="blogId == blog.id" class="post">
                <img id="scroll" class="col-4 image" :src="blog.image" alt="">
                <div class="col-7">
                    <div class="header">
                    <h2>{{ blog.name }}</h2>
                    <p>{{ blog.data }}</p>
                </div>
                <hr>
                <div class="section-1">
                    <h4>{{ blog.post }}</h4>
                </div>
                <div class="section-2">
                    <p>{{ blog.information }}</p>
                </div>
                <hr>
                <div class="comment" @submit.prevent="onSubmit">
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">
                        Join the discussion…</label>
                        <textarea class="form-control"
                                id="exampleFormControlTextarea1"
                                rows="3"
                                v-model.trim="commentText"
                        ></textarea>
                    </div>
                    <div class="form-group formname">
                        <div class="login">
                            <a href="#">
                                <svg class="bi bi-person-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
                                </svg>
                            </a>
                        </div>
                        <input type="name"
                            class="form-control" 
                            id="exampleFormControlInput1" 
                            placeholder="Name"
                            v-model.trim="commentName"
                        >
                    </div>
                    <div class="buttontext">
                        <button class="btn btn-success addbutton" type="submit" @click="addComment">Send</button>
                    </div>

                    <div class="textarea col">
                        <ul class="list-group list-group-flush commentul">
                            <Loader class="loading" v-if="loading"/>
                            <li v-for="comment of comments" :key="comment.id" class="list">
                                <div class="imageside">
                                    <a href="#">
                                        <svg class="bi bi-person-square" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M14 1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2z" clip-rule="evenodd"/>
                                            <path fill-rule="evenodd" d="M2 15v-1c0-1 1-4 6-4s6 3 6 4v1H2zm6-6a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
                                        </svg>
                                    </a>
                                </div>
                                <div class="textside">
                                    <b>{{ comment.name }}</b> - {{ comment.text }}
                                </div>
                                <div class="delete">
                                    <button @click="removeComment">
                                        <svg class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z"/>
                                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" clip-rule="evenodd"/>
                                        </svg>
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>                 
            </div>
        </div>
        <footer>Made width <b class="vue">Vue</b> by <b>przafar</b></footer>
    </div>
</template>
<script>
    import Loader from './Loaders'
    export default {
        data() {
            return {
                blogId: this.$route.params.id,
                endpoint: 'http://localhost:3000/blogs',
                blogs: [],
                comments: [],
                commentText: '',
                commentName: '',
                resource: true,
                loading: true,
            }
        },
        methods: {
            goBackToCars: function() {
                this.$router.push('/')
            },
            getAllPosts: function() {
                this.$http.get(this.endpoint).then(function(response) {
                    this.blogs = response.data
                    console.log(response)
                }, function(error){
                    
                })
            },
            uploadMessage: function() {
                setTimeout(() =>{
                    this.resource.get().then(response => response.json())
                        .then(comments => this.comments = comments)
                        this.loading = false
                }, 5000)
            },
            addComment: function() {
                const comment = {
                    name: this.commentName,
                    text: this.commentText
                }
                this.resource.save({}, comment)

                this.resource.get().then(response => response.json())
                    .then(comments => this.comments = comments)
                this.commentText = ''
                this.commentName = ''
            },
            removeComment: function(id) {
                this.resource.delete(id).then(response => response.json())
                    .then(t => t.id !== id)
            }
        },
        created: function() {
            this.getAllPosts(),
            this.resource = this.$resource('comment'),
            this.uploadMessage()
        },
        components: {
            Loader
        }
    }
</script>
<style scoped>
@import "https://jsdelivr.net/npm/animate.css@3.5.1";
    .post img {
        background-repeat: no-repeat;
        background-position: center;
        background-size: 250px 355px;
        height: 380px;
        width: 250px;
        margin-left: 40px;
        display: block;
        padding-right: 41px;
        padding-left: 25px;
        overflow: scroll;
    }
    .post {
        display: flex;  
    }
    .back{
        border: none;
        background: #ffffff;
        font-size: 25px;
        outline: none;
    }
    .button  {
        margin-left: 1060px;
        margin-top: 65px;
    }
    footer {
        margin-top: 10px;
        margin-bottom: 20px;
    }
    .vue {
        color: #4fc08d;
    }
    .addbutton {
        margin-bottom: 30px;
        margin-left: 539px;
    }
    .commentul {
        width: 100%;
        margin-top: 0px;
    }
    .textarea {
        width: 100%;
    }
    .formname {
        display: flex;
    }
    .login a {
        font-size: 28px;
        color: #2a3744;
    }
    .login {
        display: block;
        margin-right: 18px;
        margin-top: -5px;
    }
    .list {
        display: flex;
        margin-top: 15px;
        margin-bottom: 15px;
    }
    .list b {
        display: flex;
    }
    .imageside {
        margin-right: 15px;
        margin-top: -7px;
    }
    .imageside a {
        font-size: 35px;
        color: #2a3744;
    }
    .textside {
        width: 500px;
    }
    .loading {
        margin-left: 250px;
    }
    .delete button {
        border: none;
        background: white;
    }
</style>
