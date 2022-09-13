<template>
  <div id="app">
    <img
      src="@/assets/Logos/icon-above-font.png"
      class="icon-above"
      alt="logo"
    />
    <br />
    <notifications />
    <div id="nav">
      <router-link to="/">Fil d'actualite</router-link> |
      <router-link to="/connexion">Connexion</router-link> |
      <router-link to="/inscription">Inscription</router-link> |
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding-bottom: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
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

.segment {
  text-align: center;
}

input {
  border: 0;
  outline: 0;
  font-size: $ruler;
  border-radius: $ruler * 20;
  padding: $ruler;
  background-color: $color-bg;
  text-shadow: 1px 1px 0 $color-white;
  align-items: center;
  width: 60%;
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

label {
  display: block;
  margin-bottom: $ruler * 1.5;
  width: 100%;
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
.icon-above {
  width: 20%;
  height: 20%;
}
</style>
<script>
import jwt_decode from "jwt-decode";
export default {
  created() {
    let token = window.localStorage.getItem("token");
    console.log(token);
    let decoded = jwt_decode(token);
    console.log(decoded);

    let current_time = new Date().getTime() / 1000;
    if (current_time <= decoded.exp) {
      this.$store.commit("SET_TOKEN", token)
  }
}
};
</script>
