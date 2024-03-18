import { initializeApp } from "firebase/app"
import { GoogleAuthProvider, getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDOjdCYKGnjzpRHBGRhFLuGLaePxLBzLfw",
  authDomain: "my-pokemon-7a7b3.firebaseapp.com",
  projectId: "my-pokemon-7a7b3",
  storageBucket: "my-pokemon-7a7b3.appspot.com",
  messagingSenderId: "53910998034",
  appId: "1:53910998034:web:5fdf2aaa748466d2d1dccb"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)