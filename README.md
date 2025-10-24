# E-Mark Marketplace

Marketplace multi-vendedor construido con Next.js 16 y Supabase.

## Configuración

### 1. Instalar dependencias

\`\`\`bash
npm install
# o
pnpm install
\`\`\`

### 2. Configurar Supabase

Ejecuta los scripts SQL en tu panel de Supabase (SQL Editor):

1. `scripts/01_create_tables.sql` - Crea las tablas
2. `scripts/02_seed_data.sql` - Inserta datos de ejemplo

### 3. Variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=https://bhumjttmayejuvqjowgg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_aqui
\`\`\`

**Para Vercel:** Agrega estas mismas variables en el dashboard de Vercel:
- Ve a tu proyecto en Vercel
- Settings → Environment Variables
- Agrega ambas variables (NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY)

### 4. Ejecutar en desarrollo

\`\`\`bash
npm run dev
\`\`\`

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Deploy en Vercel

1. Conecta tu repositorio de GitHub a Vercel
2. Agrega las variables de entorno en Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Deploy automático

## Características

- 🛍️ Catálogo de productos
- 🔍 Búsqueda y filtros
- 🛒 Carrito de compras
- ❤️ Lista de favoritos
- 👤 Autenticación de usuarios
- 📦 Panel de vendedor
- 🎨 Diseño responsive
