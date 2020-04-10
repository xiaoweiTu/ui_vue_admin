import request from '@/utils/request'

export function getSettings(params) {
  return request({
    url: '/web/settings',
    method: 'get',
    params
  })
}

export function getArticleCount(params) {
  return request({
    url: '/web/totalArticles',
    method: 'get',
    params
  })
}

export function getClickedCount(params) {
  return request({
    url: '/web/totalClicked',
    method: 'get',
    params
  })
}

export function getArticlesInSeven(params) {
  return request({
    url: '/web/articlesInSeven',
    method: 'get',
    params
  })
}
export function getClickedInSeven(params) {
  return request({
    url: '/web/clickedInSeven',
    method: 'get',
    params
  })
}

export function getSelfIntro(params) {
  return request({
    url: '/self_intro/index',
    method: 'get',
    params
  })
}

export function getHomeIntro(params) {
  return request({
    url: '/self_intro/homeLook',
    method: 'get',
    params
  })
}

export function editIntroPassword(data) {
  return request({
    url: '/self_intro/editPassword',
    method: 'post',
    data
  })
}
