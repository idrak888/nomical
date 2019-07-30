import Header from '../components/Header';
import Head from 'next/head';
import Footer from '../components/Footer';
import * as firebase from 'firebase';
import UserFlag from '../components/UserFlag';
import WriteFlag from '../components/WriteFlag';

var firebaseConfig = {
    apiKey: "AIzaSyA_EfYinSIFG6WzPH1L-4gZ0Oi5Q-6rzs4",
    authDomain: "nomical.firebaseapp.com",
    databaseURL: "https://nomical.firebaseio.com",
    projectId: "nomical",
    storageBucket: "nomical.appspot.com",
    messagingSenderId: "694694914928",
    appId: "1:694694914928:web:472c1d849a9d736c"
  };
if (!firebase.apps.length) {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
}

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        localStorage.setItem("user", user.displayName);
        document.querySelector('.UserFlag span').innerHTML = "Logged in as " + user.displayName;
        document.querySelector('.WriteFlag').style.display = 'block';
        document.querySelector('.Header .header-logout').style.display = 'inline-block';
        document.querySelector('.Header .header-login').style.display = 'none';
        setTimeout(() => {
            document.querySelector('.popup').style.display = 'block';
        }, 2000);
        setTimeout(() => {
            document.querySelector('.popup').style.display = 'none';
        }, 5000);
    } else {
        localStorage.setItem("user", "");
        document.querySelector('.Header .header-logout').style.display = 'none';
        document.querySelector('.WriteFlag').style.display = 'none';
        document.querySelector('.popup').style.display = 'none';
        document.querySelector('.Header .header-login').style.display = 'inline-block';
        document.querySelector('.UserFlag span').innerHTML = "Not logged in";
    }
});

export default ({ children }) => (
  <div>
        <Head>
            <meta charset="UTF-8"/>
            <link rel="shortcut icon" href="/static/favicon.png" />
            <link rel="shortcut icon" type="image/png" href="/static/favicon.png"/>
            <link rel="apple-touch-icon" href="/static/favicon.png"/>
            <link rel="apple-touch-icon" sizes="76x76" href="/static/favicon.png"/>
            <link rel="apple-touch-icon" sizes="120x120" href="/static/favicon.png"/>
            <link rel="apple-touch-icon" sizes="152x152" href="/static/favicon.png"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
            <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"/>
            <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
            <link rel="stylesheet" href="/static/css/style.css"/>
            <script src="/__/firebase/6.3.1/firebase-app.js"></script>
            <script src="/__/firebase/init.js"></script>
            <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
            <link href="https://fonts.googleapis.com/css?family=DM+Serif+Display&display=swap" rel="stylesheet"></link>
            <title>Nomical | Economics, world news, business, finance</title>
        </Head>
        
        <Header />
        { children }
        {/* <div className="corner"><img src="/static/widgets/chat.png"/></div> */}
        <br/>
        <Footer/>
        <UserFlag/>
        
        <WriteFlag/>
        <div className="popup"><img src="/static/popup.png"/></div>
    </div>
)

