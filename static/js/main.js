//Conectando socket
let socket = io('/')

let vm = new Vue({
	el: '#app',
	data: {
		input:'',
		messages: []
	},
	mounted(){
		//Recebendo mensagem e adicionando na tela
		socket.on('message', output => {
			this.messages.push({
				from: 'Watson',
				text: output
			})
		})

		//Recebendo mensagem de erro e adicionando na tela
		socket.on('error', output => {
			this.messages.push({
				from: 'Error',
				text: output
			})
		})
	},
	methods: {
		send(){
			//Adicionando mensagem de usuário na tela
			this.messages.push({
				from: 'Me',
				text: this.input
			})

			//Enviando mensagem
			socket.emit('message', this.input)

			//Limpando campo de texto
			this.input = ''
		}
	}
})
