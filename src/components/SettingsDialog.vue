<template>
  <v-dialog
    v-model="internalDialog"
    fullscreen 
    hide-overlay
    transition="dialog-bottom-transition">
    <v-layout row>
      <v-flex xs12 sm6>
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon @click="close">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Settings</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
            	<v-btn dark flat @click.native="saveSettings">Save</v-btn>
            </v-toolbar-items>
          </v-toolbar>

          <v-card-text>
            <v-list three-line subheader>
              <v-subheader>Global Settings</v-subheader>

              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>Ping Interval</v-list-tile-title>
                  <v-list-tile-sub-title>Set the interval between pings in seconds</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-text-field
                  name="pingInterval"
                  suffix="s"
                  v-model="settings.interval"
                ></v-text-field>
              </v-list-tile>

              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>Notifications</v-list-tile-title>
                  <v-list-tile-sub-title>Display notifications when detectinga change in status</v-list-tile-sub-title>
                  
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-checkbox v-model="settings.notifications"></v-checkbox>
                </v-list-tile-action>
              </v-list-tile>

              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>Sound</v-list-tile-title>
                  <v-list-tile-sub-title>Play a sound alongside the notification</v-list-tile-sub-title>
                  <small>(Note that notifications should be enabled if you want to change this)</small>
                  
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-checkbox v-model="settings.sounds" :disabled="!settings.notifications"></v-checkbox>
                </v-list-tile-action>
              </v-list-tile>

            </v-list>
          </v-card-text>
          
        </v-card>
      </v-flex>
    </v-layout>
  </v-dialog>
</template>

<script>
export default {
  props: {
  	dialog: Boolean
  },
  created(){
    this.$store.dispatch('loadSettings')
  },
  computed: {
    settings(){
      return this.$store.getters.settings
    },
  	internalDialog(){
  		return this.dialog
  	}
  },
  methods: {
  	close(){
  		this.$emit('update:dialog', false)
  	},
    saveSettings(){
      this.$store.dispatch('storeSettings', this.settings)
      .then(() => this.close())
    }
  }
}
</script>