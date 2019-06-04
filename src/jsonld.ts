import { buildHtml } from "./server";

export default function(options : Option) {
  return function $meta() {

    const get = () => {
      return this.$root._jsonld.data
    }

    return {
      text() {
        return buildHtml(get())
      },
      get,
    }
  }
}
