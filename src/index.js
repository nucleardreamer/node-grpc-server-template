

const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const _ = require('lodash')
const { join } = require('path')
const packageDefinition = protoLoader.loadSync(
  join(__dirname, 'example.proto')
)

const example = grpc.loadPackageDefinition(packageDefinition).example


function Test(call, cb) {
  let text = call.request.text
  console.log('Received:', text)
  call.on('data', function() {
    // used for streams
  })
  call.on('end', call.end)
  cb(null, {
    text: `I got this from you: ${text}`
  })
}

const server = new grpc.Server()

server.addService(example.Example.service, {
  Test
})

server.bind(
  `0.0.0.0:${process.env.PORT || '9000'}`,
  grpc.ServerCredentials.createInsecure()
)

server.start()