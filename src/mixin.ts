import {isFunction} from "./utils/is";
import {ensuredPush, ensureIsObject} from "./utils/ensure";
import uid from "./utils/uuid";
import { triggerHeadUpdate } from "./client";


const optionName = 'jsonld'
const computedName = '$jsonld'

const buildRow = (id, data) => ({
 id,
 data
})


const updateType = (list: RowData[], id: string, data) => {
  const index = list.findIndex(item => item.id === id)
  if (index>=0) {
    list.splice(
      index,
      1,
      buildRow(id, data)
    )
  } else {
    list.push(buildRow(id, data))
  }
  triggerHeadUpdate(list)
}

export default function createMixin(Vue, options) {
  return {
    beforeCreate() {
      const options = this.$options
      const jsonldValue = options[optionName]
      const jsonldId = uid(10)
      this._jsonldId = jsonldId
      if(!!options[optionName]) {
        if (!this.$root._jsonld) {
          this.$root._jsonld = []
        }
        ensureIsObject(this.$options, 'computed')
        this.$options.computed[computedName] = isFunction(jsonldValue) ? jsonldValue : () => jsonldValue
        ensuredPush(this.$options, 'created', () => {
          updateType(
            this.$root._jsonld,
            jsonldId,
            this[computedName]
          )
          this.$watch(computedName, function (value) {
            updateType(
              this.$root._jsonld,
              jsonldId,
              value
            )
          })
        })
      }
    },
  }
}