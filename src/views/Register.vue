<template>
  <div>
    <form @submit="register">
      <div class="segment">
        <h1>Sign up</h1>
        <ul>
          <li v-for="error in errors" :key="error">
            {{ error }}
          </li>
        </ul>
      </div>
      <div>
        <input type="text" id="lastname" name="lastname" placeholder="Nom" v-model="lastname" />
        <br />
      </div>
      <div>
        <br />
        <input   type="text" id="firstname" name="firstname" placeholder="Prénom" v-model="firstname" />
        <br />
      </div>
      <div>
        <br />
        <input type="email" id="mail" name="mail" placeholder="Adresse mail" v-model="mail" />
      </div>
      <div>
        <br />
        <input type="password" id="password" name="password" placeholder="Mot de passe" v-model="password" />
      </div>
      <div>
        <br />
        <input type="text" id="username" name="username" placeholder="Nom d'utilisateur" v-model="username" />
      </div>
      <br />
      <input class="envoi" type="submit" value="Envoyer" />
    </form>
  </div>
</template>

<script>
export default {
  methods: {
    register(e) {
      
      //this.errors.push(result.error);
      e.preventDefault();
      console.log(this.username);
      fetch("http://localhost:3000/api/auth/signup", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "post",
        body: JSON.stringify({
          lastName: this.lastname,
          firstName: this.firstname,
          email: this.mail,
          password: this.password,
          userName: this.username,
        }),
      })
      .then(response => response.json())
        .then(data => {
          if (!data.status) {
            throw data;
          } 
          this.$router.push('/connexion')
        })
        .catch((error) => {
          console.log(error)
          this.errors.push(error.message); //error.error.details
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
input {
  align-items: center;
  width: 60%;
}
.envoi {
  width: auto;
  color: blue;
  cursor: pointer;
}
$ruler: 16px;
$color-red: #ae1100;
$color-bg: #ebecf0;
$color-shadow: #babecc;
$color-white: #fff;

body,
html {
  background-color: $color-bg;
}

body,
p,
input,
select,
textarea,
button {
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

.segment {
  text-align: center;
}

button,
input {
  border: 0;
  outline: 0;
  font-size: $ruler;
  border-radius: $ruler * 20;
  padding: $ruler;
  background-color: $color-bg;
  text-shadow: 1px 1px 0 $color-white;
}

label {
  display: block;
  margin-bottom: $ruler * 1.5;
  width: 100%;
}

input {
  margin-right: $ruler/2;
  box-shadow: inset 2px 2px 5px $color-shadow, inset -5px -5px 10px $color-white;
  width: 100%;
  box-sizing: border-box;
  transition: all 0.2s ease-in-out;
  appearance: none;
  -webkit-appearance: none;

  &:focus {
    box-shadow: inset 1px 1px 2px $color-shadow,
      inset -1px -1px 2px $color-white;
  }
}

button {
  color: #61677c;
  font-weight: bold;
  box-shadow: -5px -5px 20px $color-white, 5px 5px 20px $color-shadow;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    box-shadow: -2px -2px 5px $color-white, 2px 2px 5px $color-shadow;
  }

  &:active {
    box-shadow: inset 1px 1px 2px $color-shadow,
      inset -1px -1px 2px $color-white;
  }

  .icon {
    margin-right: $ruler/2;
  }

  &.unit {
    border-radius: $ruler/2;
    line-height: 0;
    width: $ruler * 3;
    height: $ruler * 3;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0 $ruler/2;
    font-size: $ruler * 1.2;

    .icon {
      margin-right: 0;
    }
  }

  &.red {
    display: block;
    width: 100%;
    color: $color-red;
  }
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