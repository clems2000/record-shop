import { findAlbumPhotosByIdAndPaginationSize, findAlbums, findAllAlbums } from '@/services/albumsApi.js'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { ApiException } from '@/services/apiException.js'
import { findAlbumById } from '@/services/albumsApi.js'
import { setMockData } from '@/utils/testHelper.js'


describe('albumsApi', () => {

  afterEach(() => {
    vi.restoreAllMocks();
  })

  describe('findAlbums function', () => {
    it('returns albumsReference data when requested', async () => {
      const mockData = [{id: 1, title: 'test'}];
      const fetchMock = setMockData(mockData);

      const result = await findAlbums(1, 10);
      expect(result.length).toEqual(1);
      expect(result).toEqual(mockData);
    })

    it('handles the 404 not found', async () => {
      const mockData = {};
      const fetchMock = setMockData(mockData, 404, false);

      const expectedError = new ApiException(404)
      try {
        await findAlbums(1, 10)
      } catch (e) {
        expect(e).toBeInstanceOf(ApiException)
        expect(e.status).toEqual(expectedError.status)
      }
    })

    it('handles the 500 Server error', async () => {
      const mockData = {};
      const fetchMock = setMockData(mockData, 500, false);

      const expectedError = new ApiException(500)
      try {
        await findAlbums(1, 10)
      } catch (e) {
        expect(e).toBeInstanceOf(ApiException)
        expect(e.status).toEqual(expectedError.status)
      }
    })

    it('handles the 400 Bad request', async () => {
      const mockData = {};
      const fetchMock = setMockData(mockData, 400, false);

      const expectedError = new ApiException(400)
      try {
        await findAlbums(1, 10)
      } catch (e) {
        expect(e).toBeInstanceOf(ApiException)
        expect(e.status).toEqual(expectedError.status)
      }
    })
  })

  describe('findAlbumById', () => {
    it('returns album data when requested', async () => {
      const mockData = {id: 1, title: 'test'};
      const fetchMock = setMockData(mockData);

      const result = await findAlbumById(1);
      expect(result).toEqual(mockData);
    })

    it('handles the 404 not found', async () => {
      const mockData = {};
      const fetchMock = setMockData(mockData, 404, false);

      const expectedError = new ApiException(404)
      try {
        await findAlbumById(1)
      } catch (e) {
        expect(e).toBeInstanceOf(ApiException)
        expect(e.status).toEqual(expectedError.status)
      }
    })

    it('handles the 500 Server error', async () => {
      const mockData = {};
      const fetchMock= setMockData(mockData, 500, false);

      const expectedError = new ApiException(500)
      try {
        await findAlbumById(1)
      } catch (e) {
        expect(e).toBeInstanceOf(ApiException)
        expect(e.status).toEqual(expectedError.status)
      }
    })

    it('handles the 400 Bad request', async () => {
      const mockData = {};
      const fetchMock= setMockData(mockData, 400, false);

      const expectedError = new ApiException(400)
      try {
        await findAlbumById(1)
      } catch (e) {
        expect(e).toBeInstanceOf(ApiException)
        expect(e.status).toEqual(expectedError.status)
      }
    })
  })

  describe('findAllAlbums', () => {
    it('returns album data when requested', async () => {
      const mockData = {id: 1, title: 'test'};
      const fetchMock = setMockData(mockData);

      const result = await findAllAlbums();
      expect(result).toEqual(mockData);
    })

    it('handles the 404 not found', async () => {
      const mockData = {};
      const fetchMock = setMockData(mockData, 404, false);

      const expectedError = new ApiException(404)
      try {
        await findAllAlbums();
      } catch (e) {
        expect(e).toBeInstanceOf(ApiException)
        expect(e.status).toEqual(expectedError.status)
      }
    })

    it('handles the 500 Server error', async () => {
      const mockData = {};
      const fetchMock= setMockData(mockData, 500, false);

      const expectedError = new ApiException(500)
      try {
        await findAllAlbums();
      } catch (e) {
        expect(e).toBeInstanceOf(ApiException)
        expect(e.status).toEqual(expectedError.status)
      }
    })

    it('handles the 400 Bad request', async () => {
      const mockData = {};
      const fetchMock= setMockData(mockData, 400, false);

      const expectedError = new ApiException(400)
      try {
        await findAllAlbums();
      } catch (e) {
        expect(e).toBeInstanceOf(ApiException)
        expect(e.status).toEqual(expectedError.status)
      }
    })
  })

  describe('findAlbumPhotosByIdAndPaginationSize', () => {
    it('returns album data when requested', async () => {
      const mockData = {id: 1, title: 'test', url: 'test', thumbnailUrl: 'test'};
      const fetchMock = setMockData(mockData);

      const result = await findAlbumPhotosByIdAndPaginationSize(1, 1, 10);
      expect(result).toEqual(mockData);
    })

    it('handles the 404 not found', async () => {
      const mockData = {};
      const fetchMock = setMockData(mockData, 404, false);

      const expectedError = new ApiException(404)
      try {
        await findAlbumPhotosByIdAndPaginationSize(1, 1, 10);
      } catch (e) {
        expect(e).toBeInstanceOf(ApiException)
        expect(e.status).toEqual(expectedError.status)
      }
    })

    it('handles the 500 Server error', async () => {
      const mockData = {};
      const fetchMock= setMockData(mockData, 500, false);

      const expectedError = new ApiException(500)
      try {
        await findAlbumPhotosByIdAndPaginationSize(1, 1, 10);
      } catch (e) {
        expect(e).toBeInstanceOf(ApiException)
        expect(e.status).toEqual(expectedError.status)
      }
    })

    it('handles the 400 Bad request', async () => {
      const mockData = {};
      const fetchMock= setMockData(mockData, 400, false);

      const expectedError = new ApiException(400)
      try {
        await findAlbumPhotosByIdAndPaginationSize(1, 1, 10);
      } catch (e) {
        expect(e).toBeInstanceOf(ApiException)
        expect(e.status).toEqual(expectedError.status)
      }
    })
  })
})