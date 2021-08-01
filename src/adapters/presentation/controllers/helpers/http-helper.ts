import { HttpResponse } from "../http/http-response";

export const ok = (body?:any): HttpResponse => {
    return {
        statusCode: 200,
        body
    }
}

export const badRequest = (body?:any): HttpResponse => {
    return {
        statusCode: 400,
        body
    }
}