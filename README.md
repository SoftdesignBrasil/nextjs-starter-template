# nextjs-starter-template
.envrc example

export NODE_ENV="production"
export POC_NEXTJS_DB_USERNAME="root"
export POC_NEXTJS_DB_PASSWORD="1q2w3e4r"
export POC_NEXTJS_DB_NAME="nextjs"
export POC_NEXTJS_DB_HOSTNAME="mysql"
export POC_NEXTJS_DB_HOSTPORT="3306"
export POC_NEXTJS_SERVER_API_HOST="http://api:3000/api"
export POC_NEXTJS_CLIENT_API_HOST="http://127.0.0.1:3001/api"

export POC_NEXTJS_EXPOSE_API_PORT="3001"
export POC_NEXTJS_EXPOSE_APP_PORT="3000"
export POC_NEXTJS_EXPOSE_MYSQL_PORT="3306"

source .envrc 
