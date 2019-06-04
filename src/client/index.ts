import {isArray} from "../utils/is";
import { FEATURE_ATTRIBUTE, TAG, ID_ATTRIBUTE, ATTRIBUTE } from "../constant";

function getTag(tag) {
  return  document.getElementsByTagName(tag)[0]
}

function createScriptTag(id, data) {
  const newElement = document.createElement(TAG);
  newElement.setAttribute(FEATURE_ATTRIBUTE, 'true')
  newElement.setAttribute(ID_ATTRIBUTE, id);
  newElement.setAttribute(ATTRIBUTE.key, ATTRIBUTE.value)
  newElement.innerHTML = JSON.stringify(data, null, 4)
  return newElement;
}

const selector = `${TAG}[${ATTRIBUTE.key}="${ATTRIBUTE.value}"][${FEATURE_ATTRIBUTE}]`

export const triggerHeadUpdate = (list: RowData[]) => {
  const headTag: HTMLHeadElement = getTag('head')
  const oldHeadTags: Element[] = Array.from(headTag.querySelectorAll(selector))

  const newTags = list.reduce((prev, type) => {
    if(isArray(type.data)) {
      return prev.concat(
        type.data.flat().map((data) => createScriptTag(type.id, data))
      )
    }else {
      prev.push(createScriptTag(type.id, type.data))
      return prev
    }
  }, [])

  oldHeadTags.forEach(tag => tag.parentNode.removeChild(tag))
  newTags.forEach(tag => headTag.appendChild(tag))
}
