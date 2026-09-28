import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { initFlexible } from './lib/flexible.ts';

initFlexible({ recalculateOnResize: false, reloadOnDeviceChange: true });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
