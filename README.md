# Lab2U1_SaulaAldo

Aplicación en tiempo real con Express y Socket.io

## Requisitos previos

- Node.js instalado en tu sistema
- pnpm instalado globalmente (o seguir las instrucciones de instalación abajo)

## Instalación

### 1. Instalar pnpm (si aún no lo tienes)

```bash
npm install -g pnpm
```

O si prefieres, puedes verificar tu versión de pnpm:

```bash
pnpm --version
```

### 2. Instalar las dependencias del proyecto

```bash
pnpm install
```

Este comando instalará todas las dependencias especificadas en el `package.json`:
- **express** ^5.2.1 - Framework web
- **socket.io** ^4.8.3 - Comunicación en tiempo real
- **nodemon** ^3.1.14 (dev) - Reinicio automático durante desarrollo

## Ejecución

### Modo producción

Para ejecutar el servidor en modo producción:

```bash
pnpm start
```

O equivalentemente:

```bash
pnpm run start
```

### Modo desarrollo

Para ejecutar con `nodemon` (reinicio automático al detectar cambios):

```bash
pnpm dev
```

O equivalentemente:

```bash
pnpm run dev
```

## Estructura del proyecto

```
Lab2U1_SaulaAldo/
├── server.js           # Servidor principal con Express y Socket.io
├── package.json        # Dependencias y scripts
├── pnpm-lock.yaml      # Lock file de pnpm
└── public/
    ├── index.html      # Página principal
    ├── script.js       # Lógica del cliente
    └── style.css       # Estilos
```

## Notas

- El servidor está configurado para servir archivos estáticos desde la carpeta `public/`
- Utiliza Socket.io para la comunicación bidireccional en tiempo real entre cliente y servidor
- El archivo `pnpm-lock.yaml` asegura que todos los desarrolladores usen las mismas versiones exactas de las dependencias
