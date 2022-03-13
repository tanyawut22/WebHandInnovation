<template>
<div class="header">
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
    <h3 style="margin-top: 40px">โหมดทดสอบจุดสัญญาณในการนวด</h3>
    <!-- <h3 style="color: #28A745; margin-bottom: 40px;">( คาบเบา )</h3> -->
    <h4>กดด้วยแรง 15-20 กิโลกรัม เป็นเวลา 30-45 วินาที</h4>
    <h5 style="margin-bottom: 40px; color: #BD0000; font-weight: normal;" >ระบบจะบันทึกเมื่อคุณปล่อยมือ</h5>
    <div class="row">
      <div class="col-sm-12">
    <div id="chart">
      <apexchart
        type="line"
        width="900"
        height="450"
        ref="chart"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
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
import {collection, getDocs, doc, setDoc, serverTimestamp, onSnapshot } from "firebase/firestore"; 
import 'firebase/compat/database'
// import {ref, onValue } from "firebase/database";
import Swal from 'sweetalert2'
// import {useSound} from '@vueuse/sound'
// import winSound from '../assets/cheerful.mp3'
// import oneSec from '../assets/OneSec.mp3'
// import start from '../assets/Start.mp3'

import { onAuthStateChanged, getAuth} from "firebase/auth";
var data = [];
let XAXISRANGE = 50;

export default {
  name: "LightTwoTest",
  components: {
    // LineChart,
    // Line,
    apexchart: VueApexCharts,
  },
//   setup() {
//     const { play, stop } = useSound(winSound)
//     const win = useSound(winSound)
//     const OneSec = useSound(oneSec)
//     const StartSound = useSound(start)

//     return {
//       play,
//       stop,
//       win,
//       OneSec,
//       StartSound,
//     }
//   },
  data() {
    return {
        DeviceAPI: null,
        Device: null,
        NumI: 0,
        PushStatus: false,
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
        FinishPush: true,
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
        //   yaxis: [{
        //     // max: 100,
        //     y: 15,
        //     y2: 20,
        //     borderColor: '#000',
        //     fillColor: '#00D12C',
        //     opacity: 0.2,
        //     label: {
        //       text: 'Good',
        //       style: {
        //         fontSize: '10px',
        //         color: '#333',
        //         background: '#00D12C',
        //       },
        //     }
        //   }],
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
          max: 50,
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
          this.getDevice(this.StudentID);
          this.DocIDSize(user)
        }
        });

      // this.DocIDSize()
      
      // this.getNewSeries();
      this.alertStart();
      // this.getDataMag();
      window.setInterval(() => {
        this.getDataMag();
      // this.getNewSeries();
      // this.getDataMag();

      this.$refs.chart.updateSeries([{
          data: data,
      }]);
        
      }, 1000);
    
  },
  updated(){
 
  },
  methods: {

      DocIDSize(user){
        getDocs(collection(firestoredb,"Students",user.email.split("@")[0], "TestHistory")).then(snap => {
          this.size = snap.size // will return the collection size
          console.log("Size is " +this.size);
          // this.size+1;
        });
      },
      getDevice(StudentID){
        onSnapshot(doc(firestoredb, "Students", StudentID), (doc) => {
                this.DeviceAPI = doc.data().DeviceAPI;
                console.log(this.Device);
              });
      },
 
      fillData () {
        if(this.Device=="https://magellan.ais.co.th/pullmessageapis/api/listen/thing/57F86C983041DCBEFD8838A2E1F5A106"){
            this.Device = "M-FiP No.01";
          }
        else if(this.Device=="https://magellan.ais.co.th/pullmessageapis/api/listen/thing/B2FA25E81912FE3465EB0CFE69CE826E"){
          this.Device = "M-FiP No.02";
        }
       try {
          const docRef = setDoc(doc(firestoredb,  "Students", this.StudentID.toString(),"TestHistory", ((this.size)+1).toString()), {
            ChartData: data,
            Name: this.displayNameUser,
            StudentID: this.StudentID,
            Device: this.Device,
            Mode: "คาบเบา",
            ModeSec: "30-45",
            DateDone: serverTimestamp(),
          });
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      },
      alertStart(){
        Swal.fire({
          title: "กดด้วยแรง 15-20 กิโลกรัม เป็นเวลา 30-45 วินาที",
          text: "จะเริ่มใน...",
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
        })
      },
      getDataMag(){
        axios.get(this.DeviceAPI).then(response => {
          // setTimeout(() => {
          this.ForcePush = Math.floor(response.data.Sensor.force);
            if(this.ForcePush>0){
              this.PushStatus=true;
              console.log(this.PushStatus);
            }
            
          // },100);
          // this.FinishPushForce();
        });
        this.ForcData.push(this.ForcePush);
        // console.log(this.ForcData);
        data.push({
            x: this.timerCount,
            y: this.ForcePush,
        });
        },

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

                },
                immediate: true // This ensures the watcher is triggered upon creation
            },
            ForcePush:{
              handler(value) {
                    if (value==0 && this.PushStatus==true) {
                          Swal.fire({
                              title: "บันทึก!!",
                              text: "ระบบบันทึกการกดของคุณแล้ว!!",
                              // type: "success",
                              // timer: 5000
                              }).then(r => {
                              console.log(r.value);
                              this.fillData()
                              this.$router.push("/Home")
                          });
                          // this.PushStatus==false;
                      }                    
              },
              immediate: true
            }

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