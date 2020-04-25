import VueRouter from 'vue-router'
import Post from './pages/post'
import Home from './pages/Home'
import ErrorCmp from './pages/Error'
import Author from './pages/Author'
import Comment from './pages/Comment'

export default new VueRouter({
    routes: [
        {
            path: '',
            component: Home
        },
        { 
            path: '/post/:id',
            name: 'post',
            component: Post,
            props: true
        },
        {
            path: '*',
            component: ErrorCmp
        },
        {
            path: '/author',
            component: Author,
            name: 'author',
            props: true
        },
        {
            path: '/comment',
            component: Comment,
            name: 'comment'
        }
    ],
    mode: 'history',
    scrollBehavior(to, from, savedPosition){
        return {
            x: 0,
            y: 0
        }

    }
    
})