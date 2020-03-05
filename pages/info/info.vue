<template>
    <view class="my-info">
		<!-- <view class="info">		 -->
        <view class="uni-list">
            <block v-for="(item,index) in lists" :key="index">
                <view class="uni-list-cell" hover-class="uni-list-cell-hover" @tap="openInfo(item)">				
                    <view class="uni-triplex-row">
                        <view class="uni-triplex-left">
                            <text class="uni-title uni-ellipsis">列表主标题</text>
                            <text class="uni-text-small uni-ellipsis">列表内容文字,列表内容文字,列表内容文字,列表内容文字,列表内容文字,列表内容文字</text>
                        </view>
                        <view class="uni-triplex-right">
                            <view class="triplex-item">
                            	<text class="uni-h5">12:15</text>
                            </view>
							<view class="triplex-item">
								<text class="badge"></text>
							</view>
                        </view>
                    </view>
                </view>
            </block>
        </view>
<!--    </view> -->
	</view>
</template>

<script>
    export default {
        data() {
            return {
                title: 'list-triplex-row',
                lists: []
            }
        },
        onLoad() {
            let list = [];
            for (let i = 0; i < 5; i++) {
                list.push(i);
            }
            this.lists = list;
		   this.setBade();
        },
		methods:{
			openInfo(id){
				uni.navigateTo({
				    url: '/pages/info/infoDetails?id='+id
				});
			},
			setBade(){
			     let pages = getCurrentPages();    
			     let page = pages[pages.length - 1]  
			// #ifdef APP-PLUS  
			    let currentWebview = page.$getAppWebview();    
			    let titleObj = currentWebview.getStyle().titleNView;  
			        if (!titleObj.buttons) { 
			            return;    
			        }    
			        titleObj.buttons[0].badgeText = "20";   
			        //设置回去  
			        currentWebview.setStyle({    
			            titleNView: titleObj    
			        });    
			// #endif  
			}
		}
    }
</script>

<style lang="scss" scoped>
	.my-info{
		.uni-triplex-left{
			width: 88%;
		}
		.uni-triplex-right{
			width: 12%;
			.triplex-item{	
				text-align: center;
				.badge{
				   display: inline-block;
				     width: 6px;
					 height: 6px;
					 background:$red-color;
					 border-radius: 50%;					
				}
			}
		}
	}
</style>
