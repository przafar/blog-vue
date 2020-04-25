<template>
  <div class="container">
    <div class="nav">
      <router-link tag="nav" to="/" class="navbar fixed-top navbar-light bg-light">
        <a class="navbar-brand nav-blog">Blog Vue</a>
      </router-link>
    </div>
    
    <transition name="router-anim" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
  @import "https://jsdelivr.net/npm/animate.css@3.5.1";
  nav {
    padding-left: 40px;
    
  }
  .nav-blog {
    font-size: 30px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: #2a3744;
  }
  
</style>
