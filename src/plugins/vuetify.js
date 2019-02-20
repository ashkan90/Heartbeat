import Vue from 'vue'
import Vuetify, {
	VGrid,
	VCard,
  VCardText,
  VCardMedia,
  VSnackbar,
  VDialog
    
} from 'vuetify'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  components: {
  	VGrid,
  	VCard,
    VCardText,
    VCardMedia,
    VSnackbar,
    VDialog
  }
})
