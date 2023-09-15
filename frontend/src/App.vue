<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { useAuthStore } from '@/stores';
import { Alert } from '@/components';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faArrowRight, faCircleUser, faBell } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const authStore = useAuthStore();

library.add(faBars, faArrowRight, faCircleUser, faBell, faGithub, faInstagram, faYoutube);
</script>

<template>
  <div id="app">
    <nav class="navbar" v-show="authStore.user">
      <div class="navbar-logo">ScheduleTogether</div>
      <div class="navbar-items">
        <div class="navbar-links">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/schedule">Schedule</RouterLink>
          <RouterLink v-if="authStore.user && authStore.user.role == 'admin'" to="/admin/dashboard">Admin</RouterLink>
          <a @click="authStore.logout()">Logout</a>          
        </div>
        <div class="navbar-icons">
          <a><font-awesome-icon :icon="faBell" size="xl" /></a>
          <a><font-awesome-icon :icon="faCircleUser" size="xl" /></a>
        </div>
        <div class="navbar-menu">
          <font-awesome-icon
            class="menu-icon"
            @click="toggleMenu"
            :icon="isMenuOpen ? faArrowRight : faBars"
          />
      </div>
      </div>
    </nav>
    <div v-show="authStore.user" class="side-menu" :class="{ 'open': isMenuOpen }">
      <div class="side-menu-content">
        <RouterLink class="side-menu-button" to="/" @click="closeMenu">Home</RouterLink>
        <RouterLink class="side-menu-button" to="/schedule" @click="closeMenu">Schedule</RouterLink>
        <RouterLink v-if="authStore.user && authStore.user.role == 'admin'" class="side-menu-button" to="/admin/dashboard" @click="closeMenu">Admin</RouterLink>
        <button class="side-menu-button negative" @click="authStore.logout()">Logout</button>
      </div>
    </div>
    <div class="content">
      <div class="content-padding"></div>
      <RouterView></RouterView>
      <Alert />
      <div class="content-spacer-smaller"></div>
    </div>
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-logo">ScheduleTogether</div>
        <div class="footer-contact-info">
          <p>Email: contact@zervo.org</p>
          <p>Copyright © 2023 Zervo Network</p>
        </div>  
        <div class="footer-social-icons">
          <a href="https://github.com/ZervoTheProtogen/schedule-together"><font-awesome-icon :icon="faGithub" size="2xl" /></a>
          <a href="https://www.instagram.com/"><font-awesome-icon :icon="faInstagram" size="2xl" /></a>
          <a href="https://www.youtube.com"><font-awesome-icon :icon="faYoutube" size="2xl" /></a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
  },
  components: {
    FontAwesomeIcon,
  },
};
</script>