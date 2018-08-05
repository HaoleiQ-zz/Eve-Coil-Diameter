var that = this;

var unitNumber = 1;
var input1,input2,input3,input4=1;
Page({
  data: {
    value1: '',
    value2: '',
    value3: '',
    value4: '输入框已禁用',
    value5: '',
    value6: '',
    value7: '',
    unit: '毫米'
  },
  onLoad: function() {
    that = this;
  },
  showMod: function() {
    wx.showActionSheet({
      itemList: ['毫米', '厘米', '米'],
      success: function(res) {
        console.log(res);
        switch (res.tapIndex) {
          case 0:
            that.setData({
              unit: '毫米'
            });
            break;
          case 1:
            that.setData({
              unit: '厘米'
            });
            break;
          case 2:
            that.setData({
              unit: '米'
            });
            break;
        }
      }
    })
  },

  input1: function (e) {
    input1 = (e.detail.detail.value);
  },
  input2: function (e) {
    input2 = (e.detail.detail.value);
  },
  input3: function (e) {
    input3 = (e.detail.detail.value);
  },
  input4: function (e) {
    input4 = (e.detail.detail.value);
  },

  handleClick:function(){
    runEveM();
  },
});

function runEveM() {

  // 单位毫米 mm

  // 总长度
  var allLenght = parseFloat(input1);

  // 厚度
  var thickness = parseFloat(input2);

  // 圆柱直径
  var circleL = parseFloat(input3);

  // 伸缩误差
  var deviationInput = parseFloat(input4);

  thickness = thickness * deviationInput;

  // 预计圈数
  var tempCircleNumber = 5000;
 

  if (allLenght && thickness && circleL) {

    // 直径数组
    var Darr = [];
    Darr[0] = thickness * 2 + circleL;
    for (var i = 1; i < tempCircleNumber; i++) {
      Darr[i] = thickness * 2 + Darr[i - 1];
    }

    // 周长数组
    var Carr = [];
    Carr[0] = Math.PI * Darr[0];
    for (var i = 1; i < tempCircleNumber; i++) {
      Carr[i] = Math.PI * Darr[i];
    }

    // 主计算函数
    var index = 0;
    // 当前累计长度
    var currentLen = 0;
    runEve();
    function runEve() {
      if (currentLen < allLenght) {
        currentLen = currentLen + Carr[index];
        index = index + 1;
        runEve();
      } else {
        console.log(index);
        that.setData({
          value11: Darr[index],
          value22: index,
        });
      }
    };

    var testN = 0;
    for (var i = 0; i < index; i++) {
      testN = Carr[i] + testN;
    }

  } else if (thickness && circleL) {
    wx.showToast({
      title: '请输入卷材总长度',
      icon:'none'
    })
  } else if (allLenght && circleL) {
    wx.showToast({
      title: '请输入卷材厚度',
      icon: 'none'
    })
  }
  else if (allLenght && thickness) {
    wx.showToast({
      title: '请输入圆柱直径',
      icon: 'none'
    })
  }

  else if (allLenght) {
    wx.showToast({
      title: '请输入卷材厚度',
      icon: 'none'
    })
  }

  else {
    wx.showToast({
      title: '请输入卷材总长度',
      icon: 'none'
    })

  }

}
