#!/usr/bin/env node

/**
 * inject-cap-plugins.mjs
 *
 * Injects custom native Capacitor plugins into the generated capacitor.config.json
 * for each platform. Capacitor CLI only auto-discovers npm-packaged plugins;
 * local Swift/Kotlin plugins must be added to `packageClassList` manually.
 *
 * Usage:
 *   node scripts/inject-cap-plugins.mjs          # inject for all platforms
 *   node scripts/inject-cap-plugins.mjs ios       # inject for iOS only
 *   node scripts/inject-cap-plugins.mjs android   # inject for Android only
 *
 * This script is idempotent — safe to run multiple times.
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const webRoot = resolve(__dirname, '..');

// ─── Custom plugin class names ───────────────────────────────────────────────
// Add new custom native plugins here. These must match the @objc(ClassName)
// annotation in Swift and the CAP_PLUGIN() macro in the .m bridge file.
const CUSTOM_PLUGINS = [
  'WifiConfigPlugin',
  'WifiInfoPlugin',
  'SignificantLocationPlugin',
];

// ─── Platform config paths ───────────────────────────────────────────────────
const PLATFORM_CONFIGS = {
  ios: resolve(webRoot, 'ios/App/App/capacitor.config.json'),
  android: resolve(webRoot, 'android/app/src/main/assets/capacitor.config.json'),
};

function injectPlugins(platform, configPath) {
  if (!existsSync(configPath)) {
    console.log(`  ⏭  ${platform}: config not found at ${configPath}, skipping`);
    return;
  }

  const raw = readFileSync(configPath, 'utf8');
  const config = JSON.parse(raw);

  if (!Array.isArray(config.packageClassList)) {
    config.packageClassList = [];
  }

  let added = 0;
  for (const plugin of CUSTOM_PLUGINS) {
    if (!config.packageClassList.includes(plugin)) {
      config.packageClassList.push(plugin);
      added++;
    }
  }

  writeFileSync(configPath, JSON.stringify(config, null, '\t') + '\n');

  if (added > 0) {
    console.log(`  ✅ ${platform}: injected ${added} custom plugin(s) → [${CUSTOM_PLUGINS.join(', ')}]`);
  } else {
    console.log(`  ✅ ${platform}: all custom plugins already present`);
  }
}

// ─── Main ────────────────────────────────────────────────────────────────────
const requestedPlatform = process.argv[2]; // 'ios', 'android', or undefined (all)

console.log('🔌 Injecting custom native Capacitor plugins...');

if (requestedPlatform) {
  const configPath = PLATFORM_CONFIGS[requestedPlatform];
  if (!configPath) {
    console.error(`  ❌ Unknown platform: ${requestedPlatform}`);
    process.exit(1);
  }
  injectPlugins(requestedPlatform, configPath);
} else {
  for (const [platform, configPath] of Object.entries(PLATFORM_CONFIGS)) {
    injectPlugins(platform, configPath);
  }
}
