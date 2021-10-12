
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const loggedIntoHome = () => redirectLoggedInTo(['/home']);

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tab1/tab1.module').then(m => m.Tab1PageModule),
    ...canActivate(loggedIntoHome)
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
    path: 'detalles-del-equipo',
    loadChildren: () => import('./ver-equipo/detalles-del-equipo/detalles-del-equipo.module').then( m => m.DetallesDelEquipoPageModule)
  },
  {
    path: 'crear-equipo',
    loadChildren: () => import('./crear-equipo/crear-equipo.module').then( m => m.CrearEquipoPageModule)
  },
  {
    path: 'crear-deporte',
    loadChildren: () => import('./crear-deporte/crear-deporte.module').then( m => m.CrearDeportePageModule)
  },
  {
    path: 'partido/cancha',
    loadChildren: () => import('./partido/cancha/cancha.module').then( m => m.CanchaPageModule)
  },
  {
    path: 'partidos/patido-home',
    loadChildren: () => import('./partido/patidos-home/patidos-home.module').then( m => m.PatidosHomePageModule)
  },
  {
    path: 'crear-partido',
    loadChildren: () => import('./partido/crear-partido/crear-partido.module').then( m => m.CrearPartidoPageModule)
  },
  {
    path: 'crear-deporte',
    loadChildren: () => import('./crear-deporte/crear-deporte.module').then( m => m.CrearDeportePageModule)
  },
  {
    path: 'modal-editar',
    loadChildren: () => import('./modals/modal-editar/modal-editar.module').then( m => m.ModalEditarPageModule)
  },
  {
    path: 'modal-jugadores',
    loadChildren: () => import('./modals/modal-jugadores/modal-jugadores.module').then( m => m.ModalJugadoresPageModule)


  },
  {
    path: 'cancha',
    loadChildren: () => import('./cancha/cancha.module').then( m => m.CanchaPageModule)

  },
  {
    path: 'modal-elegir-partido',
    loadChildren: () => import('./modals/modal-elegir-partido/modal-elegir-partido.module').then( m => m.ModalElegirPartidoPageModule)
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
    loadChildren: () => import('./users/verif-email/verif-email.module').then( m => m.VerifEmailPageModule)
  },
  {
    path: 'eleccion-usuario',
    loadChildren: () => import('./users/eleccion-usuario/eleccion-usuario.module').then( m => m.EleccionUsuarioPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
