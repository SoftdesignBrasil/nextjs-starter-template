const routes = require('next-routes')

// Application routes in express style
// add(route-name, url-pattern, page-inside-pages-dir)
// OBS: Pages inside 'pages' dir is automatically routed by NextJS if not specified in this file

module.exports = routes()
.add('new-employee', '/employee', 'employee')
.add('edit-employee', '/employee/:id', 'employee')
.add('list-employee', '/', 'index')
.add('new-sector', '/sector', 'sector')
.add('edit-sector', '/sector/:id', 'sector')
.add('list-sector', '/listSector', 'listSector')
.add('login', '/login', 'login')
