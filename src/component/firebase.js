import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'

const config = {
    apiKey: "AIzaSyCQeQa4Lw0DvZxwOfZb0w4XSfv7xU8kAoM",
    authDomain: "fir-react-app-a7bc9.firebaseapp.com",
    databaseURL: "https://fir-react-app-a7bc9.firebaseio.com",
    projectId: "fir-react-app-a7bc9",
    storageBucket: "fir-react-app-a7bc9.appspot.com",
    messagingSenderId: "27871822406",
    appId: "1:27871822406:web:efc12eac4717793ddc0047",
    measurementId: "G-L4SLH3YL1H"
  }
  
  class Firebase{
      constructor(){
        app.initializeApp(config)
        this.auth=app.auth()
        this.db=app.firestore()
      }

      login(email,password){
          return this.auth.signInWithEmailAndPassword(email,password)
      }

      logout(){
          return this.auth.signOut()
      }

      async register(name, email, password){
          await this.auth.createUserWithEmailAndPassword(email,password)
          return this.auth.currentUser.updateProfile({
            
            displayName: name
              
          })
      }
      addQuote(quote){
        if(!this.auth.currentUser){
            return alert("not registered")
        }
        return this.db.doc(`data/${this.auth.currentUser.uid}`).set({
            quote
        })
    }
    isInitialized(){
        return new Promise(resolve=>{
            this.auth.onAuthStateChanged(resolve)
        })
    }
    getCurrentUsername(){
        if(this.auth.currentUser!==null)
          {
            return this.auth.currentUser.displayName
          } 
    }

    async getCurrentUserQuote(){
        if(this.auth.currentUser!==null){
            const quote=await this.db.doc(`data/${this.auth.currentUser.uid}`).get()
        return quote.get('quote')
        }
        
    }
  }
  export default new Firebase()