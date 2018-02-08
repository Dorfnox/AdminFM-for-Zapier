var axios = require('axios');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

axios({
  method: 'post',
  url: 'https://fm109.beezwax.net/fmi/admin/api/v1/user/logout',
  headers: {
    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiIzYmZiNzA1Yy0yNGRjLTQzMWItYjQxYS04ZGJiYmJlMDJmMGMiLCJpYXQiOjE1MTc2OTgyODd9.BzFaEsgycj0I4oWd-esN2063GXWMbNBCY8W_Diah1X0`,
    'Content-Type': 'application/json',
  }
})
.then(function (response) {
    console.log(response);
  }).catch(function (response) {
    console.log(response);
  });
