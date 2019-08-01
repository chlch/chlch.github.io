$(function() {
    var app = new Vue({
        el: '#app',
        data: {
            message: 'H Vue!'
        }
    });

    var app2 = new Vue({
        el: '#app-2',
        data: {
            message: '页面加载于 ' + new Date().toLocaleString()
        }
    })
});


function multiCheckBoxFun($this, classId, isActiveFun, notActiveFun) {
	if ($this.hasClass('checkbox-active')) {
		$this.removeClass('checkbox-active');
		notActiveFun($this);
	} else {
		$this.addClass('checkbox-active');
		isActiveFun($this);
	}
}

function singleCheckBoxFun($this, classId, isActiveFun, notActiveFun) {
	$this.parent().find('.checkbox').removeClass('checkbox-active');
	if ($this.hasClass('checkbox-active')) {
		$this.removeClass('checkbox-active');
		notActiveFun($this);
	} else {
		$this.addClass('checkbox-active');
		isActiveFun($this);
	}
}