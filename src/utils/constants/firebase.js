
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

const firebaseConfigDev = {
    apiKey: "AIzaSyC-N3P0mtoESjU2hajcZuRhaUVljsnqA9g",
    authDomain: "sshop-pro.firebaseapp.com",
    projectId: "sshop-pro",
    storageBucket: "sshop-pro.appspot.com",
    messagingSenderId: "492403786075",
    appId: "1:492403786075:web:5ada6ae8dab6bea1265a7e",
    measurementId: "G-W6ZTBQ811X"
};

const firebaseConfigPro = {
    apiKey: "AIzaSyC-N3P0mtoESjU2hajcZuRhaUVljsnqA9g",
    authDomain: "sshop-pro.firebaseapp.com",
    projectId: "sshop-pro",
    storageBucket: "sshop-pro.appspot.com",
    messagingSenderId: "492403786075",
    appId: "1:492403786075:web:5ada6ae8dab6bea1265a7e",
    measurementId: "G-W6ZTBQ811X"
};

const app = initializeApp(process.env.REACT_APP_ENV == 'dev' ? firebaseConfigDev : firebaseConfigPro);
const auth = getAuth(app);
export {
  auth
};
