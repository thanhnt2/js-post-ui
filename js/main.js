import axiosClient from '../api/axiosClient'
import postApi from '../api/postApi'

console.log('hello from main.js')

async function main() {
  // const response = await axiosClient.get('/posts')
  try {
    const queryParams = {
      _page: 1,
      _limit: 3,
    }

    const data = await postApi.getAll(queryParams)
    console.log(data)
  } catch (error) {
    console.log('get all failed', error)
  }
}

main()
