<template>
  <div>
    <div class="sidebar">
      <div class="insidebar" style="margin: 50px">
        <tr>
        <h2 style="color: white">Welcome</h2>
        </tr>
        <tr>
        <router-link style="text-decoration: none; color: inherit; font-weight: normal;" to="/Home" replace>Select Mode</router-link>
        </tr>
        <tr>
        <router-link style="text-decoration: none; color: inherit; font-weight: normal;" to="/UserPracticeHistory">Practice Certificate</router-link>
        </tr>
        <tr>
        <router-link style="text-decoration: none; color: inherit; font-weight: normal;" to="/UserTestHistory">Test Certificate</router-link>
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
            <b-dropdown-group id="dropdown-group-1" header="ข้อมูลส่วนตัว">
              <b-dropdown-item href="#">{{displayNameUser}}</b-dropdown-item>
              <b-dropdown-item href="#">{{emailUser}}</b-dropdown-item>
            </b-dropdown-group>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-group id="dropdown-group-1" header="อุปกรณ์">
              <b-dropdown-item-button disabled>ท่านกำลังใช้งาน {{Device}}</b-dropdown-item-button>
              <!-- <select v-model="selectedDeviceValue"> -->
              <b-dropdown-item-button v-on:click="getDeviceOne">M-FiP No.01</b-dropdown-item-button>
              <b-dropdown-item-button v-on:click="getDeviceTwo">M-FiP No.02</b-dropdown-item-button>
              <!-- <option v-for="SelectDe in SelectDeviceArray" v-bind:key="SelectDe.Id" v-bind:value="SelectDe.Id">{{SelectDe.Name}}</option> -->
              <!-- </select> -->
              <!-- <b-dropdown-item-button v-on:click="signout">M-FiP No.01</b-dropdown-item-button>
              <b-dropdown-item-button v-on:click="signout">M-FiP No.02</b-dropdown-item-button> -->
            </b-dropdown-group>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item-button v-on:click="signout">ออกจากระบบ</b-dropdown-item-button>
          </b-nav-item-dropdown>
          <!-- <select v-model="selectedDeviceValue">
            <option v-for="SelectDe in SelectDeviceArray" v-bind:key="SelectDe.Id" v-bind:value="SelectDe.Id">{{ SelectDe.Name }}</option>
          </select> -->
        </b-navbar-nav>
      </b-navbar>
    </div>
  <div class="container">
      <h1 style="margin-bottom: 30px">โปรดเลือกโหมดที่ต้องการ</h1>
      <div class="row">
      <div class="col-md-4">
        <h4 style="margin-bottom: 10px; text-align: center;">กดตรงจุดที่แสดงไว้ดังนี้</h4>
        <img :src="imageBody" width="335" height="500"/>
      </div>
      <div class="col-md-8">
        <div style="margin-bottom: 30px" class="modeCard">
          <div class="row mb-1">
            <h5 class="mt-3">1. เลือกน้ำหนัก</h5>
            <div class="col-4 CenterButton">
              <b-button :pressed.sync="LightBtn" variant="success" class="btnR"><a>15 - 20 กิโลกรัม </a><a style="color: #00FFFF">( เบา )</a></b-button>

            </div>
            <div class="col-4 CenterButton">
              <b-button :pressed.sync="MidiumBtn" variant="success" class="btnR"><a>20 - 25 กิโลกรัม </a><a style="color: #3DFF50">( กลาง )</a></b-button>

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
import Swal from 'sweetalert2'
import imageBody from "../assets/Body.gif"
import {firestoredb} from '../config';
import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";
import { doc, onSnapshot, collection, query, setDoc} from "firebase/firestore"; 
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
        Device: null,
        DeviceAPI: null,
        StudentID: null,
        selectedDeviceValue: "",
				SelectDeviceArray: [],
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
      signout() {
        Swal.fire({
          title: 'ต้องการออกจากระบบใช่หรือไม่?',
          text: "หากตอบตกลง เราจะนำคุณออกจากระบบ",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'ออกจากระบบ',
          cancelButtonText: 'ยกเลิก'
        }).then((result) => {
          if (result.isConfirmed) {
            const auth = getAuth();
            signOut(auth).then(() => {
              this.$router.replace("/");
            }).catch((error) => {
              console.log(error)
            });
          }
        })
      },
      btnCheck(){
        if (this.LightBtn==true&&this.TenBtn==true&&this.PracticeBtn==true){
          this.$router.push("/LightOnePractice")
        }
        if (this.LightBtn==true&&this.halfBtn==true&&this.PracticeBtn==true){
          this.$router.push("/LightTwoPractice")
        }
        if (this.MidiumBtn==true&&this.TenBtn==true&&this.PracticeBtn==true){
          this.$router.push("/MidiumOnePractice")
        }
        if (this.MidiumBtn==true&&this.halfBtn==true&&this.PracticeBtn==true){
          this.$router.push("/MidiumTwoPractice")
        }
        if (this.HeavyBtn==true&&this.TenBtn==true&&this.PracticeBtn==true){
          this.$router.push("/HeavyOnePractice")
        }
        if (this.HeavyBtn==true&&this.halfBtn==true&&this.PracticeBtn==true){
          this.$router.push("/HeavyTwoPractice")
        }
        if (this.LightBtn==true&&this.TenBtn==true&&this.TestBtn==true){
          this.$router.push("/LightOneTest")
        }
      },
      getDevice(){
        const q = query(collection(firestoredb, "Device"));
            onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    this.SelectDeviceArray.push({'Id': doc.id, 'Name': doc.data().DeviceName});
                });
            });
      },
      getDeviceUser(StudentID){
        onSnapshot(doc(firestoredb, "Students", StudentID), (doc) => {
                this.DeviceAPI = doc.data().DeviceAPI;
                this.Device = doc.data().DeviceNo;
                console.log(this.Device);
              });
      },
      getDeviceOne(){
        Swal.fire({
          title: 'ต้องการเลือก M-FiP No.01 ใช่หรือไม่?',
          // text: "หากตอบตกลง เราจะนำคุณออกจากระบบ",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'ใช่',
          cancelButtonText: 'ยกเลิก'
        }).then((result) => {
          if (result.isConfirmed) {
            const docRef = setDoc(doc(firestoredb, "Students", this.StudentID.toString()), {
              Name: this.displayNameUser,
              StudentID: this.StudentID,
              Email: this.emailUser,
              DeviceNo: "M-FiP No.01",
              DeviceAPI: "https://magellan.ais.co.th/pullmessageapis/api/listen/thing/57F86C983041DCBEFD8838A2E1F5A106",
            });
            console.log("Document written with ID: ", docRef.id);
          }
        })
      },
      getDeviceTwo(){
        console.log("ok");
        Swal.fire({
          title: 'ต้องการเลือก M-FiP No.02 ใช่หรือไม่?',
          // text: "หากตอบตกลง เราจะนำคุณออกจากระบบ",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'ใช่',
          cancelButtonText: 'ยกเลิก'
        }).then((result) => {
          if (result.isConfirmed) {
            const docRef = setDoc(doc(firestoredb, "Students", this.StudentID.toString()), {
              Name: this.displayNameUser,
              StudentID: this.StudentID,
              Email: this.emailUser,
              DeviceNo: "M-FiP No.02",
              DeviceAPI: "https://magellan.ais.co.th/pullmessageapis/api/listen/thing/B2FA25E81912FE3465EB0CFE69CE826E",
            });
            console.log("Document written with ID: ", docRef.id);
          }
        })
      },
      // getDeviceSelected(selectedDeviceValue){
      //   console.log(selectedDeviceValue);
      //   if(selectedDeviceValue==1){
      //     Swal.fire({
      //     title: 'ต้องการเลือก M-FiP No.01 ใช่หรือไม่?',
      //     // text: "หากตอบตกลง เราจะนำคุณออกจากระบบ",
      //     icon: 'warning',
      //     showCancelButton: true,
      //     confirmButtonColor: '#3085d6',
      //     cancelButtonColor: '#d33',
      //     confirmButtonText: 'ใช่',
      //     cancelButtonText: 'ยกเลิก'
      //   }).then((result) => {
      //     if (result.isConfirmed) {
      //       const docRef = setDoc(doc(firestoredb, "Students", this.StudentID.toString()), {
      //         Name: this.displayNameUser,
      //         StudentID: this.StudentID,
      //         Email: this.emailUser,
      //         DeviceNo: "M-FiP No.01",
      //         DeviceAPI: "https://magellan.ais.co.th/pullmessageapis/api/listen/thing/57F86C983041DCBEFD8838A2E1F5A106",
      //       });
      //       console.log("Document written with ID: ", docRef.id);
      //     }
      //   })
      //   }
      //   if(selectedDeviceValue==2){
      //     Swal.fire({
      //     title: 'ต้องการเลือก M-FiP No.02 ใช่หรือไม่?',
      //     // text: "หากตอบตกลง เราจะนำคุณออกจากระบบ",
      //     icon: 'warning',
      //     showCancelButton: true,
      //     confirmButtonColor: '#3085d6',
      //     cancelButtonColor: '#d33',
      //     confirmButtonText: 'ใช่',
      //     cancelButtonText: 'ยกเลิก'
      //   }).then((result) => {
      //     if (result.isConfirmed) {
      //       const docRef = setDoc(doc(firestoredb, "Students", this.StudentID.toString()), {
      //         Name: this.displayNameUser,
      //         StudentID: this.StudentID,
      //         Email: this.emailUser,
      //         DeviceNo: "M-FiP No.02",
      //         DeviceAPI: "https://magellan.ais.co.th/pullmessageapis/api/listen/thing/B2FA25E81912FE3465EB0CFE69CE826E",
      //       });
      //       console.log("Document written with ID: ", docRef.id);
      //     }
      //   })
      //   }
      // },
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
          console.log(this.photoURLUser);
          this.StudentID = (user.email).split("@")[0];
          this.getDeviceUser(this.StudentID);
          this.getDevice();
        }
      });
      // this.getDeviceSelected(this.selectedDeviceValue);
      // window.onload = window.location.reload();
        // this.getUser(auth);
        // this.btnCheck()
      },
    updated(){
    // this.getDeviceSelected(this.selectedDeviceValue);
    },
    beforeCreate() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
          if (!user) {
            this.$router.replace("/")
            // alert("You don't have a permission")
          }
      });
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
/* header {
  padding: 60px;
  text-align: center;
  background: #1abc9c;
  color: rgb(17, 4, 77);
  font-size: 30px;
} */

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
