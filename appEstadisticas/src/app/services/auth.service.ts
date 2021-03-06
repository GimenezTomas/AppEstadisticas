import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore,AngularFirestoreDocument } from "@angular/fire/firestore";
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { database } from 'firebase-admin';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Entrenador } from '../shared/entrenador.interface';
import { User } from '../shared/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$: Observable<User>;
  public uid: string;
  public esClub;
  public esEntrenador;
  public entrenadorxClub;

  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router ) {
    this.esClub = false;
    this.esEntrenador = false;
    this.uid = sessionStorage.getItem("uid");
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          this.afs.collection('clubes').doc(user.uid).get().subscribe(data=>{
            this.afs.collection('entrenadores').doc(user.uid).get().subscribe(data1=>{
              this.afs.collection('entrenadores').doc<Entrenador>(user.uid).get().subscribe( data2 =>{              
                this.esClub=data.exists;
                this.esEntrenador=data1.exists;
                if(data2.exists){ this.entrenadorxClub = data2.data().club; }
              });
            });
          });
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
  }

  async getIDclub() :Promise<string>{
    if(this.esEntrenador){
      return await this.getEntrenador();
    }
    else{
      return this.uid;
    }
  }

  async clubExists(): Promise<boolean>{
    let dataPromise : Promise<boolean> = new Promise((resolve, reject) => {
      this.afs.collection('clubes').doc(this.uid).get().subscribe( data =>{ resolve(data.exists) });
    });
    
    return dataPromise;
  }

  async entrenadorExists(): Promise<boolean>{
    let dataPromise : Promise<boolean> = new Promise((resolve, reject) => {
      this.afs.collection('entrenadores').doc(this.uid).get().subscribe( data =>{ resolve(data.exists) });
    });
    
    return dataPromise;
  }

  async entrenadorClub(): Promise<boolean>{
    let dataPromise : Promise<boolean> = new Promise((resolve, reject) => {
      this.afs.collection('entrenadores').doc<Entrenador>(this.uid).get().subscribe( data =>{ resolve(data.data().club != null ); });
    });
    
    return dataPromise;
  }

  async getEntrenador(): Promise<string>{
    let dataPromise : Promise<string> = new Promise((resolve, reject) => {
      this.afs.collection('entrenadores').doc<Entrenador>(this.uid).get().subscribe( data =>{ resolve(data.data().club ); });
    });
    
    return dataPromise;
  }

  async getEntrenadores(){
    let entrenadores = Array<Entrenador>();
    let ent = await this.afs.collection<Entrenador>('entrenadores').get().toPromise()

      ent.docs.forEach(item => {
        let e:Entrenador = item.data();
        e.uid = item.id;
        entrenadores.push(e);
      });
    return entrenadores;
  }

  async resetPassword(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log('Error->', error);
    }
  }

  async loginGoogle(): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider());
      this.uid = user.uid;
      this.updateUserData(user);
      sessionStorage.setItem("uid", user.uid);
      return user;
    } catch (error) {
      console.log('Error->', error);
    }
  }

  async register(email: string, password: string): Promise<User> {
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(email, password);
      await this.sendVerifcationEmail();
      return user;
    } catch (error) {
      console.log('Error->', error);
    }
  }

  async login(email: string, password: string): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithEmailAndPassword(email, password);
      this.uid = user.uid;
      this.updateUserData(user);
      sessionStorage.setItem("uid", user.uid);
      return user;
    } catch (error) {
      console.log('Error->', error);
    }
  }

  async sendVerifcationEmail(): Promise<void> {
    try {
      return (await this.afAuth.currentUser).sendEmailVerification();
    } catch (error) {
      console.log('Error->', error);
    }
  }

  isEmailVerified(user: User): boolean {
    return user.emailVerified === true ? true : false;
  }

  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log('Error->', error);
    }
  }

  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
    };

    return userRef.set(data, { merge: true });
  }


}
