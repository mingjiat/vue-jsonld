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

const removeType = (list: RowData[], id: string) => {
  const index = list.findIndex(item => item.id === id)
  if (index>=0) {
    list.splice(
      index,
      1,
    )
  }
  triggerHeadUpdate(list)
}

export default function createMixin(Vue, options) {
  return {
    beforeCreate() {
      const $root = this.$root
      const options = this.$options
      const jsonldValue = options[optionName]
      const jsonldId = uid(10)

      if (!$root._jsonld) {
        $root._jsonld = {
          data: []
        }
      }

      if($root._jsonld.initialized) {
        $root._jsonld.initialized = true
      }

      if(!!options[optionName]) {
        ensureIsObject(this.$options, 'computed')
        this.$options.computed[computedName] = isFunction(jsonldValue) ? jsonldValue : () => jsonldValue

        ensuredPush(this.$options, 'created', () => {
          updateType(
            $root._jsonld.data,
            jsonldId,
            this[computedName]
          )
          this.$watch(computedName, function (value) {
            updateType(
              $root._jsonld.data,
              jsonldId,
              value
            )
          })
        })

        ensuredPush(this.$options, 'destroyed', () => {
          removeType(
            $root._jsonld.data,
            jsonldId
          )
        })
      }
    },
  }
}