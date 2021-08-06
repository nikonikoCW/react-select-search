import React from "react"
import "./App.css"

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        input_value:'',
        expendValue:false,
        isFocus:false,
        expendSelect:true,
        //中间项承接以及绑定到option栏
        midOption:[],
        //总选项
        allOption:[
          {label:'select1'},
          {label:'select2'},
          {label:'select3'},
          {label:'select4'},
          {label:'like1'},
          {label:'like2'},
          {label:'like3'},
          {label:'like4'},
          {label:'className1'},
          {label:'className2'},
          {label:'className3'},
          {label:'className4'},
        ],
        selected:[
        ]
      }    
  }
  componentDidMount() {
    document.addEventListener("click", this.queryHide);
    var myInput = document.getElementById('input');
    myInput.addEventListener('focus',() =>{
      console.log('获取焦点');
      this.setState({
        expendSelect:false
      })
      this.setState({
        isFocus:true
      })
    })
    myInput.addEventListener('blur',() =>{
      console.log('获取焦点');
      this.setState({
        isFocus:false
      })
    })
    this.setState({
      midOption:this.state.allOption
    })
  }
  //全局监听是否对option点击，如果没有就隐藏掉
  queryHide = (e) =>{
    const selectBox = document.getElementById('selectBox')
    //是否包含筛选box
    let a = !selectBox.contains(e.target);
    if (a) {
      this.setState({
        expendSelect:true
      })
    }
  }
  addThis(item){
    let oldSelectedData = this.state.selected
    oldSelectedData.push(item)
    this.setState({
      selected:oldSelectedData
    })
    //从中间变量删除选项
    let deleteFromMid = this.state.midOption.filter(it => it!==item)
    this.setState({
      midOption:deleteFromMid
    })
    //从总option删除
    let deleteFromAll = this.state.allOption.filter(it => it!==item)
    this.setState({
      allOption:deleteFromAll
    })
  }
  //header位置的展开收缩
  shrink =() =>{
    this.setState({
      expendValue:false
    })
  }
  expend =() =>{
    this.setState({
      expendValue:true
    })
  }
  //删除选中项
  deleteThis(item,index){
    let newlist = this.state.selected.filter(element => element!==item)
    this.setState({
      selected:newlist
    })
    this.setState({
      allOption:[...[item],...this.state.allOption],
      midOption:[...[item],...this.state.midOption]
    })
  }
  //清除全部
  clearAll = () =>{
    let hadSelect = this.state.selected
    this.setState({
      selected:[],
      input_value:'',
      allOption:[...hadSelect,...this.state.allOption]
    })
    this.setState({
      midOption:[...hadSelect,...this.state.allOption],
    })
  }
  //监听input的值做搜索
  inputChange(val){
    this.setState({
        input_value:val.target.value
    })
    if(val.target.value===''){
      this.setState({
        midOption:this.state.allOption
      })
    }else{
      let fuzzyQuery = this.state.allOption.filter((item) =>{
        var reg= new RegExp(val.target.value,'i');
        return reg.test(item.label);
      })
      this.setState({
        midOption:fuzzyQuery
      })
    }
    
  }
  inputFocus = () =>{
  }
  render(){
        return (
          <div className="main">
            <div className='main-content'>
              <div className='header'>
                <p className='tag-name'>Creative Tags</p>
                {(() => {
                  if (this.state.expendValue) {
                    return <svg onClick={this.shrink} t="1628162878565" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1188" width="16" height="16"><path d="M512 42.666667C251.733333 42.666667 42.666667 251.733333 42.666667 512s209.066667 469.333333 469.333333 469.333333 469.333333-209.066667 469.333333-469.333333S772.266667 42.666667 512 42.666667z m0 874.666666c-221.866667 0-405.333333-179.2-405.333333-405.333333 0-221.866667 179.2-405.333333 405.333333-405.333333s405.333333 179.2 405.333333 405.333333c0 221.866667-183.466667 405.333333-405.333333 405.333333z" p-id="1189"></path><path d="M512 550.4L345.6 384 298.666667 426.666667l213.333333 213.333333 213.333333-213.333333-46.933333-42.666667z" p-id="1190"></path></svg>
                  }else{
                    return <svg onClick={this.expend} t="1628163586288" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2053" width="16" height="16"><path d="M711.131429 615.570286L512 482.816l-199.131429 132.754286a36.571429 36.571429 0 0 1-40.594285-60.854857l219.428571-146.285715a36.571429 36.571429 0 0 1 40.594286 0l219.428571 146.285715a36.571429 36.571429 0 0 1-40.594285 60.854857zM512 950.857143c242.358857 0 438.857143-196.498286 438.857143-438.857143S754.358857 73.142857 512 73.142857 73.142857 269.641143 73.142857 512s196.498286 438.857143 438.857143 438.857143z m0 73.142857C229.229714 1024 0 794.770286 0 512S229.229714 0 512 0s512 229.229714 512 512-229.229714 512-512 512z" p-id="2054"></path></svg>
                  }
                })()}
              </div>
              <div className={!this.state.expendValue?'select-content':'hover'}>
                <p className='select-name'>Tags associated with this creative</p>
                <hr></hr>
                <div id='selectBox' className='select-option'>
                  <div className={this.state.isFocus?'input-box-focus':'input-box'} onClick={this.inputFocus}>
                    <div className='left-tag'>
                      <div className='tag-show'>
                      {
                        this.state.selected.map((item, index) => {
                          return <div className='tag-site' key={index}>
                          <span className='tag-site-name'>{item.label}</span>
                          <svg onClick={this.deleteThis.bind(this,item,index)} t="1628164904300" className="icon delete-tag" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2906" width="16" height="16"><path d="M551.424 512l195.072-195.072c9.728-9.728 9.728-25.6 0-36.864l-1.536-1.536c-9.728-9.728-25.6-9.728-35.328 0L514.56 475.136 319.488 280.064c-9.728-9.728-25.6-9.728-35.328 0l-1.536 1.536c-9.728 9.728-9.728 25.6 0 36.864L477.696 512 282.624 707.072c-9.728 9.728-9.728 25.6 0 36.864l1.536 1.536c9.728 9.728 25.6 9.728 35.328 0L514.56 548.864l195.072 195.072c9.728 9.728 25.6 9.728 35.328 0l1.536-1.536c9.728-9.728 9.728-25.6 0-36.864L551.424 512z" fill="#1A1A1A" p-id="2907"></path></svg>
                        </div>
                        })
                      }
                      <input id='input' type='text' onChange={this.inputChange.bind(this)}  value={this.state.input_value} className='input' />
                      </div>
                    </div>
                    <div className='tool-box'>
                      <div className='close'>
                        {(() => {
                          if (this.state.selected.length>0||this.state.input_value!=='') {
                            return <svg onClick={this.clearAll} t="1628170186245" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1865" width="16" height="16"><path d="M873.085762 150.061615c-201.218984-201.218984-525.215654-201.218984-723.024147 0-201.218984 201.218984-201.218984 525.215654 0 723.024147 201.218984 201.218984 525.215654 201.218984 723.024147 0 201.218984-201.218984 201.218984-521.805162 0-723.024147zM753.718568 750.308077l-3.410491 3.410491c-13.641965 13.641965-30.694421 13.641965-44.336387 0L511.573689 559.320566l-194.398002 194.398002c-13.641965 13.641965-30.694421 13.641965-44.336386 0l-3.410492-3.410491c-13.641965-13.641965-13.641965-30.694421 0-44.336387l194.398002-194.398001-194.398002-194.398002c-13.641965-13.641965-13.641965-34.104913 0-44.336386 13.641965-13.641965 37.515404-13.641965 51.157369 0l190.987511 190.98751 194.398001-194.398002c13.641965-13.641965 30.694421-13.641965 44.336387 0s13.641965 37.515404 0 51.157369L559.320566 511.573689l194.398002 194.398001c13.641965 13.641965 13.641965 34.104913 0 44.336387z" fill="#B5B5B5" p-id="1866"></path></svg>
                          }
                        })()}
                      </div>
                    </div>
                    <div className='show-option'>
                      {(() => {
                          if (!this.state.expendSelect) {
                            return <svg onClick={(()=>{this.setState({expendSelect:true})})} t="1628167497447" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3783" width="16" height="16"><path d="M158.293333 652.949333a29.397333 29.397333 0 0 0 0 42.282667 31.146667 31.146667 0 0 0 43.306667 0l302.933333-295.765333a10.666667 10.666667 0 0 1 14.933334 0l302.933333 295.765333a31.146667 31.146667 0 0 0 43.306667 0c11.946667-11.669333 11.946667-30.592 0-42.282667L533.653333 328.768a31.146667 31.146667 0 0 0-43.306666 0L158.293333 652.949333z" fill="#333333" p-id="3784"></path></svg>
                          }else{
                            return <svg onClick={(()=>{this.setState({expendSelect:false})})} t="1628167532346" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4658" width="16" height="16"><path d="M531.8 692.9c-7.7 0-15.4-2.9-21.2-8.8L208.8 382.3c-11.7-11.7-11.7-30.7 0-42.4s30.7-11.7 42.4 0l280.5 280.5 280.5-280.5c11.7-11.7 30.7-11.7 42.4 0s11.7 30.7 0 42.4L553 684.1c-5.9 5.8-13.5 8.8-21.2 8.8z" p-id="4659"></path></svg>
                          }
                        })()}
                    </div>
                  </div>
                  <div className='options-box'>
                    {
                      (() =>{
                        if(this.state.midOption.length===0){
                          return <div className={this.state.expendSelect?'hover':'no-data'}>暂无数据</div>
                        }else{
                          return <ul className={this.state.expendSelect?'hover':'options-list main-box'}>
                              {
                                this.state.midOption.map((item, index) => {
                                  return <li className='option-site' key={index} onClick={this.addThis.bind(this,item)}>
                                    {item.label}
                                </li>
                                })
                              }
                            </ul>
                        }
                      })()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
  }
}

export default App;
