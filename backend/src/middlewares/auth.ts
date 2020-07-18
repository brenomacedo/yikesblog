import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { key } from '../hash.json'

interface decode {
    id: number
}

export default function (request: Request, response: Response, next: NextFunction) {

    if(!request.headers.authorization) {
        return response.status(400).send("No token provided")
    }

    const auth = request.headers.authorization
    
    if(auth.split(' ').length !== 2) {
       return response.status(400).send("Token format invalid!") 
    }

    const token = auth.split(' ')

    if(token[0] !== 'Bearer') {
        return response.status(404).send("Token format invalid!")
    }    
    
    jwt.verify(token[1], key, (err, decode) => {
        if(err) {
            return response.status(400).send("Invalid token")
        }

        const user = decode as decode
        request.body.user = user
    })

    next()
}