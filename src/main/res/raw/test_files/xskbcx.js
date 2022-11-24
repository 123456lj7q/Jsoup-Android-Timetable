vpn_eval((function(){
//显示字段
var xszd = {};
var xkkg=true;
var kblen=1;
var sjklen=1;
var jxhjkclen=1;
var haveXX=1;
var xsxx;
jQuery(function($){ 
	
	//获取配置的显示字段信息
	$.post(_path + '/kbdy/bjkbdy_cxKbzdxsxx.html', {"kbzl":"xscx","doType":"query"} , function(rst){
		$.each(rst,function(index,item){
			xszd[item.ZDM] = item.SFXS == "1";
		});
	});
	
	$("#table1").backdrop("show");
	var map = paramMap();
	if(language=="en_US"){
		cxKbContent2(map, xszd);
	}else{
		cxKbContent(map, xszd);
	}
	$("#table1").backdrop("hide");
	
	$('button[data-toggle="tab"]').click(function(e) {
		$('button[data-toggle="tab"]').removeClass("btn-primary");
		$(this).addClass("btn-primary");
		$('#shcPDF').attr('data-type', $(this).attr('data-type'));
	});		
	
	$('#shcPDF').click(function(){
		if(haveXX==0){
			$.alert("无您的基本信息，请与管理员联系！");
			return false;
		}
		if(kblen==0 && xkkg && sjklen == 0 && jxhjkclen == 0){ //如果没有课表数据06-29日
			$.alert("该学年学期尚无您的课表！");
			return false;
		}
		if(!xkkg){
			$.alert("该学年学期的课表尚未开放！");
			return false;
		}
		var requestMap = {};
		requestMap["xnm"]= xsxx.XNM;
		requestMap["xqm"]= xsxx.XQM;
		requestMap["xnmc"]= xsxx.XNMC;
		requestMap["xqmmc"]= xsxx.XQMMC;
		requestMap["jgmc"]= xsxx.JGMC;
		requestMap["xm"]= xsxx.XM;
		requestMap["xxdm"]= $.defined(xsxx.XXDM)?xsxx.XXDM:'';
		requestMap["xszd.sj"]=xszd.sj;
		requestMap["xszd.cd"]=xszd.cd;
		requestMap["xszd.js"]=xszd.js;
		requestMap["xszd.jszc"]=xszd.jszc;
		requestMap["xszd.jxb"]=xszd.jxb;
		requestMap["xszd.xkbz"]=xszd.xkbz;//选课备注
		requestMap["xszd.kcxszc"]=xszd.kcxszc;//课程学时组成
		requestMap["xszd.zhxs"]=xszd.zhxs;//周学时
		requestMap["xszd.zxs"]=xszd.zxs;
		requestMap["xszd.khfs"]=xszd.khfs;
		requestMap["xszd.xf"]=xszd.xf;
		requestMap["xszd.skfsmc"]=xszd.skfsmc;
		requestMap["kzlx"] ="dy";
		$.ajax({
			   type: "POST",
			   url: _path+"/kbdy/bjkbdy_cxXnxqsfkz.html",
			   async: false,
			   data: requestMap,
			   datatype: "json",
			   success: function(data){
				   if(data.indexOf("true") > -1){
					   $.alert("该学年学期课表当前时间段不允许打印！");
						flag=true;
				   }else{
					   if($('#shcPDF').attr('data-type')=='table'){
							$.buildForm("downForm",_path+"/kbcx/xskbcx_cxXsShcPdf.html?doType=table",requestMap).submit();
						}else{
							$.buildForm("downForm",_path+"/kbcx/xskbcx_cxXsShcPdf.html?doType=list",requestMap).submit();
						}
				   }
			   }
			});
		
		
	});
	
	$("#kbcong").popover({
		trigger		: 'click',
		container	: '#ylkbTable',
		placement	: 'right',
		title		: $.i18n.get("xszd"),
		html		: true,
		content		: function(){
			var html = [];
			var sjcheck = (xszd.sj)?"checked":"";
			var cdcheck = (xszd.cd)?"checked":"";
			var jscheck = (xszd.js)?"checked":"";
			var jszccheck = (xszd.jszc)?"checked":"";
			var jxbcheck = (xszd.jxb)?"checked":"";
			var xkbzcheck = (xszd.xkbz)?"checked":"";
			var kcxszccheck = (xszd.kcxszc)?"checked":"";
			var zhxscheck = (xszd.zhxs)?"checked":"";
			var zxscheck = (xszd.zxs)?"checked":"";
			var khfscheck = (xszd.khfs)?"checked":"";
			var xfcheck = (xszd.xf)?"checked":"";
			var skfsmccheck = (xszd.skfsmc)?"checked":"";
			html.push("<form role='form' style='width:200px' id='kbcongform' onsubmit='return false;'>");
			html.push("<div class='col-sm-12'><div class='checkbox'><label><input name='sjckb' type='checkbox' "+sjcheck+">"+$.i18n.get("time")+"</label></div>");
			html.push("<div class='checkbox'><label><input name='cdckb' type='checkbox' "+cdcheck+">"+$.i18n.get("location")+"</label></div>");
			html.push("<div class='checkbox'><label><input name='jsckb' type='checkbox' "+jscheck+">"+$.i18n.jwglxt["jsxm"]+"</label></div>");
			html.push("<div class='checkbox'><label><input name='jszcckb' type='checkbox' "+jszccheck+">"+$.i18n.get("jszc")+"</label></div>");
			html.push("<div class='checkbox'><label><input name='jxbckb' type='checkbox' "+jxbcheck+">"+$.i18n.get("jxb")+"</label></div>");
			html.push("<div class='checkbox'><label><input name='xkbzckb' type='checkbox' "+xkbzcheck+">"+$.i18n.get("xkbz")+"</label></div>");
			html.push("<div class='checkbox'><label><input name='kcxszcckb' type='checkbox' "+kcxszccheck+">"+$.i18n.get("kcxszc")+"</label></div>");
			html.push("<div class='checkbox'><label><input name='zhxsckb' type='checkbox' "+zhxscheck+">"+$.i18n.get("zhxs")+"</label></div>");
			html.push("<div class='checkbox'><label><input name='zxsckb' type='checkbox' "+zxscheck+">"+$.i18n.jwglxt["zxs"]+"</label></div>");
			html.push("<div class='checkbox'><label><input name='khfsckb' type='checkbox' "+khfscheck+">"+$.i18n.get("khfs")+"</label></div>");
			html.push("<div class='checkbox'><label><input name='xfckb' type='checkbox' "+xfcheck+">"+$.i18n.get("xf")+"</label></div>");	
			html.push("<div class='checkbox'><label><input name='skfsmcckb' type='checkbox' "+skfsmccheck+">"+"上课方式名称"+"</label></div>");	
			html.push("</div>");
			html.push("<div class='col-sm-12' style='margin-bottom:8px'><div class='row'><div class='col-sm-offset-5 col-sm-3'><button type='submit' id='kbcongok' class='btn btn-primary btn-xs'>"+$.i18n.jwglxt["sure"]+"</button></div>");
			html.push("<div class='col-sm-3'><button id='kbcongclose' class='btn btn-default btn-xs'>"+$.i18n.jwglxt["btn_colse"]+"</button></div></div></div>");
			html.push("</form>");
			return html.join("");
		}
	});

	$(document).off("click", "#kbcongok").on("click", "#kbcongok", function(){
		var ckb = $("#kbcongform").serializeArray();
		xszd = {'sj':false, 'cd': false, 'js':false, 'jszc':false, 'jxb': false,'khfs':false,'xkbz':false,'kcxszc':false,'zhxs':false,'zxs':false,'xf':false,'skfsmc':false};
		$.each(ckb, function(i, t){
			var ckbName = t.name;
			var congName = ckbName.substr(0, ckbName.length-3);
			switch(congName){
			case 'sj':
				xszd.sj = true;
				break;
			case 'cd':
				xszd.cd = true;
				break;
			case 'js':
				xszd.js = true;
				break;
			case 'jszc':
				xszd.jszc = true;
				break;
			case 'jxb':
				xszd.jxb = true;
				break;
			case 'xkbz':
				xszd.xkbz = true;
				break;
			case 'kcxszc':
				xszd.kcxszc = true;
				break;
			case 'zhxs':
				xszd.zhxs = true;
				break;
			case 'zxs':
				xszd.zxs = true;
				break;
			case 'khfs':
				xszd.khfs = true;
				break;
			case 'xf':
				xszd.xf = true;
				break;
			case 'skfsmc':
				xszd.skfsmc = true;
				break;
			}
		});
		var cd = xszd.cd==true?1:0;
		var sj = xszd.sj==true?1:0;
		var js = xszd.js==true?1:0;
		var jxb = xszd.jxb==true?1:0;
		var jszc = xszd.jszc==true?1:0;
		var kcxszc = xszd.kcxszc==true?1:0;
		var khfs = xszd.khfs==true?1:0;
		var xf = xszd.xf==true?1:0;
		var xkbz = xszd.xkbz==true?1:0;
		var zhxs = xszd.zhxs==true?1:0;
		var zxs = xszd.zxs==true?1:0;
		var skfsmc = xszd.skfsmc==true?1:0;
		var zdm = 'cd,sj,js,jxb,jszc,kcxszc,khfs,xf,xkbz,zhxs,zxs,skfsmc';
		var zdmc = '场地,时间,教师,教学班,教师职称,课程学时组成,考核方式,学分,选课备注,周学时,总学时,授课方式名称';
		var sfxs = cd+','+sj+','+js+','+jxb+','+jszc+','+kcxszc+','+khfs+','+xf+','+xkbz+','+zhxs+','+zxs+','+skfsmc;
		$.ajax({
		    type : 'POST',
		    url:_path+'/kbcx/xskbcx_cxXskbxszdxg.html',
		    async: false,
		    dataType : 'json',
		    data : {"zdm":zdm,"zdmc":zdmc,"sfxs":sfxs},
		    success : function(data) {
		    },
		    error : function() {
		    }
		});
		
		if(language=="en_US"){
			cxKbContent2(paramMap(), xszd);
		}else{
			cxKbContent(paramMap(), xszd);
		}
		$('#kbcong').popover('hide');
		return false;
	}).on("click", "#kbcongclose", function(){
		$('#kbcong').popover('hide');
	}).off("click","u.showJxbtkjl").on("click","u.showJxbtkjl",function(e){
		$.showDialog(_path + '/kbdy/xskbdy_cxJxbtkjlView.html',"查看教学班调课记录",
			$.extend(true,{},viewConfig,{
				width:($("#yhgnPage").innerWidth()-100)+"px",
				data:{jxb_id:$(this).closest("u").data("jxb_id")}
			})
		);
	});
});

function paramMap(){
	var map = {	
		"xnm" : $('#xnm').val(),
		"xqm" : $('#xqm').val(),
		"kzlx" :'ck'
	}
	return map;
}


var TempGrid = $.extend({},BaseJqGrid,{
	postData:paramMap(),
	rownumbers : false,
	caption: "实验课表",
	pager: "#sycjlrpager", //分页工具栏  
	resizeHandle:"#ajaxForm",
	shrinkToFit: false,
	multiselect:false,
    url: _path + '/xssygl/sykbcx_cxSykbcxxsIndex.html?doType=query', //这是Action的请求地址  
    colModel:[
            {label:'ID',name:'xmz_id', index: 'xmz_id',hidden:true,key:true,align:'center'},
        	{label:'学年',name:'xnm', index: 'xnm',align:'left',width:'100px'},
        	{label:'学期',name:'xqm', index: 'xqm',align:'left',width:'80px'},
        	{label:'学号',name:'xh', index: 'xh',align:'left',width:'100px'},
			{label:'姓名',name:'xm', index: 'xm',align:'left',width:'100px'},
        	{label:'课程号',name:'kch', index: 'kch',align:'left',width:'100px'},
			{label:'课程名称',name:'kcmc', index: 'kcmc',align:'left',width:'100px'},
			{label:'实验项目名称',name:'xmmc', index: 'xmmc',align:'left',width:'150px'},
	        {label:'实验分组名称',name:'syfzmc', index: 'syfzmc',align:'left',width:'150px'},
			{label:'上课时间地点',name:'sksjdd', index: 'sksjdd',align:'left',width:'200px'},
			{label:'实验房间对应场地校区',name:'dycdxq', index: 'dycdxq',align:'left',width:'200px'},     
			{label:'实验人员',name:'jsxm', index: 'jsxm',align:'left',width:'100px'},
	],
	loadComplete:function(){
		if($("#sycjlrtabGrid").getDataIDs().length==0){
			$("#gbox_sycjlrtabGrid").hide();
			$("#searchBox1").hide();
		}else{
			$("#gbox_sycjlrtabGrid").show();
			$("#searchBox1").show();
		}
	}
});


$("#sycjlrtabGrid").loadJqGrid(TempGrid);


//绑定导出操作
$("#btn_dc").click(function(){
	//导出处理编号 规则:JW_模块编号_业务名称 如：JW_N152020_KCRKZGSH
	var dcclbh = $("#dcclbh").val();
	var requestMap = paramMap();
	//用于查询要导出的数据
	var url = _path + '/xssygl/sykbcx_dcSykbList.html';			
	//TempGrid必须是全局对象
	$.exportDialog(url,dcclbh,requestMap ,TempGrid.colModel,'#sycjlrtabGrid');
});


//查询
function searchResult(){
	if($("#ajaxForm").validateForm("isValid")){
		if(language=="en_US"){
			cxKbContent2(paramMap(), xszd);
		}else{
			cxKbContent(paramMap(), xszd);
		}		
	}
}
/*
function popup(){
	$.showDialog(_path+'/kbcx/xskbcx_cxXskbSimpleIndex.html','学生课表预览',$.extend({},viewConfig,
			{width: "400px"}
	));
	
}*/
function cxKbContent(map, xszd){
	$("#table1").empty();
	$("#table2").empty();
	$("#tableSj").empty();
	$("#tableQt").empty();
	$("#tableJx").empty();
	$.ajax({
		type: 'POST', 
		url:_path+'/kbcx/xskbcx_cxXsKb.html',
		async: true,
		data: map, 
		success: function(data){
			if(data==null) return false;
			var xsbjList = data.xsbjList;
			var xsbjHtml = "";
			if($.founded(xsbjList)){
				$.each(xsbjList,function(index,item){
					xsbjHtml+= item.xslxbj+"-"+item.xsmc;+"&nbsp;"
				})
			}
			var xqbzxxszList = data.xqbzxxszList;
			var bzxxHtml = "";
			if($.founded(xqbzxxszList)){
				$.each(xqbzxxszList,function(index,item){
					bzxxHtml+= item.bzxx+"("+item.xqmc+")<br/>";
				})
			}
			var kblx = data.kblx; //获取课表类型
			xkkg = data.xkkg; //选课开关
			if(!$.defined(data.xsxx)){
				haveXX=0;
				$("#table1").append("<h3 class='align-center'><div class='nodata'><span>该学年学期无您的注册信息，请与管理员联系！</span></div></h3>");
				$("#table2").append("<h3 class='align-center'><div class='nodata'><span>该学年学期无您的注册信息，请与管理员联系！</span></div></h3>");
				return false;
			}
			xsxx = data.xsxx; //获取学生信息 姓名学院学年学期学号
			
			/*var xkkg = xsxx.XKKG;
			if(xkkg=="0"){
				$("#table1").append("<h3 class='align-center'>无课表！</h3>");
				$("#table2").append("<h3 class='align-center'>无课表！</h3>");
				return false;
			}*/
			if(data.xnxqsfkz=="true"){
				$("#table1").append("<h3 class='align-center'>该学年学期课表当前时间段不允许查看！</h3>");
				$("#table2").append("<h3 class='align-center'>该学年学期课表当前时间段不允许查看！</h3>");
				return false;
			}
			var qsxqj=data.qsxqj;
			var kbList = data.kbList||[]; //获取课表数据
			var sjkList = data.sjkList||[];//获取实践课数据
			var jxhjkcList = data.jxhjkcList||[];
			var xsxxdm = xsxx.XXDM||'';
			var xskbsfxstkzt = data.xskbsfxstkzt||0;//学生课表是否显示调课状态 
			kblen = kbList.length;
			sjklen = sjkList.length;
			jxhjkclen = jxhjkcList.length;
 			if(kblen==0 && xkkg && sjklen == 0 && jxhjkclen == 0){ //如果没有课表数据
				$("#table1").append("<h3 class='align-center'><div class='nodata'><span>该学年学期尚无您的课表！</span></div></h3>");
				$("#table2").append("<h3 class='align-center'><div class='nodata'><span>该学年学期尚无您的课表！</span></div></h3>");
				search('sycjlrtabGrid',paramMap());
				return false;
			}else if(!xkkg){
				$("#table1").append("<h3 class='align-center'><div class='nodata'><span>该学年学期的课表尚未开放！</span></div></h3>");
				$("#table2").append("<h3 class='align-center'><div class='nodata'><span>该学年学期的课表尚未开放！</span></div></h3>");
				return false;
			}
 			var kbddsfxsxq =  $('#kbddsfxsxq').val();
 			//课表不为空
			for(var i=0; i<kbList.length; i+=1){
				var item = kbList[i];
				var xqj = item.xqj; //星期
				var jcs = item.jcs; //节次
				var xqh_id = item.xqh_id; //校区号
				var xqdm = item.xqdm; //校区归属
				var startF;
				var endF;
				if(item.sxbj=="1"){
					startF = "<font color='blue'>";
					endF = "</font>";
				}else{
					startF = "<font color='red'><i>";
					endF = "</i></font>";
				}
				
				
				var sjspan = (xszd.sj==true)?startF+"<span class='glyphicon glyphicon-calendar'></span> 周数："+item.zcd+endF:"";
				var cdspan = (xszd.cd==true)?startF+((kbddsfxsxq==1)?"<span class='glyphicon glyphicon-tower'></span> 校区："+item.xqmc:"")+"<span class='glyphicon glyphicon-map-marker'></span> 上课地点："+item.cdmc+endF:"";
				var jsspan = (xszd.js==true)?startF+"<span class='glyphicon glyphicon-user'></span> 教师："+item.xm+((xszd.jszc==true&&$.defined(item.zcmc))?"("+item.zcmc+")":"")+endF:"";
				var jxbspan = (xszd.jxb==true)?startF+"<span class='glyphicon glyphicon-home'></span> 教学班："+item.jxbmc+endF:"";
				var xkbzspan = (xszd.xkbz==true)?startF+"<span class='glyphicon glyphicon-tower'></span> 选课备注："+item.xkbz+endF:"";
				var kcxszcspan = (xszd.kcxszc==true)?startF+"<span class='glyphicon glyphicon-tower'></span> 课程学时组成："+item.kcxszc+endF:"";
				var zhxsspan = (xszd.zhxs==true)?startF+"<span class='glyphicon glyphicon-tower'></span> 周学时："+item.zhxs+endF:"";
				var zxsspan = (xszd.zxs==true)?startF+"<span class='glyphicon glyphicon-tower'></span> 总学时："+item.zxs+endF:"";
				var khfsspan = (xszd.khfs==true)?startF+"<span class='glyphicon glyphicon-tower'></span> 考核方式："+item.khfsmc+endF:"";
				var xfspan = (xszd.xf==true)?startF+"<span class='glyphicon glyphicon-tower'></span> 学分："+item.xf+endF:"";
				var skfsspan = (xszd.skfsmc==true)?startF+"<span class='glyphicon glyphicon-tower'></span> 授课方式名称："+item.skfsmc+endF:"";
				var kcmcspan;
				if(xskbsfxstkzt==1&&item.jxbsftkbj==1){
					//显示带查看调课记录链接的课程
					kcmcspan = "<u class='title showJxbtkjl' data-jxb_id='"+item.jxb_id+"' style='cursor: pointer;'>"+startF+"【调】"+item.kcmc+($.defined(item.xslxbj)?item.xslxbj:"")+endF+"</u>";
				}else{
					kcmcspan = "<span class='title'>"+startF+item.kcmc+($.defined(item.xslxbj)?item.xslxbj:"")+endF+"</span>";
				}
				
				var sjtbspan = (xszd.sj==true)?"<p><span data-toggle='tooltip' data-placement='top' title='节/周'>"+startF+"<span class='glyphicon glyphicon-time'></span></span> "+"("+item.jc+")"+item.zcd+"</p>"+endF:"";
				var cdtbspan = (xszd.cd==true)?"<p><span data-toggle='tooltip' data-placement='top' title='上课地点'>"+startF+"<span class='glyphicon glyphicon-map-marker'></span></span> "+((kbddsfxsxq==1)?item.xqmc:"")+" "+item.cdmc+"</p>"+endF:"";
				var jstbspan = (xszd.js==true)?"<p><span data-toggle='tooltip' data-placement='top' title='教师'>"+startF+"<span class='glyphicon glyphicon-user'></span></span> "+item.xm+((xszd.jszc==true&&$.defined(item.zcmc))?"("+item.zcmc+")":"")+"</p>"+endF:"";
				var jxbtbspan = (xszd.jxb==true)?"<p><span data-toggle='tooltip' data-placement='top' title='教学班名称'>"+startF+"<span class='glyphicon glyphicon-home'></span></span> "+item.jxbmc+"</p>"+endF:"";
				var xkbztbspan = (xszd.xkbz==true)?"<p><span data-toggle='tooltip' data-placement='top' title='选课备注'>"+startF+"<span class='glyphicon glyphicon-tower'></span></span> "+item.xkbz+"</p>"+endF:"";
				var kcxszctbspan = (xszd.kcxszc==true)?"<p><span data-toggle='tooltip' data-placement='top' title='课程学时组成'>"+startF+"<span class='glyphicon glyphicon-tower'></span></span> "+item.kcxszc+"</p>"+endF:"";
				var zhxstbspan = (xszd.zhxs==true)?"<p><span data-toggle='tooltip' data-placement='top' title='周学时'>"+startF+"<span class='glyphicon glyphicon-tower'></span></span> "+item.zhxs+"</p>"+endF:"";
				var zxstbspan = (xszd.zxs==true)?"<p><span data-toggle='tooltip' data-placement='top' title='总学时'>"+startF+"<span class='glyphicon glyphicon-tower'></span></span> "+item.zxs+"</p>"+endF:"";
				var khfstbspan = (xszd.khfs==true)?"<p><span data-toggle='tooltip' data-placement='top' title='考核方式'>"+startF+"<span class='glyphicon glyphicon-tower'></span></span> "+item.khfsmc+"</p>"+endF:"";
				var xftbspan = (xszd.xf==true)?"<p><span data-toggle='tooltip' data-placement='top' title='学分'>"+startF+"<span class='glyphicon glyphicon-tower'></span></span> "+item.xf+"</p>"+endF:"";
				var skfstbspan = (xszd.skfsmc==true)?"<p><span data-toggle='tooltip' data-placement='top' title='授课方式'>"+startF+"<span class='glyphicon glyphicon-tower'></span></span> "+item.skfsmc+"</p>"+endF:"";
				/*构造表格模式结构*/
				if($("#table1").find("#kbgrid_table_"+xqdm).size()==0){ //表格模式按校区分, 因校区的日时段结构可能不同
					var kbrsd; //获取日时段信息,得到节次结构,及上下午列是否显示
					$.ajax({
						type: 'POST', 
						url: _path+'/kbcx/xskbcx_cxRsd.html',
						async: false,
						data: {"xnm":map.xnm, "xqm":map.xqm, "xqh_id": xqh_id},
						datatype: 'json',
						success: function(data){
							kbrsd = data; //获得数据
						}
					});
					if(kbjcxfsfxsqsjssj == 1){
						var kbrjc; //获取日节次的起始时间和结束时间
						$.ajax({
							type: 'POST', 
							url: _path+'/kbcx/xskbcx_cxRjc.html',
							async: false,
							data: {"xnm":map.xnm, "xqm":map.xqm, "xqh_id": xqh_id},
							datatype: 'json',
							success: function(data){
								kbrjc = data;
							}
						});
					}
					if(kbrsd.length==0){
						$("#table1").empty().append("<h3 class='align-center'>日节次设置有误</h3>");
						$("#table2").append("<h3 class='align-center'>日节次设置有误</h3>");
						return false;
					}
					
					var tableHtml = "";
					tableHtml += "<table id='kbgrid_table_"+xqdm+"' class='table table-hover table-bordered text-center timetable1' style='width:98%;margin-left:10px'>";
					if(kbrsd[0].kbsfxs=='0'){ //如果时间段不显示
						var xqWidth = (kblx==7)?13.5:19;
						//tableHtml += "<tr><td colspan='"+(1+kblx)+"'><div class='timetable_title'><h6 class='pull-left'>"+xsxx.XNMC+"学年第"+xsxx.XQMMC+"学期</h6>"+xsxx.XM+"的课表<h6 class='pull-right'>"+xsxx.JGMC+xsxxdm+"　学号："+xsxx.XH+"</h6></div></td></tr>"
						tableHtml += "<tr><td colspan='"+(1+kblx)+"'><div class='timetable_title'><h6 class='pull-left'>"+xsxx.XNMC+"学年第"+xsxx.XQMMC+"学期</h6>"+xsxx.XM+"的课表<h6 class='pull-right'>　学号："+xsxx.XH+"</h6></div><div><span class='pull-left'>"+xsbjHtml+"</span><span class='pull-right'><font color='red' size='3'><b>注：</b></font><font color='red' size='3'><i>红色斜体为待筛选</i></font>，<font color='blue' size='3'>蓝色为已选上</font></span></div></td></tr>"
						+"<tr><td width='5%'><span class='time'>节次</span></td>";
						if(kblx==7 && qsxqj==7){
							tableHtml+="<td width='"+xqWidth+"%'><span class='time'>"+data.xqjmcMap[7]+"</span></td>";
							for(var j=1; j<=kblx-1; j++){
								tableHtml+="<td width='"+xqWidth+"%'><span class='time'>"+data.xqjmcMap[j]+"</span></td>";
							}
						}else{
							for(var j=1; j<=kblx; j++){
								tableHtml+="<td width='"+xqWidth+"%'><span class='time'>"+data.xqjmcMap[j]+"</span></td>";
							}
						}
												
						tableHtml+="</tr>";
						var qsjc = 1; //节次 起始为1
						$.each(kbrsd, function(index, item){
							var rsdzjs = item.rsdzjs;
							for(var k = 1; k <= rsdzjs; k++){
								if(kbjcxfsfxsqsjssj == 1){
									tableHtml+="<tr><td><span class='festival'>"+qsjc+"</span><span>"+kbrjc[qsjc-1].qssj+"</span><br><span>"+kbrjc[qsjc-1].jssj+"</span></td>";
								}else{
									tableHtml+="<tr><td><span class='festival'>"+qsjc+"</span></td>";
								}
								if(kblx==7 && qsxqj==7){
									tableHtml+="<td rowspan=1 id='"+"7"+"-"+qsjc+"' class='td_wrap'></td>";
									for(var k1 = 1; k1 <= kblx-1; k1++){
										tableHtml+="<td rowspan=1 id='"+k1+"-"+qsjc+"' class='td_wrap'></td>";
									}
								}else{
									for(var k1 = 1; k1 <= kblx; k1++){
										tableHtml+="<td rowspan=1 id='"+k1+"-"+qsjc+"' class='td_wrap'></td>";
									}
								}
								qsjc += 1;
								tableHtml+="</tr>";
							}
						});
					}else{ //时间段显示
						var xqWidth = (kblx==7)?12.5:17.5;
						tableHtml += "<tr><td colspan='"+(2+kblx)+"'><div class='timetable_title'>"
						+"<h6 class='pull-left'>"+xsxx.XNMC+"学年第"+xsxx.XQMMC+"学期</h6>"+xsxx.XM+"的课表"
						//+"<h6 class='pull-right'>"+xsxx.JGMC+xsxxdm+"　学号："+xsxx.XH+"</h6></div></td></tr>"
						+"<h6 class='pull-right'>　学号："+xsxx.XH+"</h6></div><div><span class='pull-left'>"+xsbjHtml+"</span><span class='pull-right'><font color='red' size='3'><b>注：</b></font><font color='red' size='3'><i>红色斜体为待筛选</i></font>，<font color='blue' size='3'>蓝色为已选上</font></span></div></td></tr>"
						+"<tr><td width='7.5%'><span class='time'>时间段</span></td><td width='5%'><span class='time'>节次</span></td>";			
						if(kblx==7 && qsxqj==7){
							tableHtml+="<td width='"+xqWidth+"%'><span class='time'>"+data.xqjmcMap[7]+"</span></td>";
							for(var j=1; j<=kblx-1; j++){
								tableHtml+="<td width='"+xqWidth+"%'><span class='time'>"+data.xqjmcMap[j]+"</span></td>";
							}
						}else{
							for(var j=1; j<=kblx; j++){
								tableHtml+="<td width='"+xqWidth+"%'><span class='time'>"+data.xqjmcMap[j]+"</span></td>";
							}
						}						
						tableHtml+="</tr>";
						var qsjc = 1; //节次 起始为1
						$.each(kbrsd, function(index, item){
							var rsdzjs = item.rsdzjs;
							var rsdmc = item.rsdmc;
							for(var k = 1; k <= rsdzjs; k++){
								tableHtml+="<tr>";
								if(k==1){
									tableHtml+="<td rowspan='"+rsdzjs+"'><span class='time'>"+rsdmc+"</span></td>";
								}
								if(kbjcxfsfxsqsjssj == 1){
									tableHtml+="<td><span class='festival'>"+qsjc+"</span><span>"+kbrjc[qsjc-1].qssj+"</span><br><span>"+kbrjc[qsjc-1].jssj+"</span></td>";
								}else{
									tableHtml+="<td><span class='festival'>"+qsjc+"</span></td>";
								}
								if(kblx==7 && qsxqj==7){
									tableHtml+="<td rowspan=1 id='"+"7"+"-"+qsjc+"' class='td_wrap'></td>";
									for(var k1 = 1; k1 <= kblx-1; k1++){
										tableHtml+="<td rowspan=1 id='"+k1+"-"+qsjc+"' class='td_wrap'></td>";
									}
								}else{
									for(var k1 = 1; k1 <= kblx; k1++){
										tableHtml+="<td rowspan=1 id='"+k1+"-"+qsjc+"' class='td_wrap'></td>";
									}
								}								
								qsjc += 1;
								tableHtml+="</tr>";
							}
						});
					}

					var sjkcHtml = "";//实践课程
					var qtkcHtml = "";//其它课程
					var jxhjkcHtml = "";
					if(sjkList.length>0){
					   for(var j=0;j<sjkList.length;j++){
					     var sjkc = sjkList[j];
					    	 if(sjkc.sfsjk==1){
					    		 sjkcHtml +=sjkc.sjkcgs+";";
					    	 }else{
					    		 qtkcHtml +=sjkc.qtkcgs+";";
					    	 }
					   }
					}
					if(jxhjkcList.length>0){
						   for(var j=0;j<jxhjkcList.length;j++){
						    jxhjkcHtml +=jxhjkcList[j].jxhjkcgs+";&nbsp";
						   }
						}					
					
					tableHtml += "</table>";
					var xxdm = $("#xxdm").val();
					if(xxdm=='10574'){
						if(sjkcHtml.length>0){						
							var tableHtmlSj = "";
							tableHtmlSj += "<h6 class='align-left'>  实践课：</h6><table id='kbgrid_tableSj_"+xqdm+"' class='table table-hover table-bordered text-center timetableSj' style='width:98%;margin-left:10px'>";
							tableHtmlSj+="<tr>";
				    		 tableHtmlSj+="<td style='text-align:left;'>课程名称</td>";
				    		 tableHtmlSj+="<td style='text-align:left;'>教师</td>";
				    		 tableHtmlSj+="<td style='text-align:left;'>学分</td>";
				    		 tableHtmlSj+="<td style='text-align:left;'>起止周</td>";
				    		 tableHtmlSj+="<td style='text-align:left;'>上课时间</td>";
				    		 tableHtmlSj+="<td style='text-align:left;'>上课地点</td>";
				    		 tableHtmlSj+="<td style='text-align:left;'>选课时间</td>";
				    		 tableHtmlSj+="</tr>";
							for(var j=0;j<sjkList.length;j++){
							     var sjkc = sjkList[j];
							    	 if(sjkc.sfsjk==1){
							    		 tableHtmlSj+="<tr>";
							    		 tableHtmlSj+="<td style='text-align:left;'>"+(sjkc.kcmc==undefined?"":sjkc.kcmc)+"</td>";
							    		 tableHtmlSj+="<td style='text-align:left;'>"+(sjkc.jsxm==undefined?"":sjkc.jsxm)+"</td>";
							    		 tableHtmlSj+="<td style='text-align:left;'>"+(sjkc.xf==undefined?"":sjkc.xf)+"</td>";
							    		 tableHtmlSj+="<td style='text-align:left;'>"+(sjkc.qsjsz==undefined?"":sjkc.qsjsz)+"</td>";
							    		 tableHtmlSj+="<td style='text-align:left;'>"+(sjkc.sksj==undefined?"":sjkc.sksj)+"</td>";
							    		 tableHtmlSj+="<td style='text-align:left;'>"+(sjkc.jxdd==undefined?"":sjkc.jxdd)+"</td>";
							    		 tableHtmlSj+="<td style='text-align:left;'>"+(sjkc.xksj==undefined?"":sjkc.xksj)+"</td>";
							    		 tableHtmlSj+="</tr>";
							    	 }
							   }
							tableHtmlSj += "</table>";
							$("#tableSj").append(tableHtmlSj);
						}
						if(qtkcHtml.length>0){
							var tableHtmlQt = "";
							tableHtmlQt += "<h6 class='align-left'>  其他课程：</h6><table id='kbgrid_tableQt_"+xqdm+"' class='table table-hover table-bordered text-center timetableQt' style='width:98%;margin-left:10px'>";
							tableHtmlQt+="<tr>";
				    		 tableHtmlQt+="<td style='text-align:left;'>课程名称</td>";
				    		 tableHtmlQt+="<td style='text-align:left;'>教师</td>";
				    		 tableHtmlQt+="<td style='text-align:left;'>学分</td>";
				    		 tableHtmlQt+="<td style='text-align:left;'>起止周</td>";
				    		 tableHtmlQt+="<td style='text-align:left;'>上课时间</td>";
				    		 tableHtmlQt+="<td style='text-align:left;'>上课地点</td>";
				    		 tableHtmlQt+="<td style='text-align:left;'>选课时间</td>";
				    		 tableHtmlQt+="</tr>";
							for(var j=0;j<sjkList.length;j++){
							     var sjkc = sjkList[j];
							    	 if(sjkc.sfsjk!=1){
							    		 tableHtmlQt+="<tr>";
							    		 tableHtmlQt+="<td style='text-align:left;'>"+(sjkc.kcmc==undefined?"":sjkc.kcmc)+"</td>";
							    		 tableHtmlQt+="<td style='text-align:left;'>"+(sjkc.jsxm==undefined?"":sjkc.jsxm)+"</td>";
							    		 tableHtmlQt+="<td style='text-align:left;'>"+(sjkc.xf==undefined?"":sjkc.xf)+"</td>";
							    		 tableHtmlQt+="<td style='text-align:left;'>"+(sjkc.qsjsz==undefined?"":sjkc.qsjsz)+"</td>";
							    		 tableHtmlQt+="<td style='text-align:left;'>"+(sjkc.sksj==undefined?"":sjkc.sksj)+"</td>";
							    		 tableHtmlQt+="<td style='text-align:left;'>"+(sjkc.jxdd==undefined?"":sjkc.jxdd)+"</td>";
							    		 tableHtmlQt+="<td style='text-align:left;'>"+(sjkc.xksj==undefined?"":sjkc.xksj)+"</td>";
							    		 tableHtmlQt+="</tr>";
							    	 }
							   }
							tableHtmlQt += "</table>";
							$("#tableQt").append(tableHtmlQt);
						}
						if(jxhjkcHtml.length>0){
							 var tableHtmlJx = "";
							 tableHtmlJx+= "<h6 class='align-left'>  教学环节：</h6><table id='kbgrid_tableQt_"+xqdm+"' class='table table-hover table-bordered text-center timetableQt' style='width:98%;margin-left:10px'>";
							 tableHtmlJx+="<tr>";
				    		 tableHtmlJx+="<td style='text-align:left;'>课程名称</td>";
				    		 tableHtmlJx+="<td style='text-align:left;'>教师</td>";
				    		 tableHtmlJx+="<td style='text-align:left;'>学分</td>";
				    		 tableHtmlJx+="<td style='text-align:left;'>起止周</td>";
				    		 tableHtmlJx+="<td style='text-align:left;'>上课时间</td>";
				    		 tableHtmlJx+="<td style='text-align:left;'>上课地点</td>";
				    		 tableHtmlJx+="<td style='text-align:left;'>选课时间</td>";
				    		 tableHtmlJx+="</tr>";
							for(var j=0;j<jxhjkcList.length;j++){
							    var sjkc = jxhjkcList[j];						    	
							    tableHtmlJx+="<tr>";
							    tableHtmlJx+="<td style='text-align:left;'>"+(sjkc.kcmc==undefined?"":sjkc.kcmc)+"</td>";
							    tableHtmlJx+="<td style='text-align:left;'>"+(sjkc.jsxm==undefined?"":sjkc.jsxm)+"</td>";
							    tableHtmlJx+="<td style='text-align:left;'>"+(sjkc.xf==undefined?"":sjkc.xf)+"</td>";
							    tableHtmlJx+="<td style='text-align:left;'>"+(sjkc.qsjsz==undefined?"":sjkc.qsjsz)+"</td>";
							    tableHtmlJx+="<td style='text-align:left;'>"+(sjkc.sksj==undefined?"":sjkc.sksj)+"</td>";
							    tableHtmlJx+="<td style='text-align:left;'>"+(sjkc.jxdd==undefined?"":sjkc.jxdd)+"</td>";
							    tableHtmlJx+="<td style='text-align:left;'>"+(sjkc.xksj==undefined?"":sjkc.xksj)+"</td>";
							    tableHtmlJx+="</tr>";							    	 
							   }
							tableHtmlJx += "</table>";
							$("#tableJx").append(tableHtmlJx);
						}
					}else{
						if(sjkcHtml.length>0 || qtkcHtml.length>0 || jxhjkcHtml.length>0){
						    tableHtml += "<tr><td colspan='"+(2+kblx)+"' style='text-align:left;'><div class='timetable_title'>";
						    if(sjkcHtml.length>0){
						    	//tableHtml += "<h6 class='pull-left'>"+"实践课程："+sjkcHtml+"</h6>";
						    	tableHtml += "<span class='red' style='font: normal 18px/25px microsoft YaHei;'>实践课程：</span><span style='font:  18px/25px SimSun;'>"+sjkcHtml+"</span><br>";
						    }
						    if(qtkcHtml.length>0){
						    	//tableHtml += "<h6 class='pull-left'>"+"其它课程："+qtkcHtml+"</h6>";
						    	tableHtml += "<span class='red' style='font: normal 18px/25px microsoft YaHei;'>其它课程：</span><span style='font:  18px/25px SimSun;'>"+qtkcHtml+"</span><br>";
						    }
						    if(jxhjkcHtml.length>0){
						    	tableHtml += "<span class='red' style='font: normal 18px/25px microsoft YaHei;'>教学环节：</span><span style='font:  18px/25px SimSun;'>"+jxhjkcHtml+"</span>";
						    }
						    tableHtml += "</div></td></tr>";
						}
					}
					
					$("#table1").append(tableHtml);
				}
				/*构造表格模式结构结束*/
				
				/*构造列表模式结构*/
				if(i==0){
					var listHtml = "";
					listHtml += "<table id='kblist_table' class='table table-hover table-bordered text-center timetable'>"
							 +"<tbody><tr><td colspan='4'><div class='timetable_title'><h6 class='pull-left'>"
							 //+xsxx.XNMC+"学年第"+xsxx.XQMMC+"学期</h6>"+xsxx.XM+"的课表<h6 class='pull-right'>"+xsxx.JGMC+xsxxdm+"　学号："+xsxx.XH+"</h6></div></td></tr>"
							 +xsxx.XNMC+"学年第"+xsxx.XQMMC+"学期</h6>"+xsxx.XM+"的课表<h6 class='pull-right'>　学号："+xsxx.XH+"</h6></div><div><span class='pull-left'>"+xsbjHtml+"</span><span class='pull-right'><font color='red' size='3'><b>注：</b></font><font color='red' size='3'><i>红色斜体为待筛选</i></font>，<font color='blue' size='3'>蓝色为已选上</font></span></div></td></tr>"
							 +"<tr class='tbody_head'><td>星期</td><td>节次</td><td>课表信息</td></tr></tbody>";
					
					for(var j=1; j<=kblx; j++){
						listHtml += "<tbody id='xq_"+j+"' style='display: none'><tr><td id='xq_rowspan_"+j+"' rowspan='0' width='50'><span class='week'>"+data.xqjmcMap[j]+"</span></td></tr></tbody>";
					}
					var sjkcHtml = "";
					var qtkcHtml = "";//其它课程
					var jxhjkcHtml = "";
					if(sjkList.length>0){
					   for(var j=0;j<sjkList.length;j++){
					     var sjkc = sjkList[j];					  
					    	if(sjkc.sfsjk==1){
					    		sjkcHtml +=sjkc.sjkcgs+";";
					    	}else{
					    		qtkcHtml +=sjkc.qtkcgs+";";
					    	}
					   }
					}
					if(jxhjkcList.length>0){
						for(var j=0;j<jxhjkcList.length;j++){
						   jxhjkcHtml +=jxhjkcList[j].jxhjkcgs+";&nbsp";
						}
					}
					if(xxdm!='10574'){
					if(sjkcHtml.length>0 || qtkcHtml.length>0 ||jxhjkcHtml.length>0){
						listHtml += "<tbody><tr><td colspan='4' style='text-align:left;'><div class='timetable_title'>";
					    if(sjkcHtml.length>0){
					    	//listHtml += "<h6 class='pull-left'>"+"实践课程："+sjkcHtml+"</h6>";
					    	listHtml += "<span class='red' style='font: normal 18px/25px microsoft YaHei;'>实践课程：</span><span style='font:  18px/25px SimSun;'>"+sjkcHtml+"</span><br>";
					    }
					    if(qtkcHtml.length>0){
					    	//listHtml += "<h6 class='pull-left'>"+"其它课程："+qtkcHtml+"</h6>";
					    	listHtml += "<span class='red' style='font: normal 18px/25px microsoft YaHei;'>其它课程：</span><span style='font:  18px/25px SimSun;'>"+qtkcHtml+"</span><br>";
					    }
					    if(jxhjkcHtml.length>0){
					    	listHtml += "<span class='red' style='font: normal 18px/25px microsoft YaHei;'>教学环节：</span><span style='font:  18px/25px SimSun;'>"+jxhjkcHtml+"</span>";
					    }
					    listHtml += "</div></td></tr></tbody>";
					}					
					}
					listHtml += "</table>";
					$("#table2").append(listHtml);
				}
				/*构造列表模式结构结束*/	
				
				/*填入表格课表信息*/
				var jcor = item.jcor;
				var jcValueArr = jcor.split("-");
				var jcValue1 = jcValueArr[0];
				var jcValue2 = jcValueArr[1];
				var tdEle = $("#kbgrid_table_"+xqdm).find("#"+xqj+"-"+jcValue1);
				var tdHtml = "<div class='timetable_con text-left'>"+kcmcspan+sjtbspan+cdtbspan+jstbspan+jxbtbspan+khfstbspan+xkbztbspan+kcxszctbspan+zhxstbspan+zxstbspan+xftbspan+skfstbspan+"</div>";
				
				tdEle.append(tdHtml).attr("rowspan", jcValue2-jcValue1+1);
				for(var j = jcValue1*1+1; j <= jcValue2; j+=1){
					$("#kbgrid_table_"+xqdm).find("#"+xqj+"-"+j).remove();
				}
				
				/*填入表格课表信息结束*/
				
				/*填入列表课表信息*/
				var tbodyEle = $("#xq_"+xqj);
				tbodyEle.show(); //显示
				var xqRowSpanEle = $("#xq_rowspan_"+xqj);
				
				//合并单行显示
				var listspan = "<td id='jc_"+xqj+"-"+jcs+"' rowspan=1><span class='festival'>"+jcs+"</span></td>"
							+"<td><div class='timetable_con text-left'>"+kcmcspan
							+"<p>"+sjspan+cdspan+jsspan+jxbspan+khfsspan+xkbzspan+kcxszcspan+zhxsspan+zxsspan+xfspan+skfsspan+"</p></div></td>";
				if(tbodyEle.find("#jc_"+xqj+"-"+jcs).size()==0){ // 如果没插入过这个节次
					if(xqRowSpanEle.attr("rowspan")==1){ //如果这个星期tr没被插入过
						xqRowSpanEle.parent().append(listspan);
					}else{ //如果这个星期tr插入过其他节次
						tbodyEle.append("<tr>"+listspan+"</tr>");
					}
				}else{ //如果插入过这个节次,那么要合并
					$("#jc_"+xqj+"-"+jcs).attr("rowspan", function(index, attr){return attr*1+1;});
					$("#jc_"+xqj+"-"+jcs).parent().after("<tr>"
							+"<td><div class='timetable_con text-left'>"+kcmcspan
							+"<p>"+sjspan+cdspan+jsspan+jxbspan+khfsspan+xkbzspan+kcxszcspan+zhxsspan+zxsspan+xfspan+skfsspan+"</p></div></td></tr>");
				}
				/*填入列表课表信息结束*/
				
				xqRowSpanEle.attr("rowspan", $("#xq_"+xqj).find("tr").size());
			}
			
			//课表为空，实践课或者教学环节行课程不为空
			if (kblen == 0 && (sjklen > 0 ||jxhjkclen>0)) {
				/*构造表格模式结构*/
				if($("#table1").find("#kbgrid_table_"+xqdm).size()==0){ //表格模式按校区分, 因校区的日时段结构可能不同
					var kbrsd; //获取日时段信息,得到节次结构,及上下午列是否显示
					$.ajax({
						type: 'POST', 
						url: _path+'/kbcx/xskbcx_cxRsd.html',
						async: false,
						data: {"xnm":map.xnm, "xqm":map.xqm, "xqh_id": xqh_id},
						datatype: 'json',
						success: function(data){
							kbrsd = data; //获得数据
						}
					});
					if(kbrsd.length==0){
						$("#table1").empty().append("<h3 class='align-center'>日节次设置有误</h3>");
						$("#table2").append("<h3 class='align-center'>日节次设置有误</h3>");
						return false;
					}
					
					var tableHtml = "";
					tableHtml += "<table id='kbgrid_table_"+xqdm+"' class='table table-hover table-bordered text-center timetable1' style='width:98%;margin-left:10px'>";
					
					
					var xqWidth = (kblx==7)?12.5:17.5;
					tableHtml += "<tr><td colspan='"+(2+kblx)+"'><div class='timetable_title'>"
					+"<h6 class='pull-left'>"+xsxx.XNMC+"学年第"+xsxx.XQMMC+"学期</h6>"+xsxx.XM+"的课表"
					//+"<h6 class='pull-right'>"+xsxx.JGMC+xsxxdm+"　学号："+xsxx.XH+"</h6></div></td></tr>"
					+"<h6 class='pull-right'>　学号："+xsxx.XH+"</h6></div><div><span class='pull-left'>"+xsbjHtml+"</span><span class='pull-right'><font color='red' size='3'><b>注：</b></font><font color='red' size='3'><i>红色斜体为待筛选</i></font>，<font color='blue' size='3'>蓝色为已选上</font></span></div></td></tr>";
					
					var sjkcHtml = "";
					var qtkcHtml = "";//其它课程
					var jxhjkcHtml = "";//教学环节行的课程
					if(sjkList.length>0){
					   for(var j=0;j<sjkList.length;j++){
					     var sjkc = sjkList[j];					  			    	 
					    	 if(sjkc.sfsjk==1){
					    		 sjkcHtml +=sjkc.sjkcgs+";&nbsp;&nbsp;";
					    	 }else{
					    		 qtkcHtml +=sjkc.qtkcgs+";&nbsp;&nbsp;";
					    	 }
					   }
					}
					if(jxhjkcList.length>0){
						for(var j=0;j<jxhjkcList.length;j++){
							jxhjkcHtml +=jxhjkcList[j].jxhjkcgs+";&nbsp";
						}
					}
					if(sjkcHtml.length>0 || qtkcHtml.length>0 ||jxhjkcHtml.length>0){
						tableHtml += "<tr><td colspan='"+(2+kblx)+"' style='text-align:left;'><div class='timetable_title'>";
					    if(sjkcHtml.length>0){
					    	//tableHtml += "<h6 class='pull-left'>"+"实践课程："+sjkcHtml+"</h6>";
					    	tableHtml += "<span class='red' style='font: normal 18px/25px microsoft YaHei;'>实践课程：</span><span style='font:  18px/25px SimSun;'>"+sjkcHtml+"</span><br>";
					    }
					    if(qtkcHtml.length>0){
					    	//tableHtml += "<h6 class='pull-left'>"+"其它课程："+qtkcHtml+"</h6>";
					    	tableHtml += "<span class='red' style='font: normal 18px/25px microsoft YaHei;'>其它课程：</span><span style='font:  18px/25px SimSun;'>"+qtkcHtml+"</span><br>";
					    }
					    if(jxhjkcHtml.length>0){
					    	tableHtml += "<span class='red' style='font: normal 18px/25px microsoft YaHei;'>教学环节：</span><span style='font:  18px/25px SimSun;'>"+jxhjkcHtml+"</span>";
					    }
					    tableHtml += "</div></td></tr>";
					}					
					
					tableHtml += "</table>";
					$("#table1").append(tableHtml);
				}
				/*构造表格模式结构结束*/
				
				/*构造列表模式结构*/
				if(i==0){
					var listHtml = "";
					listHtml += "<table id='kblist_table' class='table table-hover table-bordered text-center timetable'>"
							 +"<tbody><tr><td colspan='4'><div class='timetable_title'><h6 class='pull-left'>"
							 //+xsxx.XNMC+"学年第"+xsxx.XQMMC+"学期</h6>"+xsxx.XM+"的课表<h6 class='pull-right'>"+xsxx.JGMC+xsxxdm+"　学号："+xsxx.XH+"</h6></div></td></tr>"
							 +xsxx.XNMC+"学年第"+xsxx.XQMMC+"学期</h6>"+xsxx.XM+"的课表<h6 class='pull-right'>　学号："+xsxx.XH+"</h6></div><div><span class='pull-left'>"+xsbjHtml+"</span><span class='pull-right'><font color='red' size='3'><b>注：</b></font><font color='red' size='3'><i>红色斜体为待筛选</i></font>，<font color='blue' size='3'>蓝色为已选上</font></span></div></td></tr></tbody>";

					var sjkcHtml = "";//实践课程
					var qtkcHtml = "";//其它课程
					var jxhjkcHtml = "";//教学环节行的课程
					if(sjkList.length>0){
					   for(var j=0;j<sjkList.length;j++){
					     var sjkc = sjkList[j];					    
					     if(sjkc.sfsjk==1){
					    	 sjkcHtml +=sjkc.sjkcgs+";&nbsp;&nbsp;";
					     }else{
					    	 qtkcHtml +=sjkc.qtkcgs+";&nbsp;&nbsp;";
					     }
					   }
					}
					if(jxhjkcList.length>0){
						for(var j=0;j<jxhjkcList.length;j++){
						   jxhjkcHtml +=jxhjkcList[j].jxhjkcgs+";&nbsp";
						}
					}
					if(sjkcHtml.length>0 || qtkcHtml.length>0 ||jxhjkcHtml>0){
						listHtml += "<tbody><tr><td colspan='4' style='text-align:left;'><div class='timetable_title'>";
					    if(sjkcHtml.length>0){
					    	//listHtml += "<h6 class='pull-left'>"+"实践课程："+sjkcHtml+"</h6>";
					    	listHtml += "<span class='red' style='font: normal 18px/25px microsoft YaHei;'>实践课程：</span><span style='font:  18px/25px SimSun;'>"+sjkcHtml+"</span><br>";
					    }
					    if(qtkcHtml.length>0){
					    	//listHtml += "<h6 class='pull-left'>"+"其它课程："+qtkcHtml+"</h6>";
					    	listHtml += "<span class='red' style='font: normal 18px/25px microsoft YaHei;'>其它课程：</span><span style='font:  18px/25px SimSun;'>"+qtkcHtml+"</span><br>";
					    }
					    if(jxhjkcHtml.length>0){
					    	listHtml += "<span class='red' style='font: normal 18px/25px microsoft YaHei;'>教学环节：</span><span style='font:  18px/25px SimSun;'>"+jxhjkcHtml+"</span>";
					    }
					    listHtml += "</div></td></tr></tbody>";
					}					
					
					listHtml += "</table>";
					$("#table2").append(listHtml);
				}
				/*构造列表模式结构结束*/	
			}
			if($.founded(bzxxHtml)){
				$("#table1").append("<div class = 'blue'>备注："+bzxxHtml+"</div>");
				$("#table2").append("<div class = 'blue'>备注："+bzxxHtml+"</div>");
			}
			search('sycjlrtabGrid',paramMap());
		}
	});
}

//查询英文课表
function cxKbContent2(map, xszd){
	$("#table1").empty();
	$("#table2").empty();
	$("#tableSj").empty();
	$("#tableQt").empty();
	$("#tableJx").empty();
	$.ajax({
		type: 'POST', 
		url:_path+'/kbcx/xskbcx_cxXsywKb.html',
		async: true,
		data: map, 
		success: function(data){
			if(data==null) return false;
			var xsbjList = data.xsbjList;
			var xsbjHtml = "";
			if($.founded(xsbjList)){
				$.each(xsbjList,function(index,item){
					xsbjHtml+= item.xslxbj+"-"+item.ywxsmc;+"&nbsp;"
				})
			}
			var kblx = data.kblx; //获取课表类型
			xkkg = data.xkkg; //选课开关
			if(!$.defined(data.xsxx)){
				haveXX=0;
				$("#table1").append("<h3 class='align-center'><div class='nodata'><span>No registration information for this academic year, please contact the administrator!</span></div></h3>");
				$("#table2").append("<h3 class='align-center'><div class='nodata'><span>No registration information for this academic year, please contact the administrator!</span></div></h3>");
				return false;
			}
			xsxx = data.xsxx; //获取学生信息 姓名学院学年学期学号
			
			var kbList = data.kbList||[]; //获取课表数据
			var sjkList = data.sjkList||[];//获取实践课数据
			var xsxxdm = xsxx.XXDM||'';
			var xskbsfxstkzt = data.xskbsfxstkzt||0;//学生课表是否显示调课状态 
			kblen = kbList.length;
			sjklen = sjkList.length;
 			if(kblen==0 && xkkg && sjklen == 0){ //如果没有课表数据
				$("#table1").append("<h3 class='align-center'><div class='nodata'><span>There is no timetable for this academic year!</span></div></h3>");
				$("#table2").append("<h3 class='align-center'><div class='nodata'><span>There is no timetable for this academic year!</span></div></h3>");
				search('sycjlrtabGrid',paramMap());
				return false;
			}else if(!xkkg){
				$("#table1").append("<h3 class='align-center'><div class='nodata'><span>The schedule for the school year is not yet open!</span></div></h3>");
				$("#table2").append("<h3 class='align-center'><div class='nodata'><span>The schedule for the school year is not yet open!</span></div></h3>");
				return false;
			}
 			//课表不为空
			for(var i=0; i<kbList.length; i+=1){
				var item = kbList[i];
				var xqj = item.xqj; //星期
				var jcs = item.jcs; //节次
				var xqh_id = item.xqh_id; //校区号
				var xqdm = item.xqdm; //校区归属
				var startF;
				var endF;
				if(item.sxbj=="1"){
					startF = "<font color='blue'>";
					endF = "</font>";
				}else{
					startF = "<font color='red'><i>";
					endF = "</i></font>";
				}
				
				
				var sjspan = (xszd.sj==true)?startF+"<span class='glyphicon glyphicon-calendar'></span> weeks："+item.zcd+endF:"";
				var cdspan = (xszd.cd==true)?startF+"<span class='glyphicon glyphicon-tower'></span> campus："+item.xqmc+"<span class='glyphicon glyphicon-map-marker'></span> class locations："+item.cdmc+endF:"";
				var jsspan = (xszd.js==true)?startF+"<span class='glyphicon glyphicon-user'></span> teacher："+item.xm+((xszd.jszc==true&&$.defined(item.zcmc))?"("+item.zcmc+")":"")+endF:"";
				var jxbspan = (xszd.jxb==true)?startF+"<span class='glyphicon glyphicon-home'></span> class name："+item.jxbmc+endF:"";
				var xkbzspan = (xszd.xkbz==true)?startF+"<span class='glyphicon glyphicon-tower'></span> elective remarks："+item.xkbz+endF:"";
				var kcmcspan;
				if(xskbsfxstkzt==1&&item.jxbsftkbj==1){
					//显示带查看调课记录链接的课程
					kcmcspan = "<u class='title showJxbtkjl' data-jxb_id='"+item.jxb_id+"' style='cursor: pointer;'>"+startF+"【Tune】"+item.kcmc+($.defined(item.xslxbj)?item.xslxbj:"")+endF+"</u>";
				}else{
					kcmcspan = "<span class='title'>"+startF+item.kcmc+($.defined(item.xslxbj)?item.xslxbj:"")+endF+"</span>";
				}
				
				var sjtbspan = (xszd.sj==true)?"<p><span data-toggle='tooltip' data-placement='top' title='week/section'>"+startF+"<span class='glyphicon glyphicon-time'></span></span> "+item.zcd+"("+item.jc+")"+"</p>"+endF:"";
				var cdtbspan = (xszd.cd==true)?"<p><span data-toggle='tooltip' data-placement='top' title='class locations'>"+startF+"<span class='glyphicon glyphicon-map-marker'></span></span> "+item.xqmc+" "+item.cdmc+"</p>"+endF:"";
				var jstbspan = (xszd.js==true)?"<p><span data-toggle='tooltip' data-placement='top' title='teacher'>"+startF+"<span class='glyphicon glyphicon-user'></span></span> "+item.xm+((xszd.jszc==true&&$.defined(item.zcmc))?"("+item.zcmc+")":"")+"</p>"+endF:"";
				var jxbtbspan = (xszd.jxb==true)?"<p><span data-toggle='tooltip' data-placement='top' title='class name'>"+startF+"<span class='glyphicon glyphicon-home'></span></span> "+item.jxbmc+"</p>"+endF:"";
				var xkbztbspan = (xszd.xkbz==true)?"<p><span data-toggle='tooltip' data-placement='top' title='elective remarks'>"+startF+"<span class='glyphicon glyphicon-tower'></span></span> "+item.xkbz+"</p>"+endF:"";				
				/*构造表格模式结构*/
				if($("#table1").find("#kbgrid_table_"+xqdm).size()==0){ //表格模式按校区分, 因校区的日时段结构可能不同
					var kbrsd; //获取日时段信息,得到节次结构,及上下午列是否显示
					$.ajax({
						type: 'POST', 
						url: _path+'/kbcx/xskbcx_cxRsd.html',
						async: false,
						data: {"xnm":map.xnm, "xqm":map.xqm, "xqh_id": xqh_id},
						datatype: 'json',
						success: function(data){
							kbrsd = data; //获得数据
						}
					});
					if(kbrsd.length==0){
						$("#table1").empty().append("<h3 class='align-center'>The day was set incorrectly</h3>");
						$("#table2").append("<h3 class='align-center'>The day was set incorrectly</h3>");
						return false;
					}
					
					var tableHtml = "";
					tableHtml += "<table id='kbgrid_table_"+xqdm+"' class='table table-hover table-bordered text-center timetable1' style='width:98%;margin-left:10px'>";
					
					if(kbrsd[0].kbsfxs=='0'){ //如果时间段不显示
						var xqWidth = (kblx==7)?13.5:19;
						//tableHtml += "<tr><td colspan='"+(1+kblx)+"'><div class='timetable_title'><h6 class='pull-left'>"+xsxx.XNMC+"学年第"+xsxx.XQMMC+"学期</h6>"+xsxx.XM+"的课表<h6 class='pull-right'>"+xsxx.JGMC+xsxxdm+"　学号："+xsxx.XH+"</h6></div></td></tr>"
						tableHtml += "<tr><td colspan='"+(1+kblx)+"'><div class='timetable_title'><h6 class='pull-left'>"+xsxx.XNMC+" academic year "+xsxx.XQMMC+" term</h6>"+(xsxx.YWXM==undefined?xsxx.XM:xsxx.YWXM)+"\'s Curriculum<h6 class='pull-right'>　student ID："+xsxx.XH+"</h6></div><div><span class='pull-left'>"+xsbjHtml+"</span><span class='pull-right'><font color='red' size='3'><b>Note:</b></font><font color='red' size='3'><i>Red Italic is for screening,</i></font><font color='blue' size='3'>blue is selected</font></span></div></td></tr>"
						+"<tr><td width='5%'><span class='time'>sections</span></td>";
						for(var j=1; j<=kblx; j++){
							tableHtml+="<td width='"+xqWidth+"%'><span class='time'>"+data.xqjmcMap[j]+"</span></td>";
						}
						tableHtml+="</tr>";
						var qsjc = 1; //节次 起始为1
						$.each(kbrsd, function(index, item){
							var rsdzjs = item.rsdzjs;
							for(var k = 1; k <= rsdzjs; k++){
								tableHtml+="<tr><td><span class='festival'>"+qsjc+"</span></td>";
								for(var k1 = 1; k1 <= kblx; k1++){
									tableHtml+="<td rowspan=1 id='"+k1+"-"+qsjc+"' class='td_wrap'></td>";
								}
								qsjc += 1;
								tableHtml+="</tr>";
							}
						});
					}else{ //时间段显示
						var xqWidth = (kblx==7)?12.5:17.5;
						tableHtml += "<tr><td colspan='"+(2+kblx)+"'><div class='timetable_title'>"
						+"<h6 class='pull-left'>"+xsxx.XNMC+" academic year "+xsxx.XQMMC+" term</h6>"+(xsxx.YWXM==undefined?xsxx.XM:xsxx.YWXM)+"\'s Curriculum"
						//+"<h6 class='pull-right'>"+xsxx.JGMC+xsxxdm+"　学号："+xsxx.XH+"</h6></div></td></tr>"
						+"<h6 class='pull-right'>　student ID："+xsxx.XH+"</h6></div><div><span class='pull-left'>"+xsbjHtml+"</span><span class='pull-right'><font color='red' size='3'><b>Note:</b></font><font color='red' size='3'><i>Red Italic is for screening,</i></font><font color='blue' size='3'>blue is selected</font></span></div></td></tr>"
						+"<tr><td width='7.5%'><span class='time'>Period of time</span></td><td width='5%'><span class='time'>Sections</span></td>";
						for(var j=1; j<=kblx; j++){
							tableHtml+="<td width='"+xqWidth+"%'><span class='time'>"+data.xqjmcMap[j]+"</span></td>";
						}
						tableHtml+="</tr>";
						var qsjc = 1; //节次 起始为1
						$.each(kbrsd, function(index, item){
							var rsdzjs = item.rsdzjs;
							var rsdmc = item.rsdmc;
							var rsdywmc = item.rsdywmc;
							for(var k = 1; k <= rsdzjs; k++){
								tableHtml+="<tr>";
								if(k==1){
									tableHtml+="<td rowspan='"+rsdzjs+"'><span class='time'>"+rsdywmc+"</span></td>";
								}
								tableHtml+="<td><span class='festival'>"+qsjc+"</span></td>";
								for(var k1 = 1; k1 <= kblx; k1++){
									tableHtml+="<td rowspan=1 id='"+k1+"-"+qsjc+"' class='td_wrap'></td>";
								}
								qsjc += 1;
								tableHtml+="</tr>";
							}
						});
					}

					var sjkcHtml = "";//实践课程
					var qtkcHtml = "";//其它课程
					if(sjkList.length>0){
					   for(var j=0;j<sjkList.length;j++){
					     var sjkc = sjkList[j];
					     if(sjkc.sfsjk==1){
					    	 sjkcHtml +=sjkc.sjkcgs+";";
					     }else{
					    	 qtkcHtml +=sjkc.qtkcgs+";";
					     }
					   }
					}
					if(sjkcHtml.length>0 || qtkcHtml.length>0){
					    tableHtml += "<tr><td colspan='"+(2+kblx)+"' style='text-align:left;'><div class='timetable_title'>";
					    if(sjkcHtml.length>0){
					    	//tableHtml += "<h6 class='pull-left'>"+"Practice course："+sjkcHtml+"</h6>";
					    	tableHtml += "<span class='red' style='font: normal 18px/25px microsoft YaHei;'>Practice course：</span><span style='font:  18px/25px SimSun;'>"+sjkcHtml+"</span><br>";
					    }
					    if(qtkcHtml.length>0){
					    	//tableHtml += "<h6 class='pull-left'>"+"Other courses："+qtkcHtml+"</h6>";
					    	tableHtml += "<span class='red' style='font: normal 18px/25px microsoft YaHei;'>Other courses：</span><span style='font:  18px/25px SimSun;'>"+qtkcHtml+"</span>";
					    }
					    tableHtml += "</div></td></tr>";
					}
					
					tableHtml += "</table>";
					$("#table1").append(tableHtml);
				}
				/*构造表格模式结构结束*/
				
				/*构造列表模式结构*/
				if(i==0){
					var listHtml = "";
					listHtml += "<table id='kblist_table' class='table table-hover table-bordered text-center timetable'>"
							 +"<tbody><tr><td colspan='4'><div class='timetable_title'><h6 class='pull-left'>"
							 //+xsxx.XNMC+"学年第"+xsxx.XQMMC+"学期</h6>"+xsxx.XM+"的课表<h6 class='pull-right'>"+xsxx.JGMC+xsxxdm+"　学号："+xsxx.XH+"</h6></div></td></tr>"
							 +xsxx.XNMC+" academic year "+xsxx.XQMMC+" term</h6>"+(xsxx.YWXM==undefined?xsxx.XM:xsxx.YWXM)+"\'s Curriculum<h6 class='pull-right'>　student ID："+xsxx.XH+"</h6></div><div><span class='pull-left'>"+xsbjHtml+"</span><span class='pull-right'><font color='red' size='3'><b>Note:</b></font><font color='red' size='3'><i>Red Italic is for screening,</i></font><font color='blue' size='3'>blue is selected</font></span></div></td></tr>"
							 +"<tr class='tbody_head'><td>week</td><td>sections</td><td>Information of Curriculum</td></tr></tbody>";
					
					for(var j=1; j<=kblx; j++){
						listHtml += "<tbody id='xq_"+j+"' style='display: none'><tr><td id='xq_rowspan_"+j+"' rowspan='0' width='50'><span class='week'>"+data.xqjmcMap[j]+"</span></td></tr></tbody>";
					}
					var sjkcHtml = "";
					var qtkcHtml = "";//其它课程
					if(sjkList.length>0){
					   for(var j=0;j<sjkList.length;j++){
					     var sjkc = sjkList[j];
					     if(sjkc.sfsjk==1){
					    	 sjkcHtml +=sjkc.sjkcgs+";";
					     }else{
					    	 qtkcHtml +=sjkc.qtkcgs+";";
					     }
					   }
					}
					if(sjkcHtml.length>0 || qtkcHtml.length>0){
						listHtml += "<tbody><tr><td colspan='4' style='text-align:left;'><div class='timetable_title'>";
					    if(sjkcHtml.length>0){
					    	//listHtml += "<h6 class='pull-left'>"+"Practice course："+sjkcHtml+"</h6>";
					    	listHtml += "<span class='red' style='font: normal 18px/25px microsoft YaHei;'>Practice course：</span><span style='font:  18px/25px SimSun;'>"+sjkcHtml+"</span><br>";
					    }
					    if(qtkcHtml.length>0){
					    	//listHtml += "<h6 class='pull-left'>"+"Other courses："+qtkcHtml+"</h6>";
					    	listHtml += "<span class='red' style='font: normal 18px/25px microsoft YaHei;'>Other courses：</span><span style='font:  18px/25px SimSun;'>"+qtkcHtml+"</span>";
					    }
					    listHtml += "</div></td></tr></tbody>";
					}					
					
					listHtml += "</table>";
					$("#table2").append(listHtml);
				}
				/*构造列表模式结构结束*/	
				
				/*填入表格课表信息*/
				var jcor = item.jcor;
				var jcValueArr = jcor.split("-");
				var jcValue1 = jcValueArr[0];
				var jcValue2 = jcValueArr[1];
				var tdEle = $("#kbgrid_table_"+xqdm).find("#"+xqj+"-"+jcValue1);
				var tdHtml = "<div class='timetable_con text-left'>"+kcmcspan+sjtbspan+cdtbspan+jstbspan+jxbtbspan+xkbztbspan+"</div>";
				
				tdEle.append(tdHtml).attr("rowspan", jcValue2-jcValue1+1);
				for(var j = jcValue1*1+1; j <= jcValue2; j+=1){
					$("#kbgrid_table_"+xqdm).find("#"+xqj+"-"+j).remove();
				}
				
				/*填入表格课表信息结束*/
				
				/*填入列表课表信息*/
				var tbodyEle = $("#xq_"+xqj);
				tbodyEle.show(); //显示
				var xqRowSpanEle = $("#xq_rowspan_"+xqj);
				
				//合并单行显示
				var listspan = "<td id='jc_"+xqj+"-"+jcs+"' rowspan=1><span class='festival'>"+jcs+"</span></td>"
							+"<td><div class='timetable_con text-left'>"+kcmcspan
							+"<p>"+sjspan+cdspan+jsspan+jxbspan+xkbzspan+"</p></div></td>";
				if(tbodyEle.find("#jc_"+xqj+"-"+jcs).size()==0){ // 如果没插入过这个节次
					if(xqRowSpanEle.attr("rowspan")==1){ //如果这个星期tr没被插入过
						xqRowSpanEle.parent().append(listspan);
					}else{ //如果这个星期tr插入过其他节次
						tbodyEle.append("<tr>"+listspan+"</tr>");
					}
				}else{ //如果插入过这个节次,那么要合并
					$("#jc_"+xqj+"-"+jcs).attr("rowspan", function(index, attr){return attr*1+1;});
					$("#jc_"+xqj+"-"+jcs).parent().after("<tr>"
							+"<td><div class='timetable_con text-left'>"+kcmcspan
							+"<p>"+sjspan+cdspan+jsspan+jxbspan+xkbzspan+"</p></div></td></tr>");
				}
				/*填入列表课表信息结束*/
				
				xqRowSpanEle.attr("rowspan", $("#xq_"+xqj).find("tr").size());
			}
			
			//课表为空，实践课不为空
			if (kblen == 0 && sjklen > 0) {
				/*构造表格模式结构*/
				if($("#table1").find("#kbgrid_table_"+xqdm).size()==0){ //表格模式按校区分, 因校区的日时段结构可能不同
					var kbrsd; //获取日时段信息,得到节次结构,及上下午列是否显示
					$.ajax({
						type: 'POST', 
						url: _path+'/kbcx/xskbcx_cxRsd.html',
						async: false,
						data: {"xnm":map.xnm, "xqm":map.xqm, "xqh_id": xqh_id},
						datatype: 'json',
						success: function(data){
							kbrsd = data; //获得数据
						}
					});
					if(kbrsd.length==0){
						$("#table1").empty().append("<h3 class='align-center'>The day was set incorrectly</h3>");
						$("#table2").append("<h3 class='align-center'>The day was set incorrectly</h3>");
						return false;
					}
					
					var tableHtml = "";
					tableHtml += "<table id='kbgrid_table_"+xqdm+"' class='table table-hover table-bordered text-center timetable1' style='width:98%;margin-left:10px'>";
					
					
					var xqWidth = (kblx==7)?12.5:17.5;
					tableHtml += "<tr><td colspan='"+(2+kblx)+"'><div class='timetable_title'>"
					+"<h6 class='pull-left'>"+xsxx.XNMC+" academic year "+xsxx.XQMMC+" term</h6>"+(xsxx.YWXM==undefined?xsxx.XM:xsxx.YWXM)+"\'s Curriculum"
					//+"<h6 class='pull-right'>"+xsxx.JGMC+xsxxdm+"　学号："+xsxx.XH+"</h6></div></td></tr>"
					+"<h6 class='pull-right'>　student ID："+xsxx.XH+"</h6></div><div><span class='pull-left'>"+xsbjHtml+"</span><span class='pull-right'><font color='red' size='3'><b>Note:</b></font><font color='red' size='3'><i>Red Italic is for screening,</i></font><font color='blue' size='3'>blue is selected</font></span></div></td></tr>";
					
					var sjkcHtml = "";
					var qtkcHtml = "";//其它课程
					if(sjkList.length>0){
					   for(var j=0;j<sjkList.length;j++){
					     var sjkc = sjkList[j];					     
					     if(sjkc.sfsjk==1){
					    	 sjkcHtml +=sjkc.sjkcgs+";<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
					     }else{
					    	 qtkcHtml +=sjkc.qtkcgs+";<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
					     }
					   }
					}
					if(sjkcHtml.length>0 || qtkcHtml.length>0){
						tableHtml += "<tr><td colspan='"+(2+kblx)+"' style='text-align:left;'><div class='timetable_title'>";
					    if(sjkcHtml.length>0){
					    	//tableHtml += "<h6 class='pull-left'>"+"Practice course："+sjkcHtml+"</h6>";
					    	tableHtml += "<span class='red' style='font: normal 18px/25px microsoft YaHei;'>Practice course：</span><span style='font:  18px/25px SimSun;'>"+sjkcHtml+"</span><br>";
					    }
					    if(qtkcHtml.length>0){
					    	//tableHtml += "<h6 class='pull-left'>"+"Other courses："+qtkcHtml+"</h6>";
					    	tableHtml += "<span class='red' style='font: normal 18px/25px microsoft YaHei;'>Other courses：</span><span style='font:  18px/25px SimSun;'>"+qtkcHtml+"</span>";
					    }
					    tableHtml += "</div></td></tr>";
					}					
					
					tableHtml += "</table>";
					$("#table1").append(tableHtml);
				}
				/*构造表格模式结构结束*/
				
				/*构造列表模式结构*/
				if(i==0){
					var listHtml = "";
					listHtml += "<table id='kblist_table' class='table table-hover table-bordered text-center timetable'>"
							 +"<tbody><tr><td colspan='4'><div class='timetable_title'><h6 class='pull-left'>"
							 //+xsxx.XNMC+"学年第"+xsxx.XQMMC+"学期</h6>"+xsxx.XM+"的课表<h6 class='pull-right'>"+xsxx.JGMC+xsxxdm+"　学号："+xsxx.XH+"</h6></div></td></tr>"
							 +xsxx.XNMC+" academic year "+xsxx.XQMMC+" term</h6>"+(xsxx.YWXM==undefined?xsxx.XM:xsxx.YWXM)+"\'s Curriculum<h6 class='pull-right'>　student ID："+xsxx.XH+"</h6></div><div><span class='pull-left'>"+xsbjHtml+"</span><span class='pull-right'><font color='red' size='3'><b>Note:</b></font><font color='red' size='3'><i>Red Italic is for screening,</i></font><font color='blue' size='3'>blue is selected.</font></span></div></td></tr></tbody>";

					var sjkcHtml = "";//实践课程
					var qtkcHtml = "";//其它课程
					if(sjkList.length>0){
					   for(var j=0;j<sjkList.length;j++){
					     var sjkc = sjkList[j];
					     var bpksm = (xszd.xkbz)?"(Unscheduled instruction:"+sjkc.xkbz+")":"";
					     if(sjkc.sfsjk==1){
					    	 sjkcHtml +=sjkc.sjkcgs+";<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
					     }else{
					    	 qtkcHtml +=sjkc.qtkcgs+";<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
					     }
					   }
					}
					if(sjkcHtml.length>0 || qtkcHtml.length>0){
						listHtml += "<tbody><tr><td colspan='4' style='text-align:left;'><div class='timetable_title'>";
					    if(sjkcHtml.length>0){
					    	//listHtml += "<h6 class='pull-left'>"+"Practice course："+sjkcHtml+"</h6>";
					    	listHtml += "<span class='red' style='font: normal 18px/25px microsoft YaHei;'>Practice course：</span><span style='font:  18px/25px SimSun;'>"+sjkcHtml+"</span><br>";
					    }
					    if(qtkcHtml.length>0){
					    	//listHtml += "<h6 class='pull-left'>"+"Other courses："+qtkcHtml+"</h6>";
					    	listHtml += "<span class='red' style='font: normal 18px/25px microsoft YaHei;'>Other courses：</span><span style='font:  18px/25px SimSun;'>"+qtkcHtml+"</span>";
					    }
					    listHtml += "</div></td></tr></tbody>";
					}					
					
					listHtml += "</table>";
					$("#table2").append(listHtml);
				}
				/*构造列表模式结构结束*/	
			}
			search('sycjlrtabGrid',paramMap());
		}
	});
}



}
).toString().slice(12, -2),"");