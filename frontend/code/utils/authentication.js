import cookie from 'js-cookie'
import { Router } from '../config/routes'

const extractJwtFromCookie = (tokenKey, req) => {
  return process.browser
    ? extractJwtFromClient(tokenKey) : extractJwtFromServer(tokenKey, req)
}

const extractJwtFromClient = (tokenKey) => {
  return cookie.get(tokenKey)
}

const extractJwtFromServer = (tokenKey, req) => {
  if (!req || !req.headers || !req.headers.cookie) {
    return undefined
  }
  const rawCookie = req.headers.cookie
    .split(';')
    .find(c => c.trim().startsWith(`${tokenKey}=`));
  if (!rawCookie) {
    return undefined;
  }
  return rawCookie.split('=')[1];
}

const isLoginPage = (path) => (
  path.indexOf('login') !== -1
)

const buildAuthorizationHeader = (jwtToken) => ({
  'Authorization': `Bearer ${jwtToken}`
})

const redirectToLogin = (res) => {
  if (process.browser) {
    return Router.pushRoute('/login')
  }
  res.writeHead(302, {
    Location: '/login'
  })
  res.end()
}

export { 
  extractJwtFromCookie,
  buildAuthorizationHeader,
  redirectToLogin,
  isLoginPage
}
