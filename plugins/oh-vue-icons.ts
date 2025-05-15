import { OhVueIcon, addIcons } from "oh-vue-icons";
import { FaWind, FaTint, FaThermometerHalf } from "oh-vue-icons/icons";

addIcons(FaWind, FaTint, FaThermometerHalf);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("v-icon", OhVueIcon);
});
