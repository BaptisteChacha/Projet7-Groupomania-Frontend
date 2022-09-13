<template>
<div>
  <form @submit="feed" class="form">
    <div class="segment">
      <h1>Poster un contenu</h1>
    </div>
    <div>
      <label for="image" class="nom">
        <span v-if="!selectedFile"> Selectionner image de profil </span>
        <span v-else> {{ selectedFile.name }} </span>
      </label>
      <input
        @change="changedFile"
        type="file"
        class="file"
        id="image"
        name="image"
        alt="profilePicture"
      />
      <br />
    </div>
    <div>
      <textarea
        id="description"
        name="description"
        placeholder="Description"
        v-model="description"
      >
      </textarea>
      <br />
    </div>
    <br />
    <input class="envoi" type="submit" value="Envoyer" />
  </form>
  
   <h1 v-for="description in descriptions" :key="description"> <hr>
    <!-- {{ descriptions }} -->
    <span class="images"> <img :src="description.imageURL"> <br> </span>
     <!-- {{ description.imageURL }} <br> -->
    <span> Description: </span> {{ description.contain }} <br> 
    <span> Date: </span> {{ description.date }} <br>
    <span> Utilisateur: </span> {{ description.username }} <br> 
      </h1> 
      <button @click="voirPlus"> Voir plus </button>
        
</div>
</template>

<script>
//import AllContents from './src/components/AllContents.vue'

export default {
  created() {
         fetch("http://localhost:3000/api/content/getAllContents", { 
             headers: {
               Accept: "application/json",
               "Content-Type": "application/json",
               Authorization: "Bearer " + this.$store.state.token 
        },
         })
         .then((response) => response.json())
         .then(data => { 
           this.descriptions = data.posts
         }) 
         .catch((error) => {
           console.log(error);
         })
     },

  methods: {
    feed(e) {
      e.preventDefault();
      let formData = new FormData();
      formData.append('content', this.description)
      console.log(formData);
      if (this.selectedFile) {
        formData.append('imageURL', this.selectedFile)
      }
      fetch("http://localhost:3000/api/content/createPost", {
         headers: {
          Accept: "application/json",
          Authorization: "Bearer " + this.$store.state.token 
        },
        method: "post",
        body: formData
      })
       .then((response) => response.json())
       .then((data) => {
          if (!data.status) {
            throw data;
          }
          this.$notify({
            type: 'success',
            title: "Succès",
            text: "post enregistré",
          });
        })
           .catch(() => {
          this.$notify({
            type: 'error',
            title: "Error",
            text: "post non enregistré",
          })
           });
    },
    changedFile(e) {
      this.selectedFile = e.target.files[0];
    },
    voirPlus() {
      
    }
  },
  data() {
    return {
      descriptions: "",
      selectedFile: undefined,
     // offset: 5,
    };
  },
};
</script>

<style scoped lang="scss">
hr {
  align-content: center;
  width: 100%;
  img{
    font-size: 1px;
  }
}
label {
  color: blue;
  &:hover {
    cursor: grab;
  }
}

$background: grey;
$file-upload-color: grey;
$file-upload-size: 300px;

.file {
  width: $file-upload-size;
  color: #fff;
  font-size: 16px;
  padding: 11px 17px;
  border: none;
  display: none;
  background-color: $file-upload-color;
  &:hover,
  &:focus {
    background-color: darken($file-upload-color, 5);
    outline: none;
  }
}
.file-upload-button {
  cursor: pointer;
  display: inline-block;
  color: #fff;
  font-size: 16px;
  text-transform: uppercase;
  padding: 11px 20px;
  border: none;
  margin-left: -1px;
  background-color: darken($file-upload-color, 10);
  &:hover {
    background-color: darken($file-upload-color, 20);
  }
}
span{
  color: black;
  font-weight: bold;
}
.images{
  font-size: 1em;
}
</style>