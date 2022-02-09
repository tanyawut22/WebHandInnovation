<template>
  <div>
    <div class="sidebar">
      <div class="insidebar" style="margin: 60px">
        <tr>
        <h2 style="color: white">Welcome</h2>
        </tr>
        <tr>
        <router-link style="text-decoration: none; color: inherit;" to="/Home" replace>Select Mode</router-link>
        </tr>
        <tr>
        <router-link style="text-decoration: none; color: inherit;" to="/Dashboard">Dashboard</router-link>
        </tr>
      </div>
    </div>
    <!-- <b-navbar toggleable="lg" type="dark" variant="dark">
          <h2>Select mode</h2>
    </b-navbar> -->
    <div>
      <b-navbar class="navbar" style="margin-left: 15%;">
        <b-navbar-nav>
          <!-- <img :src="photoURLUser" class="d-inline-block align-top" style="border-radius: 50%; width: 40px"> -->

          <!-- Navbar dropdowns -->
          <b-nav-item-dropdown size="lg" variant="link" toggle-class="text-decoration-none" no-caret>
            <template #button-content>
              <img :src="photoURLUser" class="d-inline-block align-top" style="border-radius: 50%; width: 40px">
            </template>
            <b-dropdown-item href="#">{{displayNameUser}}</b-dropdown-item>
            <b-dropdown-item href="#">{{emailUser}}</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-navbar>
    </div>
  <div class="container">
      <h1 style="margin-bottom: 30px">โปรดเลือกโหมดที่ต้องการ</h1>
      <!-- <tr>
        <button type="button" class="btn btn-secondary btn-lg" style="margin-right: 50px"><router-link to="/ModeOne">10 - 15 sec</router-link></button>
        <button type="button" class="btn btn-secondary btn-lg" style="margin-left: 50px"><router-link to="/ModeTwo">30 - 45 sec</router-link></button>
      </tr> -->
      <!-- <div class="cardA">
        <SkeletonScaffold primary="teal" padding="10px" borderRadius="20px" animDisable>
          <tr>
            <td>
              <div class="col-sm-4">
                <img :src="imageBody" width="300" height="500"/>
              </div>
            </td>
            <td>
              <div class="col-sm-8">
                <h3 style="color: white; text-align: center;">จุดสัญญาณในการนวด</h3>
                <br/>
                <tr>
                  <td><h5>15 - 20 กิโลกรัม </h5><h5 style="color: #28A745">( เบา )</h5></td>
                  <td><router-link style="text-decoration: none; color: inherit;" to="/FrontLightOne"><b-button class="button-21"> 10 - 15 วินาที </b-button></router-link></td>
                  <td><router-link style="text-decoration: none; color: inherit;" to="/FrontLightTwo"><b-button class="button-21"> 30 - 45 วินาที</b-button></router-link></td>
                  <td><router-link style="text-decoration: none; color: inherit;" to=""><b-button class="button-21"> 45 - 75 วินาที</b-button></router-link></td>
                </tr>
                <tr>
                  <td><h5>20 - 25 กิโลกรัม </h5><h5 style="color: #FFC107">( กลาง )</h5></td>
                  <td><router-link style="text-decoration: none; color: inherit;" to="/FrontMidiumOne"><b-button class="button-21"> 10 - 15 วินาที </b-button></router-link></td>
                  <td><router-link style="text-decoration: none; color: inherit;" to="/FrontMidiumTwo"><b-button class="button-21"> 30 - 45 วินาที </b-button></router-link></td>
                  <td><router-link style="text-decoration: none; color: inherit;" to=""><b-button class="button-21"> 45 - 75 วินาที</b-button></router-link></td>
                </tr>
                <tr>
                  <td><h5>25 - 40 กิโลกรัม </h5><h5 style="color: #DC3545">( หนัก )</h5></td>
                  <td><router-link style="text-decoration: none; color: inherit;" to="/FrontHeavyOne"><b-button class="button-21"> 10 - 15 วินาที </b-button></router-link></td>
                  <td><router-link style="text-decoration: none; color: inherit;" to="/FrontHeavyTwo"><b-button class="button-21"> 30 - 45 วินาที </b-button></router-link></td>
                  <td><router-link style="text-decoration: none; color: inherit;" to=""><b-button class="button-21"> 45 - 75 วินาที</b-button></router-link></td>
                </tr>
              </div>
            </td>

          </tr>

        </SkeletonScaffold>
      </div> -->
      <div class="row">
      <div class="col-md-4">
        <h4 style="margin-bottom: 10px; text-align: center;">กดตรงจุดที่แสดงไว้ดังนี้</h4>
        <img :src="imageBody" width="335" height="500"/>
      </div>
      <div class="col-md-8">
        <div style="margin-bottom: 30px" class="modeCard">
        <!-- <h4 style="text-align: center; margin-bottom: 20px;">1. เลือกน้ำหนัก</h4>
          <div class="row mb-1">
            <div class="col-4 CenterButton">
              <p>15 - 20 กิโลกรัม </p><p style="color: #3DFF50">( เบา )</p>
            </div>
            <div class="col-4 CenterButton" >
              <p>20 - 25 กิโลกรัม </p><p style="color: #FFC107">( กลาง )</p>
            </div>
            <div class="col-4 CenterButton">
              <p>25 - 40 กิโลกรัม </p><p style="color: #BD0000">( หนัก )</p>
            </div>
          </div> -->
          <!-- <b-form-group label="1. เลือกแรง" v-slot="{ ariaDescribedby }">
            <b-form-radio-group
              id="btn-radios-2"
              v-model="selected"
              :options="options"
              :aria-describedby="ariaDescribedby"
              button-variant="outline-light"
              name="radio-btn-outline"
              buttons
              class="CenterButton"
            ></b-form-radio-group>
          </b-form-group> -->
          <div class="row mb-1">
            <h5 class="mt-3">1. เลือกน้ำหนัก</h5>
            <div class="col-4 CenterButton">
              <b-button :pressed.sync="LightBtn" variant="success" class="btnR"><a>15 - 20 กิโลกรัม </a><a style="color: #3DFF50">( เบา )</a></b-button>

            </div>
            <div class="col-4 CenterButton">
              <b-button :pressed.sync="MidiumBtn" variant="success" class="btnR"><a>20 - 25 กิโลกรัม </a><a style="color: #FFC107">( กลาง )</a></b-button>

            </div>
            <div class="col-4 CenterButton">
              <b-button :pressed.sync="HeavyBtn" variant="success" class="btnR"><a>25 - 40 กิโลกรัม </a><a style="color: #BD0000">( หนัก )</a></b-button>
            </div>
          </div>
        </div>

          <div style="margin-bottom: 30px" class="modeCard">
              <div class="row mb-1">
                <h5 class="mt-3">2. เลือกเวลา</h5>
                <div class="col-6 CenterButton">
              <b-button :pressed.sync="TenBtn" variant="success" class="btnR"><a>10 - 15 วินาที</a></b-button>

            </div>
            <div class="col-6 CenterButton">
              <b-button :pressed.sync="halfBtn" variant="success" class="btnR"><a>30 - 45 วินาที</a></b-button>
            </div>
            <!-- <div class="col-4 CenterButton">
              <b-button :pressed.sync="fullBtn" variant="success" class="btnR"><a>45 - 75 วินาที</a></b-button>
            </div> -->
              </div>
          </div>

          <div class="modeCard">
            <div class="row mb-1">
              <h5 class="mt-3">3. เลือกโหมด</h5>
                <div class="col-6 CenterButton">
                  <b-button :pressed.sync="PracticeBtn" variant="success" class="btnR"><a>ฝึกซ้อม</a></b-button>
                </div>
                <div class="col-6 CenterButton">
                  <b-button :pressed.sync="TestBtn" variant="success" class="btnR"><a>ทดสอบ</a></b-button>
                </div>
            </div>
          </div>
          <br>
          <div class="CenterButton">
            <b-button v-on:click="btnCheck()" variant="success" class="btnStart"> เริ่ม </b-button>
          </div>
      </div>
    </div>

    </div>
    <!-- <footer>
      <p>© 2021 Lorem ipsum</p>
    </footer> -->
</div>
</template>
<script>

import imageBody from "../assets/Body.gif"
import { onAuthStateChanged, getAuth} from "firebase/auth";
export default {
    name:'Home',
    data(){
      return{
        // selected: 'radio1',
        // options: [
        //   { html: '15 - 20 กิโลกรัม<a style="color: #3DFF50">( เบา )</a>', value: 'Light' },
        //   { html: '20 - 25 กิโลกรัม<a style="color: #FFC107">( กลาง )</a>', value: 'Midium' },
        //   { html: '25 - 40 กิโลกรัม<a style="color: #BD0000">( หนัก )</a>', value: 'Heavy' },
          
        // ],
        TestBtn: false,
        PracticeBtn: false,
        TenBtn: false,
        halfBtn: false,
        fullBtn: false,
        LightBtn: false,
        MidiumBtn: false,
        HeavyBtn: false,
        imageBody: imageBody,
        displayNameUser: null,
        emailUser: null,
        uidUser: null,
        photoURLUser: null,

      }
    },
    methods: {
      btnCheck(){
        if (this.LightBtn==true&&this.TenBtn==true&&this.PracticeBtn==true){
          this.$router.push("/LightOnePractice")
        }
        else if (this.LightBtn==true&&this.halfBtn==true&&this.PracticeBtn==true){
          this.$router.push("/LightTwoPractice")
        }
        else if (this.LightBtn==true&&this.fullBtn==true&&this.PracticeBtn==true){
          this.$router.push("/LightThreePractice")
        }
        else if (this.MidiumBtn==true&&this.TenBtn==true&&this.PracticeBtn==true){
          this.$router.push("/MidiumOnePractice")
        }
        else if (this.MidiumBtn==true&&this.halfBtn==true&&this.PracticeBtn==true){
          this.$router.push("/MidiumTwoPractice")
        }
        else if (this.MidiumBtn==true&&this.fullBtn==true&&this.PracticeBtn==true){
          this.$router.push("/MidiumThreePractice")
        }
        else if (this.HeavyBtn==true&&this.TenBtn==true&&this.PracticeBtn==true){
          this.$router.push("/HeavyOnePractice")
        }
        else if (this.HeavyBtn==true&&this.halfBtn==true&&this.PracticeBtn==true){
          this.$router.push("/HeavyTwoPractice")
        }
        else if (this.HeavyBtn==true&&this.fullBtn==true&&this.PracticeBtn==true){
          this.$router.push("/HeavyThreePractice")
        }
        else if (this.LightBtn==true&&this.TenBtn==true&&this.TestBtn==true){
          this.$router.push("/LightOneTest")
        }
      }
        // getUser(auth){
        //   const user = auth.currentUser;
        //   console.log(user);
        //   if (user !== null) {
        //     // The user object has basic properties such as display name, email, etc.
        //     this.displayNameUser = user.displayName;
        //     this.emailUser = user.email;
        //     this.photoURLUser = user.photoURL;

        //     this.uidUser = user.uid;
        //     console.log(this.uidUser);
        //   }
        // }
      },
      mounted(){
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
        if(user){
          const uid = user.uid;
          console.log(uid)
          this.displayNameUser = user.displayName;
          this.emailUser = user.email;
          this.photoURLUser = user.photoURL;
        }
      });
      // window.onload = window.location.reload();
        // this.getUser(auth);
        // this.btnCheck()
      },
    updated(){
      
      // this.btnCheck()
    //   setTimeout(function () { 
    //   window.onload = location.reload();
    // }, 2000);
    },
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-weight: normal;
  padding: 20px;
  color: rgb(36, 36, 36);
  /* color: white; */
  /* text-align: left; */
}
h2 {
  font-weight: bold;
  color: rgb(36, 36, 36);
}
h5 {
  margin: 10px;
  color: white;
}
header {
  padding: 60px;
  text-align: center;
  background: #1abc9c;
  color: rgb(17, 4, 77);
  font-size: 30px;
}

/* .sidebar {
  position: fixed;
  width: 15%;
  height: 100vh;
  background: #000000;
  color: #ffffff;
  font-size: 1.25em;
  flex-direction: column;
} */
.insidebar {
  position: relative;
  text-align: center;
  top: 10%;
  /* transform: translateY(-50%); */
  /* margin: 0 15%; */
  font-weight: bold;
  flex-direction: column;
}
.active a {
      color: white;
    }
a {
      color: white;
    }
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* padding: 10px; */
    margin: 0px 200px 0px 200px;
    /* margin-left: 5%; */
    height: 100%;
  }
    /* justify-content: space-between; */
  /* td{
    width: 130px;
  } */
  .cardA {
  width: 900px;
  /* height: 100px; */
  /* border: 1px solid #c3c3c3; */
  display: flex;
  /* padding: 5px; */
  align-items: center;
  margin: 5px;
  justify-content: center;
  }
.ButtonShadow {
  /* border: 1px solid #ffffff07; */
  box-shadow: 2px 2px 10px #3b3b3b9d;
}

/* CSS */
.button-21 {
  align-items: center;
  margin: 10px;
  /* appearance: none; */
  background-color: #854407;
  /* background-image: linear-gradient(1deg, #3d4192, #67c2ff 99%); */
  background-size: calc(100% + 20px) calc(100% + 20px);
  border-radius: 100px;
  border-width: 0;
  box-shadow: 2px 2px 10px #3b3b3b9d;
  box-sizing: border-box;
  color: #FFFFFF;
  /* cursor: pointer; */
  display: inline-flex;
  font-size: 1rem;
  height: auto;
  justify-content: center;
  line-height: 1.5;
  padding: 2px 20px;
  /* position: relative; */
  text-align: center;
  text-decoration: none;
  transition: background-color .2s,background-position .2s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  /* vertical-align: top; */
  white-space: nowrap;
}

.button-21:active,
.button-21:focus {
  outline: none;
}

.button-21:hover {
  background-position: -20px -20px;
}

.button-21:focus:not(:active) {
  box-shadow: rgba(40, 170, 255, 0.25) 0 0 0 .125em;
}
.CenterButton{
  display: flex;
  justify-content: center;
  align-items: center;
}
.modeCard{
  width: 740px;
  padding: 10px;
  height: 120px;
  border-radius: 20px;
  background-color: #5ab6a2;
}
.btnR{
 padding: 2px 20px;
 height: 40px;
 border-radius: 100px;
 border-width: 0;
}
.btnStart{
 padding: 2px 20px;
 height: 60px;
 border-radius: 100px;
 border-width: 0;
 width: 100px;
 font-size: 25px;
}
</style>
