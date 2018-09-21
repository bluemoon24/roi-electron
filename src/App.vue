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
      <!-- <v-btn icon @click.stop="clipped = !clipped">
        <v-icon :color="clipped ? 'teal' : ''">web</v-icon>
      </v-btn> -->
      <!-- <v-btn icon @click.stop="fixed = !fixed">
        <v-icon :color="fixed ? 'teal' : ''">remove</v-icon>
      </v-btn> -->
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-flex>
          <v-slider
            v-model="columns"
            :label="getColumns"
            :max="6"
            :min="1"
            :step="1"
          ></v-slider>
        </v-flex>

        <v-flex>
            <v-slider
              v-model="height"
              :label="getHeight"
              :max="600"
              :min="0"
              :step="10"
            ></v-slider>
          </v-flex>

      <v-btn @click.stop="showToolbar = !showToolbar" icon flat color="grey-lighten">
         <v-icon >list</v-icon>
       </v-btn>

       <v-btn @click.stop="showActionbar = !showActionbar" icon flat color="grey-lighten">
          <v-icon >share</v-icon>
        </v-btn>

      <!-- <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>menu</v-icon>
      </v-btn> -->
    </v-toolbar>

    <v-container id="screen">
       <v-layout justify-center align-center fill-height>
         <!-- <v-flex > -->
           <router-view :showActionbar="showActionbar" :showToolbar="showToolbar" :nColumns="columns"
           :height="height"/>
           <!-- </v-flex> -->
       </v-layout>
     </v-container>

    <!-- <v-content >
      <router-view/>
    </v-content> -->
    <!-- <v-navigation-drawer
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
    </v-navigation-drawer> -->
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
      showActionbar: false,
      showToolbar: true,
      clipped: true,
      drawer: true,
      fixed: false,
      permanent: false,
      columns: 1,
      height: 250,
      items: [
        {
          icon: 'home',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'insert_chart',
          title: 'Chart',
          to: 'chart'
        },
        {
          icon: 'dashboard',
          title: 'MSLayout',
          to: 'mslayout'
        },
        {
          icon: 'build',
          title: 'Page',
          to: 'page'
        },
        {
          icon: 'settings',
          title: 'Configurator',
          to: 'configurator'
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
  },

  computed: {
    getColumns: function () { return `Columns: ${this.columns}` },
    getHeight: function () { return `Height: ${this.height}` }
  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
/* Global CSS */
.container {
   padding: 0!important;
   /* margin: 0!important */
}

</style>
