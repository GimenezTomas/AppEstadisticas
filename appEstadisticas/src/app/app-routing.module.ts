import { NgModule } from '@angular/core';
import { PreloadAllModules, Router, RouterLink, RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, canActivate, emailVerified, isNotAnonymous, loggedIn, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthGuardService } from './services/auth-guard.service';

const loggedIntoHome = () => redirectLoggedInTo(['/home']);

const NoVerified = (redirect: any[])=> pipe(emailVerified, map((loggedIn:any)=>loggedIn || redirect));
const redirectNoVerified = () => NoVerified(['/verif-email']);

const noLogeado = (redirect: any[])=> pipe(isNotAnonymous, map((loggedIn:any)=>loggedIn || redirect));
const redirectToLogin = () => noLogeado(['/login']);

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tab1/tab1.module').then(m => m.Tab1PageModule),
    ...canActivate(loggedIntoHome),
  },
  {
    path: 'more',
    loadChildren: () => import('./tab2/tab2.module').then(m => m.Tab2PageModule)
  },
  {
    path: 'loading',
    loadChildren: () => import('./loading/loading.module').then( m => m.LoadingPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AngularFireAuthGuard, AuthGuardService],
    data: {authGuardPipe: redirectNoVerified}
  },
  {
    path: 'jugadores-inicio',
    loadChildren: () => import('./ver-equipo/jugadores-inicio/jugadores-inicio.module').then( m => m.JugadoresInicioPageModule),
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectNoVerified}
  },
  {
    path: 'jugadores',
    loadChildren: () => import('./ver-equipo/jugadores/jugadores.module').then( m => m.JugadoresPageModule),
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectNoVerified}
  },
  {
    path: 'jugadores-agregar',
    loadChildren: () => import('./ver-equipo/jugadores-agregar/jugadores-agregar.module').then( m => m.JugadoresAgregarPageModule),
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectNoVerified}
  },
  {
    path: 'detalles-del-equipo',
    loadChildren: () => import('./ver-equipo/detalles-del-equipo/detalles-del-equipo.module').then( m => m.DetallesDelEquipoPageModule),
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectNoVerified}
  },
  {
    path: 'crear-equipo',
    loadChildren: () => import('./crear-equipo/crear-equipo.module').then( m => m.CrearEquipoPageModule),
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectNoVerified}
  },
  {
    path: 'crear-deporte',
    loadChildren: () => import('./crear-deporte/crear-deporte.module').then( m => m.CrearDeportePageModule),
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectNoVerified}
  },
  {
    path: 'partido/cancha',
    loadChildren: () => import('./partido/cancha/cancha.module').then( m => m.CanchaPageModule),
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectNoVerified}
  },
  {
    path: 'partidos/patido-home',
    loadChildren: () => import('./partido/patidos-home/patidos-home.module').then( m => m.PatidosHomePageModule),
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectNoVerified}
  },
  {
    path: 'crear-partido',
    loadChildren: () => import('./partido/crear-partido/crear-partido.module').then( m => m.CrearPartidoPageModule),
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectNoVerified}
  },
  {
    path: 'crear-deporte',
    loadChildren: () => import('./crear-deporte/crear-deporte.module').then( m => m.CrearDeportePageModule),
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectNoVerified}
  },
  {
    path: 'modal-editar',
    loadChildren: () => import('./modals/modal-editar/modal-editar.module').then( m => m.ModalEditarPageModule),
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectNoVerified}
  },
  {
    path: 'modal-jugadores',
    loadChildren: () => import('./modals/modal-jugadores/modal-jugadores.module').then( m => m.ModalJugadoresPageModule),
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectNoVerified}
  },
  {
    path: 'modal-elegir-partido',
    loadChildren: () => import('./modals/modal-elegir-partido/modal-elegir-partido.module').then( m => m.ModalElegirPartidoPageModule),
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectNoVerified}
  },
  {
    path: 'login',
    loadChildren: () => import('./users/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./users/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'verif-email',
    loadChildren: () => import('./users/verif-email/verif-email.module').then( m => m.VerifEmailPageModule),
  },
  {
    path: 'eleccion-usuario',
    loadChildren: () => import('./users/eleccion-usuario/eleccion-usuario.module').then( m => m.EleccionUsuarioPageModule)
  },
  {
    path: 'club',
    loadChildren: () => import('./users/club/club.module').then( m => m.ClubPageModule)
  },
  {
    path: 'entrenador',
    loadChildren: () => import('./users/entrenador/entrenador.module').then( m => m.EntrenadorPageModule)
  },
  {
    path: 'add-entrenador',
    loadChildren: () => import('./users/add-entrenador/add-entrenador.module').then( m => m.AddEntrenadorPageModule)
  },
  {
    path: 'modal-accion',
    loadChildren: () => import('./modals/modal-accion/modal-accion.module').then( m => m.ModalAccionPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}