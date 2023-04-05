# BOE·GPT

Aplicación que resume el Boletín Oficial del Estado de España (BOE) empleando Inteligencia Artificial (Chat-GPT).

## Changelog

* Version 1.0:
    - Resumen del día actual.
    - Resumen por fecha.
    - Aspectos positivos y negativos de las medidas.


* Version 2.0 (WIP)


## Setup

### NPM

---

* Instalación de dependencias y despliegue de desarrollo

```bash
npm i
```
```bash
npm run dev
```
### DOCKER
---

* Creación de base de datos

```
docker-compose up -d
```

* Build de la imagen

```
docker build -t boegpt .
```

* Despliegue de la imagen en local
```
docker run --name=next-app -p 3000:3000 boegpt
```

* URL local de MongoDB:

```
mongodb://localhost:27017/boegpt
```