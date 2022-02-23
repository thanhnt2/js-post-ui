import { registerLightBox, setTextContent } from './utils'
import postApi from '../api/postApi'
import dayjs from 'dayjs'

// id="goToEditPageLink"
// id="postHeroImage"
// id="postDetailTitle"
// id="postDetailAuthor"
// id="postDetailTimeSpan"
// id="postDetailDescription"

// author: "Demarcus Spencer"
// createdAt: 1633700485639
// description: "voluptas vel id cupiditate id quia quo tenetur porro sunt error nesciunt explicabo et et quia cupiditate a qui ut ea ullam laboriosam ipsa quisquam eligendi a dolores rerum repellendus dolorum debitis in soluta quis ratione eaque mollitia eius provident qui laborum similique quidem ullam dolorem exercitationem eum vero voluptatem"
// id: "sktwi1cgkkuif36dk"
// imageUrl: "https://picsum.photos/id/327/1368/400"
// title: "Labore aut"
// updatedAt: 1633700485639
function renderPostDetail(post) {
  if (!post) return

  // id="postDetailTitle"
  // id="postDetailAuthor"
  // id="postDetailTimeSpan"
  // id="postDetailDescription"

  setTextContent(document, '#postDetailTitle', post.title)
  setTextContent(document, '#postDetailAuthor', post.author)
  setTextContent(document, '#postDetailDescription', post.description)
  setTextContent(
    document,
    '#postDetailTimeSpan',
    dayjs(post.updateAt).format(' - DD/MM/YYYY HH:mm')
  )

  // id="postHeroImage"
  const heroImage = document.getElementById('postHeroImage')
  if (heroImage) {
    heroImage.style.backgroundImage = `url("${post.imageUrl}")`

    heroImage.addEventListener('error', () => {
      heroImage.src = 'https://via.placeholder.com/1368x400?text=thumbnail'
    })
  }

  // id="goToEditPageLink"
  const editPageLink = document.getElementById('goToEditPageLink')
  if (editPageLink) {
    editPageLink.href = `/add-edit-post.html?id=${post.id}`
    editPageLink.innerHTML = '<i class="fas fa-edit"></i>Edit Post'
  }
}
;(async () => {
  registerLightBox({
    modalId: 'lightbox',
    imgSelector: 'img[data-id="lightboxImg"]',
    prevSelector: 'button[data-id="lightboxPrev"]',
    nextSelector: 'button[data-id="lightboxNext"]',
  })

  // get post id from URL
  // fetch post detail API
  // render post detail
  try {
    const searchParams = new URLSearchParams(window.location.search)
    const postId = searchParams.get('id')
    if (!postId) {
      console.log('Post not found')
      return
    }

    const post = await postApi.getById(postId)

    renderPostDetail(post)
  } catch (error) {
    console.log('failed to fetch post')
  }
})()
