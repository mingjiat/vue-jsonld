<template>
  <div>
    <p>{{ $jsonld }}</p>
  </div>
</template>

<script>
  export default {
    jsonld: {
      "@context": "http://schema.org/",
      "@type": "Person",
      "name": "Jia Chen",
      "jobTitle": "Developer",
      "telephone": "18664945494",
      "url": "http://www.btorage.com"
    }
  }
</script>

<style scoped>

</style>