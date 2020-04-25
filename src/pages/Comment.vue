<template>
    <div class="container comment">
        <div class="form-group">
            <label for="exampleFormControlInput1">Email address</label>
            <input type="name"
                   class="form-control" 
                   id="exampleFormControlInput1" 
                   placeholder="Name"
                   v-model.trim="commentName"
            >
        </div>
        <div class="form-group">
            <label for="exampleFormControlTextarea1">Example textarea</label>
            <textarea class="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      v-model.trim="commentText"
            ></textarea>
        </div>
        <div class="button">
            <button class="btn btn-primary" @click="addComment">Send</button>
        </div>

        <div class="textarea">
            <ul>
                <li v-for="comment of comments">
                    <strong>{{ comment.name }} {{ comment.text }}</strong>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                comments: [],
                commentText: '',
                commentName: '',
                resource: null
            }
        },
        methods: {
            addComment: function() {
                const comment = {
                    name: this.commentName,
                    text: this.commentText
                }
                this.resource.save({}, comment)
                setTimeout(() =>{
                    this.resource.get().then(response => response.json())
                        .then(comments => this.comments = comments)
                }, 1000)
            }
        },
        created() {
            this.resource = this.$resource('comment')
        }
    }
</script>
<style scoped>
    .comment {
        margin-top: 100px;
    }
</style>