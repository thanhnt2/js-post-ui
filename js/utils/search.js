import debounce from 'lodash.debounce'

export function initSearch({ elementId, defaultParams, onChange }) {
  const searchInput = document.getElementById(elementId)
  if (!searchInput) return

  // set default values from query params
  // title_like
  //const queryParams = new URLSearchParams(window.location.search)

  if (defaultParams.get('title_like')) searchInput.value = defaultParams.get('title_like')

  const debounceSearch = debounce((e) => onChange?.(e.target.value), 500)

  searchInput.addEventListener('input', debounceSearch)
}
