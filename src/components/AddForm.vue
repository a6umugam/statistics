<template>
    <div class="form-view">
        <h1 class="intro-text">Fiche<strong> d'inscription</strong> </h1>
        <p>Services offerts</p>
        
        <div class="check-list">
            <ul class="check-list-content">
                <li v-for="srv in services.sort()" :key=srv >
                    <input :value="srv" :name="srv" type="checkbox" v-model="formData.service" />
                    <label :for="srv">{{srv}}</label>
                </li>
            </ul>
            <p v-if="formData.service[0]">{{formData.service}}</p>
            <p> </p>
        </div>

        <!-- <select multiple class="dropdown" v-model="formData.service">
            <option v-for="srv in services" :value="srv" :key=srv >{{srv}}</option>
        </select> -->
        <p>REF# / NOM</p>
        <input type="text" class="input-single" v-model="formData.ref">
        <p>Date</p>
        <input type="date" id="date" name="date" class="input-single" v-model="formData.date">
        <p>Crée par</p>
        <select class="dropdown"  @change="creatorChange" v-model="formData.by">
            <option v-for="per in creators" :value="per" :key=per>{{per}}</option>
        </select>
        <input type="text" class="input-single" placeholder="Please Specify Your Name" v-if="otherField" v-model="formData.by">
        <p>Commentaires</p>
        <textarea name="comments" id="coment" cols="10" rows="5" class="input-area" v-model="formData.remarks"></textarea>

        <div class="btn-grp">
            <a class="ico-btn red" v-on:click="emitClose"> <img src="@/assets/icons/close.svg" width="30" >Annuler</a>
            <a class="ico-btn grey"  v-on:click="emitSave" > <img src="@/assets/icons/tick.svg" width="30" >Enregistrer</a>
        </div>

    </div>
</template>

<script>
export default {
    data(){
        return{
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
            creators:['Julie Koskinen',
                    'Michelle Makoko',
                    'Others'],
            otherField: false,
            formData:{service:[],persons:0,date:'',by:'',remarks:'',ref:''},
        }
    },
methods:{
    emitClose(){
        this.$emit('closeMenu')
    },
    emitSave(){
        this.$emit('saveData',this.formData)
    },
    creatorChange(creator){
        console.log('creator changed')
        console.log(creator.target.value)
        if(creator.target.value == "Others"){
            this.otherField = true
            this.formData.by = ""
        }else{
            this.otherField = false
        }
    }
}
}
</script>

<style>



.check-list {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}


.check-list-content {
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
  width: 440px;
  max-height: 200px;
  background-color: #dadada;
  overflow-y: scroll;
}



.check-list-content li{
    list-style: none;
    background-color: #eeeeee;
    margin-bottom: 5px;
    border-radius: 6px;
    padding: 5px;
    display: flex;
    align-items: center;
}

input[type=checkbox] {min-width:20px; min-height:20px;margin-right: 10px;}


.form-view{
    min-width: 500px;
    height: 90vh;
    width: 600px;
    background-color: white;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    border-radius: 21px;
    padding: 12px;
    overflow-y: scroll;
    max-height: 900px;
}
.form-view::-webkit-scrollbar{
  display: none;
}

.form-view p{
    font-size: large;
    margin: 0px;
}

.ico-btn{
  display: flex;
  align-items: center;
  height: 40px;
  /* margin-bottom: 12px; */
  border-radius: 12px;
  padding: 10px;
  font-size: larger;
  cursor: pointer;
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

.btn-grp{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.intro-text{
  margin-top: 12px;
  margin-bottom: 21px;
  color: #2A2A2A;
}

.intro-text strong{
  color: #2A2A2A;
}

</style>