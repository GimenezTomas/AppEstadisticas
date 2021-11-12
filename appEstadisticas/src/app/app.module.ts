import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { AngularFireAuth, AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireModule } from "@angular/fire";
import { environment } from 'src/environments/environment';
import { TabService } from './services/tab.service';
import firebase from 'firebase/app';
import { CommonModule } from '@angular/common';
import { ModalModificarDeporteComponent } from './modal-modificar-deporte/modal-modificar-deporte.component';
import { FormsModule } from '@angular/forms';
import { PopComponent } from './components/pop/pop.component';

@NgModule({
  declarations: [AppComponent, ModalModificarDeporteComponent,PopComponent],
  entryComponents: [PopComponent],
  imports: [BrowserModule, FormsModule, CommonModule, AngularFireModule.initializeApp(environment.firebaseConfig),IonicModule.forRoot(), AppRoutingModule, FontAwesomeModule,AngularFireAuthModule],
  providers: [
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
     TabService],
  bootstrap: [AppComponent],
})

export class AppModule {

	constructor(library: FaIconLibrary) { 
		library.addIconPacks(fas, fab, far);

	}

}
