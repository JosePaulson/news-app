import jwt from 'jsonwebtoken'

export default function createAuthToken(res, id){
    const token = jwt.sign({ id }, process.env.TOKEN_KEY, {
        expiresIn: '2h',
    })

    res.cookie('token', token, {
        httpOnly: true, 
        secure: true,
        maxAge: 2 * 60 * 60 * 1000,
    })
}