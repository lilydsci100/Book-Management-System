import { request } from "../utils/request"

export function getBookListAPI () {
  return request({
    url: "/books",
    method: 'GET',
  })
}

export function getResultAPI (params) {
  return request({
    url: "/search",
    method: 'GET',
    params
  })
}

export function creatBookAPI (params) {
  return request({
    url: "/req",
    method: 'POST',
    params
  })
}


export function deleteBookAPI (list, object) {
  return request({
    url: "/delete",
    method: 'DELETE',
    data: { list, object }
  })
}

export function getBookById (id) {
  return request({
    url: `/books/${id}`,
    method: 'GET',
  })
}

export function updateBook (object,id) {
  console.log('Update Book Request:', { object, id }); 
  return request({
    url: '/edit',
    method: 'PUT',
    data: { object, id }
  })
}