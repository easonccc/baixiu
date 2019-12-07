$('#userForm').on('submit',function(){
		// serialize 获取表单属性中的内容 并把这个参数格式化成字符串
		let formData = $(this).serialize()
		//向服务器端发送添加用户的请求
		$.ajax({
			type:'POST',
			url:'/users',
			data:formData,
			success: function(){
				//刷新页面
				location.reload()
			},
			error: function(){
				alert('用户添加失败')
			}
		})
	//阻止表单的默认提交行为
	return false
})

$('#avatar').on('change',function(){
	console.log(this.files[0]);
	
	let formData = new FormData() 
	formData.append('avatar',this.files[0])

	$.ajax({
		type:'post',
		url:'/upload',
		data:formData,
		//告诉$.ajax不解析请求参数
		processData:false,
		//告诉$.ajax方法不设置请求参数类型
		contentType:false,
		success: function(data){
			//实现头像预览功能 
			$('#preview').attr('src',data[0].avatar)
			//设置在隐藏域中 存储起来
			$('#hiddenAvatar').val(data[0].avatar)
			
		}
	})

})

//向服务器发送请求 索要用户列表数据
$.ajax({
	type:'get',
	url:'/users',
	success: function(data){
		// console.log(data);
		
	let html = template('userTpl',{
			data:data
		})
		$('#userTr').html(html)
	}
})

//通过事件委托的方式为编辑按钮添加点击事件
$('#userTr').on('click','.edit',function(){
	//获取被点击用户的id
	let id = $(this).attr('data-id')
	console.log(id);
	
	//根据id获取用户的详细信息
	$.ajax({
		type:'get',
		url:'/users/'+id,
		success: function(data){
			console.log(data);
			let html = template('modifyTpl',data)
			console.log(html);
			$('#modifyBox').html(html)
		}
	})
})

//为修改表单添加表单提交事件
$('#modifyBox').on('submit','#modifyForm',function(){
	//获取用户在表单中输入的内容
	let formData = $(this).serialize()
	//获取要修改的那个用户的id
	let id = $(this).attr('data-id')
	//发送请求 修改用户信息
	$.ajax({
		type:'put',
		url:'/users/'+id,
		data: formData,
		success: function(data){
			//修改用户信息成功 重新加载页面
			location.reload()
		}
	})
	//阻止表单默认提交
	return false
})

//删除功能
$('#userTr').on('click','.delete',function(){
	//添加一个确认功能防止客户误点
	//如果管理员确认要删除用户
	if(confirm('您真的要删除用户吗?')){
		//获取要修改的那个用户的id
	let id = $(this).siblings('.edit').attr('data-id')
	// let id = $(this).attr('data-id')
		console.log(id);
	//发送请求
	$.ajax({
		type: 'DELETE',
		url:'/users/'+id,
		success: function(){
			location.reload()
		}
	})
	}
})

//点击全选选择所有的
//当全选按钮的状态发生改变时
$('#checkAll').on('change',function(){
	//获取到全选按钮当前的状态
	let status = $(this).prop('checked')
	console.log(status);
	//如果全选按钮被选中 就让批量删除按钮显示
	/* if(status){
		$('#del').show()
	}else{
		$('#del').hide()
	} */
	status ? $('#del').show() : $('#del').hide()


	//获取所有的用户 在固定不变的父级里用find方法查找所有复选框
	//将所有的复选框的状态都根据全选框来改变
	$('#userTr').find('input').prop('checked',status)
	
	
})

//当用户前面的复选框状态发生改变时
$('#userTr').on('click','#userStatus',function(){
	//如果所有的复选框中有一个的状态没有被选中 那么全选框就不被选中 	
	/* 
		获取到所有用户 在所有用户中过滤出选中的用户
		判断选中用户的数量和所有用户的数量是否一致
		如果一致 就说明所有的用户都是选中的
		否则 就是有用户，没有被选中
		 */
		 //filter 过滤出选中的用户
		let inputs = $('#userTr').find('input')
		if(inputs.length == inputs.filter(':checked').length){
			//如果 所有用户都是选中的
			$('#checkAll').prop('checked',true)

		}else{
			//不是所有用户都是选中 
			$('#checkAll').prop('checked',false)
		}

		//对批量删除按钮进行操作
		//如果选中的复选框的数量大于0 就说明有复选框选中
		if(inputs.filter(':checked').length>0){
		$('#del').show()
		}else{
			$('#del').hide()
		}
})

//批量删除功能
$('#del').on('click',function(){
	//将所有选择的那条数据存在一个数组中
	let ids = []
	//获取到选中的用户
	 let checkuser = $('#userTr').find('input').filter(':checked')
	 //循环复选框 将id值追加到空数组中
	 checkuser.each(function(index,ele){
		 //找到当前循环到的元素id 
		ids.push($(ele).parents('tr').find('.edit').attr('data-id'))
	 })

	// 扩展 上述代码相当于下面两行
	//  var hasChecked = $('#userBox input:checked');
	//  var ids = hasChecked.toArray().map(x => $(x).data('id'));
	 


	//  console.log(ids);
	 //再次确认
	 if(confirm('您确定要删除吗')){
		$.ajax({
			type: 'delete',
			url:'/users/'+ids.join('-'),
			success: function(data){
				location.reload()
			}
			
		})
	 }
	 
})
    