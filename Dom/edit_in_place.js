/*
 * 就地编辑组件
 * created by qyf
 * 2016-8-23
 * 每个人都有保持代码优雅的责任
 */

 function EditInPlaceField(id, parent, value) {
   this.id = id;
   this.value = value || 'default value';
   this.containerElement = null;
   this.parentElement = parent;
   this.createElements(this.id);
   //绑定事件
   this.attachEvents();
 }

 EditInPlaceField.prototype = {
   createElements: function(id) {
     this.containerElement = document.createElement('div');
     this.parentElement.appendChild(this.containerElement);

     this.staticElement = document.createElement('span');
     this.containerElement.appendChild(this.staticElement);
     this.staticElement.innerHTML = this.value;

     //创建input
     this.fieldElement = document.createElement('input');
     //类型为文本框
     this.fieldElement.type = "text";
     //值为无名氏
     this.fieldElement.value = this.value;
     //添加到containerElement上
     this.containerElement.appendChild(this.fieldElement);

     //创建保存按钮
     //创建一个按钮input
     this.saveButton = document.createElement('input');
     //类型为按钮
     this.saveButton.type = 'button';
     //按钮上的文字上是保存
     this.saveButton.value = '保存';
     //添加
     this.containerElement.appendChild(this.saveButton);

     //创建取消按钮
     //创建一个按钮
     this.cancelButton = document.createElement('input');
     //类型为button
     this.cancelButton.type = 'button';
     //文字为取消
     this.cancelButton.value = '取消';
     //添加
     this.containerElement.appendChild(this.cancelButton);

     this.convertToText();
   },
   //将编辑框及按钮隐藏起来  只显示文本状态
   convertToText:function() {
     //将文本输入框隐藏起来
     this.fieldElement.style.display = 'none';
     //隐藏按钮
     this.saveButton.style.display = 'none';
     this.cancelButton.style.display = 'none';

     this.staticElement.style.display = 'inline';
     this.setValue(this.value);
   },
   attachEvents:function() {
     var that = this;
     //span的点击事件
     this.staticElement.addEventListener('click', function() {
       //将状态切为编辑状态
       that.convertToEditable();
     },false);

     //绑定取消按钮的事件
     this.cancelButton.addEventListener('click', function() {
       //从编辑状态切换成文本状态
       that.cancel();
     },false);

     this.saveButton.addEventListener('click',function(){
       that.save();
     },false);


   },
   convertToEditable: function() {
     //将 span 隐藏
     this.staticElement.style.display = 'none';
     //按编辑元素显示
     //将文本输入框显示起来
     this.fieldElement.style.display = 'inline';
     //显示按钮
     this.saveButton.style.display = 'inline';
     this.cancelButton.style.display = 'inline';
     //设置input的value
     this.setValue(this.value);
   },
   setValue: function(value) {
     //同步input 及span
     //设置输入框的值
     this.fieldElement.value = value;
     //设置span html
     this.staticElement.innerHTML = value;
   },
   cancel: function() {
     this.convertToText();
   },
   save:function(){
     this.value = this.getValue();
     this.convertToText();
   },
   getValue:function(){
     return this.fieldElement.value;
   }
 }
