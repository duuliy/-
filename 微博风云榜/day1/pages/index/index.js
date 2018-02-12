var app = getApp();
var typeId;
var space;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeID: 0,
    isLoading: true,
    loadOver: false,
    districtList: [],
    listdata: {},
    typeIdd:{},
    spacee:{},
    iconsrc:'../../../images/心1.png',
    uurl:{},
    idx:{},
    sortingList: [{ typeIdd: "13", value: "媒体" }, {
      typeIdd: "1", value: "互联网"
    }, {
        typeIdd: "2", value: "科学"
    }, {
        typeIdd: "3", value: "历史"
    }, {
        typeIdd: "4", value: "军事"
    }, {
        typeIdd: "6", value: "数码"
    }, {
        typeIdd: "7", value: "人文"
    }, {
        typeIdd: "9", value: "宠物"
    }, {
        typeIdd: "10", value: "星座"
    }, {
        typeIdd: "11", value: "搞笑"
    }, {
        typeIdd: "12", value: "情感"
    }, {
        typeIdd: "15", value: "养生"
    }],
    filterList: [{ spacee: "day", values: "日榜" }, {
      spacee: "week", values: "周榜"
    }, {
        spacee: "month", values: "月榜"
    }],
    districtChioceIcon: "/images/icon-go-black.png",
    sortingChioceIcon: "/images/icon-go-black.png",
    chioceDistrict: false,
    chioceSorting: false,
    chioceFilter: false,
    activeDistrictParentIndex: -1,
    activeDistrictChildrenIndex: -1,
    activeDistrictName: "区域位置",
    scrollTop: 0,
    scrollIntoView: 0,
    activeSortingIndex: -1,
    activeSortingName: "类型",
    // activeSortingTime:'时间'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    typeId = _this.data.typeIdd;
    // console.log(typeId)
    // space = day;
    wx.request({
      url: 'https://route.showapi.com/254-1?showapi_appid=52900&showapi_sign=718793c63de74b99bbbafe193fa6630e&typeId='+1+'&space=day',
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        // console.log(res.data.showapi_res_body.contentlist[0])
        // console.log(res)
        _this.setData({
          listdata: _this.listdata = res.data.showapi_res_body.pagebean.contentlist

        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      productList: [],
      pageIndex: 1,
      loadOver: false,
      isLoading: true
    })
    //this.getProductList();
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (!this.data.loadOver) {
      this.setData({
        pageIndex: this.data.pageIndex + 1,
        isLoading: true,
        loadOver: false
      })
      //this.getProductList();
    }
  },
  //条件选择
  choiceItem: function (e) {
    switch (e.currentTarget.dataset.item) {
      case "1":
        if (this.data.chioceDistrict) {
          this.setData({
            districtChioceIcon: "/images/icon-go-black.png",
            sortingChioceIcon: "/images/icon-go-black.png",
            chioceDistrict: false,
            chioceSorting: false,
            chioceFilter: false,
          });
        }
        else {
          this.setData({
            districtChioceIcon: "/images/icon-down-black.png",
            sortingChioceIcon: "/images/icon-go-black.png",
            chioceDistrict: true,
            chioceSorting: false,
            chioceFilter: false,
          });
        }
        break;
      case "2":
        if (this.data.chioceSorting) {
          this.setData({
            districtChioceIcon: "/images/icon-go-black.png",
            sortingChioceIcon: "/images/icon-go-black.png",
            chioceDistrict: false,
            chioceSorting: false,
            chioceFilter: false,
          });
        }
        else {
          this.setData({
            districtChioceIcon: "/images/icon-go-black.png",
            sortingChioceIcon: "/images/icon-down-black.png",
            chioceDistrict: false,
            chioceSorting: true,
            chioceFilter: false,
          });
        }
        break;
      case "3":
        if (this.data.chioceFilter) {
          this.setData({
            districtChioceIcon: "/images/icon-go-black.png",
            sortingChioceIcon: "/images/icon-go-black.png",
            chioceDistrict: false,
            chioceSorting: false,
            chioceFilter: false,
          });
        }
        else {
          this.setData({
            districtChioceIcon: "/images/icon-go-black.png",
            sortingChioceIcon: "/images/icon-go-black.png",
            chioceDistrict: false,
            chioceSorting: false,
            chioceFilter: true,
          });
        }
        break;
    }
  },
  hideAllChioce: function () {
    this.setData({
      districtChioceIcon: "/images/icon-go-black.png",
      sortingChioceIcon: "/images/icon-go-black.png",
      chioceDistrict: false,
      chioceSorting: false,
      chioceFilter: false,
    });
  },
  selectDistrictParent: function (e) {
    this.setData({
      activeDistrictParentIndex: e.currentTarget.dataset.index,
      activeDistrictName: this.data.districtList[e.currentTarget.dataset.index].district_name,
      activeDistrictChildrenIndex: 0,
      scrollTop: 0,
      scrollIntoView: 0
    })
  },
  selectDistrictChildren: function (e) {
    var index = e.currentTarget.dataset.index;
    var parentIndex = this.data.activeDistrictParentIndex == -1 ? 0 : this.data.activeDistrictParentIndex;
    if (index == 0) {
      this.setData({
        activeDistrictName: this.data.districtList[parentIndex].district_name
      })
    } else {
      this.setData({
        activeDistrictName: this.data.districtList[parentIndex].district_children_list[index].district_name
      })
    }
    this.setData({
      districtChioceIcon: "/images/icon-go-black.png",
      chioceDistrict: false,
      activeDistrictChildrenIndex: index,
      productList: [],
      pageIndex: 1,
      loadOver: false,
      isLoading: true
    })
    //this.getProductList();
  },
  //综合排序
  selectSorting: function (e) {
    var index = e.currentTarget.dataset.index;
    let appId = e.currentTarget.dataset.typeidd;
    this.setData({
      sortingChioceIcon: "/images/icon-go-black.png",
      chioceSorting: false,
      activeSortingIndex: index,
      activeSortingName: this.data.sortingList[index].value,
      // activeSortingTime: this.data.filterList[indexs].values,
      productList: [],
      pageIndex: 1,
      loadOver: false,
      isLoading: true,
      typeIdd: appId
    });
  },

  //筛选
  selectFilter: function (e) {
    var index = e.currentTarget.dataset.index;
    var _filterList = this.data.filterList;
    var appee = e.currentTarget.dataset.spacee;
    // console.log(appee)
    _filterList[index].selected = !_filterList[index].selected;
    this.setData({
      filterList: _filterList,
      spacee: appee
    });
    // var m3 = this.changg()
  },
  changg: function (options) {
    var _this = this;
    typeId = _this.data.typeIdd;
    space = _this.data.spacee;
    // console.log(typeId)
    // console.log(space)
    wx.request({
      url: 'https://route.showapi.com/254-1?showapi_appid=52900&showapi_sign=718793c63de74b99bbbafe193fa6630e&typeId=' + typeId + '&space=' + space,
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        // console.log(res.data.showapi_res_body.contentlist[0])
        // console.log(res)
        _this.setData({
          listdata: _this.listdata = res.data.showapi_res_body.pagebean.contentlist

        })
      }
    })
  },
  changeurl:function(e){
    // wx.switchTab({
    //   url: e.currentTarget.dataset.uurl
    // })
    console.log(e.currentTarget.dataset.uurl)
  },
  resetFilter: function () {
    var _filterList = this.data.filterList;
    _filterList.forEach(function (e) {
      e.selected = false;
    })
    this.setData({
      filterList: _filterList
    })
  },
  filterButtonClick: function (e) {
    // var appee = e.currentTarget.dataset.spacee;
    this.setData({
      chioceFilter: false,
      productList: [],
      pageIndex: 1,
      loadOver: false,
      isLoading: true,
      // spacee: appee
    })
    var m3 = this.changg()
    //this.getProductList();
  },
  changeco:function(e){
    var that=this;
    // console.log(e)
      that.setData({
        iconsrc: '../../../images/心2.png',
      })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
  
})