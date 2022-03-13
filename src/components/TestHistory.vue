<template>
  <div>
    <div class="sidebar">
      <div class="insidebar" style="margin: 60px">
        <tr>
        <h2 style="color: white">Welcome</h2>
        </tr>
        <tr>
          <router-link style="text-decoration: none; color: inherit; font-weight: normal;" to="/HomeAdmin">Dashboard</router-link>
        </tr>
        <tr>
          <router-link style="text-decoration: none; color: inherit; font-weight: normal;" to="/PracticeMode">Practice Mode</router-link>
        </tr>
        <tr>
          <router-link style="text-decoration: none; color: inherit; font-weight: normal;" to="/TestMode">Test Mode</router-link>
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
            <!-- <b-dropdown-group id="dropdown-group-1" header="อุปกรณ์">
              <b-dropdown-item v-for="SelectDe in SelectDeviceArray" v-bind:key="SelectDe.Id" v-bind:value="SelectDe.Id">{{SelectDe.Name}}</b-dropdown-item>
            </b-dropdown-group>
            <b-dropdown-divider></b-dropdown-divider> -->
            <b-dropdown-item-button v-on:click="signout">ออกจากระบบ</b-dropdown-item-button>
          </b-nav-item-dropdown>
          <select v-model="selectedStudentIDValue" style="width: 350px">
            <option v-for="SelectID in SelectStudentIDArray" v-bind:key="SelectID.Id" v-bind:value="SelectID.Id">{{SelectID.Name}}</option>
          </select>
          <h5>การฝึก</h5>
          <select v-model="selectedModeValue" style="width: 80px">
            <option v-for="SelectMode in SelectModeArray" v-bind:key="SelectMode.Id" v-bind:value="SelectMode.Id">{{SelectMode.Name}}</option>
          </select>
        </b-navbar-nav>
      </b-navbar>
    </div>
    <div class="container">
      <h1 style="text-align: center;">ประวัติการกดโหมดฝึกซ้อม</h1>
      <!-- <h3 style="text-align: center;">ของ {{Name}}</h3> -->
      <div id="chart" style="margin-bottom: 20px;">
        <apexchart
          type="line"
          width="900"
          height="350"
          ref="chart"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>
      <div>
          <a style="font-size: 20px;"><strong>ชื่อ: </strong>{{Name}}</a>
        <br>
          <a style="font-size: 20px;"><strong>รหัสนักศึกษา: </strong>{{StudentID}}</a>
        <br>
          <a style="font-size: 20px;"><strong>โหมดการทดสอบ: </strong>{{Modetext}} ( {{Mode}} ) เป็นเวลา {{ModeSec}} วินาที</a>
        <br>
          <a style="font-size: 20px;"><strong>ด้วยอุปกรณ์: </strong>{{Device}}</a>
        <br>
          <a style="font-size: 20px;"><strong>วันที่: </strong>{{DateDone}} เวลา {{TimeDone}} น.</a>
      </div>

    </div>
    <!-- <footer>
      <p>© 2021 Lorem ipsum</p>
    </footer> -->
</div>
</template>
<script>
import Swal from 'sweetalert2'
import VueApexCharts from "vue-apexcharts";
import {firestoredb} from '../config';
import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";
import { collection, query, onSnapshot, doc} from "firebase/firestore";
var data = [];
export default {
    name:'TestMode',
    components: {
      apexchart: VueApexCharts,
    },
    data(){
      return{
        Device: null,
        size: null,
        TimeDone: null,
        Name: null,
        Mode: null,
        ModeSec: null,
        ChartData: null,
        DateDone: null,
        selectedModeValue: "",
        SelectModeArray: [],
        selectedStudentIDValue: "",
        SelectStudentIDArray: [],
        StudentID: null,
        displayNameUser: null,
        emailUser: null,
        uidUser: null,
        photoURLUser: null,
        series: [{
              data: data.slice()
          }],
        chartOptions: {
            chart: {
              id: "line",
              height: 450,
              type: "line",
              animations: {
                enabled: false,
                easing: "linear",
                dynamicAnimation: {
                  speed: 1000,
                },
              },
              toolbar: {
                show: false,
              },
              zoom: {
                enabled: false,
              },
            },
            dataLabels: {
              enabled: true,
              
            },
            stroke: {
              curve: "smooth",
              width: 5,
            },
            markers: {
              size: 0,
            },
            xaxis: {
              floating: false,
              overwriteCategories: this.TestArray,
              labels:{
                show: true,
                 style: {
                    fontSize: '12px',
                    fontFamily: "prompt",
                    fontWeight: 400,
                },
              },
               axisTicks: {
                  show: true,
                  borderType: 'solid',
                  color: '#78909C',
                  height: 4,
                  offsetX: 0,
                  offsetY: 0
              },
              title: {
                text: 'วินาที',
                style: {
                    fontSize: '12px',
                    fontFamily: "prompt",
                    fontWeight: 600,
                },
              },
            },
            yaxis: {
              max: 40,
              title: {
                text: 'กิโลกรัม',
                style: {
                    fontSize: '12px',
                    fontFamily: "prompt",
                    fontWeight: 600,
                },
              },
              labels:{
                show: true,
                 style: {
                    fontSize: '12px',
                    fontFamily: "prompt",
                    fontWeight: 400,
                },
              },
            },
            legend: {
              show: false,
            },
        },

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
        getStudentID(){
            const q = query(collection(firestoredb, "Students"));
            onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    this.SelectStudentIDArray.push({'Id': doc.id, 'Name': doc.id+" "+doc.data().Name});
                });
            });
        },
        getMode(selectedStudentIDValue){
            const q = query(collection(firestoredb, "Students", selectedStudentIDValue, "TestHistory"));
            onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    this.SelectModeArray.push({'Id': doc.id, 'Name': "ครั้งที่ "+doc.id});
                });
            });
        },
        PutData(){
            data = this.ChartData;
          },
          sliceCheckBack(){
            if(this.ChartData[this.ChartData.length-1].y==0&&this.ChartData[this.ChartData.length-2].y==0){
                this.ChartData=this.ChartData.slice(0,-1)
                // console.log(this.ChartData);
                this.PutData();
                this.sliceCheckBack();
            }
            else{
              this.PutData();
            }

          },
          sliceCheckFront(){
            if(this.ChartData[0].y==0&&this.ChartData[1].y==0){
                this.ChartData=this.ChartData.slice(1)
                // console.log(this.ChartData.length);
                this.PutData();
                this.sliceCheckFront();
            }
            else{
              this.PutData();
            }
          },
        getChart(selectedStudentIDValue, selectedModeValue){
          // this.DocIDSize()
              onSnapshot(doc(firestoredb, "Students", selectedStudentIDValue, "TestHistory", selectedModeValue), (doc) => {
                // console.log(selectedStudentIDValue);
                // console.log(selectedModeValue);
                this.TimeDone = new Date(doc.data().DateDone.seconds*1000).toLocaleTimeString();
                this.DateDone = new Date(doc.data().DateDone.seconds*1000).toLocaleDateString('th-TH', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  // weekday: 'long',
                });
                this.Device = doc.data().Device;
                this.StudentID = doc.data().StudentID;
                this.DateDropdown =new Date(doc.data().DateDone.seconds*1000).toLocaleDateString();
                this.ChartData = doc.data().ChartData;
                this.Mode = doc.data().Mode;
                this.ModeSec = doc.data().ModeSec;
                // this.StudentID = doc.data().StudentID;
                this.Name = doc.data().Name;
                  // console.log(doc.id);
                  if(this.Mode=="คาบเบา"){
                    this.Modetext= "แรง 15 - 20 กิโลกรัม";
                  }
                  else if(this.Mode=="คาบกลาง"){
                    this.Modetext= "แรง 20 - 25 กิโลกรัม";
                  }
                  else if(this.Mode=="คาบหนัก"){
                    this.Modetext= "แรง 25 - 40 กิโลกรัม";
                  }
                this.sliceCheckBack();
                this.sliceCheckFront();
                // console.log(this.ChartData);
                for (let i = 0; i < this.ChartData.length; i++) {
                  this.ChartData[i].x = i ;
                  // console.log(this.ChartData[i].x);
                }
                // console.log(this.ChartData);

              });
        }
    },

    mounted(){
        if (localStorage.getItem('reloaded')) {
            // The page was just reloaded. Clear the value from local storage
            // so that it will reload the next time this page is visited.
            localStorage.removeItem('reloaded');
        } else {
            // Set a flag so that we know not to reload the page twice.
            localStorage.setItem('reloaded', '1');
            location.reload();
        }
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
        if(user){
          // const uid = user.uid;
          // console.log(uid)
          // console.log(user)
          this.displayNameUser = user.displayName;
          this.emailUser = user.email;
          this.photoURLUser = user.photoURL;
          // this.StudentID = (user.email).split("@")[0];
        }
        });
        this.getStudentID();
        // this.SelectModeArray.push({'Id': null, 'Name': "ประวัติการฝึก"});
        // console.log(this.selectedStudentIDValue);
        // this.getMode(this.selectedStudentIDValue);
    },
    beforeUpdated(){
        // this.getStudentID();
        // console.log(this.selectedStudentIDValue);
        // this.getMode(this.selectedStudentIDValue)

    },
    updated(){
        console.log(this.selectedStudentIDValue);
        this.getChart(this.selectedStudentIDValue, this.selectedModeValue);
          // console.log(this.selectedValue);
        this.$refs.chart.updateSeries([{
          data: data,
        }]);

    },
    watch: {
            selectedStudentIDValue: {
                handler(value) {
                    this.SelectModeArray=[];
                    const q = query(collection(firestoredb, "Students", value, "TestHistory"));
                    onSnapshot(q, (querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            this.SelectModeArray.push({'Id': doc.id, 'Name': "ครั้งที่ "+doc.id});
                        });
                    });
                },
                immediate: true // This ensures the watcher is triggered upon creation
            },
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
.navbar{
  background: #075f3d;
}
.sidebar {
  position: fixed;
  width: 15%;
  height: 100vh;
  background: #0fb475;
  color: #ffffff;
  font-size: 1.25em;
  flex-direction: column;
}
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
