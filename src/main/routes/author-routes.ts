import { Router } from 'express'
import { makeAuthorController } from '../factories/make-author-controller'
import { adaptRoute } from '../adapters/express-router-adapter'
export default (router: Router): void => {
    router.get('/author', adaptRoute(makeAuthorController()))
  }