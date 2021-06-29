import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore,AngularFirestoreDocument } from "@angular/fire/firestore";
import * as firebase from "firebase";
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';



export class User{
  uid:string;
  email: string;
  displayName: string;
  emailVerified: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$: Observable<User>;
  
  constructor(private afAuth:AngularFireAuth, private afs: AngularFirestore) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          //return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
   }
  
 

  
  emailVerificado(user: User): boolean {
    return user.emailVerified === true ? true : false;
  }

    async loginGoogle(): Promise<User> {
    try {
      const { user } = await this.afAuth.auth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider());
      this.updateUserData(user);
      return user;
    } catch (error) {
      console.log('Error->', error);
    }
  }



  async register(email:string, password:string): Promise<User>{
    try {
      const {user} = await this.afAuth.auth.createUserWithEmailAndPassword(email,password);
      await this.enviarVerificacion();
      return user;
    } catch (error) {
      console.log("error--->",error);
      
    }
  }



  async enviarVerificacion() {
     try {
      return (await this.afAuth.auth.currentUser).sendEmailVerification();
    } catch (error) {
      console.log('Error->', error);
    }
  }


  async login(email:string,password:string): Promise<User> {
    try {
      const{user} = await this.afAuth.auth.signInWithEmailAndPassword(email,password);
      this.updateUserData(user);
      return user;
    } catch (error) {
      console.log("error--->",error);
      
    }
  }


  async logout(): Promise<void>{
    try {
      await this.afAuth.auth.signOut();
    } catch (error) {
      console.log("error--->",error);
    }
  }

  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
    };

    return userRef.set(data, { merge: true });
  }
}
