<template>
  <div class="vue-tempalte">
    <!-- <form @submit.prevent="loginWithEmail">
      <h1>Login</h1>
      <div class="title">
        <h3>Email</h3>
        <input v-model="email" type="text" class="input" placeholder="Email">
      </div>
      <div class="title">
         <h3>Password</h3>
         <input v-model="password" type="password" class="input" placeholder="Password">
      </div>
      <button type="submit" value="submit" class="btn">Login</button>
    </form> -->
    <div class="login-page">
      <transition name="fade">
         <div class="wallpaper-login"></div>
      </transition>
      <!-- <div class="wallpaper-register"></div> -->

      <div class="container">
         <div class="row">
            <div class="col-lg-5 col-md-6 col-sm-8 mx-auto">
               <div class="card login" >
                 <h3>Electronic Learning Kit for Hand-Pressing Massage Skill</h3>
                  <!-- <h5>Login</h5> -->
                  <br>
                  <form class="form-group" @submit.prevent="loginWithProvider">
                    <!-- <form class="form-group" @submit.prevent="loginWithEmail"> -->
                     <!-- <input v-model="email" type="email" class="form-control" placeholder="Email" required>
                     <input v-model="password" type="password" class="form-control" placeholder="Password" required>
                     <input type="submit" value="Login" class="btn btn-primary"> -->
                    
                     <div class="social-icons" style="margin: 20px">
                       <button type="submit" class="btn btn-dark btn-lg btn-block"><i class="fa fa-google"/> login with gmail</button>
                          <!-- <ul>
                              <li @click="loginWithProvider"><a href="#"><i class="fa fa-google"></i></a></li>
                              <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                              <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                          </ul> -->
                      </div>
                  </form>
               </div>

               <!-- <div v-else class="card register" v-bind:class="{ error: emptyFields }">
                  <h1>Sign Up</h1>
                  <form class="form-group">
                     <input v-model="emailReg" type="email" class="form-control" placeholder="Email" required>
                     <input v-model="passwordReg" type="password" class="form-control" placeholder="Password" required>
                     <input v-model="confirmReg" type="password" class="form-control" placeholder="Confirm Password" required>
                     <input type="submit" class="btn btn-primary" @click="doRegister">
                     <p>Already have an account? <a href="#" @click="registerActive = !registerActive, emptyFields = false">Sign in here</a>
                     </p>
                  </form>
               </div> -->
            </div>
         </div>

      </div>
   </div>

    <!-- <form @submit.prevent="loginWithEmail">
            <h3>Sign In</h3>

            <div class="form-group">
                <label>Email address</label>
                <input v-model="email" type="email" class="form-control form-control-lg" />
            </div>

            <div class="form-group">
                <label>Password</label>
                <input v-model="password" type="password" class="form-control form-control-lg" />
            </div>

            <button type="submit" value="submit" class="btn btn-dark btn-lg btn-block">Sign In</button>

            <p class="forgot-password text-right mt-2 mb-4">
                <router-link to="/forgot-password">Forgot password ?</router-link>
            </p>

            <div class="social-icons">
                <ul>
                    <li @click="loginWithProvider"><a href="#"><i class="fa fa-google"></i></a></li>
                    <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                    <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                </ul>
            </div>

        </form> -->

    <!-- <div>or Sign in with 3rd Party</div>
    <button id="google" @click="loginWithProvider" class="btn-pic">
      <img src="../assets/google-logo.png" alt width="100px" height="100px">
    </button> -->
  </div>
</template>
<script>
// import firebase from 'firebase/compat/app';
import {firestoredb} from '../config';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {doc, setDoc } from "firebase/firestore"; 
// import * as firebase from "firebase/compat/app";

// import '@/assets/css/main.css';


export default {
  name: "login",
  data: function() {
            return { email: "", password: "" };
        },
  
  methods: {

    /* eslint-disable */
      //  loginWithEmail() {
      //       // const provider = new GoogleAuthProvider();
      //       // const auth = getAuth();
      //       firebase
      //         .auth()
      //         .signInWithEmailAndPassword(this.email, this.password)
      //         .then(() => {
      //           alert('Successfully logged in');
      //           this.$router.push('/');
      //         })
      //         .catch(error => {
      //           alert(error.message);
      //         });
      //  },
    
       loginWithProvider() {
            // console.log(firebase);
            // var provider = new firebase.auth.GoogleAuthProvider();
            // firebase.auth().signInWithPopup(provider);
              const provider = new GoogleAuthProvider();
              const auth = getAuth();
              signInWithPopup(auth, provider)
                .then((result) => {
                  // This gives you a Google Access Token. You can use it to access the Google API.
                  // const credential = GoogleAuthProvider.credentialFromResult(result);
                  // const token = credential.accessToken;
                  // // The signed-in user info.
                  const user = result.user;
                  console.log(user.email);
                  if (((user.email).split("@")[1])=="lamduan.mfu.ac.th"){
                    console.log("lamduan-mail !!");
                    try {
                      const UserID = user.email.split("@")[0];
                      const docRef = setDoc(doc(firestoredb, "Students", UserID.toString()), {
                        Name: user.displayName,
                        StudentID: UserID,
                        Email: user.email,
                        // DeviceAPI: "https://magellan.ais.co.th/pullmessageapis/api/listen/thing/B2FA25E81912FE3465EB0CFE69CE826E",
                        // DeviceNo: "M-FiP No.02",
                      });
                      console.log("Document written with ID: ", docRef.id);
                    } catch (e) {
                      console.error("Error adding document: ", e);
                    }
                    this.$router.replace("/Home");
                  }
                  else if(((user.email).split("@")[0])=="tanyawut.mlii"){
                    console.log("Admin");
                    this.$router.replace("/HomeAdmin");

                  }
                  else{
                    alert("Please login with lamduan-mail.");
                    console.log("Worng !!");
                  }
                  // ...
                })
                .catch((error) => {
                  // Handle Errors here.
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  // The email of the user's account used.
                  const email = error.email;
                  // The AuthCredential type that was used.
                  const credential = GoogleAuthProvider.credentialFromError(error);
                  // ...
                });

       }
       /* eslint-disable */
  }
}
</script>
<style scoped>
p {
  line-height: 1rem;
}

.card {
  padding: 20px;
}

.form-group input {
  margin-bottom: 20px;
}

.login-page {
  align-items: center;
  display: flex;
  height: 100vh;
}
.login-page .wallpaper-login {
  background: url(https://image.freepik.com/free-photo/spa-composition-with-care-items-light-wall_169016-1509.jpg) no-repeat center center;
  background-size: cover;
  height: 100%;
  position: absolute;
  width: 100%;
}
.login-page .fade-enter-active,
.login-page .fade-leave-active {
  transition: opacity 0.5s;
}
.login-page .fade-enter,
.login-page .fade-leave-to {
  opacity: 0;
}
.login-page h1 {
  margin-bottom: 1.5rem;
}

.error {
  animation-name: errorShake;
  animation-duration: 0.3s;
}

@keyframes errorShake {
  0% {
    transform: translateX(-25px);
  }
  25% {
    transform: translateX(25px);
  }
  50% {
    transform: translateX(-25px);
  }
  75% {
    transform: translateX(25px);
  }
  100% {
    transform: translateX(0);
  }
}
.social-icons {
  text-align: center;
  font-family: "Open Sans";
  font-weight: 300;
  font-size: 1.5em;
  color: #222222;
}

.social-icons ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.social-icons ul li {
  display: inline-block;
  zoom: 1;
  width: 65px;
  vertical-align: middle;
  border: 1px solid #e3e8f9;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
  margin-right: 5px;
  background: #f4f6ff;
}

.social-icons ul li a {
  display: block;
  font-size: 1.4em;
  margin: 0 5px;
  text-decoration: none;
}
.social-icons ul li a i {
  -webkit-transition: all 0.2s ease-in;
  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -ms-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}

.social-icons ul li a:focus i,
.social-icons ul li a:active i {
  transition: none;
  color: #222222;
}
</style>