// Server entry used only at build time by scripts/prerender.mjs.
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { I18nProvider } from './i18n/i18n'
import App from './App'

export { LANGS } from './i18n/dict'
export { pathFor } from './i18n/i18n'
export { headTags, sitemap } from './lib/seo'
export { site } from './content'

export function render(lang: import('./i18n/dict').Lang) {
  return renderToString(
    <StrictMode>
      <I18nProvider lang={lang}>
        <App />
      </I18nProvider>
    </StrictMode>,
  )
}
