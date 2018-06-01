<template>
  <v-app>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      :fixed="fixed"
      :permanent="permanent"
      app
    >
      <v-list>
        <v-list-tile
          router
          :to="item.to"
          value="true"
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar
      app
      :clipped-left="clipped"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon :color="clipped ? 'teal' : ''">web</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon :color="fixed ? 'teal' : ''">remove</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>

    <v-container id="screen" class='mt-5'>
       <v-layout justify-center align-center >
         <v-flex >
           <router-view/>
           </v-flex>
       </v-layout>
     </v-container>

    <!-- <v-content >
      <router-view/>
    </v-content> -->
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile @click="right = !right">
          <v-list-tile-action>
            <v-icon>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span>&copy; Bayer 2018</span>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  created: function () {
    // console.log = function () {}
  },
  data () {
    return {
      clipped: true,
      drawer: true,
      fixed: false,
      permanent: true,
      items: [
        {
          icon: 'home',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'build',
          title: 'Builder',
          to: 'builder'
        },
        {
          icon: 'insert_chart',
          title: 'Chart',
          to: 'chart'
        },
        {
          icon: 'view_module',
          title: 'Page',
          to: 'page'
        },
        {
          icon: 'contacts',
          title: 'About',
          to: 'about'
        }
      ],
      miniVariant: true,
      right: true,
      rightDrawer: false,
      title: 'roi4 test environment'
    }
  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
/* Global CSS */
</style>
