<template>
<div class="header">
    <div class="sidebar">
      <div class="insidebar" style="margin: 60px">
        <tr>
        <h2 style="color: white">Welcome</h2>
        </tr>
        <tr>
        <router-link style="text-decoration: none; color: inherit;" to="/Home" replace>Select Mode</router-link>
        </tr>
        <tr>
        <router-link style="text-decoration: none; color: inherit;" to="/Dashboard" replace>Dashboard</router-link>
        </tr>
      </div>
    </div>
  <div>
      <b-navbar class="navbar" style="margin-left: 15%;" v-if="StatusPage==true">
        <b-navbar-nav>
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
    <h3 style="margin-top: 40px">จุดสัญญาณในการนวด</h3>
    <h3 style="color: #28A745; margin-bottom: 40px;">( คาบเบา )</h3>
    <div class="row">
      <div class="col-sm-6">
        <h4 style="margin-bottom: 10px">กดตรงจุดที่แสดงไว้ดังนี้</h4>
        
        <tr>
        <td><div class="cardB col" style="margin-left: 15%">
          <div class="card text-white bg-success mb-3" style="width: 150px">
            <div class="card-header">แรง</div>
            <div class="card-body">
              <h2 class="card-title">15-20</h2>
              <p class="card-text">กิโลกรัม</p>
            </div>
          </div>
          </div>
        </td>
        <td><div class="cardB col" style="margin-left: 15%">
          <div class="card text-white bg-success mb-3" style="width: 150px">
            <div class="card-header">เวลา</div>
            <div class="card-body">
              <h2 class="card-title">60-75</h2>
              <p class="card-text">วินาที</p>
            </div>
          </div>
          </div>
        </td>
        </tr>
        <h4 style="margin-bottom: 20px">และสังเกตกราฟด้านขวามือ</h4>
        <img :src="image" width="200" height="250"/>
      </div>
      <div class="col-sm-6">
        <!-- <div style="margin-bottom: 60px margin-left: 150px">
          <tr>
            <td>
              <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:90%">
                <h2 style="margin-right: 150px">{{ timerCount }} / 10 sec</h2>
              </div>
              <div style="margin-left: 400px">
              <h3>{{ timerCountDone }} / 10 วินาที</h3>
              </div>
            </td>
          </tr>
        </div> -->
        <!-- <progress-bar>Creating User...</progress-bar> -->
        <div>
          <div class="row mb-1">
            <div class="col-sm-3">กดไปแล้ว:</div>
            <div class="col-sm-6" >
              <b-progress-bar :value="timerCountDone" variant="info" :max="60" show-value animated style="background-color: #ededed; border-radius: 20px;"></b-progress-bar>
            </div>
            <div class="col-sm-3 pt-1">
              <h5>/60 วินาที</h5>
            </div>
          </div>
        <!-- <k-progress 
          active 
          status="error" 
          type="line"
          :border= "false"
          :line-height= "30"
          :color-flow= "true"
          :flow-second= "2"
          :color=" ['#40a9ff', '#5cdbd3']"
          :percent= "timerCountDone*10"
          :show-text= "false" >
        </k-progress>
        <h5>{{ timerCountDone }} / 10 วินาที</h5> -->

        </div>
        
        <b-alert v-if="ForcePush<15" variant="danger" show><h5>คุณออกแรงน้อยเกินไป โปรดออกแรงกดเพิ่มขึ้น !!</h5></b-alert>
        <!-- <b-alert v-if="timerCountDone>0" variant="success" show>คุณออกแรงได้ดีแล้ว รักษาแรงกดไว้</b-alert> -->
        <b-alert v-if="ForcePush>=15 && ForcePush<=20" variant="success" show><h5>คุณออกแรงได้ดีแล้ว รักษาแรงกดไว้</h5></b-alert>
        <b-alert v-if="ForcePush>20" variant="danger" show><h5>คุณออกแรงมากเกินไป ลองผ่อนแรงอีกนิดนึง !!</h5></b-alert>
        <!-- <b-alert v-if="ForcePush==0" variant="info" show>เริ่มกดได้เลย !!</b-alert> -->
    <div id="chart">
      <apexchart
        type="line"
        width="600"
        height="450"
        ref="chart"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
    <!-- <div v-if="FinishPush==true" id="chartTwo">
      <apexchart
        type="line"
        width="800"
        height="400"
        ref="chart"
        :options="chartOptionsTwo"
        :series="series"
      ></apexchart>
    </div> -->
    <!-- <div class="flex justify-center">
    <Button @mouseover="play" @mouseleave="stop" label="Trumpet"> 🎺 </Button>
    </div> -->

      </div>
    </div>
  </div>
</div>
</template>

<script>
import image from "../assets/Body.gif"
import VueApexCharts from "vue-apexcharts";
// import {HTTP} from "../axios.js";

import axios from 'axios';

import {firestoredb} from '../config';
import {collection, getDocs, doc, setDoc, serverTimestamp } from "firebase/firestore"; 
import 'firebase/compat/database'
// import {ref, onValue } from "firebase/database";
import Swal from 'sweetalert2'
import {useSound} from '@vueuse/sound'
import winSound from '../assets/cheerful.mp3'
import oneSec from '../assets/OneSec.mp3'
import start from '../assets/Start.mp3'

import { onAuthStateChanged, getAuth} from "firebase/auth";
var data = [];
let XAXISRANGE = 25;

export default {
  name: "LightThreePractice",
  components: {
    // LineChart,
    // Line,
    apexchart: VueApexCharts,
  },
  setup() {
    const { play, stop } = useSound(winSound)
    const win = useSound(winSound)
    const OneSec = useSound(oneSec)
    const StartSound = useSound(start)

    return {
      play,
      stop,
      win,
      OneSec,
      StartSound,
    }
  },
  data() {
    return {
        StudentID: null,
        size: 0,
        displayNameUser: null,
        emailUser: null,
        uidUser: null,
        photoURLUser: null,
        timerCountDone: 0,
        // DataMagellan: 0,
        timerCount: 0,
        // TextAlert: "โปรดออกแรงกดเพิ่มขึ้น",
        TimeSec:[],
        ForcData:[],
        ForcePush: 0,
        image: image,
        FinishPush: false,
        StatusPage: true,
      series: [
        {
          data: data.slice(),
        },
      ],
      chartOptions: {
        chart: {
          id: "realtime",
          height: 450,
          type: "line",
          animations: {
            enabled: true,
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
        annotations: {
          xaxis: [{
          range: XAXISRANGE,
          }],
          yaxis: [{
            // max: 100,
            y: 15,
            y2: 20,
            borderColor: '#000',
            fillColor: '#00D12C',
            opacity: 0.2,
            label: {
              text: 'Good',
              style: {
                fontSize: '10px',
                color: '#333',
                background: '#00D12C',
              },
            }
          }],
        },
        dataLabels: {
          enabled: true,
          
        },
        stroke: {
          curve: "smooth",
          width: 5,
        },
        // title: {
        //   text: "Force Chart",
        //   align: "left",
        // },
        markers: {
          size: 0,
        },
        xaxis: {
          range: XAXISRANGE,
          labels:{
            show: false,
          }
        },
        yaxis: {
          max: 40,
          title: {
            text: 'กิโลกรัม'
          },
        },
        legend: {
          show: false,
        },
      },
      
    };
  },
  mounted: function () {
    console.log(firestoredb);
    console.log(serverTimestamp());
    // this.fillData()

        // if(this.FinishPush==true){
        //   // this.$refs.chartTwo.updateSeries([
        //   //   {
        //   //     data: data,
        //   //   },
        //   //   ]);
        //   // this.fillData();
        // }
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
        if(user){
          const uid = user.uid;
          console.log(uid)
          this.displayNameUser = user.displayName;
          this.emailUser = user.email;
          this.StudentID = (user.email).split("@")[0];
          this.photoURLUser = user.photoURL;
        }
        });

      this.DocIDSize()
      
      // this.getNewSeries();
      this.alertStart();
      // this.getDataMag();
    window.setInterval(() => {
      // this.getNewSeries();
      this.getDataMag();

      this.$refs.chart.updateSeries([{
          data: data,
        }]);
        
    }, 1000);
  },
  updated(){

      // this.$refs.chart.updateSeries([
      //   {
      //     data: data,
      //   },
      // ]);
  },
  methods: {
      DocIDSize(){
        getDocs(collection(firestoredb, "History")).then(snap => {
          this.size = snap.size // will return the collection size
          console.log(this.size);
          // this.size+1;
        });
      },
      fillData () {
       try {
          const docRef = setDoc(doc(firestoredb, "History", ((this.size)+1).toString()), {
            ForcData: this.ForcData,
            TimeSec: this.TimeSec,
            ChartData: data,
            Name: this.displayNameUser,
            StudentID: this.StudentID,
            Mode: "โหมดฝึกฝนการกดด้วยแรง 15-20 กิโลกรัม เป็นเวลา 60-75 วินาที",
            DateDone: serverTimestamp(),
          });
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      },
      alertStart(){
        Swal.fire({
          title: "กดด้วยแรง 15-20 กิโลกรัม เป็นเวลา 60-75 วินาที",
          text: "จะเริ่มใน...",
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then(r => {
          this.StartSound.play(r);
          // this.fillData()
        });
      },
      getDataMag(){
        axios.get('https://magellan.ais.co.th/pullmessageapis/api/listen/thing/57F86C983041DCBEFD8838A2E1F5A106').then(response => {
          setTimeout(() => {
          this.ForcePush = Math.floor(response.data.Sensor.force);
          },100);
        });
        this.ForcData.push(this.ForcePush);
        console.log(this.ForcData);
        data.push({
            x: this.timerCount,
            y: this.ForcePush,
        });
        if(this.ForcData[this.ForcData.length-1]>=15 && this.ForcData[this.ForcData.length-1]<=20){
            this.timerCountDone++;
          }
          else{
            this.timerCountDone=0;
          }
        },
    //---
    // getNewSeries() {
    //   const dbRef = ref(db, 'Sensor');
    //   // setTimeout(() => {
    //     onValue(dbRef, (snapshot) => {
    //     // setTimeout(() => {
    //       this.ForcePush = Math.round(snapshot.val().Data);
    //       this.StatusPush = snapshot.val().Status;
    //     });

    //     this.ForcData.push(this.ForcePush);
    //     console.log(this.ForcData);
    //     data.push({
    //         x: this.timerCount+" sec",
    //         y: this.ForcePush,
    //       });
    //       if(this.ForcData[this.ForcData.length-1]>=15 && this.ForcData[this.ForcData.length-1]<=20){
    //         // if(data[this.ForcePush<60 && this.ForcePush>=50]){

    //         // setTimeout(() => {
    //         this.timerCountDone++;
    //         // },1000);
    //       }
    //       else{
    //         this.timerCountDone=0;
    //       }

    //     // },1000);
    // },

  },
    watch: {
            timerCount: {
                handler(value) {
                    if (value >= 0) {
                        setTimeout(() => {
                          // this.TimeSec.push(this.timerCount);   
                            this.timerCount++;
                            // console.log(this.TimeSec[this.TimeSec.length-1]);
                            this.TimeSec.push(this.timerCount);   
                        }, 1000);
                    }
                    // else if (value == 5){
                    //     this.$fire({
                    //         title: "จะเริ่มใน...",
                    //         text: "",
                    //         timer: 3000,
                    //         timerProgressBar: true,
                    //         showConfirmButton: false,
                    //       })
                    // }

                },
                immediate: true // This ensures the watcher is triggered upon creation
            },
            timerCountDone:{
                handler(value) {
                      // if (value >= 10 && value <=15) {
                        // if (value > 0 ) {
                          if (value == 60) {
                            this.OneSec.play();
                              // setTimeout(() => {
                              Swal.fire({
                                title: "สำเร็จ!!",
                                text: "คุณกดด้วยแรง 15-20 กิโลกรัม เป็นเวลา 60-75 วินาที สำเร็จ!!",
                                type: "success",
                                // timer: 5000
                              }).then(r => {
                              console.log(r.value);
                              this.FinishPush=true;
                              this.fillData();
                              this.$router.push("/Home")
                              });
                              this.win.play();
                          }
                          else if(value==58){
                              this.OneSec.play();
                          }
                          else if(value==59){
                              this.OneSec.play();
                          }
                        // }

                  },
                  immediate: true // This ensures the watcher is triggered upon creation
            },
            // ForcePush:{
            //     handler(value) {
            //             // if (value[value.length-1]>0){
            //               if (value >= 15 && value <= 20){
            //                 this.ForcData.push(this.ForcePush);
            //                 this.TimeSec.push(this.timerCount); 
            //                 console.log(this.ForcData);
            //                 if(this.FinishPush == true){
            //                     this.fillData();
            //                 }
            //               }

            //               else if(value > 15 && value > 20) {
            //                 this.FinishPush == false;
            //                 this.ForcData==[];
            //                 this.TimeSec==[];
            //                 console.log(this.ForcData);
            //               }
            //             // }

            //       },
            //       immediate: true // This ensures the watcher is triggered upon creation
            // }
    },
};
</script>  

<style scoped>
h1 {
  font-weight: normal;
  text-align: left;
  /* color: white; */
}
h2 {
  font-weight: bold;
  color: white;
}
h3 {
  font-weight: bold;
}
/* header {
  padding: 60px;
  text-align: center;
  background: #1abc9c;
  color: rgb(17, 4, 77);
  font-size: 30px;
} */
/* footer {
  text-align: center;
  padding: 5px;
  background-color: #777777;
  color: white;
} */
/* .sidebar {
  position: fixed;
  width: 15%;
  height: 100vh;
  background: #000000;
  color: white;
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
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    /* margin-top: 10px; */
    margin-left: 5%;
  }
  tr{
    justify-content: center;
  }
  .column {
  float: left;
  width: 50%;
  padding: 10px;
  height: 300px;
}

/* Clear floats after the columns */
.row:after {
  /* content: ""; */
  display: table;
  clear: both;
}
.cardB{
  padding: 10px 30px 5px 30px;
  /* margin: 20px; */
}
</style>