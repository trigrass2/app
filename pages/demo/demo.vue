<template>
	<view>
		<button type="primary" @tap='getSignalR'>访问signalR</button>
		<button type="primary" @tap='openWebSocket'>打开websocket</button>
		<input  class="text" type="text" v-model="msg" placeholder="请输入消息"/>
		<button type="primary" @tap='sendMsg()'>发送</button>
		<button type="primary" @tap='close()'>关闭WebSocket</button>
 
		<view>
			<view v-for="(item,i) in result" :key='i'>
				<text>{{item}}</text>
			</view>
		</view>
	</view>
</template>
 
<script>
	var _this;
	export default {
		data() {
			return {
				result: [],
				socketOpen:false,
				msg:"",
				connectionId:'',			
			}
		},
		onLoad() {
			_this = this;
		},
		methods: {
			getSignalR() {			
				uni.request({
					url: 'http://192.168.1.121:8110/chatHub/negotiate?negotiateVersion=1', 
					method:"POST",
					success: ({data:{connectionId}}) => {						
						this.connectionId = connectionId;
						this.result.push( 'request success');
						console.log('this.connectionId',this.connectionId)
					}
				});
			},
			openWebSocket() { 
				uni.connectSocket({
					url:`ws://192.168.1.121:8110/chatHub?id=${this.connectionId}`
				});
				uni.onSocketOpen((res)=> {
					console.log(res);
					this.socketOpen = true;
					console.log('WebSocket连接已打开！');
					this.result.push("WebSocket连接已打开！");
				});
				uni.onSocketError((res)=> {
					console.log(res);
					this.result.push('WebSocket连接打开失败，请检查！')
					console.log('WebSocket连接打开失败，请检查！');
				});
 
				uni.onSocketMessage((res)=> {
					this.result.push('收到服务器内容：' + res.data );
					console.log('收到服务器内容：' + res.data);
				});
				
			},
			
			sendMsg(){
				if(!_this.socketOpen)
					return;
					
				uni.sendSocketMessage({
					data: _this.msg
				});
			},
			close(){
				uni.onSocketClose((res)=> {
				  console.log('WebSocket 已关闭！');
				});
			}
		}
	}
</script>
<style lang="scss" scoped>
	.text{
		margin: 20upx 0;
		height: 80upx;
		background-color: #fff;
	}
</style>