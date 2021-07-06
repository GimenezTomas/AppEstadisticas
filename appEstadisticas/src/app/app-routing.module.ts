import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tab1/tab1.module').then(m => m.Tab1PageModule)
  },
  {
    path: 'loading',
    loadChildren: () => import('./loading/loading.module').then( m => m.LoadingPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'jugadores-inicio',
    loadChildren: () => import('./jugadores-inicio/jugadores-inicio.module').then( m => m.JugadoresInicioPageModule)
  },
  {
    path: 'jugadores',
    loadChildren: () => import('./jugadores/jugadores.module').then( m => m.JugadoresPageModule)
  },
  {
    path: 'jugadores-agregar',
    loadChildren: () => import('./jugadores-agregar/jugadores-agregar.module').then( m => m.JugadoresAgregarPageModule)
  },  {
    path: 'modal-sign-in',
    loadChildren: () => import('./modals/modal-sign-in/modal-sign-in.module').then( m => m.ModalSignInPageModule)
  },
  {
    path: 'modal-sign-up',
    loadChildren: () => import('./modals/modal-sign-up/modal-sign-up.module').then( m => m.ModalSignUpPageModule)
  },
  {
    path: 'crear-deporte',
    loadChildren: () => import('./crear-deporte/crear-deporte.module').then( m => m.CrearDeportePageModule)
  },





];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
