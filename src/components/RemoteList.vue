<template>
  <v-list v-if="allRemotes.length > 0">
    <v-subheader>Remotes List</v-subheader>
    <transition-group name="list" type="transition">
      <hb-remote :remote="remoteItem" v-for="remoteItem in allRemotes" :key="remoteItem._id" class="list-item" />
    </transition-group>
  </v-list>
  <v-card v-else>
    <v-card-text>
      Please add remotes to monitor
    </v-card-text>
  </v-card>
</template>

<script>
import HbRemote from './Remote'
import {mapGetters} from 'vuex'
export default {
	components: {
		HbRemote
	},
	computed: {
	 ...mapGetters(['allRemotes'])
	},

}
</script>

<style scoped>
.list-item {
  transition: all 1s;
  display: block;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateY(30px);
  
}
.list-leave-active {
  position: absolute;
  
}
</style>