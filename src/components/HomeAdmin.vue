<template>
  <div>
    <div class="sidebar">
      <div class="insidebar" style="margin: 60px">
        <tr>
        <h2 style="color: white">Welcome</h2>
        </tr>
        <!-- <tr>
            <router-link style="text-decoration: none; color: inherit;" to="/Home" replace>Select Mode</router-link>
        </tr> -->
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
          <!-- <select v-model="selectedStudentIDValue" style="width: 350px">
            <option v-for="SelectID in SelectStudentIDArray" v-bind:key="SelectID.Id" v-bind:value="SelectID.Id">{{SelectID.Name}}</option>
          </select>
          <h5>การฝึก</h5>
          <select v-model="selectedModeValue" style="width: 80px">
            <option v-for="SelectMode in SelectModeArray" v-bind:key="SelectMode.Id" v-bind:value="SelectMode.Id">{{SelectMode.Name}}</option>
          </select> -->
        </b-navbar-nav>
      </b-navbar>
    </div>
    <div class="container">
      <!-- <BIconArrow90degDown /> -->
      <h1 style="text-align: center;">ภาพรวมระบบ</h1>
      <div class="row">
        <div class="col-sm-5">
        <b-card bg-variant="primary" text-variant="white" class="text-center" style="width: 300px; height: 80px">
          <h6>ผู้ใช้งานในระบบทั้งหมด</h6><h4>{{sizeUser}} คน</h4>
          <i class="bi bi-person-fill"></i>
        </b-card>
        </div>
        <div class="col-sm-2">

        </div>
        <div class="col-sm-5">
        <b-card bg-variant="info" text-variant="white" class="text-center" style="width: 300px; height: 80px">
          <h6>จำนวนอุปกรณ์ทั้งหมด</h6><h4> {{sizeDevice}} เครื่อง</h4>
        </b-card>
        </div>
      </div>
      <div style="margin-top: 80px;">
        <!-- <div class="row mb-1">
          <div class="col-10 CenterButton"> -->
            <apexchart type="bar" height="350" width="700" ref="chart" :options="chartOptions" :series="series"></apexchart>
          <!-- </div>
          <div class="col-2 CenterButton">  
            <apexchart type="pie" height="150" width="150" ref="chartPie" :options="chartOptions3" :series="series3"></apexchart>
          </div>
        </div> -->
        <br>
        <h6>จำนวนครั้งทั้งหมดในโหมดฝึก {{sizePractice}} ครั้ง </h6>
        <h6>จำนวนครั้งทั้งหมดในโหมดทดสอบ {{sizeTest}} ครั้ง</h6>
      </div>
      <!-- <h3 style="text-align: center;">ของ {{Name}}</h3> -->
      <!-- <div id="chart" style="margin-bottom: 20px;">
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
          <a><strong>ชื่อ: </strong>{{Name}}</a>
        <br>
          <a><strong>รหัสนักศึกษา: </strong>{{StudentID}}</a>
        <br>
          <a><strong>โหมดการฝึก: </strong>{{Modetext}} ( {{Mode}} ) เป็นเวลา {{ModeSec}} วินาที</a>
        <br>
          <a><strong>ด้วยอุปกรณ์: </strong>{{Device}}</a>
        <br>
          <a><strong>วันที่: </strong>{{DateDone}} เวลา {{TimeDone}} น.</a>
      </div> -->

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
import { collection, getDocs} from "firebase/firestore";
var data1 = [];
var data2 = [];
export default {
    name:'HomeAdmin',
    components: {
      apexchart: VueApexCharts,
    },
    data(){
      return{
        Device: null,
        sizeTest: null,
        sizePractice: null,
        sizeArray1: [],
        sizeArray2: [],
        sizeUser: null,
        sizeDevice: null,
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
        // series3: [1],
        //   chartOptions3: {
        //     chart: {
        //       type: 'pie',
        //       width: 40,
        //       height: 40,
        //       sparkline: {
        //         enabled: true
        //       }
        //     },
        //     stroke: {
        //       width: 1
        //     },
        //     tooltip: {
        //       fixed: {
        //         enabled: false
        //       },
        //     }
        //   },
        series: [
          {
            name: 'Practice Mode',
            data: []
          }, 
          {
            name: 'Test Mode',
            data: []
          }],
          chartOptions: {
            chart: {
              type: 'bar',
              height: 350
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '30%',
                endingShape: 'rounded'
              },
            },
            dataLabels: {
              enabled: true
            },
            stroke: {
              show: true,
              width: 2,
              colors: ['transparent']
            },
            xaxis: {
              categories: ['ค่าเฉลี่ยจำนวนครั้งต่อคน'],
            },
            yaxis: {
              title: {
                text: 'จำนวนที่ปฏิบัติ (ครั้ง)'
              }
            },
            fill: {
              opacity: 1
            },
            tooltip: {
              y: {
                formatter: function (val) {
                  return val + " ครั้ง"
                }
              }
            }
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
        DocIDSizeUser(){
          getDocs(collection(firestoredb,"Students")).then(snap => {
            this.sizeUser = snap.size // will return the collection size
            // console.log(this.sizeUser);
            // this.size+1;
          });
        },
        DocIDSizeDevice(){
          getDocs(collection(firestoredb,"Device")).then(snap => {
            this.sizeDevice = snap.size // will return the collection size
            // console.log(this.sizeDevice);
            // this.size+1;
          });
        },
        DocIDSize(){
          getDocs(collection(firestoredb,"Students")).then(snap => {
            // this.size = snap.size // will return the collection size
            const C = snap.docs;
            // console.log(C[1].id);
            for (let i=0; i<C.length;i++ ){
              console.log(C[i].id);
              getDocs(collection(firestoredb,"Students",C[i].id,"TestHistory")).then(snap => {
                this.sizeTest = this.sizeTest+snap.size // will return the collection size
                this.sizeArray1[0]=this.sizeTest;
                data2 = this.sizeArray1;
                this.UpdateChart();
              });
            }
            for (let i=0; i<C.length;i++ ){
              console.log(C[i].id);
              getDocs(collection(firestoredb,"Students",C[i].id,"PracticeHistory")).then(snap => {
                this.sizePractice = this.sizePractice+snap.size // will return the collection size
                this.sizeArray2[0]=this.sizePractice;
                data1 = this.sizeArray2;
                this.UpdateChart();
              });
            }
            
            // this.PutData(this.size);
            // getDocs(collection(firestoredb,"TestHistory")).then(snap => {
            // this.size = snap.size // will return the collection size
            // console.log(this.size);
            // // this.size+1;
            // });
            // this.size+1;
          });
          // const q = query(collection(firestoredb,"Students"), where("Name", "!=", null));
          // onSnapshot(q, (querySnapshot) => {
          //   const cities = [];
          //   querySnapshot.forEach((doc) => {
          //       cities.push(doc.id);
          //   });
          //   console.log("Current cities in CA: ", cities.join(", "));
          // });
        },
        PutData(size){
          console.log(size);
          console.log(this.size);
          // this.size = this.size/this.sizeUser
          this.sizeArray[0]=this.size;
          data2 = this.sizeArray;
        },
        UpdateChart(){
          this.$refs.chart.updateSeries([
            {
              data: data1,
            },
            {
              data: data2,
            }
          ]);
        },
        UpdateChartAverage(){
        // console.log(this.series3 = [this.sizePractice,this.sizeTest])
        // console.log(this.sizePractice);
        this.series.slice()
        this.sizeArray2[0]= this.sizePractice/this.sizeUser;
        this.sizeArray1[0]= this.sizeTest/this.sizeUser;
         data2 = this.sizeArray1;
         data1 = this.sizeArray2;
          this.$refs.chart.updateSeries([
            {
              data: data1,
            },
            {
              data: data2,
            }
          ]);
          
        },
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
      // console.log("Update "+this.series[1].data);
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
        if(user){
          // const uid = user.uid;
          // console.log(uid)
          this.displayNameUser = user.displayName;
          this.emailUser = user.email;
          this.photoURLUser = user.photoURL;
          this.DocIDSizeUser();
          this.DocIDSizeDevice();
          // this.DocIDSize();
          // this.StudentID = (user.email).split("@")[0];
        }
        });
        this.DocIDSize();
        // this.PutData(this.size);
        console.log(this.sizePractice);
        console.log(this.sizeTest);
        // this.UpdateChart();
        // this.SelectModeArray.push({'Id': null, 'Name': "ประวัติการฝึก"});
        // console.log(this.selectedStudentIDValue);
        // this.getMode(this.selectedStudentIDValue);
    },
    beforeUpdated(){
      this.series3.push(this.sizePractice)
      this.series3.push(this.sizeTest) 
        // this.getStudentID();
        // console.log(this.selectedStudentIDValue);
        // this.getMode(this.selectedStudentIDValue)

    },
    updated(){
        this.UpdateChartAverage();
        // if (this.series3.length == 1) {
        //   console.log("ok")
        //   this.series3=[this.sizePractice, this.sizeTest]
        //   console.log(this.sizePractice, this.sizeTest)
        // }
    },
    //  watch: {
    //         series3: {
    //             handler(value) {
    //                 if (value.length == 1) {
    //                   console.log("ok")
    //                   this.series3=[this.sizePractice, this.sizeTest]
    //                   console.log(this.sizePractice, this.sizeTest)
    //                 }
    //             },
    //             immediate: true // This ensures the watcher is triggered upon creation
    //         },
    // },
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
