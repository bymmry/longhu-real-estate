 module.exports = {
   port: process.env.NODE_ENV === 'dev' ? 3001 : 80,
   https: false,
   publicKey: 'longhuRealEstateByXiecp',
   mongodb: {
     user: 'longhu',
     psw: 'pxh5201798',
     url: 'localhost/longhu-real-estate'
   }
 }