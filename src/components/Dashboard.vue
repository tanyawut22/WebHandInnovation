<template>
  <div class="Bg">
    <div class="sidebar noPrint">
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
        <h2>Dashboard</h2>
  </b-navbar> -->
  <div class="noPrint">
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
          <!-- <b-dropdown id="dropdown-dropright" dropright variant="primary" text="Round" class="m-2 dropDownLeft" >
              <b-dropdown-item>1</b-dropdown-item>
              <b-dropdown-item>2</b-dropdown-item>
              <b-dropdown-item>3</b-dropdown-item>
          </b-dropdown> -->
          <select v-model="selectedValue">
            <option v-for="fruit in fruitArray" v-bind:key="fruit.Id" v-bind:value="fruit.Id">{{ fruit.Name }}</option>
          </select>
          <b-button class="printbtn" variant="light" size="sm" onclick="window.print()">พิมใบผลการทดสอบ</b-button>
        </b-navbar-nav>
      </b-navbar>
  </div>
  <div class="container">
    <div class="row justify-content-md-center" style=" text-align: center;">
      <div class="col">
        <img :src="imageLogo" width="350" height="100"/>
        <br/>
        <!-- <h3 style="margin-top: 20px;">ผลการทดสอบการปรุงแต่งรสมือ</h3> -->
      <!-- </div>
      <div class="col-md-auto" style="margin-top: 20px;"> -->
        <h1 style="margin-top: 20px; text-align: center;">SKILL CERTIFICATE</h1>
        <h6 style="margin-top: 10px;">การทดสอบการปรุงแต่งรสมือ ( {{Mode}} )</h6>
        <h2 style="margin-top: 30px; color: rgb(36, 36, 36);">คุณ {{Name}} </h2>
        <h6 style="margin-left: 10px; margin-bottom: 20px;">( รหัสนักศึกษา {{StudentID}} )</h6>
        
      </div>
    </div>
    <!-- <h4>กราฟแสดงค่าเฉลี่ยแรงกดในแต่ละครั้ง</h4> -->
    <div id="chart" style="margin-bottom: 20px;">
      <apexchart
        type="line"
        width="900"
        height="250"
        ref="chart"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
    <!-- <div style="margin-bottom: 100px; text-align: center;"> -->
    <div style="text-align: center;">
    <a>ผลการทดสอบการปรุงแต่งรสมือ ( {{Mode}} )</a>
    <br>
    <a>{{Modetext}} เป็นเวลา {{ModeSec}} วินาที</a>
    <br>
    <a>ณ วันที่ {{DateDone}} เวลา {{TimeDone}} น.</a>
    <!-- <h5>ของคุณ {{Name}} รหัสนักศึกษา {{StudentID}}</h5> -->
    <!-- <p>Name: {{displayNameUser}}</p>
    <p>StudentID: {{StudentID}}</p>
    <p>Date: {{DateDone}}</p>
    <p>Mode: {{Mode}}</p> -->
    </div>

    <!-- <p>{{ChartData}}</p>
    <p>{{ForcData}}</p>
    <p>{{TimeSec}}</p> -->
    </div>
    <!-- <footer>
    <p>© 2021 Lorem ipsum</p>
    </footer> -->
</div>
</template>

<script>
import imageLogo from "../assets/LogoCertificate.png"
import {onAuthStateChanged, getAuth} from "firebase/auth";
import VueApexCharts from "vue-apexcharts";
import {firestoredb} from '../config';
import { collection, query, doc, onSnapshot} from "firebase/firestore"; 
var data = [];
// let XAXISRANGE = 30;
export default {
    name:'Dashboard',
    components: {
      apexchart: VueApexCharts,
  },
  data() {
         return{
           /* eslint-disable no-mixed-spaces-and-tabs */
          DateDropdown: null,
          ModeSec: null,
          Modetext: "",
          selectedValue: "",
				  fruitArray: [],
          AllDocID: [],
          size: null,
          TimeDone: null,
          imageLogo: imageLogo,
          Name: null,
          StudentID: null,
          Mode: null,
          ChartData: null,
          ForcData: null,
          TimeSec: null,
          DateDone: null,
          displayNameUser: null,
          emailUser: null,
          uidUser: null,
          photoURLUser: null,
          /* eslint-enable no-mixed-spaces-and-tabs */
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
            // annotations: {
            //   xaxis: [{
            //   range: XAXISRANGE,
            //   }],
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
            // },
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
              // categories: [1,2,3,4,5],
              // range: XAXISRANGE,
              labels:{
                show: true,
              },
              title: {
                text: 'วินาที'
              },
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
          
         } 
        },
        // created(){
        //   // this.getChart();
        //   // this.$refs.chart.updateSeries([{
        //   //     data: data,
        //   // }]);
        // },
        updated(){
          
          this.$refs.chart.updateSeries([{
              data: data,
            }]);

        },
        mounted() {
        this.fruitArray.push({'Id': '', 'Name': 'เลือกรอบ'});
				// this.fruitArray.push({'Id': '1', 'Name': 'Apple'});
				// this.fruitArray.push({'Id': '2', 'Name': 'Banana'});
				// this.fruitArray.push({'Id': '3', 'Name': 'Mango'});
				// this.fruitArray.push({'Id': '4', 'Name': 'Orange'});
				// this.fruitArray.push({'Id': '5', 'Name': 'Watermelon'});
        // console.log(this.fruitArray);
				// this.selectedValue = "0"
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
          this.getChart();
          this.getAllDoc()
          // this.sliceCheck();
          // console.log(data);

            // this.getChart();
            // this.$refs.chart.updateSeries([{
            //   data: data,
            // }]);

        },
        methods: {
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
                // console.log(this.ChartData);
                this.PutData();
                this.sliceCheckFront();
            }
            else{
              this.PutData();
            }
          },
          // DocIDSize(){
          //   getDocs(collection(firestoredb, "History")).then(snap => {
          //     this.size = snap.size // will return the collection size
          //     // console.log(this.size);
          //     this.size=this.size.toString()
          //     console.log(this.size);
          //   });
          // },
          getAllDoc() {
              // const querySnapshot = getDocs(collection(firestoredb, "History"));
              // querySnapshot.forEach((doc) => {
              //   // doc.data() is never undefined for query doc snapshots
              //   console.log(doc.id, " => ", doc.data());
              // });
              // this.DocIDSize();
              // onSnapshot(doc(firestoredb, "History", (this.size)), (doc) => {
              //     console.log("Current data: ", doc.data());
              // });
              const q = query(collection(firestoredb, "History"));
              onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    this.AllDocID.push(doc.id);
                    this.fruitArray.push({'Id': doc.id, 'Name': "ครั้งที่ "+doc.id.toString()+" "+new Date(doc.data().DateDone.seconds*1000).toLocaleDateString()});
                });
                console.log("All doc ID", this.AllDocID.join(", "));
              });


          },
        // getAllDoc(){
        //     onSnapshot(collection(firestoredb,'History'), (doc) => {
        //       console.log(doc.id);
        //     });
        //     // const HistoryRef = firestoredb.collection('History');
        //     console.log(collection(firestoredb,'History'));
        //     // const snapshot = HistoryRef.get();
        //     // snapshot.forEach(doc => {
        //     //   console.log(doc.id, '=>', doc.data());
        //     // });
        // },
        getChart(){
          // this.DocIDSize()
              onSnapshot(doc(firestoredb, "History", "5"), (doc) => {
                this.TimeDone = new Date(doc.data().DateDone.seconds*1000).toLocaleTimeString();
                this.DateDone = new Date(doc.data().DateDone.seconds*1000).toLocaleDateString('th-TH', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  // weekday: 'long',
                });
                this.DateDropdown =new Date(doc.data().DateDone.seconds*1000).toLocaleDateString();
                this.ChartData = doc.data().ChartData;
                this.Mode = doc.data().Mode;
                this.ModeSec = doc.data().ModeSec;
                this.ForcData = doc.data().ForcData;
                this.TimeSec = doc.data().TimeSec;
                this.StudentID = doc.data().StudentID;
                this.Name = doc.data().Name;
                  console.log(doc.id);
                  if(this.Mode=="คาบเบา"){
                    this.Modetext= "ดวยแรง 15 - 20 กิโลกรัม";
                  }
                  else if(this.Mode=="คาบกลาง"){
                    this.Modetext= "ดวยแรง 20 - 25 กิโลกรัม";
                  }
                  else if(this.Mode=="คาบหนัก"){
                    this.Modetext= "ดวยแรง 25 - 40 กิโลกรัม";
                  }
                  // console.log(this.ChartData);
                  // console.log(this.ForcData);
                  // console.log(this.TimeSec);
                // data = this.ChartData;
                // console.log(this.emailUser.split("@")[0]);
                // data = ({
                //     x: this.TimeSec,
                //     y: this.ForcData,
                // });
                // console.log(this.ChartData);
                // console.log(this.ChartData[0].y);
                // console.log([this.ChartData.length].x);
                // console.log(this.ChartData.slice(1));
                this.sliceCheckBack();
                this.sliceCheckFront();
                
              });
        }

        }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  /* font-weight: normal; */
  text-align: left;
  color: rgb(36, 36, 36);
  /* color: white; */
}
h5 {
  font-weight: normal;
  color: rgb(36, 36, 36);
  /* color: white; */
}
h2 {
  font-weight: bold;
  color: rgb(255, 255, 255);
}
/* header {
  padding: 60px;
  text-align: center;
  background: #1abc9c;
  color: rgb(17, 4, 77);
  font-size: 30px;
}
footer {
  text-align: center;
  padding: 3px;
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
    /* background: #a9ffdb; */
    padding: 30px;
    height: 100%;
  }
  .dropDownLeft {
    display: flex;
    align-items: Left;
    justify-content: Left;
  }
  .Bg{
    /* display: flex; */
    background: #e9fff6;
  }
  @media print {
  .noPrint{
    display:none;
  }
  .printbtn{
  width: 100px;
  padding: 10px;
  height: 20px;
  }
}
</style>
