// ./components/HomeLink.vue
<script>
export default {
	name: 'HomeLink'
}
</script>

<template>
	<button class="deleteCount"> </button>
</template>

<style scoped lang="scss">
	.deleteCount {
  float: left;
  margin-bottom: 1%;
  color: red;
  font: bold 0.875em/1.25em "Open Sans Condensed", sans-serif;
  letter-spacing: 0.075em;
  border-radius: 10px;
  &:hover {
    cursor: pointer;
  }
}
</style>