<template>
  <div>
    <form @submit="connection">
      <h1>Login</h1>
      <ul>
        <li v-for="error in errors" :key="error">
          {{ error }}
        </li>
      </ul>
      <div>
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
      <br />
      <input class="envoi" type="submit" value="Connexion" />
    </form>
    {{ $store.getters.receivedToken }}
  </div>
</template>

<script>
export default {
  methods: {
    connection(e) {
      this.errors = [];
      e.preventDefault();
      fetch("http://localhost:3000/api/auth/login", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "post",
        body: JSON.stringify({
          email: this.mail,
          password: this.password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.token) {
            throw data;
          }
          this.$store.commit("SET_TOKEN", data.token)
          this.$router.push("/");
          this.$notify({
            title: "Succès",
            text: "Heureux de vous revoir",
          });
        })
        .catch((error) => {
          console.log(error);
          this.errors.push(error.error); //error.error.details
        });
    },
  },
  data() {
    return {
      mail: "",
      password: "",
      errors: [],
    };
  },
};
</script>

<style scoped lang="scss">
li{
  color: red;
}
</style>