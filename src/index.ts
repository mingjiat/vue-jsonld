import Vue from "vue";
import createMixin from "./mixin"
import createInstance from "./jsonld"

interface Install {
  (vue: Vue, options : Option): void;
  installed?: boolean
}

export const install: Install = (vue: Vue, options) => {
  if (install.installed) {
    return false
  }
  Vue.prototype.$jsonld = createInstance(options)
  Vue.mixin(createMixin(Vue, options))
  install.installed = true
}

export default  {
  install
}
