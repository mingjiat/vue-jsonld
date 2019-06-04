import { isArray } from "../utils/is";
import { TAG, ID_ATTRIBUTE, ATTRIBUTE } from "../constant";

export const buildHtml = (list: RowData[]) => {
  const tags = list.map(item => {
    if(isArray(item.data)) {
      return item.data.map(sub => ({
        id: item.id,
        data: sub
      })) as RowData[]
    }
    return item as RowData
  }).flat()

  return tags.reduce((prev, item) => {
    return prev + `<${TAG} ${ATTRIBUTE.key}="${ATTRIBUTE.value}" ${ID_ATTRIBUTE}="${item.id}">${JSON.stringify(item.data)}</${TAG}>`
  }, '')
}