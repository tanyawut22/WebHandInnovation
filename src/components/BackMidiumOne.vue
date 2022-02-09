<template>
<div class="header">
    <div class="sidebar">
      <div class="insidebar" style="margin: 60px">
        <tr>
        <h2 style="color: white">Welcome</h2>
        </tr>
        <tr>
        <router-link style="text-decoration: none; color: inherit;" to="/Home">Select Mode</router-link>
        </tr>
        <tr>
        <router-link style="text-decoration: none; color: inherit;" to="/Dashboard">Dashboard</router-link>
        </tr>
      </div>
    </div>
  <!-- <b-navbar toggleable="lg" type="dark" variant="dark">
        <h2>Lorem ipsum</h2>
  </b-navbar> -->
  <div>
      <b-navbar type="dark" variant="dark" style="margin-left: 15%;" v-if="StatusPage==true">
        <b-navbar-nav>
          <!-- <b-nav-item href="#">Home</b-nav-item> -->
          <!-- Navbar dropdowns -->
          <b-nav-item-dropdown text="User" right>
            <b-dropdown-item href="#">Account</b-dropdown-item>
            <b-dropdown-item href="#">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-navbar>
    </div>
  <div class="container">
    <h3 style="margin-top: 40px">จุดสัญญาณบริเวณหลังมือ</h3>
    <h3 style="color: #FFC107; margin-bottom: 40px;">( คาบกลาง )</h3>
    <div class="row">
      <div class="column col">
        <h4 style="margin-bottom: 10px">กดตรงจุดที่แสดงไว้ดังนี้</h4>
        
        <tr>
        <td><div class="cardB col" style="margin-left: 15%">
          <div class="card text-white bg-warning mb-3" style="width: 150px">
            <div class="card-header">แรง</div>
            <div class="card-body">
              <h2 class="card-title">20 - 25</h2>
              <p class="card-text">กิโลกรัม</p>
            </div>
          </div>
          </div>
        </td>
        <td><div class="cardB col" style="margin-left: 15%">
          <div class="card text-white bg-warning mb-3" style="width: 150px">
            <div class="card-header">เวลา</div>
            <div class="card-body">
              <h2 class="card-title">10</h2>
              <p class="card-text">วินาที</p>
            </div>
          </div>
          </div>
        </td>
        </tr>
        <h4 style="margin-bottom: 20px">และสังเกตกราฟด้านขวามือ</h4>
        <img :src="image" width="400" height="250"/>
      </div>
      <div class="column col">
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
              <b-progress-bar :value="timerCountDone" variant="info" :max="10" show-value animated style="background-color: #ededed; border-radius: 20px;"></b-progress-bar>
            </div>
            <div class="col-sm-3 pt-1">
              <h5>/10 วินาที</h5>
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
        
        <b-alert v-if="ForcePush<20" variant="danger" show>คุณออกแรงน้อยเกินไป โปรดออกแรงกดเพิ่มขึ้น !!</b-alert>
        <!-- <b-alert v-if="timerCountDone>0" variant="success" show>คุณออกแรงได้ดีแล้ว รักษาแรงกดไว้</b-alert> -->
        <b-alert v-if="ForcePush>=20 && ForcePush<=25" variant="success" show>คุณออกแรงได้ดีแล้ว รักษาแรงกดไว้</b-alert>
        <b-alert v-if="ForcePush>25" variant="danger" show>คุณออกแรงมากเกินไป ลองผ่อนแรงอีกนิดนึง !!</b-alert>
        <!-- <b-alert v-if="ForcePush==0" variant="info" show>เริ่มกดได้เลย !!</b-alert> -->
    <div id="chart">
      <apexchart
        type="line"
        width="500"
        height="400"
        ref="chart"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
    <!-- <div class="flex justify-center">
    <Button @mouseover="play" @mouseleave="stop" label="Trumpet"> 🎺 </Button>
    </div> -->

      </div>
    </div>
  </div>
</div>
</template>

<script>
import image from "../assets/back.gif"
import VueApexCharts from "vue-apexcharts";

import {db} from '../config';
import 'firebase/compat/database'
import { ref, onValue } from "firebase/database";
import {useSound} from '@vueuse/sound'
import winSound from '../assets/cheerful.mp3'
import oneSec from '../assets/OneSec.mp3'
var data = [];
let XAXISRANGE = 20;

export default {
  name: "BackMidiumOne",
  components: {
    apexchart: VueApexCharts,
  },
  setup() {
    const { play, stop } = useSound(winSound)
    const win = useSound(winSound)
    const OneSec = useSound(oneSec)

    return {
      play,
      stop,
      win,
      OneSec,
    }
  },
  data() {
    return {
        timerCountDone: 0,
        timerCount: 0,
        // TextAlert: "โปรดออกแรงกดเพิ่มขึ้น",
        TimeSec:[],
        ForcData:[],
        ForcePush: 0,
        image: image,
        StatusPush: null,
        StatusPage: true,
      series: [
        {
          data: data.slice(),
        },
      ],
      chartOptions: {
        chart: {
          id: "realtime",
          height: 150,
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
            y: 20,
            y2: 25,
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
          width: 3,
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
    // if(this.StatusPage==true){
      this.getNewSeries();
    window.setInterval(() => {
      this.getNewSeries();

      this.$refs.chart.updateSeries([
        {
          data: data,
        },
      ]);
    }, 1000);
  },
  updated(){
 
  },
  methods: {
    getNewSeries() {
      const dbRef = ref(db, 'Sensor');
      // setTimeout(() => {
        onValue(dbRef, (snapshot) => {
        // setTimeout(() => {
          this.ForcePush = Math.round(snapshot.val().Data);
          this.StatusPush = snapshot.val().Status;
        });

        this.ForcData.push(this.ForcePush);
        console.log(this.ForcData);
        data.push({
            x: this.timerCount+" sec",
            y: this.ForcePush,
          });
          if(this.ForcData[this.ForcData.length-1]>=20 && this.ForcData[this.ForcData.length-1]<=25){
            // if(data[this.ForcePush<60 && this.ForcePush>=50]){

            // setTimeout(() => {
            this.timerCountDone++;
            // },1000);
          }
          else{
            this.timerCountDone=0;
          }

        // },1000);
    },

  },
    watch: {
            timerCount: {
                handler(value) {
                    if (value >= 0) {
                        setTimeout(() => {
                          this.TimeSec.push(this.timerCount);   
                            this.timerCount++;
                            // console.log(this.TimeSec[this.TimeSec.length-1]);
                            // this.TimeSec.push(this.timerCount);   
                        }, 1000);
                    }

                },
                immediate: true // This ensures the watcher is triggered upon creation
            },
            timerCountDone:{
                handler(value) {
                      if (value == 10) {
                        this.OneSec.play();
                          // setTimeout(() => {
                            this.$fire({
                            title: "สำเร็จ!!",
                            text: "คุณกดด้วยแรง 20 - 25 กิโลกรัม เป็นเวลา 10 วินาที สำเร็จ!!",
                            type: "success",
                            // timer: 5000
                          }).then(r => {
                          console.log(r.value);
                          // this.win.play();
                          this.$router.push("/Home")
                          // this.StatusPage=false;

                          });
                          // this.StatusPage=false;
                          this.win.play();
                          console.log(this.StatusPage);
                          // <router-link to="/"></router-link>
                            //  alert("10 sec success")
                          // }, 1000);
                      }
                      else if(value==8){
                          this.OneSec.play();
                      }
                      else if(value==9){
                          this.OneSec.play();
                      }

                  },
                  immediate: true // This ensures the watcher is triggered upon creation
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
header {
  padding: 60px;
  text-align: center;
  background: #1abc9c;
  color: rgb(17, 4, 77);
  font-size: 30px;
}
footer {
  text-align: center;
  padding: 5px;
  background-color: #777777;
  color: white;
}
.sidebar {
  position: fixed;
  width: 15%;
  height: 100vh;
  background: #000000;
  color: white;
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