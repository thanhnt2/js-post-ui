import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { setTextContent, truncateText } from './common'

// to use fromNow function
dayjs.extend(relativeTime)

function createPostElement(post) {
  if (!post) return
  // find and clone template
  const postTemplate = document.getElementById('postTemplate')
  if (!postTemplate) return

  const liElement = postTemplate.content.firstElementChild.cloneNode(true)
  if (!liElement) return

  // update title, description, author, thumbnail
  setTextContent(liElement, '[data-id="title"]', post.title)
  setTextContent(liElement, '[data-id="description"]', truncateText(post.description, 100))
  setTextContent(liElement, '[data-id="author"]', post.author)

  // const descriptionElement = liElement.querySelector('[data-id="description"]')
  // if (descriptionElement) descriptionElement.textContent = post.description

  // const authorElement = liElement.querySelector('[data-id="author"]')
  // if (authorElement) authorElement.textContent = post.author

  // calculate timeSpan
  // console.log('timeSpan', dayjs(post.updateAt).fromNow())
  setTextContent(liElement, '[data-id="timeSpan"]', ` - ${dayjs(post.updateAt).fromNow()}`)

  const thumbnailElement = liElement.querySelector('[data-id="thumbnail"]')
  if (thumbnailElement) {
    thumbnailElement.src = post.imageUrl

    thumbnailElement.addEventListener('error', () => {
      thumbnailElement.src = 'https://via.placeholder.com/1368x400?text=thumbnail'
      console.log('load image error --> use default placeholder')
    })
  }
  // attach events
  // go to post detail when click on div.post-item
  const divElement = liElement.firstElementChild
  divElement.addEventListener('click', () => {
    window.location.assign(`post-detail.html?id=${post.id}`)
  })

  return liElement
}

export function renderPostList(postList) {
  console.log({ postList })
  if (!Array.isArray(postList)) return

  const ulElement = document.getElementById('postList')
  if (!ulElement) return

  ulElement.textContent = ''

  postList.forEach((post) => {
    const liElement = createPostElement(post)
    ulElement.appendChild(liElement)
  })
}
