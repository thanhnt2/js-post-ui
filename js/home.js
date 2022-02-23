import postApi from '../api/postApi'
import { initPagination, initSearch, renderPostList, renderPagination } from './utils'

async function handleFilterChange(filterName, filterValue) {
  // Update query params using history.pushState
  const url = new URL(window.location)
  url.searchParams.set(filterName, filterValue)

  // reset page if needed
  if (filterName === 'title_like') url.searchParams.set('_page', 1)

  history.pushState({}, '', url)

  // fetch API
  // re-render post list
  try {
    const { data, pagination } = await postApi.getAll(url.searchParams)
    renderPostList(data)
    renderPagination('pagination', pagination)
  } catch (error) {
    console.log('failed to get post list, ', error)
  }
}

function getDefaultParams() {
  const url = new URL(window.location)

  if (!url.searchParams.get('_page')) url.searchParams.set('_page', 1)
  if (!url.searchParams.get('_limit')) url.searchParams.set('_limit', 6)

  history.pushState({}, '', url)

  return url.searchParams
}

;(async () => {
  try {
    const queryParams = getDefaultParams()
    //const queryParams = new URLSearchParams(window.location.search)
    // set default query params if not existed
    initPagination({
      elementId: 'pagination',
      defaultParams: queryParams,
      onChange: (page) => handleFilterChange('_page', page),
    })

    initSearch({
      elementId: 'searchInput',
      defaultParams: queryParams,
      onChange: (value) => handleFilterChange('title_like', value),
    })

    const { data, pagination } = await postApi.getAll(queryParams)
    renderPostList(data)
    renderPagination('pagination', pagination)
  } catch (error) {
    console.log('get all failed', error)
  }
})()
