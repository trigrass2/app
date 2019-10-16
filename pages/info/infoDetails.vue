<template>
	<view class="infoDetails">
		<view class="info-title">
			营养学新发现：好吃的食物可能最健康
		</view>
		<view class="article-meta">
			<text class="article-author">未来城不落</text>
			<text class="article-text">发表于</text>
			<text class="article-time">1小时前</text>
		</view>
		<!-- 标题 -->
		<view class="article-content">
			<rich-text>
				<div>
					<p>编者按：本文来自“<a>腾讯科技</a>”，编译/乐学，36氪经授权转载。</p>
					<p>据外媒报道，太空探索科技公司SpaceX正处于为美国宇航员开发航天器的最后阶段。这个项目在过去几年中占用了该公司的大量资源和资金。</p>
					<p>被称为 “龙飞船”(Crew
						Dragon)的航天器将搭载多达7人前往国际空间站。但是，尽管研发航天器的大部分资金来自美国宇航局(NASA)在2014年划拨的26亿美元资金，但是SpaceX创始人兼首席执行官伊隆-马斯克(Elon
						Musk)在周四的一次吹风会上指出，该公司也自己投入了一大笔资金来建造和测试航天器。</p>
					<p><img style="display:none; max-width:100%" src="https://pic.36krcnd.com/201910/11091740/tllyn850jepkdnq5!heading"></p>
					<p>马斯克说：“我认为，我们实际上已经在这个项目上花费了比预期多得多的资金——可能还要多出数亿美元。”</p>
					<p>周四，马斯克与NASA局长吉姆-布里登斯汀(Jim Bridenstine)在SpaceX位于洛杉矶的总部进行了交谈，并公布了有关龙飞船的最新进展。NASA是根据商业载人(Commercial
						Crew)计划为航天器提供资金的，这是该机构再次从美国本土发射航天器搭载美国宇航员升空的解决方案。自2011年美国航天飞机(Space Shuttle)计划结束以来，美国宇航员一直在乘坐俄罗斯Soyuz航天器往返国际空间站。</p>
					<p>尽管SpaceX不得不增加额外的资金来建造龙飞船，但据马斯克称，该公司现在正严格控制分配给它的资金的使用情况。</p>
					<p>马斯克补充说：“SpaceX项目只占[NASA]预算的1%；目前，它正好在预算之内。”</p>
					<p>马斯克进一步解释了SpaceX投入额外的资金到龙飞船的研发当中以及导致商业载人项目进度延迟的部分原因。</p>
					<p>“正如吉姆所说的那样，几年来美国宇航局的商业载人计划的预算被美国国会大幅削减了——我认为，在某些情况下，减少了50%。所以，如果你只有一半的钱，你就很难按照计划行事。但我们没有花更多的钱，只是花了更长的时间。”马斯克说。</p>
					<p>布里登斯汀同意马斯克的观点，他说商业载人计划确实在资金上受到了挫折。</p>
					<p>布里登斯汀说：“早些年，由于我们没有足够的资金，所以我们的计划受到了挫折。”</p>
					<p>“现在我们已经熬过来了。我们现在像激光一样专注于做正确的事情，以实现我们双方都渴望的最终结果，即让美国宇航员搭乘在美国本土发射的火箭升空。”布里登斯汀说。</p>
					<p>布里登斯汀进一步解释了NASA融资过程的一些幕后细节以及纳税人的钱是如何花在SpaceX等项目上的。</p>
					<p>布里登斯汀说，“当然，我们的承包商先做出提案，然后我们根据这些提案的完成情况进行奖励。所以，所有这一切都是事先达成的。”</p>
					<p>布里登斯汀补充道，“为了实现我们国家的外交目标和战略目标——让我们的国际合作伙伴和国家联盟到月球去定居——我们的计划必须有可信度。而且，现在，我们需要尽快确定可信度的计划是商业载人计划。而SpaceX就是这个计划的一部分。”</p>
				</div>
			</rich-text>
		</view>
		<!-- 发表的内容 -->
	</view>
</template>

<script>
	export default{
		data(){
			return{};
		},
		onLoad(option){
			console.log(option.id);
		},
		methods:{},
	}
</script>

<style lang="scss" scoped>
	.info-title {
		padding: 10px 20px 0 20px;
		font-size: 40upx;
	}

	.article-meta {
		padding: 10px 20px;
		color: $font-light-gray;

		text {
			padding-right: 10px;
		}
	}

	.article-content {
		padding: 0 15px;
		overflow: hidden;
		font-size: 15px;
		margin-bottom: 15px;
	}
</style>
