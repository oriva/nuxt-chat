<template>
	<section class="container">
		<div class="row justify-content-center align-items-center height-100">
			<div v-if="nickname===''">
				<form v-on:submit.prevent="changeNick"
					  class="input-group">
					<input type="text" class="form-control" v-model="inputNick" placeholder="Введите ваш никнейм">
					<button class="btn btn-primary">GO</button>
				</form>
			</div>
			<div v-else
				 class="col-7 px-0">
				<div class="px-4 py-5 chat-box bg-white">
					<div v-for="(msg, id) in arrMsg" :key="id"
						 class="media w-50 mb-3"
						 :class="{ 'ml-auto': nickname===msg.name }">
						<div class="media-body">
							<div class="mb-2"
								 :class="{
								 'text-right': nickname===msg.name,
								 }"
							>{{ msg.name }}
							</div>
							<div class="rounded py-2 px-3 mb-2"
								 :class="{
								 'bg-primary': nickname===msg.name,
								 'bg-light': nickname!==msg.name
								 }">
								<p class="text-small mb-0 text-white"
								   :class="{
									 'text-white': nickname===msg.name,
									 'text-muted': nickname!==msg.name
									 }"
								>{{ msg.msg }}</p>
							</div>
							<p class="small text-muted">{{ new Date(msg.date).toLocaleString() }}</p>
						</div>
					</div>

				</div>

			<!-- Typing area -->
				<form action="#" class="bg-light" v-on:submit.prevent="sendMessage">
					<div class="input-group">
						<input type="text" placeholder="Введите сообщение" aria-describedby="button-addon2"
							   class="form-control rounded-0 border-0 py-4 bg-light" v-model="inputVal">
						<div class="input-group-append">
							<button id="button-addon2" type="submit" class="btn btn-link"><i
									class="fa fa-paper-plane"></i></button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</section>
</template>

<script>


    export default {
        name: 'chat',
        data () {
          return {
              nickname: '',
              arrMsg: '',
              inputVal: '',
              inputNick: ''
		  }
		},
        mounted: function () {
            this.getAllMsg()
        },
		methods: {
            showChat: function () {
                this.scrollBottom()
                setInterval(() => {
                    this.getAllMsg()
                }, 5000)
            },
            getAllMsg: function (action) {
                this.$axios.$get('http://localhost:4000/chat1')
                    .then((response) => {
                        this.arrMsg = response
                        if (action) {
                            action()
                        }
                    })
                    .catch((error) => {
                        // handle error
                        console.log(error)
                    })
            },
            sendMessage: function () {
                this.$axios.$post('http://localhost:4000/chat1', {
                    name: this.nickname,
                    msg: this.inputVal
                }, {
                    header: {
                        "Content-Type": "application/json"
                    }
                }).then((response) => {
                    this.inputVal = ''
                    this.scrollBottom()
                    this.arrMsg.push(response)
                })
                    .catch((error) => {
                        // handle error
                        console.log(error)
                    })
            },
            scrollBottom: function () {
                setTimeout(() => {
					document.getElementsByClassName('chat-box')[0].scrollTop = document.getElementsByClassName('chat-box')[0].scrollHeight
				}, 100)
            },
            changeNick: function () {
                console.log(this.inputNick)
                if (this.inputNick !== '') {
                    this.nickname = this.inputNick
                    this.showChat()
                }
            }
		}
    }
</script>

<style>
	body {
		background-color: #74EBD5;
		background-image: linear-gradient(90deg, #74EBD5 0%, #9FACE6 100%);

		min-height:       100vh;
	}

	::-webkit-scrollbar {
		width: 5px;
	}

	::-webkit-scrollbar-track {
		width:      5px;
		background: #f5f5f5;
	}

	::-webkit-scrollbar-thumb {
		width:            1em;
		background-color: #ddd;
		outline:          1px solid slategrey;
		border-radius:    1rem;
	}

	.text-small {
		font-size: 0.9rem;
	}

	.messages-box,
	.chat-box {
		height:     510px;
		overflow-y: scroll;
	}

	.rounded-lg {
		border-radius: 0.5rem;
	}

	input::placeholder {
		font-size: 0.9rem;
		color:     #999;
	}

	.height-100 {
		height: 100vh;
	}
</style>

