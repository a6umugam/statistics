<template>
  <div class="data-card">
      <div class="card-header">
        <a class="red small" @click="emitDelete(id)"><img src="@/assets/icons/trash.svg" width="30" ></a>
      </div>
      <div class="title-srv">
          <h2 v-for="srv in service" :key="srv">{{srv}}</h2>
      </div>
      <div class="capsule">
          <div class="capsule-content">
              <p>REF# / NOM</p>
                <h1 class="value-view">{{refn}}</h1>
          </div>
          <div class="capsule-content">
              <p>Commentaires</p>
                <h4 class="value-view">{{remarks}}</h4>
          </div>
      </div>
      <div class="footer">
          <a> <img src="@/assets/icons/calendar.svg" width="30" > {{date}}</a>
          <a> <img src="@/assets/icons/person.svg" width="30" > {{by}}</a>
      </div>
  </div>
</template>

<script>
export default {
    props: ['service','persons','remarks','date','by','id','refn'],

    methods:{
    emitDelete(params){
        this.$emit('deleteData',params)
    },
    }

}
</script>

<style>
.title-srv{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 12px;
}

.title-srv h2{
    padding: 10px;
    margin: 5px;
    background-color: #f1f1f1;
    border-radius: 16px;
}
.card-header{
    display: flex;
    width: 100%;
    justify-content: flex-end;
    align-items: center;
}

.card-header a{
    width: 30px;
    height: 30px;
    padding: 6px;
    border-radius: 6px;
    cursor: pointer;
    transition: 0.3s;
}

.card-header a:hover{
    background-color: #ff584d;
    transition: 0.3s;
}


.data-card{
    cursor: pointer;
    display: flex;
    flex-flow: column;
    min-height: 250px;
    /* justify-content: center; */
    background-color: white;
    color: #000;
    /* box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2); */
    border: solid 1px #e2e2e2;
    border-radius: 21px;
    margin-top: 20px;
    transition: 0.3s;
    padding: 12px;
}


.data-card:hover{
  background-color: #F59088 ;
  transform: translateY(-4px);
}

.capsule{
    display: flex;
    flex-flow: column;
    width: 100%;
    justify-content: center;
    align-items: center;
}

.capsule-content{
    width: 100%;
    /* max-width: 600px; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ffe9e9;
    border: solid 1px #ebdaff;
    /* padding: 5px 12px 5px 12px; */
    height: 50px;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 12px;
}

.capsule-content p{
    font-size: larger;
    width: 250px;
    color: #ff7d74;
}

.value-view{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color:#FCFAFF ;
    color: black;
    width: 100%;
    border-radius: 12px;
    height: 50px;
}

.footer{
    display: flex;
    justify-content: space-between;
    align-content: center;
}

.footer a {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: x-large;
}

.footer a img{
    margin-right: 10px;
}
</style>