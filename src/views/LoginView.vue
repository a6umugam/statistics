<template>
  <div class="login-container">
      <h1 >Bienvenue sur</h1>
      <h1 class="title">Statistiques d'intervention</h1>
      <h2 class="subtitle">Please Login to continue</h2>

      <div class="h-box">
        <div class="login-box">
          <h4>Email</h4>
          <input class="input-single" type="email" name="email address" id="email-id">
          <h4>Password</h4>
          <input class="input-single" type="email" name="email address" id="email-id">
          <button class="btn" @click="gotoDashboard">Login</button>
          <!-- <a href="#/">Dashboard</a> -->
        </div>
        <div class="logo-box">
          <img src="@/assets/logo-afio.png"/>
        </div>
      </div>
  </div>
</template>

<script>
export default {

  methods:{
    gotoDashboard(){
      this.$router.push('/dash');
    }
  }

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