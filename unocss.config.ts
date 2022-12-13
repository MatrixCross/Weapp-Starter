import { defineConfig } from 'unocss'
import presetWeapp from 'unocss-preset-weapp'
export default defineConfig({
  include: [/\.wxml$/],
  presets: [presetWeapp()],
})
