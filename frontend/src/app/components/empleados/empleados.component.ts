import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../../services/empleado.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css'],
})
export class EmpleadosComponent implements OnInit {
  empleados: any[] = [];
  error: string | null = null;
  empleadoSeleccionado: any = { first_name: '', last_name: '', email: '', job_id: '', salary: null, commission_pct: null, manager_id: null, department_id: null }; // Se ajustaron los campos
  
  constructor(private empleadoService: EmpleadoService) {}

  ngOnInit(): void {
    this.obtenerEmpleados();
  }

  obtenerEmpleados() {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.empleadoService.getEmpleados(token).subscribe(
        (empleados) => {
          this.empleados = empleados;
        },
        (error) => {
          console.error('Error al obtener empleados', error);
          this.error = 'Error al cargar la lista de empleados';
        }
      );
    } else {
      console.error('No se encuentra el token de autenticación');
      this.error = 'Token de autenticación no encontrado';
    }
  }

  eliminarEmpleado(id: number) {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.empleadoService.deleteEmpleado(id, token).subscribe(() => {
        this.empleados = this.empleados.filter((emp) => emp.employee_id !== id); // Se ajustó el nombre del campo
      },
        (error) => {
          console.error('Error al eliminar empleado', error);
          this.error = 'Error al eliminar el empleado';
        }
      );
    } else {
      console.error('No se encuentra el token de autenticación');
      this.error = 'Token de autenticación no encontrado';
    }
  }

  seleccionarEmpleado(empleado: any) {
    this.empleadoSeleccionado = { ...empleado }; // Clonar el empleado para edición
  }

  actualizarEmpleado() {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.empleadoService.updateEmpleado(this.empleadoSeleccionado.employee_id, this.empleadoSeleccionado, token).subscribe(
        (empleado) => {
          const index = this.empleados.findIndex(emp => emp.employee_id === empleado.employee_id);
          if (index !== -1) {
            this.empleados[index] = empleado;  // Actualizar la lista
          }
          this.empleadoSeleccionado = { first_name: '', last_name: '', email: '', job_id: '', salary: null, commission_pct: null, manager_id: null, department_id: null }; // Limpiar el formulario
        },
        (error) => {
          console.error('Error al actualizar empleado', error);
          this.error = 'Error al actualizar el empleado';
        }
      );
    } else {
      console.error('No se encuentra el token de autenticación');
      this.error = 'Token de autenticación no encontrado';
    }
  }
  searchTerm: string = '';  // Variable para almacenar el término de búsqueda
  empleadoEncontrado: any = null; // Variable para almacenar el empleado encontrado

buscarEmpleado() {
  console.log('Botón de búsqueda presionado'); // Verificar si la función se ejecuta
  const token = localStorage.getItem('authToken');
  if (token && this.searchTerm.trim() !== '') {
    const id = parseInt(this.searchTerm, 10);
    if (!isNaN(id)) {
      this.empleadoService.getEmpleadoById(id, token).subscribe(
        (empleado) => {
          console.log('Empleado encontrado:', empleado); // Verificar el resultado de la búsqueda
          if (empleado) {
            this.empleadoEncontrado = empleado; // Guardar el empleado encontrado
            this.error = ''; // Limpiar cualquier error previo
          } else {
            this.empleadoEncontrado = null; // Si no se encuentra el empleado
            this.error = 'Empleado no encontrado';
          }
        },
        (error) => {
          console.error('Error al buscar empleado', error);
          this.empleadoEncontrado = null; // Limpiar el empleado encontrado
          this.empleados = []; // Limpiar la lista de empleados
          if (error.status === 404) {
            this.error = 'Empleado no encontrado';
          } else {
            this.error = 'Error al buscar empleado';
          }
        }
      );
    } else {
      this.error = 'El ID debe ser un número válido';
      this.empleadoEncontrado = null; // Limpiar el empleado encontrado si el ID no es válido
      this.empleados = []; // Limpiar la lista de empleados
    }
  } else {
    this.error = 'Por favor, ingrese un ID válido';
    this.empleadoEncontrado = null; // Limpiar el empleado encontrado si el campo está vacío
    this.empleados = []; // Limpiar la lista de empleados
  }
}
  
}

