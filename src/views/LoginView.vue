<template>
  <div class="login-container">
      <h1 >Bienvenue sur</h1>
      <h1 class="title">Statistiques d'intervention</h1>
      <h2 class="subtitle">Veuillez ouvrir une session</h2>

      <div class="h-box">
        <div class="login-box">
          <form @submit.prevent="login">
            <h2>Se connecter</h2>
            <input
                class="input-single"
                type="email"
                placeholder="Courriel"
                v-model="email"
            />
            <input
                class="input-single"
                type="password"
                placeholder="Mot de passe"
                v-model="password"
            />
            <button type="submit" class="btn">Valider</button>
        </form>
        </div>
        <div class="logo-box">
          <img src="@/assets/logo-afio.png"/>
        </div>
      </div>
  </div>
</template>

<script>
import firebase from 'firebase/compat/app';

export default {

  data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        login() {
            firebase
                .auth()
                .signInWithEmailAndPassword(this.email, this.password)
                .then(() => {
                    // alert('Successfully logged in');
                    this.$router.push('/dash');
                })
                .catch(error => {
                    alert(error.message);
                });
        },
    },

}
</script>

<style>
.login-container{
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
  /* margin-top: 60px; */
}
.h-box{
  display: flex;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  border-radius: 21px;
  overflow: hidden;
  width: 800px;
}
.logo-box{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-image: linear-gradient(21deg, #1649FF , #7732FF);
}
.login-box{
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  min-width: 400px;
  min-height: 500px;  
}
</style>