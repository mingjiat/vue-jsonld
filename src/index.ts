import Vue from "vue";
import createMixin from "./mixin"

interface Option {
}

interface Install {
  (vue: Vue, options : Option): void;
  installed?: boolean
}

export const install: Install = (vue: Vue, options) => {
  if (install.installed) {
    return false
  }
  Vue.mixin(createMixin(Vue, options))
  install.installed = true
}

export default  {
  install
}
