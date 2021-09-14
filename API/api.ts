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


function getNombresEquipos(idClub:string){
  let nombres = []
  admin.firestore().collection("clubes").doc(idClub).collection('equipos')
  .get()
  .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          nombres.push(doc.id)
      });
  })
  .catch(function(error) {
      console.log("Error getting documents: ", error);
  });
  return nombres;
}

app.get('/', (req, res) => {
  res.send('Bienvenido a nuestra Api de Estadisticas!');
  //let a = getNombresEquipos("RIGtETEOcR9WyBN9MLL1");
  //console.log(a);

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

  app.post("/:idClub/equipos", async (req, res)=>{
    let clubes = []
    let idClub = req.params.idClub;
    const snapshot = await admin.firestore().collection("clubes").doc(idClub).get()
    clubes.push(snapshot.data());
      res.json(clubes);
    });

    /*
    if(snapshot.empty){
      res.json("No hay Clubes ingresados");
    }
    await snapshot.forEach(async doc => { clubes.push(doc.data().equipos)
    });
    res.json(clubes);
    
  })
*/
  app.get('/estadisticas/:id_club/jugador',async (req , res)=>{
    let idClub = req.params.idClub;
    const snapshot = await admin.firestore().collection("clubes").get()
    let clubes = []
    let stats = new Map();

    await snapshot.forEach(async doc => { clubes.push(doc.data().jugadores)
    });

    clubes.forEach(x => {
      x.forEach(y => {
        stats.set(y.apellido, y.estadisticas)
      });
    });
    console.log(stats)
    res.json(stats)
  })




  app.get('/estadisticas/:id_club/deporte',async (req , res)=>{

  })




  app.get('/:id_club/entrenadores',async (req , res)=>{
    let idClub = req.params.idClub;
    const snapshot = await admin.firestore().collection("clubes").get()
    let clubes = []
    let entrenadores = []

    await snapshot.forEach(async doc => { clubes.push(doc.data().entrenadores)
    });

    clubes.forEach(x => {
      entrenadores.push(x)
    });
    res.json(entrenadores);
  }) 