import TouchEvent from "./utils/touchEvent";

Component({
  properties: {
    data: Array
  },

  options: {
    multipleSlots: true
  },

  data: {
    isLoading: false,
    swiperData: [],
    swiperCurIndex: 0,
    slideClass: "",
    lockSwipe: false
  },

  lifetimes: {
    created() {
      this.data.swiperData = this.data.swiperData.concat(this.data.data);
      new TouchEvent(this, "touchCard", {
        swipe: evt => {
          console.info("触发滑动事件")
          //在touch结束触发，evt.direction代表滑动的方向 ['Up','Right','Down','Left']
          if (evt.direction === "Right") this.next(evt);
          if (evt.direction === "Left") this.prev(evt);
        }
      });
    },
    attached(){
      this.setData({
        swiperData: this.data.data
      })
    }
  },

  methods: {
    next(e) {
      console.info("下一页");
      if (this.data.lockSwipe) return;
      this.data.lockSwipe = true;
      if (-this.data.swiperCurIndex >= this.data.swiperData.length - 1){
        //下一个超过数据，index更改为0
        this.setData({["swiperData[" + 0 + "].slideClass"]: " ani-slide-right"}, () => {
          this.setData({
            swiperCurIndex: 0
          });
        })
  
        setTimeout(() => {
          this.data.lockSwipe = false;
          this.setData({
            ["swiperData[" + 0 + "].slideClass"]: ""
          });
        }, 590);
        return;
      }

      const index = e.currentTarget.dataset["index"];
  
      this.setData({["swiperData[" + index + "].slideClass"]: " ani-slide-right"}, () => {
        this.setData({
          swiperCurIndex: --this.data.swiperCurIndex
        });
      })

      setTimeout(() => {
        this.data.lockSwipe = false;
        this.setData({
          ["swiperData[" + index + "].slideClass"]: ""
        });
      }, 590);
      
    },

    prev(e) {
      console.info("上一页");
      const index = e.currentTarget.dataset["index"] - 1;
      if (this.data.lockSwipe) return;
      if(index < 0 ){
        let length=this.data.swiperData.length-1;
        //上一个超过数据
        this.setData({["swiperData[" + length + "].slideClass"]: " ani-slide-left"}, () => {
          this.setData({
            swiperCurIndex: -length
          });
        })
  
        setTimeout(() => {
          this.data.lockSwipe = false;
          this.setData({
            ["swiperData[" + length + "].slideClass"]: ""
          });
        }, 590);
        return;
      }
      this.data.lockSwipe = true;
      this.setData({
        ["swiperData[" + index + "].slideClass"]: " ani-slide-left",
        swiperCurIndex: ++this.data.swiperCurIndex
      });

      setTimeout(() => {
        this.data.lockSwipe = false;
        this.setData({
          ["swiperData[" + index + "].slideClass"]: ""
        });
      }, 590);
    },

    nextButtonFun(e) {
      console.info("下一个");
      let index=e.currentTarget.dataset.index;
      if (this.data.lockSwipe) return;
      this.data.lockSwipe = true;
      if (-this.data.swiperCurIndex >= this.data.swiperData.length - 1){
        //下一个超过数据，index更改为0
        this.setData({["swiperData[" + 0 + "].slideClass"]: " ani-slide-right"}, () => {
          this.setData({
            swiperCurIndex: 0
          });
        })
  
        setTimeout(() => {
          this.data.lockSwipe = false;
          this.setData({
            ["swiperData[" + 0 + "].slideClass"]: ""
          });
        }, 290);
        return;
      }

      this.setData({["swiperData[" + index + "].slideClass"]: " ani-slide-right"}, () => {
        this.setData({
          swiperCurIndex: --this.data.swiperCurIndex
        });
      })

      setTimeout(() => {
        this.data.lockSwipe = false;
        this.setData({
          ["swiperData[" + index + "].slideClass"]: ""
        });
      }, 290);
    },


    prevButtonFun(e) {
      console.info("上一个");
      let index=e.currentTarget.dataset.index - 1;
      if (this.data.lockSwipe) return;
      if(index < 0 ){
        let length=this.data.swiperData.length-1;
        //上一个超过数据
        this.setData({["swiperData[" + length + "].slideClass"]: " ani-slide-left"}, () => {
          this.setData({
            swiperCurIndex: -length
          });
        })
          this.data.lockSwipe = false;
          this.setData({
            ["swiperData[" + length + "].slideClass"]: ""
          });
        return;
      }

      this.setData({
        ["swiperData[" + index + "].slideClass"]: " ani-slide-left",
        swiperCurIndex: ++this.data.swiperCurIndex
      });

      setTimeout(() => {
        this.data.lockSwipe = false;
        this.setData({
          ["swiperData[" + index + "].slideClass"]: ""
        });
      }, 290);
    }
  }
});
