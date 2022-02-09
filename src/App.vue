<template>
  <div id="app">
    <!-- <div class="sidebar">
      <div class="insidebar" style="margin: 60px">
        <tr>
        <h2 style="color: white">Welcome</h2>
        </tr>
        <tr>
        <router-link style="text-decoration: none; color: inherit;" to="/" replace>Select Mode</router-link>
        </tr>
        <tr>
        <router-link style="text-decoration: none; color: inherit;" to="/Dashboard">Dashboard</router-link>
        </tr>
      </div>
    </div> -->
    <router-view/>
    <!-- <Home/> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import Home from './components/Home.vue'
// import { getAuth } from "firebase/auth";

export default {
      name: 'App',
      components: {
        // HelloWorld
        // Home
      },
      // data(){
      // return{
      //   displayName: null,
      //   email: null,
      //   uid: null,
      //   // imageBack: imageBack,
      // }
      // },
      
      methods: {
        // getUser(){
        //   const auth = getAuth();
        //   const user = auth.currentUser;
        //   if (user !== null) {
        //     // The user object has basic properties such as display name, email, etc.
        //     this.displayName = user.displayName;
        //     this.email = user.email;
        //     // const photoURL = user.photoURL;
        //     // const emailVerified = user.emailVerified;

        //     // The user's ID, unique to the Firebase project. Do NOT use
        //     // this value to authenticate with your backend server, if
        //     // you have one. Use User.getToken() instead.
        //     this.uid = user.uid;
        //     console.log(this.uid);
        //   }
        // }
      },

      mounted(){
          // this.getUser();
        },
}
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  font-family: "prompt";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
.navbar{
  background: #271001;
}
.sidebar {
  position: fixed;
  width: 15%;
  height: 100vh;
  background: #4b1f01;
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

</style>
