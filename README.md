# Todo App - Ionic & Angular Standalone

Una aplicación móvil de gestión de tareas de alto rendimiento, construida con **Ionic 8** y **Angular 17+**, enfocada en la eficiencia de datos, arquitectura moderna y una experiencia de usuario nativa fluida.

---

##  Características Principales

* **Arquitectura Standalone:** Eliminación de `NgModules` para una carga inicial más rápida y un código más modular y fácil de mantener.
* **Gestión de Estado Reactiva:** Uso intensivo de **RxJS** e inmutabilidad para el manejo de tareas y categorías, garantizando la integridad de los datos en tiempo real.
* **Diseño Adaptativo (Dark/Light):** Interfaz inteligente que respeta el modo del sistema, con una tarjeta de entrada de tareas optimizada para legibilidad en ambos entornos.
* **Validación de Datos:** Prevención de tareas duplicadas dentro de la misma categoría para mantener una base de datos limpia.

---

## Stack Tecnológico

* **Framework:** [Angular](https://angular.io/) (v17+) con Standalone Components.
* **UI Library:** [Ionic Framework](https://ionicframework.com/) (v8).
* **Native Bridge:** [Capacitor](https://capacitorjs.com/) (Seleccionado sobre Cordova por su estabilidad y rendimiento nativo).
* **Cloud Services:** Firebase (Remote Config para gestión de parámetros en tiempo real).
* **Control de Versiones:** Git siguiendo la metodología **Git Flow**.

---

##  Optimizaciones para Android

* **UX de Deslizamiento (Swipe):** Indicadores visuales (`chevron-icon`) integrados en cada tarea para guiar al usuario hacia las opciones ocultas de eliminación.
* **Persistencia de Datos:** Integración con `@ionic/storage-angular` para asegurar que las tareas se mantengan tras cerrar la aplicación.

---

##  Instalación y Despliegue

### **Requisitos Previos**
* Node.js (v18 o superior)
* Ionic CLI (`npm install -g @ionic/cli`)
* Android Studio (para la generación del APK)

### **Configuración Local**
1.  Clonar el repositorio:
    ```bash
    https://github.com/SYepesCommit/todo-app-front.git
    ```
2.  Instalar dependencias:
    ```bash
    npm install
    ```
3.  Ejecutar en el navegador para pruebas rápidas:
    ```bash
    ionic serve
    ```

### **Generación del APK (Android)**
1.  Compilar el proyecto web:
    ```bash
    ionic build --prod
    ```
2.  Sincronizar los archivos con el proyecto nativo:
    ```bash
    npx cap sync android
    ```
3.  Abrir el proyecto en Android Studio:
    ```bash
    npx cap open android
    ```
4.  En Android Studio, ir a: `Build > Build Bundle(s) / APK(s) > Build APK(s)`.

---

## Decisiones de Arquitectura

> **¿Por qué Capacitor y no Cordova?**
> Se migró a Capacitor para tratar el proyecto nativo como código fuente real, permitiendo una personalización profunda del comportamiento de Android y una integración más limpia con los plugins de Firebase y el hardware del dispositivo.
