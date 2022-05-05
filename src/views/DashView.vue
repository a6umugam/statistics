<template>
  <div class="dash-container" >
    <div class="tool-bar" v-bind:class="{remrad: norad, blurit:viewMenu}">
      <div class="h-btn-grp">
        <img src="@/assets/logo-afio-mini.png" width="150" class="logo-img"/>
        <a class="purple big" @click="viewMenu='form'"> <img src="@/assets/icons/plus.svg" width="30"> Nouveau</a>
        <a class="grey big" @click="pickRef = !pickRef"> <img src="@/assets/icons/hash.svg" width="30"  >  REF / NOM</a>
        <div class="inner-capsule" v-if="pickRef">
          <input type="number" class="input-single nom" v-model="filterRef" @change="getBlocks">
        </div>

        <a class="grey big"  @click="pickDateRange = !pickDateRange" > <img src="@/assets/icons/calendar.svg" width="30"> Plage de dates</a>
        <div class="inner-capsule" v-if="pickDateRange">
          <!-- <p>depuis</p> -->
          <input type="date" id="date" name="date" class="input-single" v-model="fromDate" @change="getBlocks">
          <!-- <p>pour</p> -->
          <input type="date" id="date" name="date" class="input-single nom" v-model="toDate" @change="getBlocks">
        </div>
        <a class="grey big" @click="pickServices = !pickServices"> <img src="@/assets/icons/board.svg" width="30"  > Services offerts</a>

        <!-- <div class="inner-capsule" v-if="pickServices">
        <p>Services offerts</p>
        <select  class="input-single nom" v-model="filterService"  @change="getBlocks">
            <option v-for="srv in services" :value="srv" :key=srv >{{srv}}</option>
        </select>
        </div> -->

        <div class="f-check-list" v-if="pickServices">
            <ul class="f-check-list-content">
                <li v-for="srv in services" :key=srv >
                    <input :value="srv" :name="srv" type="checkbox" v-model="filterServiceList"  @change="getBlocks"/>
                    <label :for="srv">{{srv}}</label>
                </li>
            </ul>

        </div>

        <a class="grey big"  @click="pickCreator = !pickCreator"> <img src="@/assets/icons/person.svg" width="30"> Crée par</a>
        <div class="inner-capsule" v-if="pickCreator">
          <!-- <p>nom du créateur</p> -->
          <select class="input-single nom"  @change="getBlocks" v-model="filterCreator">
              <option v-for="per in creators" :value="per" :key=per>{{per}}</option>
          </select>
        </div>
      </div>
      <div class="v-btn-grp">
        <a class="red small" @click="logout"><img src="@/assets/icons/power.svg" width="30" ></a>
        <a class="grey big" @click="clearFilters"> <img src="@/assets/icons/sync.svg" width="30" >effacer les filtres</a>
      </div>
    </div>
    <div class="content-bar" v-bind:class="{blurit: viewMenu}">
      <h1 class="title left">Bienvenue!</h1>

      <div class="chart-box">
        <h2 class="left">Tableau de données du <strong>graphique statistique</strong> </h2>
        <h1 class="left">Graphique en secteurs</h1>
        <h2 class="left" v-if="fromDate != ''">{{fromDate}} - {{toDate}}</h2>
        <DoughnutChart :chartData="testData"  :options="options" />
        <h3 class="left" v-if="filterServiceList.length == 0">Nombre de services utilisés: {{usedServicesCount}} </h3>
        <div class="title-srv" v-else>
          <h3 v-for="srv in filterServiceList" :key="srv">{{srv}}</h3>
        </div>
        <!-- <h3 class="left">Nombre de personnes: {{totalPersons}} </h3> -->
        <!-- <p class="right">*Hover on top of colors to know service name</p> -->
        <!-- <p class="right">*Chart is based on selected date range</p> -->
      </div>
      <h1 class="title left">Rapports <strong>d'intervention</strong> </h1>
      <div>
        <DataCard v-for="data in datas" @deleteData='deleteReport' :id="data.id" :refn="data.ref" :service="data.service" :persons="data.persons" :remarks="data.remarks" :date="data.date" :by="data.by" :key="data.key"/>
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

import { DoughnutChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default {


  data(){
    return{
      scrollVal:0,
      norad:false,
      viewMenu:'',
      datas:[],
      lastVisible:'',
      hasScrolledToBottom: false,
      usedServicesCount:0,
      totalPersons:0,
      fromDate:"",
      toDate:"",
      filterService:'',
      filterServiceList:[],
      filterRef:0,
      filterCreator:"",
      pickDateRange:false,
      pickServices:false,
      pickCreator:false,
      pickRef:false,
      options: ({
      responsive: true,
      plugins: {
        legend: {
          display:false,
          position: 'top',
        },
        title: {
          display: false,
          text: 'Chart.js Doughnut Chart',
        },
      },
    }),
    creators:['Julie Koskinen',
                    'Michelle Makoko',
                    'Others'],
    services:['Accompagnement Physique',
                'Visite à domicile',
                'Aide alimentaire',
                'Aide matérielle : meubles,',
                'Aide Juridique',
                'Avocats, centre de justice de proximité',
                'Don de l’AFIO (cartes cadeaux pour épicerie, vêtements, jouets, manteaux,bottes)',
                'Interprétariat, Traduction',
                'Études',
                'Immigration',
                'Parrainage',
                'Demande de visa',
                'Résidente Permanent',
                'Permis de travail',
                'Permis d’étude',
                'Citoyenneté',
                'Soutien pour la recherche d’une garderie, en milieu familial',
                'Placement des enfants en garderie',
                'Socialisation, Réseautage, besoin de contacts',
                'Logement',
                'Hébergement',
                'Emploi',
                'Santé',
                'Aide techniques (lettre, formulaire et documentation)',
                'Soutien psychosocial',
                'Soutien en situation de violence conjugale',
                'Interventions auprès des autres services',
                'Francisation',
                'PDI individuelle'],
      testData : {
      labels: ['Accompagnement Physique',
                'Visite à domicile',
                'Aide alimentaire',
                'Aide matérielle : meubles,',
                'Aide Juridique',
                'Avocats, centre de justice de proximité',
                'Don de l’AFIO (cartes cadeaux pour épicerie, vêtements, jouets, manteaux,bottes)',
                'Interprétariat, Traduction',
                'Études',
                'Immigration',
                'Parrainage',
                'Demande de visa',
                'Résidente Permanent',
                'Permis de travail',
                'Permis d’étude',
                'Citoyenneté',
                'Soutien pour la recherche d’une garderie, en milieu familial',
                'Placement des enfants en garderie',
                'Socialisation, Réseautage, besoin de contacts',
                'Logement',
                'Hébergement',
                'Emploi',
                'Santé',
                'Aide techniques (lettre, formulaire et documentation)',
                'Soutien psychosocial',
                'Soutien en situation de violence conjugale',
                'Interventions auprès des autres services',
                'Francisation',
                'PDI individuelle'],
      datasets: [
        {
          data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          backgroundColor: ['#5D8AA8', '#F0F8FF', '#E32636', '#E52B50', '#FFBF00','#A4C639', '#FBCEB1', '#7FFFD4', '#B2BEB5', '#FF9966',
                            '#007FFF', '#89CFF0', '#DEB887', '#E97451', '#536878','#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED',
                            '#F4C2C2', '#DE5D83', '#CC5500', '#8A3324', '#A5C8ED','#FFEF00','#A4C639', '#FBCEB1', '#7FFFD4',],
        },
      ],
    }
    }
  },
components:{
  DataCard,
  AddForm,
  DoughnutChart,
},

  beforeMount () {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  created(){
    this.getBlocks()
    this.toDate = new Date().toISOString().slice(0, -14);
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
    var start = firebase.firestore.Timestamp.fromDate(new Date(this.fromDate));
    var end = firebase.firestore.Timestamp.fromDate(new Date(this.toDate));

    var snapshot = await firebase.firestore().collection('datas')
    // Singles
    if(this.fromDate != "" && this.filterServiceList.length == 0 && this.filterCreator == '' && this.filterRef==0){
      console.log('wokring on date')
      snapshot = await firebase.firestore().collection('datas').where('timestamp', '>', start)
              .where('timestamp', '<', end).orderBy("timestamp", "desc").get()
    }else if(this.filterServiceList.length > 0 && this.fromDate == "" && this.filterCreator=="" && this.filterRef==0){
      snapshot = await firebase.firestore().collection('datas').where('service', 'array-contains-any',this.filterServiceList).orderBy("timestamp", "desc").get()
    }else if(this.filterCreator != "" && this.fromDate == "" && this.filterServiceList.length == 0 && this.filterRef==0){
      if(this.filterCreator == "Others" ){
        snapshot = await firebase.firestore().collection('datas').where('others', '==',true).orderBy("timestamp", "desc").get()
      }else{
        snapshot = await firebase.firestore().collection('datas').where('by', '==',this.filterCreator).orderBy("timestamp", "desc").get()
      }
    }else if(this.filterRef != 0 &&this.filterCreator == "" && this.fromDate == "" && this.filterServiceList.length == 0){
      snapshot = await firebase.firestore().collection('datas').where('ref', '==',this.filterRef).orderBy("timestamp", "desc").get()
    }

    // Doubles
    // date and services
    else if(this.fromDate != "" && this.filterServiceList.length > 0 && this.filterCreator == '' && this.filterRef==0){
      snapshot = await firebase.firestore().collection('datas').where('timestamp', '>', start)
              .where('timestamp', '<', end)
              .where('service', 'array-contains-any',this.filterServiceList)
              .orderBy("timestamp", "desc").get()
    }

    // date and creator
    else if(this.fromDate != "" && this.filterServiceList.length == 0 && this.filterCreator != '' && this.filterRef==0){
      snapshot = await firebase.firestore().collection('datas').where('timestamp', '>', start)
              .where('timestamp', '<', end)
              .where('by', '==',this.filterCreator)
              .orderBy("timestamp", "desc").get()
    }

    // services and creator
    else if(this.fromDate == "" && this.filterServiceList.length > 0 && this.filterCreator != '' && this.filterRef==0){
      snapshot = await firebase.firestore().collection('datas').where('service', 'array-contains-any',this.filterServiceList)
              .where('by', '==',this.filterCreator)
              .orderBy("timestamp", "desc").get()
    }

    // date and ref
    else if(this.fromDate != "" && this.filterServiceList.length == 0 && this.filterCreator == '' && this.filterRef != 0){
      snapshot = await firebase.firestore().collection('datas')
              .where('timestamp', '>', start)
              .where('timestamp', '<', end)
              .where('ref', '==',this.filterRef)
              .orderBy("timestamp", "desc").get()
    }

    // services and ref
    else if(this.fromDate == "" && this.filterServiceList.length > 0 && this.filterCreator == '' && this.filterRef != 0){
      snapshot = await firebase.firestore().collection('datas')
              .where('ref', '==',this.filterRef)
              .where('service', 'array-contains-any',this.filterServiceList)
              .orderBy("timestamp", "desc").get()
    }

    // creator and ref
    else if(this.fromDate == "" && this.filterServiceList.length == 0 && this.filterCreator != '' && this.filterRef != 0){
      snapshot = await firebase.firestore().collection('datas')
              .where('ref', '==',this.filterRef)
              .where('by', '==',this.filterCreator)
              .orderBy("timestamp", "desc").get()
    }

    // Tripples
    // No Ref
    else if(this.fromDate != "" && this.filterServiceList.length > 0 && this.filterCreator != '' && this.filterRef == 0){
      snapshot = await firebase.firestore().collection('datas').where('timestamp', '>', start)
              .where('timestamp', '<', end)
              .where('service', 'array-contains-any',this.filterServiceList)
              .where('by', '==',this.filterCreator)
              .orderBy("timestamp", "desc").get()
    }

    // No date
    else if(this.fromDate == "" && this.filterServiceList.length > 0 && this.filterCreator != '' && this.filterRef != 0){
      snapshot = await firebase.firestore().collection('datas')
              .where('ref', '==',this.filterRef)
              .where('service', 'array-contains-any',this.filterServiceList)
              .where('by', '==',this.filterCreator)
              .orderBy("timestamp", "desc").get()
    }

    // No service
    else if(this.fromDate != "" && this.filterServiceList.length == 0 && this.filterCreator != '' && this.filterRef != 0){
      snapshot = await firebase.firestore().collection('datas').where('timestamp', '>', start)
              .where('timestamp', '<', end)
              .where('ref', '==',this.filterRef)
              .where('by', '==',this.filterCreator)
              .orderBy("timestamp", "desc").get()
    }

    // No creator
    else if(this.fromDate != "" && this.filterServiceList.length > 0 && this.filterCreator == '' && this.filterRef != 0){
      snapshot = await firebase.firestore().collection('datas').where('timestamp', '>', start)
              .where('timestamp', '<', end)
              .where('service', 'array-contains-any',this.filterServiceList)
              .where('ref', '==',this.filterRef)
              .orderBy("timestamp", "desc").get()
    }

    // Fours
    else if(this.fromDate != "" && this.filterServiceList.length > 0 && this.filterCreator != '' && this.filterRef != 0){
      snapshot = await firebase.firestore().collection('datas').where('timestamp', '>', start)
              .where('timestamp', '<', end)
              .where('service', 'array-contains-any',this.filterServiceList)
              .where('by', '==',this.filterCreator)
              .where('ref', '==',this.filterRef)
              .orderBy("timestamp", "desc").get()
    }

    else{
      snapshot = await firebase.firestore()
      .collection('datas')
      .orderBy("timestamp", "desc")
      .limit(8)
      .get()
    }

    this.datas = snapshot.docs.map((doc) => doc.data())
    this.datas.id = snapshot.docs.map((doc) => doc.id)
    this.lastVisible = snapshot.docs[snapshot.docs.length-1];
    var i
    for (i = 0; i < this.datas.length; i++) {
      this.datas[i].id = this.datas.id[i]
    }
    console.log(this.datas)
    this.analyzeData()
    },

  saveData(data){
    console.log(data.service)
    console.log(data)
    var othr = false
    if(data.by != this.creators[0] && data.by != this.creators[1]  ){
      othr = true
    }
    const t = firebase.firestore.Timestamp.fromDate(new Date());
    firebase.firestore().collection("datas").add({
      service: data.service,
      persons: data.persons,
      ref:data.ref,
      date: data.date,
      by: data.by,
      remarks: data.remarks,
      timestamp: t,
      others: othr
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
                    alert('Déconnecté avec succès');
                    this.$router.push('/');
                })
                .catch(error => {
                    alert(error.message);
                    this.$router.push('/');
                });
        },

    analyzeData(){
      console.log(this.testData.labels)
      this.testData.datasets[0].data = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      this.usedServicesCount = 0
      this.totalPersons = 0

      for(let d = 0; d < this.datas.length; d++){
        console.log(this.datas[d].service)
        for(let i = 0; i < this.testData.labels.length; i++){
          if(this.filterServiceList.length > 0){
            if(this.datas[d].service.includes(this.testData.labels[i])){
              if(this.filterServiceList.includes(this.testData.labels[i])){
                this.testData.datasets[0].data[i] += 1
                console.log(this.testData.datasets[0].data[i])
              }
          }
          }else{
            if(this.datas[d].service.includes(this.testData.labels[i])){
              this.testData.datasets[0].data[i] += 1
              console.log(this.testData.datasets[0].data[i])
          }
          }
        }
      }

      for(let j =0; j < this.testData.datasets[0].data.length; j++){
        if(this.testData.datasets[0].data[j] != 0){
          this.usedServicesCount += 1
          this.totalPersons += this.testData.datasets[0].data[j]
        }
      }
      console.log(this.usedServicesCount)
    },

    deleteReport(id){
      console.log(id)
      firebase.firestore().collection("datas").doc(id).delete().then(() => {
          console.log("Document successfully deleted!");
          this.getBlocks()
      }).catch((error) => {
          console.error("Error removing document: ", error);
      });

    },

    clearFilters(){
      this.filterService =""
      this.filterCreator = ""
      this.filterRef = 0
      this.fromDate = ""
      this.filterServiceList = []
      this.getBlocks()
    }

}
}
</script>

<style>
.title-srv{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}

.title-srv h3{
    padding: 10px;
    margin: 5px;
    background-color: #f1f1f1;
    border-radius: 16px;
}

.f-check-list {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}


.f-check-list-content {
  max-height: 200px;

  outline: none;
    border-radius: 6px;
    /* height: 50px; */
    border: none;
    /* margin-bottom: 21px; */
    font-size: large;
    padding: 12px 20px;
    text-align: left; 
  transition: 0.4s;   
  width: 90%;
  max-height: 200px;
  background-color: #eaf2ff;
  border: solid 1px #f1f1f1;
  overflow-y: scroll;
}

.f-check-list-content li{
    list-style: none;
    background-color: #eeeeee;
    margin-bottom: 5px;
    border-radius: 6px;
    padding: 5px;
    display: flex;
    align-items: center;
}


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
  min-height: 420px;
  max-width: 100%;
  border-radius: 21px;
  text-align: start;
  padding: 12px;
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
  max-height: 90vh;
  overflow: scroll;
}

.tool-bar::-webkit-scrollbar{
  display: none;
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

.inner-capsule{
  display: flex;
  flex-flow: column;
  align-items: center;
  margin-bottom: 12px;
  border-radius: 12px;
  padding: 10px;
  font-size: larger;
  cursor: pointer;
  background-color: #eaf2ff;
  border: solid 1px #f1f1f1;
  transition: 0.3s;
  width: 90%;
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
  width: 100%;
  text-align: left;
  margin-top: 12px;
  margin-bottom: 12px;
  color: #2A2A2A;
}

.left strong{
  color: #2A2A2A;

}

.right{
  width: 100%;
  text-align: right;
  margin-top: 12px;
  margin-bottom: 12px;
  color: #7e7e7e;
}

.blurit{
    filter: blur(13px);
}


</style>