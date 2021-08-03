import { Router } from 'express'
import { makeAuthorController } from '../factories/make-author-controller'
import { adaptRoute } from '../adapters/express-router-adapter'
export default (router: Router) => {
    router.get('/author', adaptRoute(makeAuthorController()))
  }