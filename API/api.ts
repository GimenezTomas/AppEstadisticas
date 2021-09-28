//import * as firebase from 'firebase';
import { initializeApp } from 'firebase/app';
import { collection, DocumentData, getDocs, getFirestore } from 'firebase/firestore';
import * as admin from 'firebase-admin';
import { async } from '@firebase/util';

const firebaseConfig = {
    apiKey: "AIzaSyBQbpoFlzGOq17W6VtslOy9XE6dLY-nStQ",
    authDomain: "appestadisticas-888ea.firebaseapp.com",
    projectId: "appestadisticas-888ea",
    storageBucket: "appestadisticas-888ea.appspot.com",
    messagingSenderId: "48821201636",
    appId: "1:48821201636:web:68bc816fea48dc25015af1",
    measurementId: "G-5CZNCPVWCQ"
};

var serviceAccount = require("./appestadisticas-888ea-firebase-adminsdk-pwap4-86dc2558cd.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://appestadisticas-888ea-default-rtdb.firebaseio.com"
});

var express = require('express');
var app = express();
var port = 3000;


app.get('/', (req, res) => {
  res.send('Bienvenido a nuestra Api de Estadisticas!');
  })

  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
})


app.get('/clubes',async (req , res)=>{
  const snapshot = await admin.firestore().collection("clubes").get()
  let clubes = []
  if(snapshot.empty){
    res.json("No hay Clubes ingresados");
  }
  await snapshot.forEach(async doc => { clubes.push(doc.data().nombre)
  });
  res.json(clubes);
})

app.get("/:id_club/equipos", async (req, res)=>{
  let idClub = req.params.id_club;
  const snapshot = await admin.firestore().collection("clubes").doc(idClub).collection("equipos").get()
  let teams = []

  await snapshot.forEach(async doc => {
    teams.push(doc.id)
  });
  res.json(teams);
  
})

app.get('/estadisticas/:id_club/jugadores',async (req , res)=>{
  let idClub = req.params.id_club;
  const snapshot = await admin.firestore().collection("clubes").get()
  let clubes = []
  let stats = new Map();

  await snapshot.forEach(async doc => { 
    if(doc.id == idClub){
      clubes.push(doc.data().jugadores)
      clubes.forEach(x => {
        x.forEach(y => {
          stats.set(y.apellido, y.estadisticas)
        });
      });
    }
    
  });
  console.log(stats)
  // res.json(stats)
})




app.get('/estadisticas/:id_club/:id_equipo',async (req , res)=>{
  let idClub = req.params.id_club;
  let idEquipo = req.params.id_equipo;
  const snapshot = await admin.firestore().collection("clubes").doc(idClub).collection("equipos").get()
  let stats = []

  await snapshot.forEach(async doc => { 
    if(doc.id == idEquipo){
      stats.push(doc.data().estadisticasGenerales)
    }
  });

  res.json(stats)
})




app.get('/:id_club/entrenadores',async (req , res)=>{
  let idClub = req.params.id_club;
  const snapshot = await admin.firestore().collection("clubes").get()
  let entrenadores = []

  await snapshot.forEach(async doc => { 
    if(doc.id == idClub){
      entrenadores.push(doc.data().entrenadores)
    }
  });
  res.json(entrenadores);
}) 