/**
 * 时间段选择功能区
 * author gj
 */
createTimes(0,1);
var endTimeStart = 0;
function createTimes(startTime,index){
	var timeOpts = '<option value="">时间区间</option>';
	for(var i = startTime;i <= 24; i++){
		if(i<10){
			timeOpts += '<option value="0'+i+':00">0'+i+':00</option>';
		}else{
			timeOpts += '<option value="'+i+':00">'+i+':00</option>';
		}
	}
	$('.startTime' + index).html('');
	$('.startTime' + index).append(timeOpts);
}
function getEndTimes(index){
	var timeOpts = '<option value="">时间区间</option>';
	endTimeStart = $('.startTime' + index).val().substr(0,2);
	if (endTimeStart.indexOf('0') == 0){
		endTimeStart = Number(endTimeStart.substr(1,1));
	}else{
		endTimeStart = Number(endTimeStart);
	}
	for(var j = endTimeStart + 1;j <= 24; j++){
		if(j<10){
			timeOpts += '<option value="0'+j+':00">0'+j+':00</option>';
		}else{
			timeOpts += '<option value="'+j+':00">'+j+':00</option>';
		}
	}
	$('.endTime' + index).html('');
	$('.endTime' + index).append(timeOpts);
}
//获取下一行的起始时间
var nextStart = 0;
function getNextTimes(index){
	nextStart = $('.endTime' + index).val().substr(0,2);
	if (nextStart.indexOf('0') == 0){
		nextStart = Number(nextStart.substr(1,1));
	}else{
		nextStart = Number(nextStart);
	}
	if(nextStart == 24 ||  $('.endTime' + index).val() == ''){
		$('.endTime' + index).next('.addOrRemove').find('a.add').css('display','none');
	}else{
		$('.endTime' + index).next('.addOrRemove').find('a.add').css('display','inline-block');
	}
	if(index == 3){
		$('.endTime3').next('.addOrRemove').find('a.add').css('display','none');
	}
	
}
//添加时间段
function addTimeRange(index){
	var timeRangeHtml = '<div class="col-sm-7 col-sm-offset-2 TimeRange addTimeRange">'+
								'<select name="strartTimes" onchange="getEndTimes('+index+')" class="col-sm-3 time startTime'+index+'"  style="height:27px;" data-placeholder="时间区间">'+
									'<option value="">时间区间</option>'+
								'</select>'+
								'<span class="col-sm-2 linkText">至</span>'+
								'<select name="endTimes" onchange="getNextTimes('+index+')" class="col-sm-3 time endTime'+index+'"  style="height:27px;" data-placeholder="时间区间">'+
									'<option value="">时间区间</option>'+
								'</select>'+
								'<div class="col-sm-4 addOrRemove">'+
									'<a onclick="addTimeRange('+(index+1)+')" class="add"><img src="add.png"></a>'+
									'<a onclick="removeTimeRange('+index+')" class="removeRange"><img src="remove.png"></a>'+
								'</div>'+
							'</div>';
	$('.endTime' + (index-1)).parent('.TimeRange').after(timeRangeHtml);
	$('.endTime' + (index-1)).next('.addOrRemove').find('a.add').css('display','none');
	$('.endTime' + (index-1)).next('.addOrRemove').find('a.removeRange').css('display','none');
	$('.startTime' + (index-1)).attr('disabled','disabled').css('cursor','not-allowed');
	$('.endTime' + (index-1)).attr('disabled','disabled').css('cursor','not-allowed');
	
	nextStart = $('.endTime' + (index-1)).val().substr(0,2);
	if (nextStart.indexOf('0') == 0){
		nextStart = Number(nextStart.substr(1,1));
	}else{
		nextStart = Number(nextStart);
	}
	createTimes(nextStart,index);
	
}
//移除时间段
function removeTimeRange(index){
	$('.endTime' + index).parent('.addTimeRange').remove();
	$('.startTime' + (index-1)).removeAttr('disabled').css('cursor','pointer');
	$('.endTime' + (index-1)).removeAttr('disabled').css('cursor','pointer');
	$('.endTime' + (index-1)).next('.addOrRemove').find('a.add').css('display','inline-block');
	$('.endTime' + (index-1)).next('.addOrRemove').find('a.removeRange').css('display','inline-block');
}
