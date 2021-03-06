function showModal(modalElement) {
  // make sure bootstrap script is loaded
  if (!window.bootstrap) return

  var myModal = new window.bootstrap.Modal(modalElement)

  if (myModal) myModal.show()
}

export function registerLightBox({ modalId, imgSelector, prevSelector, nextSelector }) {
  const modalElement = document.getElementById(modalId)
  if (!modalElement) return

  // selectors
  const imageElement = modalElement.querySelector(imgSelector)
  const prevButton = modalElement.querySelector(prevSelector)
  const nextButton = modalElement.querySelector(nextSelector)
  if (!imageElement || !prevButton || !nextButton) return

  // lightbox vars
  let imgList = []
  let currentIndex = 0

  function showImageAtIndex(index) {
    imageElement.src = imgList[index].src
  }

  // handle click for all imgs --> Event Delegation
  // img click --> find all imgs with the same album / gallery
  // determine index of selected img
  // show modal with selected img
  // handle prev / next click

  document.addEventListener('click', (e) => {
    console.log(e.target)
    const { target } = e
    if (target.tagName !== 'IMG' || !target.dataset.album) return

    imgList = document.querySelectorAll(`img[data-album="${target.dataset.album}"]`)
    currentIndex = [...imgList].findIndex((x) => x === target)
    console.log('img click: ', target, currentIndex, imgList)

    showImageAtIndex(currentIndex)
    showModal(modalElement)
  })

  prevButton.addEventListener('click', () => {
    //show prev image of current album
  })

  nextButton.addEventListener('click', () => {
    //show next image of current album
  })
}
