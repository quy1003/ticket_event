// Loads .env.local
const path = require('path')
const dotenv = require('dotenv')

// Load .env.local if exists, fallback to .env
const envPath = path.resolve(process.cwd(), '.env.local')
const fallback = path.resolve(process.cwd(), '.env')

const result = dotenv.config({ path: envPath })
if (result.error) {
  dotenv.config({ path: fallback })
}
// Registers ts-node
require('ts-node').register({
  compilerOptions: { module: 'commonjs' },
})

try {
  const tsConfigPaths = require('tsconfig-paths')
  tsConfigPaths.register({
    baseUrl: path.resolve(process.cwd()),
    paths: { '@/*': ['src/*'] },
  })
} catch (e) {
  console.log('tsconfig-paths not installed, skipping path mapping', e)
}

// Runs prisma/seed.ts
require(path.resolve(process.cwd(), 'prisma', 'seed.ts'))
