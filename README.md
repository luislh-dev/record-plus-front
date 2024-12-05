# Sistema Administrativo de Gestión Hospitalaria - Frontend
## Descrpción
Sistema web para la gestión administrativa de hospitales, permitiendo el manejo de expedientes médicos, gestión de usuarios, doctores y pacientes. Esta aplicación frontend está construida con React + TypeScript + Vite.

## Características Principales
- 🏥 Gestión de expedientes médicos
- 👨‍⚕️ Administración de personal médico
- 👥 Control de pacientes
- 📊 Reportes y estadísticas
- 🔐 Sistema de autenticación y autorización

## Requisisitos previos
1. Clonar el repositorio:
```
git clone https://github.com/LuisLopez-developer/record-plus-front.git
```

2. Instalar dependencias:
```
npm install
# o
yarn install
```

3.  Configurar variables de entorno:

```
cp .env.example .env
```

Editar el archivo `.env` con las configuraciones necesarias.

4. Inicar el servidor de desarrollo:
````
npm run dev
# o
yarn dev
````

## Tecnologías Principales

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router

## Estructura del Proyecto
````
src/
  ├── components/     # Componentes reutilizables
  ├── pages/          # Páginas de la aplicación
  ├── services/       # Servicios y llamadas API
  ├── contexts/       # Contextos de React
  ├── hooks/          # Hooks personalizados
  ├── types/          # Definiciones de tipos
  └── utils/          # Utilidades y helpers
````