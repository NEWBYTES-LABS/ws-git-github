# Aplicación Pura Suerte

Pura Suerte es una pequeña aplicación web para tomar decisiones rápidas:

- **Lanzar una moneda**: Lanza una moneda virtual y obtén cara o cruz.
- **Número aleatorio**: Genera un número entero entre dos límites, incluidos.
- **Sorteo**: Introduce un nombre o elemento por línea y elige un ganador al azar.

## Tecnología

La aplicación es un sitio web estático creado con:

- HTML
- CSS
- jQuery
- Bootstrap CSS and JavaScript
- Bootstrap Icons
- La API Web Crypto del navegador para generar valores aleatorios

No requiere Node.js, npm, compilación, backend ni instalación de paquetes.

## Ejecutar la aplicación

Abre `src/index.html` directamente en un navegador o sirve la carpeta `src/` desde cualquier servidor web estático.

La página carga Bootstrap, jQuery y fuentes web desde CDN, por lo que necesita conexión a internet salvo que esos recursos se descarguen y se incluyan localmente.

## Rutas

The app uses hash routes so it works from a local file and from a basic static host:

| Ruta | Propósito |
| --- | --- |
| `#/` | Menú principal |
| `#/coin` | Lanzamiento de moneda |
| `#/number` | Generador de números aleatorios |
| `#/raffle` | Selector de ganador para sorteos |

## Estructura del proyecto

```text
src/
  index.html
  css/
    styles.css
  js/
    app.js
.github/
  ISSUE_TEMPLATE/
  PULL_REQUEST_TEMPLATE.md
```

## Aleatoriedad y comportamiento

Los valores aleatorios usan `crypto.getRandomValues()` con muestreo por rechazo para evitar rangos sesgados. Las entradas del sorteo eliminan espacios al principio y al final de cada línea, ignoran las líneas vacías y cuentan las entradas duplicadas como oportunidades independientes.
