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
    loadChildren: () => import('./ver-equipo/jugadores-inicio/jugadores-inicio.module').then( m => m.JugadoresInicioPageModule)
  },
  {
    path: 'jugadores',
    loadChildren: () => import('./ver-equipo/jugadores/jugadores.module').then( m => m.JugadoresPageModule)
  },
  {
    path: 'jugadores-agregar',
    loadChildren: () => import('./ver-equipo/jugadores-agregar/jugadores-agregar.module').then( m => m.JugadoresAgregarPageModule)
  },
  {
    path: 'modal-sign-in',
    loadChildren: () => import('./modals/modal-sign-in/modal-sign-in.module').then( m => m.ModalSignInPageModule)
  },
  {
    path: 'modal-sign-up',
    loadChildren: () => import('./modals/modal-sign-up/modal-sign-up.module').then( m => m.ModalSignUpPageModule)
  },
  {
    path: 'detalles-del-equipo',
    loadChildren: () => import('./ver-equipo/detalles-del-equipo/detalles-del-equipo.module').then( m => m.DetallesDelEquipoPageModule)
  },





];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
