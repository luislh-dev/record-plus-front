import { spawnSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';

const tempDir = join(process.cwd(), '.temp-build');

// Función helper más simple para Windows
function runCommand(command, args = [], options = {}) {
  const isWindows = process.platform === 'win32';

  // En Windows, usar shell solo para encontrar comandos, pero sin interpretar
  const result = spawnSync(command, args, {
    stdio: options.stdio || 'pipe',
    env: options.env || process.env,
    cwd: options.cwd || process.cwd(),
    shell: isWindows, // Solo en Windows para resolver paths
    encoding: 'utf8',
  });

  if (result.error) {
    throw new Error(`Error ejecutando ${command}: ${result.error.message}`);
  }

  if (result.status !== 0) {
    throw new Error(`Command failed (${result.status}): ${result.stderr || result.stdout}`);
  }

  return result.stdout;
}

try {
  // 1. Crear directorio temporal
  if (!existsSync(tempDir)) {
    mkdirSync(tempDir);
  }

  // 2. Obtener archivos en staging
  console.log('Obteniendo archivos en staging...');
  const gitOutput = runCommand('git', ['diff', '--cached', '--name-only']);

  const stagedFiles = gitOutput
    .trim()
    .split('\n')
    .filter((file) => file && file.length > 0);

  if (stagedFiles.length === 0) {
    console.log('No hay archivos en staging para verificar.');
    process.exit(0);
  }

  console.log(`Encontrados ${stagedFiles.length} archivos en staging`);

  // 3. Copiar archivos staged
  console.log('Copiando archivos staged...');
  for (const file of stagedFiles) {
    if (file && existsSync(file)) {
      const targetPath = join(tempDir, file);
      const targetDir = dirname(targetPath);

      if (!existsSync(targetDir)) {
        mkdirSync(targetDir, { recursive: true });
      }

      copyFileSync(file, targetPath);
    }
  }

  // 4. TypeScript check
  console.log('Ejecutando TypeScript check...');
  runCommand('npx', ['tsc', '--noEmit'], {
    stdio: 'inherit',
  });

  // 5. Build
  console.log('Ejecutando build...');
  runCommand('npx', ['vite', 'build'], {
    stdio: 'inherit',
  });

  // 6. Lint
  console.log('Ejecutando lint en archivos staged...');
  runCommand('npm', ['run', 'lint:staged'], {
    stdio: 'inherit',
  });

  // 7. Limpiar
  rmSync(tempDir, { recursive: true, force: true });

  console.log('✅ Build test completado exitosamente!');
  process.exit(0);
} catch (error) {
  console.error('❌ Error en el build test:', error.message);
  if (existsSync(tempDir)) {
    rmSync(tempDir, { recursive: true, force: true });
  }
  process.exit(1);
}
