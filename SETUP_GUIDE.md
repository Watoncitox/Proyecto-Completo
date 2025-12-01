# 🚀 Guía de Configuración e Instalación

## Requisitos Previos

### Backend
- **Java 17+** (instalado)
- **Oracle Database XE** (corriendo en `localhost:1521`)
- **Maven 3.6+** (para compilar)

### Frontend
- **Node.js 16+** (instalado)
- **npm 7+** o **yarn** (gestor de paquetes)

---

## 📋 Paso 1: Preparar Base de Datos Oracle

### Verificar Conexión a la Base de Datos

```bash
sqlplus DRHIAISHNA/Drhiaishna16@localhost:1521/XEPDB1
```

Si te conectas exitosamente, vuelve con:
```
exit
```

### Crear Tablas (si no existen)

Las tablas deberían estar creadas según la configuración de Hibernate con `ddl-auto=none`. Si necesitas crear tablas manualmente, ejecuta los scripts SQL en tu cliente Oracle.

---

## 🔧 Paso 2: Configurar y Ejecutar Backend

### 2.1 Navegar a la carpeta Backend

```bash
cd c:\Users\Cocas\Downloads\BastiWeko\Back
```

### 2.2 Verificar configuración

Abre el archivo `src/main/resources/application.properties` y verifica:

```properties
spring.datasource.url=jdbc:oracle:thin:@localhost:1521/XEPDB1
spring.datasource.username=DRHIAISHNA
spring.datasource.password=Drhiaishna16
```

### 2.3 Compilar el proyecto

```bash
mvn clean install
```

### 2.4 Ejecutar el Backend

**Opción A: Usando Maven**
```bash
mvn spring-boot:run
```

**Opción B: Usando Docker** (si tienes Docker instalado)
```bash
docker-compose up -d
```

### 2.5 Verificar que Backend está corriendo

Abre en tu navegador:
```
http://localhost:8080/hello-world
```

Deberías ver una respuesta JSON.

---

## 🎨 Paso 3: Configurar y Ejecutar Frontend

### 3.1 Navegar a la carpeta Frontend

```bash
cd c:\Users\Cocas\Downloads\BastiWeko\Front
```

### 3.2 Verificar archivo `.env`

Debe existir un archivo `.env` con:

```env
REACT_APP_API_URL=http://localhost:8080
REACT_APP_ENVIRONMENT=development
```

Si no existe, créalo.

### 3.3 Instalar dependencias

```bash
npm install
```

O si usas yarn:
```bash
yarn install
```

### 3.4 Ejecutar el Frontend en modo desarrollo

```bash
npm start
```

O con yarn:
```bash
yarn start
```

El navegador debería abrirse automáticamente en `http://localhost:3000`

---

## ✅ Paso 4: Verificar la Integración

### 4.1 Abrir DevTools

En el navegador (con el frontend corriendo):
- Presiona `F12` o `Ctrl+Shift+I`
- Ve a la pestaña **Network**

### 4.2 Probar una petición

1. En el Frontend, navega a una página que cargue datos (ej: Productos)
2. En Network tab, deberías ver peticiones a:
   - `http://localhost:8080/api/productos`
   - Status: `200 OK`
3. Si ves errores de CORS (status 403), verifica que el Backend tiene `@CrossOrigin`

### 4.3 Probar en la Consola del Navegador

Abre la consola (Ctrl+Shift+K o F12 → Console) y ejecuta:

```javascript
// Prueba 1: Ver si Axios está disponible
console.log(window.api);

// Prueba 2: Hacer una petición de prueba
fetch('http://localhost:8080/api/productos')
  .then(r => r.json())
  .then(data => console.log('Productos:', data))
  .catch(err => console.error('Error:', err));
```

---

## 🐛 Troubleshooting

### ❌ Error: "Cannot GET /api/productos"
- ✅ Backend no está corriendo → Ejecuta `mvn spring-boot:run`
- ✅ Puerto incorrecto → Backend debe estar en 8080
- ✅ Ruta de endpoint incorrecta → Verifica en los controladores

### ❌ Error: "CORS policy blocked"
```
Access to XMLHttpRequest from origin 'http://localhost:3000' has been blocked by CORS policy
```
- ✅ Verifica que Backend tiene `@CrossOrigin(origins = "*")`
- ✅ Reinicia Backend después de cambios
- ✅ Limpia el cache del navegador

### ❌ Error: "401 Unauthorized"
- ✅ Token Firebase no está siendo enviado
- ✅ Verifica que Firebase está inicializado en Frontend
- ✅ Revisa el interceptor en `src/api/axiosConfig.js`

### ❌ Error: "Connection refused to localhost:8080"
```
Cannot GET http://localhost:8080/api/productos
```
- ✅ Backend no está corriendo
- ✅ Verificar logs: `mvn spring-boot:run`
- ✅ Base de datos no está conectada

### ❌ Error: "Cannot connect to Oracle Database"
```
ORA-01017: invalid username/password; logon denied
```
- ✅ Usuario/contraseña incorrectos en `application.properties`
- ✅ Oracle Database no está corriendo
- ✅ Verifica la conexión manualmente con SQL Plus

### ❌ Productos/Servicios no cargan en el Frontend
1. Abre DevTools (F12)
2. Ve a Network tab
3. Busca peticiones a `/api/productos`
4. Si hay error, haz clic en la petición y ve qué dice
5. Si status es 404, verifica que el controlador existe en Backend
6. Si status es 500, revisa logs del Backend

---

## 📚 Comandos Útiles

### Backend

```bash
# Compilar sin ejecutar
mvn clean install

# Ejecutar con debug
mvn spring-boot:run -Dspring-boot.run.arguments="--debug"

# Ver logs en tiempo real
mvn spring-boot:run | grep ERROR

# Ejecutar en background (PowerShell)
Start-Job -ScriptBlock { mvn spring-boot:run }
```

### Frontend

```bash
# Instalar paquetes específicos
npm install axios

# Ejecutar tests
npm test

# Crear build para producción
npm run build

# Ejecutar en background (PowerShell)
Start-Job -ScriptBlock { npm start }
```

### Database (Oracle SQL Plus)

```bash
# Conectar a la base de datos
sqlplus DRHIAISHNA/Drhiaishna16@localhost:1521/XEPDB1

# Ver tablas
SELECT table_name FROM user_tables;

# Ver columnas de una tabla
DESC PRODUCTO;
```

---

## 🔐 Gestión de Secretos y Configuración

### Variables de Entorno para Backend

**Windows (PowerShell):**
```powershell
$env:SPRING_DATASOURCE_URL="jdbc:oracle:thin:@localhost:1521/XEPDB1"
$env:SPRING_DATASOURCE_USERNAME="DRHIAISHNA"
$env:SPRING_DATASOURCE_PASSWORD="Drhiaishna16"
mvn spring-boot:run
```

**Windows (CMD):**
```cmd
set SPRING_DATASOURCE_URL=jdbc:oracle:thin:@localhost:1521/XEPDB1
set SPRING_DATASOURCE_USERNAME=DRHIAISHNA
set SPRING_DATASOURCE_PASSWORD=Drhiaishna16
mvn spring-boot:run
```

### Variables de Entorno para Frontend

El archivo `.env` en la raíz del proyecto Frontend maneja las variables.

---

## 📤 Despliegue a Producción

### Backend (Heroku, AWS, etc.)

1. Compilar build final:
   ```bash
   mvn clean package -DskipTests
   ```

2. Distribuir JAR generado en `target/style-and-beauty-0.0.1-SNAPSHOT.jar`

3. Configurar variables de entorno en plataforma de hosting:
   ```
   SPRING_DATASOURCE_URL=jdbc:oracle:thin:@prod-db:1521/PROD
   SPRING_DATASOURCE_USERNAME=prod_user
   SPRING_DATASOURCE_PASSWORD=prod_password
   FIREBASE_KEY_PATH=/keys/serviceAccountKey.json
   ```

### Frontend (Vercel, Netlify, etc.)

1. Crear build optimizado:
   ```bash
   npm run build
   ```

2. Configurar variable de entorno en plataforma:
   ```
   REACT_APP_API_URL=https://api-produccion.tudominio.com
   ```

3. Desplegar carpeta `build/` resultante

---

## 📞 Soporte y Debugging

Si algo no funciona:

1. **Revisa los logs**
   - Backend: Terminal donde ejecutas `mvn spring-boot:run`
   - Frontend: DevTools (F12 → Console)

2. **Verifica conectividad**
   ```bash
   # ¿Backend responde?
   curl http://localhost:8080/hello-world
   
   # ¿Frontend se inició?
   # Abre http://localhost:3000 en el navegador
   ```

3. **Network tab en DevTools**
   - Mira exactamente qué petición se hace
   - Qué response recibe
   - Si hay errores CORS

4. **Limpia cache y reinicia**
   ```bash
   # Frontend
   npm start
   
   # Backend
   mvn spring-boot:run
   ```
