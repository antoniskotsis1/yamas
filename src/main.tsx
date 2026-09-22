import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { I18nProvider, isLang, langFromPath, pathFor } from './i18n/i18n'
import App from './App'
// self-hosted fonts (each file covers all subsets via unicode-range; browsers fetch only what a page uses)
import '@fontsource/figtree/400.css'
import '@fontsource/figtree/600.css'
import '@fontsource/figtree/700.css'
import '@fontsource/figtree/800.css'
import '@fontsource/tinos/400.css'
import '@fontsource/tinos/400-italic.css'
import '@fontsource/tinos/700.css'
import '@fontsource/commissioner/400.css'
import '@fontsource/commissioner/600.css'
import '@fontsource/commissioner/700.css'
import '@fontsource/commissioner/800.css'
import './index.css'

// Old links used ?lang=en — send them to the pre-rendered /en/ page.
const legacy = new URLSearchParams(window.location.search).get('lang')
if (isLang(legacy) && langFromPath(window.location.pathname) !== legacy) {
  window.location.replace(pathFor(legacy) + window.location.hash)
} else {
  const lang = langFromPath(window.location.pathname)
  const root = document.getElementById('root')!
  const app = (
    <StrictMode>
      <I18nProvider lang={lang}>
        <App />
      </I18nProvider>
    </StrictMode>
  )
  // Production pages are pre-rendered (scripts/prerender.mjs); the dev server serves an empty root.
  if (root.hasChildNodes()) hydrateRoot(root, app)
  else createRoot(root).render(app)
}
