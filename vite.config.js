import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 对于 AiminLi-Hi.github.io 这种用户主页，必须设为 '/'
  base: '/', 
})