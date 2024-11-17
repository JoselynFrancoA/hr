import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Servicio para la autenticación

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Opcional, si tienes estilos
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (!this.username || !this.password) {
      this.error = 'Por favor, llena todos los campos.';
      return;
    }

    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log('Inicio de sesión exitoso:', response);
        // Guardar token en localStorage o sesión
        localStorage.setItem('authToken', response.token);
        // Redirigir a una página protegida
        // Redirigir a la página de empleados
        this.router.navigate(['/empleados']).then(() => {
          console.log('Redirección exitosa');
        }).catch((err) => {
          console.error('Error en la redirección:', err);
        });
      },
      error: (err) => {
        console.error(err);
        this.error = 'Credenciales incorrectas. Inténtalo de nuevo.';
      },
    });
  }
}
