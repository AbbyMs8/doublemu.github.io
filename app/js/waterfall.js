;(function(){

  var WaterFall = function(obj){
  		// 保存对象
  		this.container = obj;
  		this.wf = obj.find(".waterfall");
  		this.boxItems = this.wf.find(".box");
  		this.HArr = [];
  		// 设置默认参数
  		this.setting = {
  			cols           : 3
  		}
  		$.extend(this.setting,this.getSetting());
  		this.setSetting();
      this.setPlace();
      this.scrollLoad();
  };
  WaterFall.prototype = {
  	// 获得参数
  	getSetting :function(){
  		var set = this.container.attr("data-set");
  		if(set&&set!=''){
  			return $.parseJSON(set);
  		}else{
  			return;
  		}
  	},
  	// 设置参数
  	setSetting : function(){
  		this.wf.css({
  			width : (this.boxItems.eq(0).width()+42)*this.setting.cols,
  			margin : "0 auto"
  		});
  	},
  	getMinIndex : function(){
  		var min = Math.min.apply(null,this.HArr);
  		for(var i in this.HArr){
  			if(min == this.HArr[i]){
  				return i;
  			}
  		}
  	},
  	// 设置块的位置
  	setPlace : function(){
  		var self =this;
  		for(var i=0;i<self.setting.cols;i++){
  			 self.HArr.push(self.boxItems.eq(i).height()+42-0);
  		}
  		self.boxItems.each(function(index){
  			if(index>self.setting.cols-1){
  				self.boxItems.eq(index).css({
  					position : "absolute",
  					top      : Math.min.apply(null,self.HArr)-1+"px",
  					left     : self.getMinIndex()*(self.boxItems.eq(0).width()+41)+"px"
  				})
  				self.HArr[self.getMinIndex()] = self.HArr[self.getMinIndex()] +self.boxItems.eq(index).height()+41;
  			}
  		})
  	},
    // 检测是否具备滚动加载的条件
    checkScrollSlide :function(){
        var lastBoxH = this.boxItems.eq(this.boxItems.length-1).offset().top + Math.floor( this.boxItems.eq(this.boxItems.length-1).height()/2);
        var scrolltop = $(window).scrollTop();
        var height = $(window).height();
        return (lastBoxH<scrolltop+height)?true:false;
    },
    // 滚动加载
    scrollLoad : function(){
         var self = this;

         $(window).on("scroll",function(){
          if(self.checkScrollSlide()){
             $.ajax({
                url : "../js/data.json",
                type : "POST",
                dataType : "html",
                success : function(data){
                    var obj = $.parseJSON(data);
                    for(var i =0;i<5;i++){
                      self.wf.append('<div class="box trans">'+
                                        '<div class="tags">'+
                                          '<span class="tag hot">'+ obj.water[i].tags[0]+'<b class="triangle"></b></span>'+
                                          '<span class="tag hot">'+ obj.water[i].tags[1]+'<b class="triangle"></b></span>'+
                                          '<span class="tag hot">'+ obj.water[i].tags[2]+'<b class="triangle"></b></span>'+
                                        '</div>'+
                                        '<h1 class="title">'+ obj.water[i].title+'</h1>'+
                                        '<img src="'+obj.water[i].pic+'">'+
                                        '<p>'+obj.water[i].paragraph+'</p>'+
                                      '</div>');
                      self.boxItems = self.wf.find(".box");
                      self.HArr = [];
                      self.setPlace();
                      self.boxItems.removeClass("trans");
                    }
                    
                },
                error : function(){
                   alert("请求失败");
                }
             })
          }
        });
    }
  };

  WaterFall.init = function(objs){
  	  var _this_ = this;
  	  objs.each(function(){
  	  	  new _this_($(this));
  	  })
  }

  window["WaterFall"] = WaterFall;

})(jQuery)