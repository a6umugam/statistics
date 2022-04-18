<template>
  <div class="dash-container" >
    <div class="tool-bar" v-bind:class="{remrad: norad, blurit:viewMenu}">
      <div class="h-btn-grp">
        <img src="@/assets/logo-afio-mini.png" width="150" class="logo-img"/>
        <a class="purple big" @click="viewMenu='form'"> <img src="@/assets/icons/plus.svg" width="30"> New Entry</a>
        <a class="grey big"> <img src="@/assets/icons/calendar.svg" width="30" > Date Range</a>
        <a class="grey big"> <img src="@/assets/icons/board.svg" width="30" > Services</a>
        <a class="grey big"> <img src="@/assets/icons/person.svg" width="30" > Created By</a>
      </div>
      <div class="v-btn-grp">
        <a class="red small" @click="logout"><img src="@/assets/icons/power.svg" width="30" ></a>
        <a class="grey big"> <img src="@/assets/icons/settings.svg" width="30" >Settings</a>
      </div>
    </div>
    <div class="content-bar" v-bind:class="{blurit: viewMenu}">
      <h1 class="title left"><strong>Welcome back to </strong> Database  </h1>

      <div class="chart-box">
        <h1>here comes the chart</h1>
      </div>
      <h1 class="title left">Reports <strong>Section</strong> </h1>
      <div>
        <DataCard v-for="data in datas" :service="data.service" :persons="data.persons" :remarks="data.remarks" :date="data.date" :by="data.by" :key="data.key"/>
      </div>
    </div>

    <div class="pop-menu" v-if="viewMenu !=''">
      <AddForm v-if="viewMenu=='form'" @closeMenu='closeMenu' @saveData='saveData'/>
    </div>

  </div>
</template>

<script>
import DataCard from '../components/DataCard.vue'
import AddForm from '../components/AddForm.vue'
import firebase from 'firebase/compat/app';
// const db = firebase.firestore();

export default {
  data(){
    return{
      scrollVal:0,
      norad:false,
      viewMenu:'',
      datas:[],
      lastVisible:'',
      hasScrolledToBottom: false,
    }
  },
components:{
  DataCard,
  AddForm
},

  beforeMount () {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  created(){
    this.getBlocks()
  },

methods:{
  handleScroll () {
    this.scrollVal = window.scrollY
    if(this.scrollVal > 20){
        this.norad = true
    }else{
        this.norad = false
    }
  },
  closeMenu(){
    this.viewMenu = ''
    console.log("closing menu")
  },

  getData(){
    firebase.firestore().collection("datas").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
    });
});
  },

  async getBlocks(){
        var snapshot = await firebase.firestore()
          .collection('datas')
          .orderBy("timestamp", "desc")
          .limit(8)
          .get()
      this.datas = snapshot.docs.map((doc) => doc.data())
      this.datas.id = snapshot.docs.map((doc) => doc.id)
      this.lastVisible = snapshot.docs[snapshot.docs.length-1];
      var i
      for (i = 0; i < this.datas.length; i++) {
        this.datas[i].id = this.datas.id[i]
      }
      console.log(this.datas)
    },

  saveData(data){
    console.log(data)
    const t = firebase.firestore.Timestamp.fromDate(new Date());
    firebase.firestore().collection("datas").add({
      service: data.service,
      persons: data.persons,
      date: data.date,
      by: data.by,
      remarks: data.remarks,
      timestamp: t,
      })
      .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          this.getBlocks()
          this.closeMenu()
      })
      .catch((error) => {
          console.error("Error adding document: ", error);
      });
  },

  logout(){
            firebase
                .auth()
                .signOut()
                .then(() => {
                    alert('Successfully logged out');
                    this.$router.push('/');
                })
                .catch(error => {
                    alert(error.message);
                    this.$router.push('/');
                });
        },

}
}
</script>

<style>
.pop-menu{
    display: flex;
    position: fixed;
    justify-content: center;
    align-items: center;
    width: 100%;
    /* max-width: 1100px; */
    height: 100vh;
    padding: 7px;
    /* background-color: #F0F7FF; */
    z-index: 99;
}

.chart-box{
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  background-color:#FEF5E8 ;
  min-height: 400px;
  width: 100%;
  border-radius: 21px;

}

.dash-container{
  display: flex;
  min-height: 100vh;
  align-items: flex-start;
  padding: 12px;
}

.tool-bar{
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  padding: 21px;
  /* background-color: blue; */
  width: 400px;
  min-width: 300px;
  align-items: center;
  border: solid 1px #e2e2e2;
  background-color: white;
  margin: 10px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  border-radius: 21px;
  z-index: 9;
  top: 0;
  position: sticky;
}
.remrad{
    border-radius: 0px 0px 21px 21px;
}

.content-bar{
  display: flex;
  flex-flow: column;
  width: 100%;
  padding: 10px;

}

.logo-img{
  margin-top: 30px;
  margin-bottom: 150px;
}

.tool-bar a{
  display: flex;
  align-items: center;
  height: 40px;
  margin-bottom: 12px;
  border-radius: 12px;
  padding: 10px;
  font-size: larger;
  cursor: pointer;
}

.big img{
  margin-right: 18px;
}

.grey{
  background-color: #F9F9F9;
  border: solid 1px #f1f1f1;
  transition: 0.3s;
}

.grey:hover{
  transition: 0.3s;
  color: #5b7bff;
}

.red{
  background-color: #FFEAF0;
  color: black;
  border: solid 1px #ffd5e1;
}

.purple{
  background-color: #F5ECFF;
  color: #8A3BD6;
  border: solid 1px #ebdaff;
}

.big{
  width: 90%;
}

.small{
  width: 60px;
  margin-right: 12px;
  justify-content: center;
}



.v-btn-grp{
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
}

.h-btn-grp{
  display: flex;
  flex-flow: column;
  width: 100%;
  align-items: center;
}

.left{
  text-align: left;
  margin-top: 12px;
  margin-bottom: 12px;
  color: #2A2A2A;
}

.left strong{
  color: #D2D5D4;

}

.blurit{
    filter: blur(13px);
}


</style>