<template>
  <div id="app">
    <img
      src="@/assets/Logos/icon-above-font-removebg-preview.png"
      class="icon-above"
      alt="logo"
    />
    <br />
    <notifications />
    <div class="nav" v-if="$store.state.token == undefined">
      <router-link to="/connexion">Connexion</router-link> |
      <router-link to="/inscription">Inscription</router-link> |
    </div>
    <div class="nav" v-if="$store.state.token">
      <router-link to="/">Fil d'actualite</router-link> |
      <span class="deconnect" @click="deconnect"> deconnexion </span>
    </div>
    <router-view />
  </div>
</template>

<script>
//import jwt_decode from "jwt-decode";
export default {
  /*created() {
    const token = window.localStorage.getItem("token");
    console.log(token);
    const decoded = jwt_decode(token);
    console.log(decoded.id);

    let current_time = new Date().getTime() / 1000;
    if (current_time <= decoded.exp) {
      this.$store.commit("SET_TOKEN", token);
    }
  },*/
  methods: {
    deconnect() {
      this.$store.commit("SET_TOKEN", undefined);
      this.$router.push("/connexion");
      localStorage.clear()
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: rgba(78, 81, 102, 1);
}

.nav {
  padding-bottom: 30px;

  a {
    font-weight: bold;
    color: white;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.envoi {
  width: 248px;
  margin-bottom: 0;
  color: blue;
  letter-spacing: 0.05em;
  text-shadow: 0 1px 0 #133d3e;
  text-transform: uppercase;
  border-top-color: #9fb5b5;
  border-left-color: #608586;
  border-bottom-color: #1b4849;
  border-right-color: #1e4d4e;
  cursor: pointer;
}
form {
  position: relative;
  width: 250px;
  margin: 0 auto;
  padding: 20px 22px;
  border: 1px solid;
  border-top-color: rgba(255, 255, 255, 0.4);
  border-left-color: rgba(255, 255, 255, 0.4);
  border-bottom-color: rgba(60, 60, 60, 0.4);
  border-right-color: rgba(60, 60, 60, 0.4);
}
form input,
form button {
  color: black;
  width: 212px;
  border: 1px solid;
  border-bottom-color: rgba(255, 255, 255, 0.5);
  border-right-color: rgba(60, 60, 60, 0.35);
  border-top-color: rgba(60, 60, 60, 0.35);
  border-left-color: rgba(80, 80, 80, 0.45);
  background: #ffd7d7;
  background-repeat: no-repeat;
  padding: 8px 24px 8px 10px;
  font: bold 0.875em/1.25em "Open Sans Condensed", sans-serif;
  letter-spacing: 0.075em;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 19px;
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
  background-color: #4e5169;
  border-left-color: white;
  border-right-color: white;
  border-top-color: white;
  border-bottom-color: white;
}
textarea {
  height: 5rem;
  width: 400px;
}

div,
p {
  color: white;
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
  border-radius: 10px;
  padding: $ruler;
  background-color: $color-bg;
  text-shadow: 1px 1px 0 $color-white;
  align-items: left;
  width: 60%;
  margin-right: $ruler/2;
  box-shadow: inset 2px 2px 5px grey, inset -5px -5px 10px $color-white;
  width: 100%;
  box-sizing: border-box;
  transition: all 0.2s ease-in-out;
  appearance: none;
  -webkit-appearance: none;
  label {
    color: black;
  }
  color: white;

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
.deconnect {
  color: #42b983;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
}
</style>
