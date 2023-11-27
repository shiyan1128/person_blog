import request from '@/api'

export function test(query) {
  return request({
    url: '/test',
    method: 'get',
    params: query
  })
}

// export function searchContent() {
//   return request({
//     url: ''
//   })
// }

// 根据userid查询到user下所有文章
export const searchContentByUserId = (userId) => {
  return request.post('/user/searchContentUid', {
    user_id: userId
  })
}

// 新增文章
export const addArticle = (valueHtml, title) => {
  return request.post('/user/content', {
    content: valueHtml,
    title: title
  })
}
export const updateArticle = (articleId, articleTitle, articleContent) => {
  return request.post('/user/updateContent', {
    articleId: articleId,
    articleTitle: articleTitle,
    articleContent: articleContent
  })
}
