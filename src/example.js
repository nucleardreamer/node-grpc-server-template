const { join } = require('path')
const QuickgRPC = require('quick-grpc')

async function go () {
  const server = await new QuickgRPC({
    host: '0.0.0.0:9000',
    basePath: join(__dirname)
  })

  let example = await server.example()

  example.test({
    text: 'Client text'
  }, function (err, payload) {
    if (err) throw err
    console.log('TEXT:', payload.text)
  })
}

go()
