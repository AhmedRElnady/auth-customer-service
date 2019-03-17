module.exports = {
   server: {
      port: 6000
   },
   db: {
      name: 'soc-customers'
   },
   _acl: {
      roles: {
         SUPER_ADMIN: {
            resources: [
               "/"
            ],
            permissions: ["get"]
         }
      }
   }
}