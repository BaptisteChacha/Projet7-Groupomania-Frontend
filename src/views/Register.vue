<template>
  <div>
    <form @submit="register">
      <div class="segment">
        <h1>Sign up</h1>
        <p>
          La date stockée dans Vuex est le {{ $store.state.day }}-{{
            $store.state.month
          }}-{{ $store.state.year }}.
        </p>
        <ul>
          <li v-for="error in errors" :key="error">
            {{ error }}
          </li>
        </ul>
      </div>
      <div>
        <input
          type="text"
          id="lastname"
          name="lastname"
          placeholder="Nom"
          v-model="lastname"
        />
        <br />
      </div>
      <div>
        <br />
        <input
          type="text"
          id="firstname"
          name="firstname"
          placeholder="Prénom"
          v-model="firstname"
        />
        <br />
      </div>
      <div>
        <br />
        <input
          type="email"
          id="mail"
          name="mail"
          placeholder="Adresse mail"
          v-model="mail"
        />
      </div>
      <div>
        <br />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Mot de passe"
          v-model="password"
        />
      </div>
      <div>
        <br />
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Nom d'utilisateur"
          v-model="username"
        />
      </div>
      <br />
      <input class="envoi" type="submit" value="Envoyer" />
    </form>
  </div>
</template>

<script>
//import Error from '../Backend/services/utils.js'
export default {
  methods: {
    register(e) {
      this.errors = [];
      e.preventDefault();
      console.log(this.username);
      fetch("http://localhost:3000/api/auth/signup", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "post",
        body: JSON.stringify({
          lastname: this.lastname,
          firstName: this.firstname,
          email: this.mail,
          password: this.password,
          userName: this.username,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.status) {
            throw data;
          }
          this.$router.push("/connexion");
          this.$notify({
            title: "Succès",
            text: "compte crée avec succès",
          });
        })
        .catch((error) => {
          console.log(this.errors);
          for (let i = 0; i <= error.error.details.length; i++) {
            this.errors.push(error.error.details[i].message);
          }
        });
    },
  },
  data() {
    return {
      lastname: "",
      firstname: "",
      mail: "",
      password: "",
      username: "",
      errors: [],
    };
  },
};
</script>

<style scoped lang="scss">
li {
  color: red;
}
</style>