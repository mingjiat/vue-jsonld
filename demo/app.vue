<template>
  <div>
    {{$root._jsonld}}
    <p>
      hello {{title}}
    </p>
    <button @click="changeTitle"> chang title</button>
    <p>{{$jsonld}}</p>
    <demo />
  </div>
</template>

<script>
  import demo from './component1.vue'

  export default {
    data() {
      return {
        title: 'demo website'
      }
    },
    components: {
      demo
    },
    methods: {
      changeTitle() {
        this.title = 'test'
      }
    },
    jsonld() {
      return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": this.title,
        "url": "https://www.demo.com/",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://www.demo.com/search?key={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }
    },
  }
</script>

<style scoped>

</style>