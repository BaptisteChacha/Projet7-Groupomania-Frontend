<template>
  <div>
    <form @submit="post" class="form">
      <div class="segment">
        <h1>Poster un contenu</h1>
      </div>
      <div>
        <label for="image" class="nom">
          <span v-if="!selectedFile"> Selectionner image</span>
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

    <div class="post" v-for="description in descriptions" :key="description">
      
      <!-- {{ descriptions }} -->
      <span class="username"> {{ description.username }} </span>
      <button class="deleteCount" v-if="$store.state.token" @click="deleteCount(description.id)">supprimer le compte</button><br />
      <br />
      <button class="deletePost" v-if="$store.state.token" @click="deletePost(description.id)">supprimer le post</button><br />
      <br />
      {{ description.contain }} <br />
      <div class="images"><img :src="description.imageURL" /> <br /></div>
      <span> Date: </span> {{ description.date }} <br />
    </div>
    <button v-if="counter > offset" class="seeMore" @click="seeMore">
      Voir plus
    </button>
  </div>
</template>

<script>
export default {
  created() {
    this.seeMore();
  },

  methods: {
    post(e) {
      e.preventDefault();
      let formData = new FormData();
      formData.append("content", this.description);
      console.log(formData);
      if (this.selectedFile) {
        formData.append("imageURL", this.selectedFile);
      }
      fetch("http://localhost:3000/api/content/createPost", {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + this.$store.state.token,
        },
        method: "post",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.status) {
            throw data;
          }
          this.$notify({
            type: "success",
            title: "Succès",
            text: "post enregistré",
          });
        })
        .catch(() => {
          this.$notify({
            type: "error",
            title: "Error",
            text: "post non enregistré",
          });
        });
    },
    changedFile(e) {
      this.selectedFile = e.target.files[0];
    },
    seeMore() {
      fetch(
        "http://localhost:3000/api/content/getAllContents?offset=" +
          this.offset,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.$store.state.token,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          this.descriptions.push(...data.posts);
          this.counter = data.counter;
          this.offset = this.offset + data.posts.length;
          if (this.counter >= this.offset) {
            //  seeMoreButton.disabled = true
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    deconnect() {
      this.$store.state.token = undefined;
      this.$router.push("/connexion");
    },
    deletePost(id) {
      localStorage.getItem("token");
      let response = window.confirm("Etes-vous sûr?");
      if (response) {
        fetch("http://localhost:3000/api/content/deleteContents?id=" + id , {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((response) => console.log(response.json()))
        .then(() => {
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
        alert("Post supprimé");

      }
    },
    deleteCount(id) {
      localStorage.getItem("token");
      let response = window.confirm("Etes-vous sûr?");
      if (response) {
        fetch("http://localhost:3000/api/user/deleteCount?id=" + id , {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + this.$store.state.token,
          },
        })
        .then((response) => console.log(response.json()))
        .then(() => {
          this.$router.push("/connexion");
        })
        .catch((error) => {
          console.log(error);
        });
        alert("compte supprimé");

      }
    },
  },
  data() {
    return {
      descriptions: [],
      selectedFile: undefined,
      offset: 0,
      counter: 0,
    };
  },
};
</script>

<style scoped lang="scss">
.username {
  padding-right: 10%;
}
/*hr {
  align-content: center;
  width: 100%;
  img {
    font-size: 1px;
  }
}*/
label {
  color: blue;
  &:hover {
    cursor: pointer;
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
span {
  color: white;
  font-weight: bold;
}
.images img {
  height: 20%;
  width: 20%;
}
.envoi {
  .envoi{
  width: 248px;
  margin-bottom: 0;
  color: blue;
  letter-spacing: .05em;
  text-shadow: 0 1px 0 #133d3e;
  text-transform: uppercase;
  background: #FFD7D7;
  border-top-color: #9fb5b5;
  border-left-color: #608586;
  border-bottom-color: #1b4849;
  border-right-color: #1e4d4e;
  cursor: pointer;
  }
}
.deletePost {
  float: right;
  margin-bottom: 1%;
  color: red;
  font: bold 0.875em/1.25em "Open Sans Condensed", sans-serif;
  letter-spacing: 0.075em;
  border-radius: 10px;
  &:hover {
    cursor: pointer;
  }
}
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
.post{
      border: 5px solid;
      padding-bottom: 1%;
      margin-bottom: 1%;
}
form {
  border: 0px;
}

/*.seeMore {
  background-color: blue;
  color: white;
  border-radius: 25%;
  font-size: 1.5em;
  &:hover {
  cursor: pointer;
  }
}*/
</style>