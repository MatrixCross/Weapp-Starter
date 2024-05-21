import { defineConfig, presetIcons } from 'unocss'
import presetWeapp from 'unocss-preset-weapp'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'

export default defineConfig({
  include: [/\.wxml$/],
  presets: [
    presetWeapp(),
    presetIcons({
      scale: 1,
      warn: true,
      extraProperties: {
        display: 'inline-block',
      },
      collections: {
        local: FileSystemIconLoader('./src/assets/svg'),
      },
    }),
  ],
})
