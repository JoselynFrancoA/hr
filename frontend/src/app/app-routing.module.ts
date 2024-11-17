import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { AuthGuard } from './services/auth.guard';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirigir al login por defecto
  { path: 'login', component: LoginComponent }, // Ruta pública para el login
  { 
    path: 'empleados', 
    component: EmpleadosComponent, 
    canActivate: [AuthGuard] // Ruta protegida por el guardia
  },
  { path: '**', redirectTo: '/login' } // Ruta para manejar páginas no encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
