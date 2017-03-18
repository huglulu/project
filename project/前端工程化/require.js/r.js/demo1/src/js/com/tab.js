define(function(require) {

	var $ = require('jquery');

	var Tab = (function() {

		var tabList = [];


		function init($tab, handler) {
			$tab.each(function() {
				var $cal = $(this);
				if ($cal.hasClass('init')) {
					return;
				}
				tabList.push(new Tab($cal, handler));
				$cal.addClass('init');
			});

		}

		function _Tab($tab, handler) {
			this.$tab = $tab;
			this.$lis = $tab.find('li');
			this.$panels = $tab.find('.panel');
			this.handler = handler;
			this.bind();
			handler && handler(this.$panels.eq(0));
		}

		_Tab.prototype = {

			bind: function() {
				var me = this;
				this.$lis.on('click', function() {
					var index = $(this).index();
					me.$lis.removeClass('active');
					me.$lis.eq(index).addClass('active');

					me.$panels.removeClass('active');
					me.$panels.eq(index).addClass('active');

					me.handler && me.handler(me.$panels.eq(index));
				});
			},


		};


		return {
			init: init
		};

	})();

	return Tab;
});