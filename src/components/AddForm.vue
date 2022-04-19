<template>
    <div class="form-view">
        <h1 class="intro-text">Fiche<strong> d'inscription</strong> </h1>
        <p>Services offerts</p>
        <select class="dropdown" v-model="formData.service">
            <option v-for="srv in services" :value="srv" :key=srv >{{srv}}</option>
        </select>
        <p>Nombre de personnes</p>
        <input type="number" class="input-single" v-model="formData.persons">
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
            services:['Accompagnement Physique. Déplacement',
                    'Aide alimentaire',
                    'Aide matérielle : meubles',
                    'Aide Juridique, avocats, centre de justice de proximité',
                    'Don de l’AFIO (cartes cadeaux pour épicerie, vêtements, jouets,manteaux, bottes)',
                    'Interprétariat, Traduction',
                    'Études',
                    'Besoin et soutien pour la recherche des Garderie',
                    'Immigration, parrainage, visa, RP, permis de travail et études',
                    'Citoyenneté',
                    'Socialisation, Réseautage, besoin de contacts',
                    'Logement, Hébergement',
                    'Opération bancaires',
                    'Emploi',
                    'Santé',
                    'Informations sur les services et programmes gouvernementaux',
                    'Formulaires',
                    'Lecture et Rédaction lettres et de documents',
                    'Soutien psychosocial',
                    'Soutien en situation de violence conjugale',
                    'Écoute, informations et références',
                    'Interventions auprès des autres services',
                    'Francisation',
                    'PDI individuelle',
                    'Suivis personnalisés',
                    'Placement d’enfants en garderie'],
            creators:['Julie Koskinen',
                    'Michelle Makoko',
                    'Others'],
            otherField: false,
            formData:{service:'',persons:0,date:'',by:'',remarks:''},
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
.form-view{
    min-width: 500px;
    width: 600px;
    background-color: white;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    border-radius: 21px;
    padding: 12px;
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
  color: #D2D5D4;
}

</style>