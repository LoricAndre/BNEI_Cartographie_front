import {createApp} from 'vue'
import App from './App.vue'
import {Quasar} from 'quasar'
import quasarUserOptions from './quasar-user-options'
import {GoogleMap, Marker} from 'vue3-google-map'

createApp(App).use(Quasar, quasarUserOptions, GoogleMap, Marker).mount('#app')
