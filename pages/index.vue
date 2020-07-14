<template>
	<section class="container">
		<div class="row justify-content-center align-items-center height-100">
			<div class="col-7 px-0">
				<div class="px-4 py-5 chat-box bg-white">

					<!-- Sender Message-->
					<div class="media w-50 mb-3"><img
							src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg"
							alt="user" width="50" class="rounded-circle">
						<div class="media-body ml-3">
							<div class="bg-light rounded py-2 px-3 mb-2">
								<p class="text-small mb-0 text-muted">Test, which is a new approach to have</p>
							</div>
							<p class="small text-muted">12:00 PM | Aug 13</p>
						</div>
					</div>

					<!-- Reciever Message-->
					<div class="media w-50 ml-auto mb-3">
						<div class="media-body">
							<div class="bg-primary rounded py-2 px-3 mb-2">
								<p class="text-small mb-0 text-white">Apollo University, Delhi, India Test</p>
							</div>
							<p class="small text-muted">12:00 PM | Aug 13</p>
						</div>
					</div>

					<div v-for="(msg, id) in arrMsg" :key="id"
						 class="media w-50 ml-auto mb-3">
						<div class="media-body">
							<div class="bg-primary rounded py-2 px-3 mb-2">
								<p class="text-small mb-0 text-white">{{ msg.msg }}</p>
							</div>
							<p class="small text-muted">{{ new Date(msg.date) }}</p>
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
              nickname: 'sasa',
              arrMsg: '',
              inputVal: ''
		  }
		},
        mounted: function () {
            setInterval(()=>{
                this.$axios.$get('http://localhost:4000/chat1')
                    .then((response) => {
                        // handle success
                        this.arrMsg = response
                        console.log(this.arrMsg)
                    })
                    .catch((error) => {
                        // handle error
                        console.log(error)
                    })
            }, 5000)
        },
		methods: {
            sendMessage: function () {
                console.log(this.inputVal)
                this.$axios.$post('http://localhost:4000/chat1', {
                    name: this.nickname,
                    msg: this.inputVal
                }, {
                    header: {
                        "Content-Type": "application/json"
                    }
                }).then((response) => {
                    this.scrollBottom()
                    this.arrMsg.push(response)
                    console.log(response)
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

