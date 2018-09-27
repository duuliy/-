<template>
  <div class="sss">
    <p>
      这是支付页面555
    </p>
    <icon type="success" class="weui-flex__item" size="20" />
    <form class='form-container'>
      <!-- <input type="file" name="file"> -->
      <input type="button" value="上传文件" @click="uploadd">

      <button style="margin:30rpx;" @click="chooseimage">获取图片</button>
      <input type="text"  class="form-control" v-model="motto" placeholder="请输入密码">
      <button @click="ggg">发送</button>
    </form>
    <div>5555</div>

    <div>
      <label for="textError">消息</label>
      <textarea id="textError" style=" min-height:100px;border: 1px solid #ccc;">
        <ul>
          <li>456</li>
        </ul>
      </textarea>
    </div>
  </div>
</template>

<script>
// import signalR from '../../utils/signalR'
var Hub = require("../../utils/miniProgramSignalr");
console.log(Hub);

export default {
  components: {},

  data() {
    return {
      motto: "",
      info: "",
      connection: "",
      hubConnect: "",
      connectionId: "",
      invocationId: 0
    };
  },

  created() {
    // console.log(this.$signalR.signalR);
    console.log(wx);
  },
  mounted() {
    let self = this;
  },
  methods: {
    ggg() {
      let self = this;
      wx.request({
        url: "https://192.168.0.107:38082/test/test/negotiate",    //因为后台用的signalR   而小程序又不支持   研究他的通讯原理  得出：negotiate的请求(https)拿到一个id，带上这个id,才能识别请求wss请求，才能链接成功  
        method: "post",                                            //同理soket.io  后面也要跟参数，只不是data是很大量的字符串  不好处理 并且还多了一个步骤（其中一个参数至今无法获取） 而signalr返回data是对象
        async: false,
        success: res => {
          console.log(22222222);
          console.log(res.data.connectionId);
          self.connectionId = res.data.connectionId;
          self.sss(
            `wss://192.168.0.107:38082/test/test?id=${self.connectionId}`
          );
        },
        fail: res => {
          console.error(res);
          return;
        }
      });
    },
    sss(url) {
      console.log(JSON.stringify(this.motto) + "");
      let that = this;
      wx.connectSocket({
        //这里链接不到signalr
        url: url
      });
      wx.onSocketOpen(() => {
        console.log("连接成功", "senddata");
        wx.sendSocketMessage({
          data: JSON.stringify(that.motto) + "",    //研究signalr源码得知  这里必须加""   得到回调数据后，用正则去掉即可
          success: () => {
            console.log(666);
          },
          fail: () => {
            console.log(444);
          },
          complete: () => {
            console.log(6644);
          }
        });
      });
      wx.onSocketMessage(res => {     //此时获得的信息任然是错误   估计是需要带上wss的id  或者是苹果id
        console.log(999);
        console.log(res);
        wx.onSocketClose(() => {
          console.log("连接已关闭", "555");
        });
      });
    },
    chooseimage() {
      var _this = this;
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          // _this.setData({
          //   tempFilePaths: res.tempFilePaths
          // });
          console.log("调用相册");
        }
      });
    },
    uploadd() {
      console.log('打开文件')
      wx.downloadFile({
        // 示例 url，并非真实存在
        url: "http://192.168.0.107:8888/static/pdf/abc.pdf",
        success: function(res) {
          const filePath = res.tempFilePath;
          wx.openDocument({
            filePath: filePath,
            success: function(res) {
              console.log("打开文档成功");
            }
          });
        }
      });
    }
  }
};
</script>

<style  type="text/css" scoped lang='less'>
.sss {
  color: rebeccapurple;
  p {
    color: red;
  }
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}
</style>
