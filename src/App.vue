<template>
  <div class="container">
    <router-view />
  </div>
</template>

<script>

export default ({
  created(){
    this.$router.push('/');
  }
})
</script>


<style>
/* html, */
html {
  background-color: #F0F7FF;
  height: 100vh;
}

body{
  margin: 0px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  word-spacing: 1px;
  font-size: 16px;
  min-height: 100vh;
}

:not(input):not(textarea),
:not(input):not(textarea)::after,
:not(input):not(textarea)::before {
    -webkit-user-select: none;
    user-select: none;
    cursor: default;
}
input, button, textarea, :focus {
    outline: none;
}


:root{
  --purple-color: #8855FF;
  --blue-color: #83CBFF;
  --sky-color: #00CCFF;
  --green-color: #00CC88;
  --yellow-color: #FFCC00;
  --red-color: #FF2B56;
  --dark-bg-image: linear-gradient(-121deg, #222222, #2B2B2B);
  --dark-bg-image-hover: linear-gradient(-121deg, #414141, #2B2B2B);
  --bg-color: #1E2023;
  --sub-bg-color: #181818;
  --title-size:calc(12px + 2vw);
  --subtitle-size:calc(5px + 2vw);
}

.subtitle{
  font-weight: 300;
  font-size: 20px;
  /* color: #526488; */
  word-spacing: 2px;
  padding-bottom: 15px;
  color: #7a7a7a;
}

.title {
  display: block;
  font-weight: bold;
  font-size: var(--title-size);
  letter-spacing: 1px;
  margin: 0px;
  /* text-align: left; */
}

.input-single{
    outline: none;
    border-radius: 6px;
    /* height: 50px; */
    border: none;
    margin-bottom: 21px;
    font-size: large;
    padding: 12px 20px;
    width: 80%;
    text-align: left; 
  transition: 0.4s;   
  background-color: #dadada;
  max-width: 400px;
}

.nom{
  margin-bottom: 0px;
}

.dropdown{
    outline: none;
    border-radius: 6px;
    /* height: 50px; */
    border: none;
    margin-bottom: 21px;
    font-size: large;
    padding: 12px 20px;
    text-align: left; 
  transition: 0.4s;   
  background-color: #dadada;
  width: 440px;
  max-height: 200px;
}

.dropdown option{
  border-radius: 6px;
}

.input-area{
    outline: none;
    border-radius: 6px;
    height: 100px;
    border: none;
    /* margin-bottom: 21px; */
    font-size: large;
    padding: 20px;
    width: 80%;
    text-align: left; 
  transition: 0.4s;   
  background-color: #dadada;
  max-width: 400px;
  margin-bottom: 12px;

}

.btn{
    outline: none;
    border-radius: 12px;
    height: 50px;
    border: none;
    margin-bottom: 21px;
    cursor: pointer;
    /* background-image: linear-gradient(45deg, #1649FF , #7732FF); */
    background-color: #5500ff;
    color: white;
    font-size: large;
    margin-top: 21px;
  transition: 0.3s;
  padding: 0px 45px;
}

.btn:hover{
  transition: 0.3s;
  transform: translateY(-5px);
}

::-webkit-scrollbar{
    width: 5px;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey; 
  border-radius: 10px;
}
 
 ::-webkit-scrollbar-thumb {
  background: #ff584d; 
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #ff2111; 
}


</style>
