import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './routes'
import { ThemeProvider } from './providers/theme.provider'
// import { Toaster } from "sonner";
import { Toaster } from "react-hot-toast";
import { store } from './redux/store'
import { Provider as ReduxProvider } from "react-redux";
ReactDOM.createRoot(document.getElementById('root')!).render(
   <React.StrictMode>
   <ReduxProvider store={store}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
        {/* <Toaster richColors /> */}
        <Toaster position="top-center" reverseOrder={false} />
      </ThemeProvider>
    </ReduxProvider>
  </React.StrictMode>
)
