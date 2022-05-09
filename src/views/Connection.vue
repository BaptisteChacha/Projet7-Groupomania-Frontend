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
  </div>
</template>

<script>
export default {
  methods: {
    connection(e) {
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
        .then((response) => console.log(response))
        .catch((error) => {
          console.log(error);
          this.errors.push(error.error.details); //error.error.details
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
input {
  align-items: center;
  width: 60%;
}
label {
  display: block;
}
.envoi {
  color: blue;
  cursor: pointer;
}
$ruler: 16px;
$color-red: #ae1100;
$color-bg: #ebecf0;
$color-shadow: #babecc;
$color-white: #fff;

body,
p,
input,
select,
textarea {
  font-family: "Montserrat", sans-serif;
  letter-spacing: -0.2px;
  font-size: $ruler;
}

div,
p {
  color: $color-shadow;
  text-shadow: 1px 1px 1px $color-white;
}

form {
  padding: $ruler;
  width: $ruler * 20;
  margin: 0 auto;
}
input {
  border: 0;
  outline: 0;
  font-size: $ruler;
  border-radius: $ruler * 20;
  padding: $ruler;
  background-color: $color-bg;
  text-shadow: 1px 1px 0 $color-white;
  margin-right: $ruler/2;
  box-shadow: inset 2px 2px 5px $color-shadow, inset -5px -5px 10px $color-white;
  width: 100%;
  box-sizing: border-box;
}
.input-group {
  display: flex;
  align-items: center;
  justify-content: flex-start;

  label {
    margin: 0;
    flex: 1;
  }
}
</style>