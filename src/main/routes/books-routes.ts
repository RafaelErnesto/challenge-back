import { Router } from 'express'
import { adaptRoute } from '../adapters/express-router-adapter'
import { makeRegisterBookController } from '../factories/make-register-book-controller'
import { makeGetBookListController } from '../factories/make-get-book-list-controller'
import { makeUpdateBookController } from '../factories/make-update-book-controller'
export default (router: Router): void => {
    router.post('/book', adaptRoute(makeRegisterBookController())),
    router.get('/book', adaptRoute(makeGetBookListController())),
    router.put('/book/:id', adaptRoute(makeUpdateBookController()))
}