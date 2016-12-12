// JavaScript Document

//计算出三个月前的日期
function setStartDate(thisYear,thisMonth,thisDate){
    var startYear=thisYear;
    var startMonth=thisMonth-3;
    var startDate=thisDate+1;
 
    if(startMonth<1){
      startYear-=1;
      startMonth=12+startMonth;
    }
 
    var lastDateOfMonth=theLastDateOfMonth(startYear,startMonth);
 
    if(startDate>lastDateOfMonth){
      startMonth+=1;
      if(startMonth==13){
		startYear+=1;
        startMonth=1;
      }
      startDate=1;
    }
 
    return dateFormat(startYear,startMonth,startDate);
}
 
//"yyyy-mm-dd"格式化日期
function dateFormat(year,month,date){
	dateStr="";
	if(date<10){
	  date="0"+date;
	}
	if(month<10){
	  month="0"+month;
	}
	dateStr=year+"-"+month+"-"+date;
	return dateStr;
}
 
//判断某个月的最后一天
function theLastDateOfMonth(theYear,theMonth){
	var lastDateOfMonth=31;
	var lastDateOfFebruary=28;
	if((theYear % 4 == 0 && theYear % 100 != 0) || theYear % 400 == 0){
	  lastDateOfFebruary=29;
	}
	switch(theMonth){
	  case 2:
		lastDateOfMonth=lastDateOfFebruary;
		break;
	  case 4,6,9,11:
		lastDateOfMonth=30;
		break;
	}
	return lastDateOfMonth;
}
 
//设置初始日期
function setDefaultDate(thisYear,thisMonth,thisDate){
	var defaultYear=thisYear;
	var defaultMonth=thisMonth;
	var defaultDate=thisDate-6;
	
	if(defaultDate<1){
	  defaultMonth-=1;
	  if(defaultMonth<1){
		defaultYear-=1;
		defaultMonth=12;
	  }
	  var lastDateOfMonth=theLastDateOfMonth(defaultYear,defaultMonth);
	  defaultDate=lastDateOfMonth+defaultDate;
	}
	
	return dateFormat(defaultYear,defaultMonth,defaultDate);
}
 
var nowDate=new Date();
var endDate=dateFormat(nowDate.getFullYear(),nowDate.getMonth()+1,nowDate.getDate());
var startDate=setStartDate(nowDate.getFullYear(),nowDate.getMonth()+1,nowDate.getDate());
var defaultDate=setDefaultDate(nowDate.getFullYear(),nowDate.getMonth()+1,nowDate.getDate());

$("#dateStart").val(defaultDate);
$("#dateEnd").val(endDate);
$("#dateStart").Zebra_DatePicker({
	direction: [startDate, endDate]
});
$("#dateEnd").Zebra_DatePicker({
	direction: [startDate, endDate]
});