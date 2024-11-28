import { ApiException } from '@/services/apiException.js'

export async function findAlbums(pageNumber, pageSize) {
    const url = `https://jsonplaceholder.typicode.com/albums?_page=${pageNumber}&_limit=${pageSize}`
    const response = await fetch(url)
    if (!response.ok) {
      throw new ApiException(response.status)
    }
    return await response.json()
}

export async function findAllAlbums() {
    const url = `https://jsonplaceholder.typicode.com/albums`
    const response = await fetch(url)
    if (!response.ok) {
      throw new ApiException(response.status)
    }
    return await response.json()
}

export async function findAlbumById(id) {
    const url = `https://jsonplaceholder.typicode.com/albums/${id}`
    const response = await fetch(url)
    if (!response.ok) {
      throw new ApiException(response.status)
    }
    return await response.json()
}

export async function findAlbumPhotosByIdAndPaginationSize(id, pageNumber, pageSize) {
    const url = `https://jsonplaceholder.typicode.com/albums/${id}/photos?_page=${pageNumber}&_limit=${pageSize}`
    const response = await fetch(url)
    if (!response.ok) {
      throw new ApiException(response.status)
    }
    return await response.json()
}


