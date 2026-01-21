# 👤 Profile Management System (Angular 20 + NestJS)

Este es un proyecto **Fullstack** diseñado para la gestión de perfiles de usuario. Utiliza las últimas tecnologías de **Angular 20** para una reactividad moderna y **NestJS** para un backend robusto y escalable.

## 🚀 Características Principales

### **Frontend (Angular 20)**

* **Gestión de Estado con Signals:** Uso de `signal`, `computed` y `effect` para una reactividad eficiente y sin `Zone.js`.
* **Arquitectura Standalone:** Componentes independientes sin necesidad de `NgModules`.
* **Nuevo Control Flow:** Implementación de la sintaxis `@if`, `@for` y `@empty`.
* **Inyección de Dependencias Moderna:** Uso de la función `inject()`.
* **UI Profesional:** Estilizado con **Bootstrap 5** y **Bootstrap Icons**.
* **Formularios Reactivos:** Validación avanzada de archivos e inputs.

### **Backend (NestJS)**

* **Subida de Archivos:** Integración con **Multer** para el manejo de imágenes.
* **Validación de Datos:** Uso de `ParseFilePipe` para controlar el tamaño y tipo de archivos.
* **Servicio de Estáticos:** Configuración para servir imágenes directamente desde el servidor.
* **Arquitectura Modular:** Separación clara entre controladores y servicios.

---

## 🛠️ Tecnologías Utilizadas

| Capa | Tecnologías |
| --- | --- |
| **Frontend** | Angular 20, RxJS, Signals, Bootstrap 5 |
| **Backend** | NestJS, TypeScript, Multer |
| **Almacenamiento** | Sistema de archivos local (Images) |

---

## 📦 Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/FranciscoBelda/BackendFicheros
git clone https://github.com/FranciscoBelda/FrontEndFicheros
cd nombre-del-proyecto

```

### 2. Configuración del Backend (NestJS)

```bash
npm install
# Asegúrate de que la carpeta 'uploads' exista en la raíz del backend
mkdir images
npm run start:dev

```

> El servidor correrá en: `http://localhost:3000`

### 3. Configuración del Frontend (Angular)

```bash
npm install
ng serve

```

> La aplicación estará disponible en: `http://localhost:4200`

---

## 📡 API Endpoints

| Método | Endpoint        | Descripción |
| --- |-----------------| --- |
| **GET** | `/profiles`     | Obtiene todos los perfiles |
| **POST** | `/profiles`     | Crea un nuevo perfil (Multipart/form-data) |
| **DELETE** | `/profiles/:id` | Elimina un perfil por ID |
| **GET** | `/images/:img`  | Acceso directo a la imagen subida |

---

## 📂 Estructura del Proyecto

### **Frontend**

```text
src/app/
├── services/
│   └── profile.service.ts   # Estado global con Signals
├── components/
│   ├── all-profiles/        # Listado reactivo (@for)
│   └── create-profile/         # Formulario con preview de imagen
└── common/
    └── Profile.ts           # Interfaz de datos

```

### **Backend**

```text
src/
├── profiles/
│   ├── profiles.controller.ts # Lógica de Multer e Interceptores
│   ├── profiles.service.ts    # Manejo de datos y archivos
│   └── profiles.module.ts
├── main.ts                    # Configuración de archivos estáticos
└── uploads/                   # Almacenamiento de imágenes

```

---

## 📝 Notas de Versión (Migración a v20)

* Se eliminaron todas las suscripciones manuales de RxJS en los componentes.
* La comunicación entre componentes se realiza mediante **Signals** compartidas en el servicio.
* Se implementó el patrón de **Inmutabilidad** en las actualizaciones de estado mediante `this.signal.update()`.

---
