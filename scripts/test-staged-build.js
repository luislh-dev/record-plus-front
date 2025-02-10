import { execSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

try {
  // 1. Crear un directorio temporal
  const tempDir = join(process.cwd(), '.temp-build');
  if (!existsSync(tempDir)) {
    mkdirSync(tempDir);
  }

  // 2. Obtener los archivos en staging
  const stagedFiles = execSync('git diff --cached --name-only').toString().trim().split('\n');

  // 3. Copiar los archivos staged al directorio temporal manteniendo la estructura
  for (const file of stagedFiles) {
    if (file) {
      const targetPath = join(tempDir, file);
      const targetDir = dirname(targetPath);

      if (!existsSync(targetDir)) {
        mkdirSync(targetDir, { recursive: true });
      }

      copyFileSync(file, targetPath);
    }
  }

  // 4. Ejecutar TypeScript check usando npx
  console.log('Ejecutando TypeScript check...');
  execSync('npx tsc --noEmit', { stdio: 'inherit' });

  // 5. Intentar hacer el build
  console.log('Ejecutando build...');
  execSync('npx vite build', { stdio: 'inherit' });

  // 6. Ejecutar lint en los archivos staged
  console.log('Ejecutando lint en archivos staged...');
  execSync('npm run lint:staged', { stdio: 'inherit' });

  // 7. Limpiar
  rmSync(tempDir, { recursive: true, force: true });

  console.log('✅ Build test completado exitosamente!');
  process.exit(0);
} catch (error) {
  console.error('❌ Error en el build test:', error.message);
  // Asegurarse de limpiar en caso de error
  const tempDir = join(process.cwd(), '.temp-build');
  if (existsSync(tempDir)) {
    rmSync(tempDir, { recursive: true, force: true });
  }
  process.exit(1);
}
