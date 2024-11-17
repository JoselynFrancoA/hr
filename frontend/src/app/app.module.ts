import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Para usar [(ngModel)]
import { AppRoutingModule } from './app-routing.module'; // Asegúrate de que existe
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component'; // Asegúrate de que el componente existe y está bien importado
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './services/auth.guard';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmpleadosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, // Importa el módulo de rutas
    FormsModule, // Necesario para [(ngModel)]
    RouterModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
