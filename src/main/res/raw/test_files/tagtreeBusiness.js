vpn_eval((function(){
$(function(){
		//查询数据列表
		function cxDataList(selectObj){
			var dataList;
			var paraMap = {'dataType':selectObj.data('type')};
			var rangeable = selectObj.data('rangeable');
			//增加数据范围参数
			if(rangeable!=null&&rangeable!='undefined'){
				paraMap['rangeable'] = rangeable;
			}
			$.ajaxSetup({async:false});
			$.post(_path +'/xtgl/list_cxDataList.html', paraMap, function(data){
				if(data){
					dataList = data;
				}
			});
			$.ajaxSetup({async:true});
			return dataList;
		}
		
		//得到是否只能选择根结点
		function getOnlyroot(selectObj){
			var bool = false;
			var onlyroot = selectObj.data('onlyroot');
			//增加数据范围参数
			if(onlyroot!=null&&onlyroot!='undefined'){
				bool = onlyroot;
			}
			return bool;
		}
		
		$("*[data-toggle='tagTree']").each(function(i, e){
			$(e).tagTree({
		    	data:cxDataList($(this)),
		    	fold: true,
		    	multiple: false,
		    	onlyroot:getOnlyroot($(this))
			});
		})
		// $("*[data-toggle='tagTree']").eq(0).tagTree('destroy');
		
	});

}
).toString().slice(12, -2),"");