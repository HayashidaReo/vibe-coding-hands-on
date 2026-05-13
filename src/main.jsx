import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SecurityGithubSlide from './SecurityGithubSlide.jsx'
import TableOfContents from './TableOfContents.jsx'

const basePath = new URL(import.meta.env.BASE_URL, window.location.origin).pathname.replace(/\/$/, '')

const applyRedirectPath = () => {
  const currentUrl = new URL(window.location.href)
  const redirectedPath = currentUrl.searchParams.get('p')

  if (!redirectedPath) return

  currentUrl.searchParams.delete('p')
  const normalizedRedirectPath = redirectedPath.startsWith('/') ? redirectedPath : `/${redirectedPath}`
  const nextPath = `${basePath}${normalizedRedirectPath}`.replace(/\/+/g, '/')
  const nextSearch = currentUrl.searchParams.toString()
  const nextUrl = `${nextPath}${nextSearch ? `?${nextSearch}` : ''}${currentUrl.hash}`

  window.history.replaceState(null, '', nextUrl)
}

applyRedirectPath()

const resolveRoute = () => {
  const pathname = window.location.pathname
  const strippedPath = basePath && pathname.startsWith(basePath)
    ? pathname.slice(basePath.length)
    : pathname
  const withLeadingSlash = strippedPath.startsWith('/') ? strippedPath : `/${strippedPath}`
  return withLeadingSlash.replace(/\/$/, '') || '/'
}

const normalizedPath = resolveRoute()
const pages = {
  '/': TableOfContents,
  '/hands-on': App,
  '/security': SecurityGithubSlide,
  '/security-github': SecurityGithubSlide,
}
const CurrentPage = pages[normalizedPath] ?? TableOfContents

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CurrentPage />
  </StrictMode>,
)
