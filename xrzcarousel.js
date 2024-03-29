
// url：链接地址
//image：图片地址
//title：鼠标滑过显示的文本
var carousels=[//轮播内容
    // {"url":"#","image":"images/b1.png","title":"xxx"},
    // {"url":"#","image":"images/b2.png","title":"xx"},
    {"image":"images/airmirror_1.gif"},
    {"image":"images/airmirror2.gif"}
]
new Vue({
    el: '#carousel',
    data:{
        active:-1,//当前轮播图位置
        carousel:carousels,//轮播内容
        times:null,//定时器
        isCarousel:false,//是否鼠标移入暂停轮播
        leaveToClass:"",//轮播图片离开时的动画，不同方向，动画不同
        interval:3000,//每张图片的间隔空隙,
        timer:null,//定时器
    },
    methods:{
        carouselAnimate:function () {//轮播动画
            if(!this.isCarousel){this.move(1);}//如果没有鼠标移入暂停轮播，则轮播下一张图
            // console.log(this.active ===1)
            if(this.active  ===1){
                this.interval=3000;
            }else {
                this.interval=8000;
            }
            // console.log(this.interval)
            this.timer=setTimeout(this.carouselAnimate.bind(this),this.interval)
        },
        move:function (direction,index) {//direction为轮播方向，正数为右，负数为左。index为当前轮播图
            // console.log(this.active,index)
            if (index !== void 0 && this.active !==index){
                clearTimeout(this.timer);
                this.carouselAnimate()

            }
            var num=this.active;
            num=index!==undefined?index:num+direction;

            num=num>=this.carousel.length?0:
                num<0?this.carousel.length-1:num;

            this.active=num;

            this.leaveToClass=direction > 0 ? "carousel-animate-leave-to-left":"carousel-animate-leave-to-right";
        }
    },
    created:function () {//创建实例之后获取

        var images = [];
        for(var i =0; i< this.carousel.length;i++) {//预加载图片
            images[i] = new Image();
            images[i].src = this.carousel[i].image;
        }

        if(this.carousel===undefined||Object.prototype.toString.call(this.carousel)!=='[object Array]'){
            console.error("请正确设置您的轮播内容");
        }else if(this.carousel.length<1){
            console.warn("轮播图少于一张，无法轮播")
        }else {
            this.carouselAnimate();//开始轮播
        }
    },
    destroyed:function () {//销毁组件时清除定时器
        clearTimeout(this.times)
    }
})
