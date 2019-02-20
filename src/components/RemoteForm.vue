<template>
  <v-progress-linear :indeterminate="true" v-if="loading"></v-progress-linear>
  <form action="" v-else @keyup.enter="save">
  	<v-card class="pa-2 elevation-0">
  	  <v-card-title primary-title>
  	    Remote
  	  </v-card-title>

  	  <v-card-text>
  	    <v-text-field
  	      label="Alias"
  	      prepend-icon="visibility"
  	      autofocus
          v-model="remote.alias"
  	    ></v-text-field>
  	    <v-text-field
  	      prefix="http://"
  	      prepend-icon="cloud"
          :value="remote.uri | hideProtocol"
          @input="val => remote.uri = val"
  	    ></v-text-field>
  	    <v-text-field
  	      label="Interval"
  	      prepend-icon="timer"
  	      suffix="s"
          v-model="remote.interval"
  	    ></v-text-field>

  	    <v-card-actions>
  	      <v-spacer></v-spacer>
  	      <v-btn flat @click="cancel">Cancel</v-btn>
  	      <v-btn flat @click="save">Save</v-btn>
  	    </v-card-actions>
  	  </v-card-text>
  	</v-card>
  </form>
</template>

<script>
export default {
  name: 'RForm',
  methods: {
  	cancel(){
  		this.$router.push({ path: '/' })
  	},
    save(){
      const remote = {
        _id: this.remote._id,
        alias: this.remote.alias,
        uri: this.remote.uri,
        interval: this.remote.interval,
        monitoring: this.remote.monitoring
      }

      this.loading = true
      this.$store.dispatch('storeRemote', remote)
      .then(
        () => {
          this.loading = false
          this.$router.push('/')
        },
        err => {
          console.error(err)
        }
      )
    }
  },
  data(){
  	return {
  		loading: true,
      remote: {
        alias: '',
        uri: '',
        interval: 10
      }
  	}
  },
  created(){
  	this.loading = false
    let id = this.$route.params.id
    if(id){
      this.remote = {...this.$store.getters.remote(id)}
    }
  },
  filters: {
    hideProtocol(val = ''){
      return val.replace('http://', '')
    }
  }
}
</script>