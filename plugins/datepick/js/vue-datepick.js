$.fn.datePick = function(){

	function datePick($node){
		this.inputtext = $node;
		this.bindEvent();
	}

	datePick.prototype = {
		bindEvent:function(){
			var _this = this;
			_this.createDatePick();
			_this.setVue();
			_this.getStars('.star1', 90);
			_this.getStars('.star2', 30);
			_this.getStars('.star3', 20);
			_this.inputtext.on('focus', function(){
				_this.datepick_window.fadeIn();
			});
			_this.datepick_window.find('#sure').on('click', function(){
				_this.inputtext.val(_this.app.dateinput);
				_this.datepick_window.fadeOut();
			})
		},
		createDatePick:function(){
			this.datepick_window = $('<div class="datepick"><div id="app"><div class="star1"></div><div class="star2"></div><div class="star3"></div><div class="title"><a href="#" id="date-select" @click="changeDate">{{dateselect}}</a><a href="#" class="left iconfont" @click="leftClick">&#xe601;</a><a href="#" class="right iconfont" @click="rightClick">&#xe602;</a><div class="week" v-if="week_set"><span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span></div></div><div id="date-bg"><div id="date-frame"><div class="real-date-left"><div class="days" v-if="day_set"><span v-for="item in day_data_left" :class="{ choose: item.cho, hid: item.hid }">{{item.mes}}</span></div><div class="months" v-if="month_set"><span v-for="item in month_data">{{item.mes}}</span></div><div class="years" v-if="year_set"><span v-for="item in year_data_left">{{item.mes}}</span></div></div><div class="real-date"><transition name="fade"><div class="days" v-if="day_set"><span v-for="item in day_data" :class="{ choose: item.cho, hid: item.hid }" @click.stop="dayClick">{{item.mes}}</span></div></transition><transition name="fade"><div class="months"v-if="month_set" @click.stop="monthClick"><span v-for="item in month_data">{{item.mes}}</span></div></transition><transition name="fade"><div class="years"v-if="year_set"><span v-for="item in year_data" @click.stop="yearClick">{{item.mes}}</span></div></transition></div><div class="real-date-right"><div class="days" v-if="day_set"><span v-for="item in day_data_right" :class="{ choose: item.cho, hid: item.hid }">{{item.mes}}</span></div><div class="months" v-if="month_set"><span v-for="item in month_data">{{item.mes}}</span></div><div class="years" v-if="year_set"><span v-for="item in year_data_right">{{item.mes}}</span></div></div></div></div><a href="#" id="current" @click="curClick">今天</a><a href="#" id="sure">确定</a></div></div>');
			$('body').append(this.datepick_window);	
		},
		setVue:function(){
			this.app = new Vue({
				el: '#app',
				data:{
					dateselect: '',
					day_set: true,
					week_set: true,
					month_set: false,
					year_set: false,
					real_year: 0,
					real_month: 0,
					real_date: 0,
					year_data: [],
					month_data: [],
					day_data: [],
					year_data_left: [],
					day_data_left: [],
					year_data_right: [],
					day_data_right: [],
					cho: false,
					hid: false,
					dateinput: '',
					curIndex: 0
				},
				created:function(){
					var date_today = new Date();

					this.real_year = date_today.getFullYear();
					this.real_month = date_today.getMonth();
					this.real_date = date_today.getDate();
					this.cur_year = this.real_year;
					this.cur_month = this.real_month;
					this.cur_date = this.real_date;
					this.dateinput = this.cur_year + '年' + (this.cur_month + 1 ) + "月" + this.cur_date + '日'; 
					
					this.getMonthRender();
					this.getYearRender();
					this.getDayRender();
				},
				methods:{
					changeDate:function(){
						if (this.day_set) {
							this.day_set = false;
							this.month_set = true;
							this.week_set = false;
							this.dateselect = this.cur_year + '年';
						}else{
							if (this.month_set) {
								this.month_set = false;
								this.year_set = true;
								this.dateselect = this.cur_year + "-" + (this.cur_year + 11) + '年';
								this.getYearRender();
							}
						}
					},
					getMonthRender:function(){
						this.month_data = [];
						for(var i = 0 ; i< 12 ; i++){
							this.month_data.push({
								mes: ( i + 1) + '月'
							})
						}
					},
					getYearRender:function(dir){
						var ele_year = [];
						for( var i=0; i<12; i++){
							ele_year.push({
								mes: ( this.cur_year + i )
							});
						}
						if ( dir == 'right') {
							this.year_data_right = ele_year;
						}
						else if ( dir == 'left' ){
							this.year_data_left = ele_year;
						}
						else{
							this.year_data = ele_year;
						}
						this.dateselect = this.cur_year + '-' + (this.cur_year + 11) + '年';
					},
					getDayRender:function(dir){
						this.dateselect =  this.cur_year + '年' + (this.cur_month + 1) + '月';
						var lastMonth_end = this.getLastDay(this.cur_year, this.cur_month);
						var days = this.getDaysInOneMonth(this.cur_year, this.cur_month);
						var last_date = lastMonth_end.getDate();
						var last_day = lastMonth_end.getDay();

						var ele_day = [];
						if (last_day != 6) {
							for(var i = last_day; i>=0; i--){
								ele_day.push({
									mes: (last_date - i),
									hid: true,
									cho: false
								});
							}
						} 
						for(var i=0; i<days; i++){
							ele_day.push({
								mes: (i+1),
								hid: false,
								cho: false
							});
						}

						if ( dir == "right") {
							this.day_data_right = ele_day;
						}
						else if ( dir == 'left'){
							this.day_data_left = ele_day;
						}
						else{
							this.day_data = ele_day;
						}
						if (this.cur_year == this.real_year && this.cur_month == this.real_month) {
							var day_index = this.real_date + last_day%6;
							for(var i =0; i < this.day_data.length; i++){
								this.day_data[i].cho = false;
							}
							this.day_data[day_index].cho = true;
						}					
						this.dateinput = this.cur_year + '年' + (this.cur_month + 1) + '月' + this.day_data[day_index].mes + '日';
					},
					getLastDay:function(year,month){
						var month = parseInt( month, 10 );
						var data = new Date(year,month,0);
						return data;
					},
					getDaysInOneMonth:function(year,month){
						var month = parseInt( month + 1, 10 );
						var data = new Date(year,month,0);
						return data.getDate();						
					},
					monthClick: function(e){
						var target = $(e.target);
						this.cur_month = parseInt(target.html().substr( 0, target.html().length - 1 )) - 1;
						this.month_set = false;
						this.week_set = true;
						this.day_set = true;
						this.getDayRender();
					},
					dayClick:function(e){
						var target = $(e.target);
						this.curIndex = target.index();
						for(var i=0; i < this.day_data.length; i++){
							this.day_data[i].cho = false;
						}
						this.day_data[this.curIndex].cho = true;
						this.cur_date = this.day_data[this.curIndex].mes;

						var show_year = parseInt(this.cur_year);
						var show_month = parseInt(this.cur_month);
						if (this.day_data[this.curIndex].hid == true) {
							if (this.cur_month == 0) {
								show_year -= 1;
								show_month = 11;
							}else{
								show_month--;
							}
						}
						this.dateinput = show_year + '年' + (show_month + 1) + '月' + this.cur_date + '日'; 
					},
					yearClick:function(e){
						var target = $(e.target);
						this.cur_year = parseInt(target.html());
						this.year_set = false;
						this.month_set = true;
						this.dateselect = this.cur_year + '年';
					},
					curClick:function(){
						this.cur_year = this.real_year;
						this.cur_month = this.real_month;
						this.getDayRender();
						this.year_set = false;
						this.month_set = false;
						this.week_set = true;
						this.day_set = true;
					},
					leftClick:function(){
						if (this.year_set == true) {
							this.cur_year = this.cur_year - 12;
							this.getYearRender('left');
						}
						else if (this.month_set == true){
							this.cur_year--;
							this.dateselect = this.cur_year + '年';
						}
						else{
							if (this.cur_month > 0) {
								this.cur_month--;
							}else{
								this.cur_year--;
								this.cur_month = 11;
							}
							this.getDayRender('left');
						}
						var _this = this;
						$('#date-frame').animate({
							left:'0px'
						},500,function(){
							_this.day_data = _this.day_data_left;
							_this.year_data = _this.year_data_left;

							$('#date-frame').css({
								left: '-350px'
							})
						});
					},
					rightClick:function(){
						if (this.year_set == true) {
							this.cur_year = this.cur_year + 12;
							this.getYearRender('right');
						}
						else if (this.month_set == true){
							this.cur_year++;
							this.dateselect = this.cur_year + '年';
						}
						else{
							if (this.cur_month < 11) {
								this.cur_month++;
							}else{
								this.cur_year++;
								this.cur_month = 0;
							}
							this.getDayRender('right');
						}
						var _this = this;
						$('#date-frame').animate({
							left:'-700px'
						},500,function(){
							_this.day_data = _this.day_data_right;
							_this.year_data = _this.year_data_right;

							$('#date-frame').css({
								left: '-350px'
							})
						});						
					}
				}			
			})
		},
		getStars:function(className, count){
			var shadowData = "";
			for(var i = 0; i< count; i++){
				shadowData += ", " + this.getRandomNum(1, 350) + 'px ' + this.getRandomNum(1, 400) + 'px #fff';
			}
			var star = $(className);
			var star_af = className + ':after'
			star.append('<style>'+ className + "{box-shadow:" + shadowData.substr(1) + "}" + star_af + "{box-shadow:" + shadowData.substr(1) + "}</style>" );
		},
		getRandomNum:function(min, max){
			var range =  max - min;
			var rand = Math.random();
			return (min + Math.floor( rand*range ));
		}		
	}
	new datePick(this);
}