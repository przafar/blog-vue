import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        blogs: [],
        endpoint: 'http://localhost:3000/blogs'
    },
    getters: {
        blogsList: function(){
            this.$http.get(this.endpoint).then(function(response) {
                this.blogs = response.data
                console.log(response)
            }, function(error){
                
            })
        }
    }
})