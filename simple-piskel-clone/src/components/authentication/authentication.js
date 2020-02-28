import firebase from "firebase/app";
import "firebase/auth";

export default class Authentication {
    init() {
        this.events = {
            click: "click",
        };
        const firebaseConfig = {
            apiKey: "AIzaSyCDFatRRGHJQ9y-Noi32PlDwzLHcusNQCU",
            authDomain: "piskel-clone-18b8a.firebaseapp.com",
            databaseURL: "https://piskel-clone-18b8a.firebaseio.com",
            projectId: "piskel-clone-18b8a",
            storageBucket: "piskel-clone-18b8a.appspot.com",
            messagingSenderId: "117949870916",
            appId: "1:117949870916:web:a9bb64ec95acf5183e1d11",
        };

        firebase.initializeApp(firebaseConfig);
        this._authInit();
    }

    _authInit() {
        this.signIn = document.querySelector(".sign-in");

        this.signIn.addEventListener(this.events.click, this._authInitEvent.bind(this));
    }

    _authInitEvent() {
        const provider = new firebase.auth.GoogleAuthProvider();
        const userPhotoElement = document.querySelector(".user-photo");
        const userNameElement = document.querySelector(".user-name");

        if (this.signIn.classList.contains("sign-in")) {
            firebase.auth().signInWithPopup(provider).then((result) => {
                userPhotoElement.classList.remove("user-photo_closed");
                userNameElement.classList.remove("user-name_closed");
                this.signIn.textContent = "Sign Out";
                this.signIn.classList.remove("sign-in");

                userPhotoElement.src = result.user.photoURL;
                userNameElement.textContent = result.user.displayName;
            });
        } else {
            firebase.auth().signOut().then(() => {
                userPhotoElement.classList.add("user-photo_closed");
                userNameElement.classList.add("user-name_closed");
                this.signIn.classList.add("sign-in");
                this.signIn.textContent = "Sign In";
            });
        }
    }
}
