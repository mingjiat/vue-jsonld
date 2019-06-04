import { buildHtml } from "./server";

const _text = function() {
  return buildHtml(this.$root._jsonld.data)
}

export default function(options : Option) {
  return function $meta() {
    return {
      text: _text.bind(this),
    }
  }
}
