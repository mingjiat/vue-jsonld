import {isArray} from "../utils/is";

function getTag(tag) {
  return  document.getElementsByTagName(tag)[0]
}

const attribute = 'data-vue-jsonld'
const idAttribute = 'data-jsonld-id'
const elementType = 'script'
const elementAttribute = {
  key: 'type',
  value: 'application/ld+json',
}

function createScriptTag(id, data) {
  const newElement = document.createElement(elementType);
  newElement.setAttribute(attribute, 'true')
  newElement.setAttribute(idAttribute, id);
  newElement.setAttribute('type', 'application/ld+json')
  newElement.innerHTML = JSON.stringify(data, null, 4)
  return newElement;
}

export const triggerHeadUpdate = (list: RowData[]) => {
  const headTag: HTMLHeadElement = getTag('head')
  const oldHeadTags: Element[] = Array.from(headTag.querySelectorAll(
    `${elementType}[${elementAttribute.key}="${elementAttribute.value}"][${attribute}]`
  ))

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
