import Taro from '@tarojs/taro';

// Fetch(url, data).then((res) => { console.log(res)})

const preHttp = 'http://124.221.246.5:8080/api/vi';
const Fetch = (url, data = {}, method = 'POST') => {
  const header = {
    'content-type': 'application/json',
    Authorization:Taro.getStorageSync('token')
    //Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6IjIwMjEyMTQ2NzIiLCJleHAiOjE2NTA3ODcyMTQsImlzcyI6Inl5aiIsIm5iZiI6MTY1MDE4MjQxNH0.uJwGl6O6P0Wf1WKpheoFylLX4S-K7ChTU4o8hsdpvpk'
    // token:
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzUyMDg3MDIsImlkIjoxLCJuYmYiOjE1NzUyMDg3MDJ9.erNdOrNTLCD56D2UW0RmuYGGdfrPuO7hLZdtMtj1CdY'
    // token:
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Nzg4MzQ2OTMsImlkIjoxNCwibmJmIjoxNTc4ODM0NjkzfQ.bCRnUEWABSO54-Nwc3lu9TPZOIwadovJwXg27Llcz04'
  };
  return Taro.request({
    url: preHttp + url,
    data,
    method,
    header
  }).then(res => {
    console.log(res.statusCode);
    switch (res.statusCode) {
      case 200:
        if (res.data) {
          return res.data;
        } else {
          return res.code;// 业务逻辑错误，返回业务错误码
        }
      case 400:
        throw new Error('没有权限访问');
      case 401:
        throw new Error('未授权');
      case 404:
        throw new Error('not found');
      case 500:
        throw new Error('服务器错误');
    }
  }).catch((e) => {
    console.log(e)
  })
};

export default Fetch;




// const func = (goodsid) {
//   return Fetch(`http://dauidhaskda?goodsid=${goodsid}`);
// }