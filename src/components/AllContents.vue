<template>
  <div>
   <h1> Hello World </h1>
  </div>
</template>

<script>
export default {
	name: 'AllContents',
    created() {
         fetch("http://localhost:3000/api/content/getAllContents", { 
             headers: {
               Accept: "application/json",
               "Content-Type": "application/json",
        },
         })
         .then()
         .catch()
         console.log('je suis scrée')
     },
}
</script>