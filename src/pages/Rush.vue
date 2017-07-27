<template>
  <div>
    <div class="qiang-wrapper">
      <x-header :left-options="{backText: '返回', preventGoBack: true}" transition="all 1s ease-in" style="background: #f73c6f;flex:0 0 auto;" @on-click-back="goBack">限时抢购</x-header>
      <div class="qiang-content">
        <div class="qiang-menu">
          <label>开抢时间</label>
          <ul>
            <li v-for="(item, index) in timeline" :key="index" @click="changeTime(item)">
              <span :class="{active: active(item, current)}" v-text="item.time"></span>
            </li>
          </ul>
        </div>
        <load-more v-if="!loading && !products.length" :show-loading="false" tip="本场次无可抢商品啦"></load-more>
        <load-more v-if="loading" tip="加载中..."></load-more>
        <div v-if="!loading" class="qiang-list" id="qiang_body">
          <div class="qiang-item" v-for="item in products" :key="item.num_iid">
            <div class="qiang-item-image">
              <x-img :src="item.pic_url" :offset="100" container="#qiang_body"></x-img>
            </div>
            <div class="qiang-item-detail">
              <p class="title" v-text="item.title"></p>
              <p class="price">
                <del>¥{{ item.reserve_price }}</del>
                <span>¥{{ item.zk_final_price }}</span>
                <a class="touch-me buy-now" type="button" :href="item.click_url" target="_blank" :class="btnClass(item.start_time)">{{ btnText(item.start_time) }}</a>
              </p>
              <p class="forecast" v-if="future(item.start_time)">
                {{ calendar(item.start_time) + '准时开抢！'}}
              </p>
              <p class="amount" v-if="!future">
                <span>已抢购{{ item.sold_num }}件</span>
                <span>剩余：{{ item.total_amount }}件</span>
              </p>
              <p class="progress" v-if="!future">
                <span class="progress-wrapper">
                  <span class="progress" :style="{width: item.sold_num/item.total_amount*100 + '%'}"></span>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 *淘抢购
 **/
import { XHeader, LoadMore, XImg } from 'vux';
import moment from 'moment';
import '../libs/moment.locale';
export default {
  name: 'rushPurchasing',
  components: {
    XHeader,
    LoadMore,
    XImg
  },
  data() {
    var day = {
      yesterday: moment().subtract(1, 'days'),
      today: moment(),
      tomorrow: moment().add(1, 'days')
    };
    return {
      loading: false,
      fulltimeline: [
        { time: '18:00', day: day.yesterday, yesterday: true },
        { time: '19:00', day: day.yesterday, yesterday: true },
        { time: '20:00', day: day.yesterday, yesterday: true },
        { time: '21:00', day: day.yesterday, yesterday: true },
        { time: '22:00', day: day.yesterday, yesterday: true },
        { time: '23:00', day: day.yesterday, yesterday: true },
        { time: '00:00', day: day.today },
        { time: '07:00', day: day.today },
        { time: '08:00', day: day.today },
        { time: '09:00', day: day.today },
        { time: '10:00', day: day.today },
        { time: '11:00', day: day.today },
        { time: '12:00', day: day.today },
        { time: '13:00', day: day.today },
        { time: '14:00', day: day.today },
        { time: '15:00', day: day.today },
        { time: '16:00', day: day.today },
        { time: '17:00', day: day.today },
        { time: '18:00', day: day.today },
        { time: '19:00', day: day.today },
        { time: '20:00', day: day.today },
        { time: '21:00', day: day.today },
        { time: '22:00', day: day.today },
        { time: '23:00', day: day.today },
        { time: '00:00', day: day.tomorrow, tomorrow: true },
        { time: '01:00', day: day.tomorrow, tomorrow: true },
        { time: '02:00', day: day.tomorrow, tomorrow: true },
        { time: '03:00', day: day.tomorrow, tomorrow: true },
        { time: '04:00', day: day.tomorrow, tomorrow: true },
        { time: '05:00', day: day.tomorrow, tomorrow: true },
        { time: '07:00', day: day.tomorrow, tomorrow: true },
        { time: '08:00', day: day.tomorrow, tomorrow: true },
        { time: '09:00', day: day.tomorrow, tomorrow: true },
        { time: '10:00', day: day.tomorrow, tomorrow: true },
        { time: '11:00', day: day.tomorrow, tomorrow: true },
        { time: '12:00', day: day.tomorrow, tomorrow: true },
      ],
      current: moment(this.$route.params.start),
      products: []
    }
  },
  computed: {
    start() {
      return moment(this.current).get('hour') < 7
        ? moment().format('YYYY-MM-DD 07:00:00')
        : moment(this.current).format('YYYY-MM-DD HH:00:00');
    },
    timeline() {
      var vm  = this;
      console.log(vm);
      if (moment().get('hour') < 12) {
        return vm.fulltimeline.slice(0, 23);
      } else {
        return vm.fulltimeline.slice(6, 35);
      }
    }
  },
  mounted() {
    moment().locale('zh-cn');
    this.$route.params.start = new Date();//写死当前时间
    console.log('start:', moment(this.$route.params.start).format('YYYY-MM-DD HH:mm:ss'));
    this.$set(this, 'current', moment(this.$route.params.start).startOf('hour'));
  },
  updated() {
    console.log('update');
    this.scrollIntoView();
  },
  methods: {
    goBack() {
      this.$router.push('/');
    },
    getProducts(p = 1) {
      let vm = this;
      vm.$set(vm, 'loading', true);
      fetch(`/api/web/hot_goods/${this.current.format('YYYY-MM-DD HH:00:00')}/${p}`)
        .then(res => res.json())
        .then(data => {
          if (data.results)
            vm.$set(vm, 'products', data.results.results);
          else
            vm.$set(vm, 'products', []);
          vm.$set(vm, 'loading', false);
        });
    },
    changeTime: function (t) {
      this.current = moment(t.day.format('YYYY-MM-DD ') + t.time + ':00');
    },
    active(timelineObj, momentObj) {
      return moment(timelineObj.day).format('YYYY-MM-DD ') + timelineObj.time + ':00'
        === momentObj.format('YYYY-MM-DD HH:mm:ss');
    },
    scrollIntoView() {
      document.querySelector('.qiang-menu li span.active').scrollIntoView();
      document.body.scrollIntoView();
    },
    btnText(start) {
      return moment(start).isBefore(moment()) ? '马上抢' : '即将开抢';
    },
    btnClass(start) {
      return moment(start).isBefore(moment()) ? '' : 'muted'
    },
    future(time) {
      return moment(time).isAfter(moment());
    },
    calendar(time) {
      return moment(time).calendar();
    }
  },
  watch: {
    current() {
      this.getProducts();
    }
  }
}
</script>

<style lang="scss">
.qiang-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;

  div,
  ul,
  li,
  span,
  label {
    box-sizing: border-box;
  }
  .qiang-content {
    display: flex;
    flex-direction: column;
    flex: auto;
    .qiang-menu {
      width: 100%;
      flex: 0 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: row;
      label {
        width: 2rem;
        display: flex;
        align-items: center;
        align-self: flex-start;
        justify-content: center;
        flex: 0 0 auto;
        height: 3rem;
        font-size: .6rem;
        line-height: 1rem;
        border-bottom: 1px solid pink;
        box-sizing: border-box;
      }
      ul {
        flex: auto;
        padding: 0;
        list-style: none;
        margin: 0;
        overflow: auto;
        overflow-y: hidden;
        white-space: nowrap;
        li {
          display: inline-block;
          align-items: center;
          line-height: 3rem;
          font-size: 1rem;
          height: 3.5rem;
          padding: 0;
          position: relative;
          box-sizing: border-box;

          span {
            display: inline-block;
            height: 3rem;
            background: #f5f5f5;
            color: #c40000;
            padding: 0 15px;
            border-right: 1px solid pink;
            border-bottom: 1px solid pink;
            &.active {
              background: gray;
              color: #fff;
              &::before {
                content: '';
                position: absolute;
                display: block;
                width: 0;
                height: 0;
                margin-left: 5px;
                border: 10px solid transparent;
                border-top-color: gray;
                z-index: 1000;
                margin-top: 2.9rem;
              }
            }
          }

          &:first-of-type {
            span {
              border-left: 1px solid pink;
            }
          }
        }
      }
    }

    .qiang-list {
      flex: auto;
      padding: 10px 5px;
      .qiang-item {
        width: 100%;
        border: 1px solid #ddd;
        margin: 0 0 5px 0;
        padding: 0;
        display: flex;
        flex-direction: row;
        &-image {
          flex: 0 0 auto;
          width: 160px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 5px;
          img {
            width: 100%;
            height: auto;
          }
        }
        &-detail {
          flex: auto;
          padding: 5px;
          overflow: auto;
          p {
            margin: 0;
            padding: 5px 10px;
          }
          .title {
            font-size: 1rem;
            font-weight: bold;
            color: #000;
            line-height: 1.5rem;
            text-align: left;
          }
          .price {
            margin-top: 1rem;
            height: 2rem;
            position: relative;
            line-height: 2rem;
            text-align: left;
            del {
              left: 10px;
              top: 0;
              display: inline-block;
              position: absolute;
              margin-top: -1rem;
              font-size: .8rem;
            }
            span {
              font-size: 1.5rem;
              color: red;
            }
            .buy-now {
              text-decoration: none;
              display: block;
              padding: 0 15px;
              border: none;
              outline: none;
              color: #fff;
              background: rgb(247, 60, 111);
              height: 2.3rem;
              line-height: 2.3rem;
              float: right;
              margin-top: -5px;
              border-radius: 5%;
              box-shadow: 1px 2px 5px #eee;
              border: 1px solid transparent;
              &.muted {
                background: #fff;
                border: 1px solid green;
                color: green;
              }
            }
          }
          .forecast {
            color: green;
            font-size: .6rem;
            text-align: left;
          }
          .amount {
            line-height: 1.5rem;
            height: 1.5rem;
            font-size: .8rem;
            color: #c4c4c4;
            span:first-of-type {
              float: left;
            }
            span:nth-of-type(2) {
              float: right;
            }
          }
          .progress {
            padding: 0;
            height: 2rem;
            .progress-wrapper {
              display: block;
              box-sizing: border-box;
              width: 100%;
              height: 5px;
              border-radius: 2px;
              overflow: hidden;
              border: 1px solid pink;
              .progress {
                display: block;
                height: 100%;
                border: none;
                border-top-right-radius: 2px;
                border-bottom-right-radius: 2px;
                background: pink;
              }
            }
          }
        }
      }
    }
  }
}
</style>


