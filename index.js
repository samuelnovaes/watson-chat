//Dependências
let express = require('express')
let app = express()
let server = require('http').Server(app)
let io = require('socket.io')(server)
let path = require('path')
let watson = require('watson-developer-cloud')

//Integrando api do watson
let conversation = watson.conversation({
	username: '815f362f-51e6-4436-912b-85f75ccb93dc',
	password: '1tYjHndvzvQo',
	version: 'v1',
	version_date: '2018-01-09',
})

//Servindo arquivos estáticos
app.use(express.static(path.join(__dirname, 'static')))

//Iniciando conexãocom socket
io.on('connection', socket => {

	//Recebendo mensagem
	socket.on('message', input => {

		//Payload
		let payload = {
			workspace_id : 'd28d6c91-7c99-41fc-92c3-a307356bbf57',
			input: {'text': input}
		}

		//Enviando mensagem pro watson e obtendo resposta
		conversation.message(payload, (error, response) => {
			if(error){
				//Se ocorrer algum erro, enviar mensagem de erro pro cliente
				socket.emit('error',error.message)
			}
			else {
				//Se não, Enviar a resposta do Watson para o cliente
				socket.emit('message', response.output.text[0])
			}
		})
	})
})

//Servindo chat na porta 8080
server.listen(8080, () => {
	console.log('http://localhost:8080')
})
