<template>
  <div class="background">
    <form @click="connection">
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
  </div>
</template>

<script>
export default {
  methods: {
    connection(e) {
      this.errors = [];
      e.preventDefault();
      console.log("bonjour")
      console.log('mail: '+ this.mail);
      console.log('password: '+ this.password);
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
          console.log('data', data);
          if (!data.token) {
           /* this.$store.commit("SET_TOKEN", data.token);
            console.log(this.$store.commit)*/
            throw data;
          }
          //localStorage.setItem('token', data.token)
          this.$store.commit("SET_TOKEN", data.token);
          this.$router.push("/");
          this.$notify({
            title: "Succès",
            text: "Heureux de vous revoir",
          });
        })
        .catch((error) => {
          console.log('error', error);
          this.errors.push(error.error);
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
.background, nav{
  background: rgba(78,81,102,1);
}
li{
  color: red;
}
form {
  position: relative;
  width: 250px;
  margin: 0 auto;
  padding: 20px 22px;
  //border: 1px solid;
  border-top-color: rgba(255,255,255,.4);
  border-left-color: rgba(255,255,255,.4);
  border-bottom-color: rgba(60,60,60,.4);
  border-right-color: rgba(60,60,60,.4);
}

</style>