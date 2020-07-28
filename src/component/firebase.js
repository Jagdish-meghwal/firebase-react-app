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
  app.initializeApp(config)
		export const auth = app.auth()
		export const db = app.firestore()
  class Firebase {
	/*constructor() {
		app.initializeApp(config)
		this.auth = app.auth()
		this.db = app.firestore()
	}
    */
	login(email, password) {
		return auth.signInWithEmailAndPassword(email, password)
	}

	logout() {
		return auth.signOut()
	}

	async register(name, email, password) {
		await auth.createUserWithEmailAndPassword(email, password)
		return auth.currentUser.updateProfile({
			displayName: name
		})
	}

	addData(quote,email,name) {
		if(!auth.currentUser) {
			return alert('Not authorized')
		}

		return db.collection('userdata').doc(`${auth.currentUser.uid}`).set({
            quote:quote,
            email:email,
            name:name
		})
    }

	isInitialized() {
		return new Promise(resolve => {
			auth.onAuthStateChanged(resolve)
		})
	}

	getCurrentUsername() {
		return auth.currentUser && auth.currentUser.displayName
	}

	async getCurrentUserQuote() {
		const quote = await db.collection('userdata').doc(`${auth.currentUser.uid}`).get()
		return quote.get('quote')
    }
}

export default new Firebase()