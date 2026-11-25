const ALLOWED_SELECTOR = [
  '#root',
  '.app',
  '.toast',
  '.equilibra-fixed',
  '[data-equilibra-ui]',
  'vite-error-overlay',
  'vite-plugin-checker-error-overlay',
].join(',')

const SAFE_TAGS = new Set([
  'SCRIPT',
  'STYLE',
  'LINK',
  'META',
  'NOSCRIPT',
  'TEMPLATE',
])

/**
 * Detecta únicamente overlays ajenos a #root con posición fija y una capa muy
 * alta. No inspecciona ni modifica la interfaz React de Equilibra.
 */
function quarantineExternalOverlay(element: HTMLElement, appRoot: HTMLElement) {
  if (appRoot.contains(element) || SAFE_TAGS.has(element.tagName)) return
  if (element.matches(ALLOWED_SELECTOR) || element.closest(ALLOWED_SELECTOR)) return

  const style = window.getComputedStyle(element)
  if (style.position !== 'fixed' && style.position !== 'sticky') return

  const zIndex = Number.parseInt(style.zIndex, 10)
  if (!Number.isFinite(zIndex) || zIndex < 1000) return

  const bounds = element.getBoundingClientRect()
  if (bounds.width < 80 || bounds.height < 32) return

  element.dataset.equilibraBlocked = 'true'
  element.setAttribute('aria-hidden', 'true')
  element.inert = true
  element.remove()
}

function inspectNode(node: Node, appRoot: HTMLElement) {
  if (!(node instanceof HTMLElement)) return

  quarantineExternalOverlay(node, appRoot)
  node.querySelectorAll<HTMLElement>('*').forEach((element) => {
    quarantineExternalOverlay(element, appRoot)
  })
}

export function installOverlayProtection() {
  const appRoot = document.getElementById('root')
  if (!appRoot) return () => undefined

  appRoot.dataset.equilibraUi = 'true'

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => inspectNode(node, appRoot))
      } else if (mutation.target instanceof HTMLElement) {
        quarantineExternalOverlay(mutation.target, appRoot)
      }
    }
  })

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class', 'style'],
  })

  document.body.querySelectorAll<HTMLElement>('body > *').forEach((element) => {
    inspectNode(element, appRoot)
  })

  return () => observer.disconnect()
}
