import './bootstrap';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/dist/sweetalert2.css';
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faPencil, faFan, faCode, faPhone, faFolder, faShieldHalved, faLaptopCode, faBug, faMeteor, faUserSecret } from '@fortawesome/free-solid-svg-icons'

import { faTrash } from '@fortawesome/free-solid-svg-icons';


library.add(faPencil, faTrash, faFan, faCode, faPhone, faFolder, faShieldHalved, faLaptopCode, faBug, faMeteor, faUserSecret)

window.Swal = Swal
const toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timeProgressBar: true,
});

window.toast = toast

import { createApp } from 'vue';

import app from './components/app.vue';

import router from './router';

import store from './store/store';

store.dispatch('getProducts')
    .then(response => { }).catch((error) => console.error(error));

createApp(app).use(router).use(store).component('font-awesome-icon', FontAwesomeIcon).mount("#app")