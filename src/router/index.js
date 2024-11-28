import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/viewsInBackGround/HomeView.vue'
import Vegemite from '../views/viewsInBackGround/VegemiteView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      redirect: '/albums'
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/viewsInBackGround/AboutView.vue')
    },
    {
      path: '/vegemite',
      name: 'vegemite',
      component: Vegemite
    },
    {
      path: '/albums',
      name: 'albums',
      component: () => import('../views/AlbumsView.vue')
    },
    {
      path: '/albums/:id/details',
      name: 'albumDetails',
      component: () => import('../views/AlbumDetailView.vue'),
      props: true
    },
    {
      path: '/albums/:id/photos',
      name: 'albumPhotos',
      component: () => import('../views/AlbumPhotoView.vue'),
      props: true
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue')
    },
    {
      path: '/albums/create',
      name: 'createAlbum',
      component: () => import('../views/CreateAlbumView.vue')
    }
  ]
})

export default router