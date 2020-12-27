import JWT from 'jsonwebtoken'

export default (token: string, SSHKEY: string) => JWT.verify(token, SSHKEY)