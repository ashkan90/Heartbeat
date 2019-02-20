<template>
  <v-app dark>
    <v-toolbar v-if="!settingsDialog" style="-webkit-app-region: drag;" dark app dense fixed>
      <v-toolbar-title class="headline text-uppercase">
        <span>Heart</span>
        <span class="font-weight-light">BEAT</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon style="-webkit-app-region: no-drag;" @click="closeWindow">
        <v-icon>close</v-icon>
      </v-btn>
    </v-toolbar>

    <main>
      <v-content>
        <v-container fluid class="pa-0">
          <v-layout column id="here">
            <v-slide-y-transition mode="out-in">
              <keep-alive include="HbRemoteList">
                <router-view />
              </keep-alive>
            </v-slide-y-transition>
          </v-layout>
        </v-container>
      </v-content>

      <hb-settings-dialog :dialog.sync="settingsDialog"></hb-settings-dialog>
    </main>

    <v-footer fixed>
      <v-btn icon @click="settingsDialog = true">
        <v-icon class="grey-text text-darken-3">settings</v-icon>
      </v-btn>
      <v-btn fab top right absolute class="accent" to="/remote">
        <v-icon>add</v-icon>
      </v-btn>
    </v-footer>
  </v-app>
</template>

<script>
import HbRemoteList from './components/RemoteList'
import HbSettingsDialog from './components/SettingsDialog'
let win = nw.Window.get()

export default {
  name: 'App',
  components: {
    HbRemoteList,
    HbSettingsDialog
  },
  data () {
    return {
      settingsDialog: false
    }
  },
  methods: {
    closeWindow(){
      win.close()
    }
  },
  
}
</script>


<style lang="stylus">
::-webkit-scrollbar {
  width: 0;
  background: transparent;
}
</style>