export function renderPagination(elementId, pagination) {
  const ulPagination = document.getElementById(elementId)
  if (!pagination || !ulPagination) return

  // calc totalPages
  const { _page, _limit, _totalRows } = pagination
  const totalPages = Math.ceil(_totalRows / _limit)

  // save page and totalPages to ulPagination
  ulPagination.dataset.page = _page
  ulPagination.dataset.totalPages = totalPages

  // check if enable/disable prev/next link
  if (_page <= 1) ulPagination.firstElementChild?.classList.add('disabled')
  else ulPagination.firstElementChild?.classList.remove('disabled')

  if (_page >= totalPages) ulPagination.lastElementChild?.classList.add('disabled')
  else ulPagination.lastElementChild?.classList.remove('disabled')
}

// function handlePrevClick(e) {
//   e.preventDefault()

//   const ulPagination = getPaginationElement()
//   if (!ulPagination) return

//   const page = Number.parseInt(ulPagination.dataset.page) || 1
//   if (page <= 1) return

//   handleFilterChange('_page', page - 1)
// }

// function handleNextClick(e) {
//   e.preventDefault()
//   const ulPagination = getPaginationElement()
//   if (!ulPagination) return

//   const page = Number.parseInt(ulPagination.dataset.page) || 1
//   const totalPages = Number.parseInt(ulPagination.dataset.totalPages)
//   if (page >= totalPages) return

//   handleFilterChange('_page', page + 1)
// }

export function initPagination({ elementId, defaultParams, onChange }) {
  // bind click event for prev/next link
  const ulPagination = document.getElementById(elementId)
  if (!ulPagination) return

  // set current active page
  // TODO: use default params

  // add click event for prev link
  const prevLink = ulPagination.firstElementChild?.firstElementChild
  if (prevLink) {
    prevLink.addEventListener('click', (e) => {
      e.preventDefault()

      const page = Number.parseInt(ulPagination.dataset.page) || 1
      if (page > 2) onChange?.(page - 1)
    })
  }

  const nextLink = ulPagination.lastElementChild?.firstElementChild
  if (nextLink) {
    nextLink.addEventListener('click', (e) => {
      e.preventDefault()

      const page = Number.parseInt(ulPagination.dataset.page) || 1
      const totalPages = Number.parseInt(ulPagination.dataset.totalPages)
      if (page < totalPages) onChange?.(page + 1)
    })
  }
}
