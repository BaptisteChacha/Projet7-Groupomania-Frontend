<template>
  <div id="app">
     <img src="@/assets/Logos/icon-above-font.png" class="icon-above" alt="logo" /> <br />
    <div id="nav">
      <router-link to="/">Fil d'actualite</router-link> |
      <router-link to="/connexion">Connexion</router-link> |
       <router-link to="/inscription">Inscription</router-link> |
    </div>
    <router-view/>
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
.icon-above{
  width: 20%;
  height: 20%;
}
</style>
