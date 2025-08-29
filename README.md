# 🎮 PokéTier – Tier List de Pokémon

## 📌 Descripción

PokéTier es una aplicación web desarrollada en **Angular 17** que permite crear tu propia **Tier List de Pokémon de la primera generación (Kanto)**.  

Incluye:  
✅ Navegador de Pokémon con paginación  
✅ Filtros por nombre, ID y tipo  
✅ Sistema drag & drop para arrastrar Pokémon a diferentes tiers  
✅ Guardado dinámico de la lista en el navegador  
✅ Diseño responsive  

Este proyecto surge como práctica de **desarrollo web**, utilizando la **PokéAPI** como fuente de datos.  

🔜 En el futuro está previsto mejorar el drag & drop para hacerlo completamente accesible mediante teclado y lectores de pantalla.

## 🛠️ Tecnologías y Herramientas

- **Angular 17+** → Framework principal  
- **TypeScript** → Tipado estático y mantenimiento del código  
- **PokéAPI** → API REST pública con datos de Pokémon  
- **HTML5 + CSS3** → Maquetación y estilos nativos  
- **RxJS** → Gestión de peticiones asíncronas y streams de datos  
- **Drag & Drop nativo** → Implementado con eventos del DOM  
- **Paginación y filtros personalizados** → Control de búsqueda y navegación de Pokémon  

## 🚀 Instalación y Uso

### Clonar el repositorio

Instalar dependencias
```npm install```

Ejecutar en desarrollo
```ng serve```

Abre en 👉 http://localhost:4200/

🎨 Vista Previa

(Aquí puedes poner un GIF o capturas de tu aplicación)

Ejemplo:
```src/
├── app/
│   ├── components/
│   │   ├── browser-pokemon/   → Listado y paginación
│   │   ├── pokemon-card/      → Tarjeta de Pokémon
│   │   ├── tier/              → Contenedor de tiers
│   │   ├── pokefilters/       → Filtros de búsqueda
│   │   └── paginator/         → Control de paginación
│   ├── services/              → Servicio PokéAPI
│   └── app.component.ts       → Raíz de la aplicación
├── assets/                    → Imágenes y recursos
└── styles.css                 → Estilos globales
```


🤝 Contribuciones

¡Las PRs y sugerencias son bienvenidas!

Si quieres contribuir:

Haz un fork 🍴

Crea una rama feature/nueva-funcionalidad

Sube tus cambios con un commit claro

Abre un Pull Request 🚀

📜 Licencia

Este proyecto está bajo la licencia MIT.
Pokémon y sus sprites pertenecen a The Pokémon Company y se usan aquí solo con fines educativos.

👨‍💻 Autor

Javier Ortiz
💼 Desarrollador Web & Ciberseguridad
git clone https://github.com/tu-usuario/poketier.git
cd poketier
