<template>
  <div class="Bg">
    <div class="sidebar noPrint">
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
            <b-dropdown-group id="dropdown-group-1" header="ข้อมูลส่วนตัว">
              <b-dropdown-item href="#">{{displayNameUser}}</b-dropdown-item>
              <b-dropdown-item href="#">{{emailUser}}</b-dropdown-item>
            </b-dropdown-group>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-group id="dropdown-group-1" header="อุปกรณ์">
              <b-dropdown-item-button disabled>ท่านกำลังใช้งาน {{Device}}</b-dropdown-item-button>
              <!-- <b-dropdown-item v-for="SelectDe in SelectDeviceArray" v-bind:key="SelectDe.Id" v-bind:value="SelectDe.Id">{{SelectDe.Name}}</b-dropdown-item> -->
            </b-dropdown-group>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item-button v-on:click="signout">ออกจากระบบ</b-dropdown-item-button>
          </b-nav-item-dropdown>
          <!-- <b-dropdown id="dropdown-dropright" dropright variant="primary" text="Round" class="m-2 dropDownLeft" >
              <b-dropdown-item>1</b-dropdown-item>
              <b-dropdown-item>2</b-dropdown-item>
              <b-dropdown-item>3</b-dropdown-item>
          </b-dropdown> -->
          <select v-model="selectedValue" style="width: 200px">
            <option v-for="Select in SelectArray" v-bind:key="Select.Id" v-bind:value="Select.Id">{{ Select.Name }}</option>
          </select>
          <b-button class="printbtn" variant="light" size="sm" onclick="window.print()">พิมใบผลการทดสอบ</b-button>
        </b-navbar-nav>
      </b-navbar>
  </div>
  <div class="container">
    <div class="row justify-content-md-center" style=" text-align: center;">
      <div class="col" style="width: 1000px">
        <img :src="imageLogo" width="350" height="85"/>
        <br/>
        <!-- <h3 style="margin-top: 20px;">ผลการทดสอบการปรุงแต่งรสมือ</h3> -->
      <!-- </div>
      <div class="col-md-auto" style="margin-top: 20px;"> -->
        <h1 style="margin-top: 20px; text-align: center;">SKILL CERTIFICATE</h1>
        <h6 style="margin-top: 10px;">การทดสอบการแต่งรสมือ ( {{Mode}} )</h6>
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
    <a>ผลการทดสอบการแต่งรสมือ ( {{Mode}} )</a>
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
import Swal from 'sweetalert2'
import imageLogo from "../assets/LogoCertificate.png"
import {onAuthStateChanged, getAuth, signOut} from "firebase/auth";
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
          Device: null,
          DateDropdown: null,
          ModeSec: null,
          Modetext: "",
          selectedValue: "",
				  SelectArray: [],
          TestArray: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
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
              // categories: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
              // range: XAXISRANGE,TestArray
              // min: 0,
              // max: 20,
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
        // created(){
        //   // this.getChart();
        //   // this.$refs.chart.updateSeries([{
        //   //     data: data,
        //   // }]);
        // },
        beforeCreate() {
            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
              if (!user) {
                this.$router.replace("/")
                // alert("You don't have a permission")
              }
          });
        },
        updated(){
          this.getChart(this.selectedValue);
          // console.log(this.selectedValue);
          this.$refs.chart.updateSeries([{
              data: data,
            }]);

        },
        mounted() {
          if (localStorage.getItem('reloaded')) {
              // The page was just reloaded. Clear the value from local storage
              // so that it will reload the next time this page is visited.
              localStorage.removeItem('reloaded');
          } else {
              // Set a flag so that we know not to reload the page twice.
              localStorage.setItem('reloaded', '1');
              location.reload();
          }
				// this.selectedValue = "0"
          const auth = getAuth();
          onAuthStateChanged(auth, (user) => {
            if(user){
              const uid = user.uid;
              console.log(uid)
              this.displayNameUser = user.displayName;
              this.emailUser = user.email;
              this.photoURLUser = user.photoURL;
              this.StudentID = (user.email).split("@")[0];
              this.getAllDoc(user)
              this.getDeviceUser(this.StudentID);
            }
          });
          // this.getChart();
          // this.getAllDoc(user)
          // this.getChart(this.selectedValue);
          // this.selectedValue.toString()
          // console.log(this.selectedValue);
          // this.sliceCheck();
          // console.log(data);

            // this.getChart();
            // this.$refs.chart.updateSeries([{
            //   data: data,
            // }]);

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
          getDeviceUser(StudentID){
            onSnapshot(doc(firestoredb, "Students", StudentID), (doc) => {
                    this.DeviceAPI = doc.data().DeviceAPI;
                    this.Device = doc.data().DeviceNo;
                    console.log(this.Device);
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
                console.log(this.ChartData.length);
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
          getAllDoc(user) {
              const q = query(collection(firestoredb, "Students", user.email.split("@")[0],"PracticeHistory"));
              onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    this.AllDocID.push(doc.id);
                    this.StudentID = doc.data().StudentID;
                    this.SelectArray.push({'Id': doc.id, 'Name': "ครั้งที่ "+doc.id.toString()+" วันที่ "+new Date(doc.data().DateDone.seconds*1000).toLocaleDateString()});
                // console.log(this.SelectArray[this.SelectArray.length-1].Id)
                });
                console.log("All doc ID", this.AllDocID.join(", "));
                // console.log(this.SelectArray[1].Id)
                
              });
          },
        getChart(selectedValue){
          // this.DocIDSize()
              onSnapshot(doc(firestoredb, "Students", this.StudentID.toString(), "PracticeHistory", selectedValue), (doc) => {
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
                // this.StudentID = doc.data().StudentID;
                this.Name = doc.data().Name;
                  // console.log(doc.id);
                  if(this.Mode=="คาบเบา"){
                    this.Modetext= "ด้วยแรง 15 - 20 กิโลกรัม";
                  }
                  else if(this.Mode=="คาบกลาง"){
                    this.Modetext= "ด้วยแรง 20 - 25 กิโลกรัม";
                  }
                  else if(this.Mode=="คาบหนัก"){
                    this.Modetext= "ด้วยแรง 25 - 40 กิโลกรัม";
                  }
                  // console.log(data.length);
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
                // console.log(this.chartData);
                this.sliceCheckBack();
                this.sliceCheckFront();
                // console.log(this.ChartData);
                for (let i = 0; i < this.ChartData.length; i++) {
                  this.ChartData[i].x = i ;
                  // console.log(this.ChartData[i].x);
                }
                console.log(this.ChartData);

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
    background: #ffffff;
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
  .Bd{
    border-radius: 100px;
    border-width: 10;
    border-color:rgb(5, 66, 41)6;
  }
}
</style>
