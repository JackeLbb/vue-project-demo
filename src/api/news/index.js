// import service from './../index.js'

export function getNewsList() {
  return new Promise((resolve, reject) => {
    resolve({
      code: 1,
      data: [
        {
          name: '00000000',
          id: 0
        }
      ],
      msg: '请求成功'
    })
  })
}
