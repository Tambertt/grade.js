let that;
class Tab{
    //构造函数，接受实例化对象传过来的参数
    constructor(id){
        //获取元素
        that = this;
        this.main = document.querySelector(id);
        
        this.add = this.main.querySelector('.tabadd');
        this.ul = this.main.querySelector('ul');
        this.tabson=this.main.querySelector('.tabscon');
        this.spans = this.main.querySelectorAll('span:first-child');
        this.init();
    }
    //初始化init(),一开始li的事件就绑定完成了
    init(){
        this.updateNode();
  
        this.add.onclick=this.addTab;       
        //为每个li注册点击事件
        for(let i=0;i<this.lis.length;i++){
            this.lis[i].index=i;
            this.lis[i].onclick=this.toggleTab; 
            this.close[i].onclick=this.removeTab; 
            this.spans[i].ondblclick=this.editTab;
            this.sections[i].ondblclick=this.editTab;
        }
        
    }
    //更新所有的li和section
    updateNode(){
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');
        this.close = this.main.querySelectorAll('.icon-guanbi');
    }
    //切换功能
    toggleTab(){
    //   console.log(this.index);
    that.clearClass();
    this.className='liactive';
    that.sections[this.index].className='conactive';
    }
    //清除类
    clearClass(){
        for(let i=0;i<this.lis.length;i++){
            this.lis[i].className='';
            this.sections[i].className='';
        }
    }
    //添加功能
    addTab(){
        that.clearClass();
        let li = "<li class='liactive'><span>新选项卡</span><span class='iconfont icon-guanbi'></span></li>";
        let section='<section class="conactive">新的测试内容</section>'
        that.ul.insertAdjacentHTML('beforeend',li);
        that.tabson.insertAdjacentHTML('beforeend',section);
        that.init();
       }
    //删除功能
    removeTab(e){
        e.stopPropagation();
        let index = this.parentNode.index;
        that.lis[index].remove();
        that.sections[index].remove();
        if(document.querySelector('.liactive'))return;
        index--;
        //手动调用点击事件
        that.lis[index] && that.lis[index].click();
    }
    //修改功能
    editTab(){
        let str = this.innerHTML;
        this.innerHTML='<input type="text">';
        let input = this.children[0];
        input.value=str;
        input.select();
        input.onblur=function(){
            this.parentNode.innerHTML=this.value;
        }
    }
  
}
//抽象化一个具体对象
new Tab('#tab')