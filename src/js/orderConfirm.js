// JavaScript Document

$.extend({
	splitPrice:function(priceInput){
	   if(priceInput.value!=""){
		   var ms = priceInput.value.replace(/[^\d\.]/g,"").replace(/(\.\d{2}).+$/,"$1").replace(/^0+([1-9])/,"$1").replace(/^0+$/,"0");
		   var txt = ms.split(".");
		   while(/\d{4}(,|$)/.test(txt[0]))
		   txt[0] = txt[0].replace(/(\d)(\d{3}(,|$))/,"$1,$2");
		   priceInput.value = stmp = txt[0]+(txt.length>1?"."+txt[1]:"");
		   bbb.value = number2num1(ms-0);
		}
	},
	setQuantity:function(h){
		$("#iptQuantity").keyup(function(){
			this.value=this.value.replace(/\D/g,'');
			if(this.value>h||this.value<1){
				this.value=h;
			}
		})
		$("#addQuantity").click(function(){
			var quantity=$("#iptQuantity").val();
			if(quantity<h){
				$("#iptQuantity").val(quantity*1+1);
			}
		})
		$("#minusQuantity").click(function(){
			var quantity=$("#iptQuantity").val();
			if(quantity>1){
				$("#iptQuantity").val(quantity*1-1);
			}
		})
		$("#heightQuantity").click(function(){
			$("#iptQuantity").val(h);
		})
	}
})

//设置Quantity
$.setQuantity(300);

//设置Price
$("#iptPrice").keyup(function(){
	$.splitPrice(this);
})

//confirm弹出层
$("#sbtSubmit").click(function(){
	var account=$("#sltAccount").val(),method="",boxClass="";
	$("td.method input").each(function(){
		if($(this).attr("checked")=="checked"){
			method=$(this).val();
		}
	})
	if(method=="Buy"){
		boxClass="blueBox";
	}else{
		boxClass="redBox";
	}
	var code=$("#iptCode").val();
	var name=$("td#stockName").text();
	var price=$("#price").val().split(",").join("");
	var quantity=$("#iptQuantity").val();
	var amount="HKD 49,750,00";
	var type=$("#sltType").val();
	var date=$("#sltExDate").val();
	$("#tdAccount").text(account);
	$("#tdMethod").html('<span class="stress">'+method+'</span>');
	$("#tdCode").text(code);
	$("#tdName").text(name);
	//$("#tdPrice").text(price);
	$("#tdQuantity").text(quantity);
	$("#tdAmount").text(amount);
	$("#tdType").text(type);
	$("#tdDate").text(date);
	$("#confirmation").attr("class",boxClass);	
	$("#Mask").fadeTo("slow","0.3");
	$("#confirmPop").fadeIn("slow");
})
$("#confirmPop .close a,#confirmPop .btnArea #btnCancel,#Mask").click(function(){
	$("#confirmPop").fadeOut();
	$("#Mask").fadeOut();
	return false;
})
$("#btnConfirm").click(function(){
	window.open("acknowledgement.html","_top");
})

$("#iptMethod_buy").click(function(){
	$("#order").removeClass("redBox sell").addClass("blueBox");
});
$("#iptMethod_sell").click(function(){
	$("#order").removeClass("blueBox").addClass("redBox sell");
})