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

export const triggerHeadUpdate = (list: []) => {
  const headTag = getTag('head')
  const oldHeadTags = Array.from(headTag.querySelectorAll(
    `${elementType}[${elementAttribute.key}="${elementAttribute.value}"][${attribute}]`
  ))

  const newTags = list.map((type) => {
    const newElement = document.createElement(elementType);
    newElement.setAttribute(attribute, 'true')
    newElement.setAttribute(idAttribute, type.id)
    newElement.setAttribute('type', 'application/ld+json')
    newElement.innerHTML = JSON.stringify(type.data, null, 4)
    return newElement
  })

  oldHeadTags.forEach(tag => tag.parentNode.removeChild(tag))
  newTags.forEach(tag => headTag.appendChild(tag))
}
