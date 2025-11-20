import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 注意：如果你的仓库名是 "用户名.github.io"，这里填 '/'
  // 如果仓库名是其他名字(比如 "my-web")，这里填 '/my-web/'
  base: '/', 
})