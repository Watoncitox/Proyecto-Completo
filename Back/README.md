🚀 DevOps EP2 – Pipeline CI/CD con GitHub Actions, Docker Hub y Snyk

Autor: Bastián Sanches
Asignatura: Ingeniería DevOps — Duoc UC
Evaluación: EP2
Fecha: 2025

Este proyecto implementa un pipeline CI/CD completo utilizando GitHub Actions, Docker Hub, Snyk y un despliegue simulado, orientado a asegurar un flujo moderno, automatizado y seguro para aplicaciones Java/Spring Boot.

📚 Tecnologías utilizadas
Herramienta	Uso
Spring Boot	Backend del proyecto
Java 17	Versión utilizada
Maven	Construcción del proyecto
GitHub Actions	Automatización CI/CD
Snyk Security	Escaneo de vulnerabilidades
Docker Desktop	Contenedores locales
Docker Hub	Registro de imágenes
🧱 Arquitectura del Pipeline

El pipeline se encuentra en:

.github/workflows/ci-cd.yml


El flujo contiene 4 etapas principales:

1️⃣ Build & Test

Compila el proyecto utilizando Maven y ejecuta las pruebas automatizadas.

- name: Build & Test
  run: mvn -B package --file pom.xml

2️⃣ Snyk Security Scan

Escanea dependencias Maven en busca de vulnerabilidades críticas o altas.
Si detecta fallas graves → el pipeline se detiene.

- name: Snyk Security Scan
  uses: snyk/actions/maven@master

3️⃣ Build Docker Image & Push to Docker Hub

Construye la imagen Docker basada en tu Dockerfile y la publica en Docker Hub.

Ejemplo del proceso:

docker build -t watoncitox/devops_ep2:latest .
docker push watoncitox/devops_ep2:latest

4️⃣ Deploy (Simulado)

Dado que AWS no está disponible, se ejecuta un despliegue simulado:

✔ Descarga la imagen desde Docker Hub
✔ Levanta el contenedor localmente
✔ Valida que arranca correctamente

Esto permite cumplir con la rúbrica sin usar infraestructura pagada.

🐳 Dockerfile del proyecto
FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY target/style-and-beauty-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

🔐 GitHub Secrets configurados

Los siguientes secretos fueron necesarios para que el pipeline funcionara:

Secret	Uso
DOCKER_USERNAME	Usuario de Docker Hub
DOCKER_PASSWORD	Token PAT de Docker Hub
SNYK_TOKEN	Token privado de Snyk
📸 Evidencias de la ejecución

Este repositorio incluye (o se incluirán en /docs):

✔ Capturas del pipeline ejecutándose
✔ Resultado del escaneo de Snyk
✔ Imagen publicada en Docker Hub
✔ Log del despliegue simulado exitoso

▶ Cómo ejecutar el proyecto localmente
1. Clonar el repositorio
git clone https://github.com/Watoncitox/DEVOPS_EP2.git
cd DEVOPS_EP2

2. Compilar con Maven
mvn clean package

3. Construir imagen Docker manualmente
docker build -t devops_ep2 .

4. Ejecutar el contenedor
docker run -p 8080:8080 devops_ep2

📌 Resultado Final

Este pipeline garantiza:

✔ Integración continua automática
✔ Seguridad continua con Snyk
✔ Construcción y despliegue automatizados
✔ Publicación en Docker Hub
✔ Operación confiable y trazabilidad completa

📞 Contacto

Bastián Sanches
Estudiante de Ingeniería Informática – Duoc UC
GitHub: https://github.com/Watoncitox
