import { Router } from 'express'
import { adaptRoute } from '../adapters/express-router-adapter'
import { makeRegisterBookController } from '../factories/make-register-book-controller'

export default (router: Router): void => {
    router.post('/book', adaptRoute(makeRegisterBookController()))
}