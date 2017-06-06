import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { throttle } from 'lodash'
import Options from './options'


export default class LoadingWithScrollSelector extends React.Component{
  //定数は名詞
  get defaultLoadNum (){return 10}
  get extraLoadNum (){return 30}
  get loadingPoint (){return 200}

  constructor (props){
    super(props);
    this.state = {
      currentOptions: [],
      topCount: 1,
      bottomCount: 1 ,
      selectedItem: this.props.targetNumber,
      showOptions: false,
      currentPosition: this.props.options[this.props.targetNumber].key/(this.props.options.length)
    }
  }

  //読み込み時のスクロール、配列の設定
  componentDidMount (){
    let onScroll = this.scrollHandler()
    this._onScroll = throttle((e) => onScroll(e));
  }

  componentWillMount (){
    // デバックしやすいように定数に宣言
    let startPoint = this.props.targetNumber - this.state.topCount * this.defaultLoadNum;
    let endPoint = this.props.targetNumber + this.state.bottomCount * this.defaultLoadNum;
    this.setState({currentOptions: this.props.options.slice(startPoint, endPoint)})
  }

  componentWillUnmount (){
    this._onScroll = null;  // 循環参照しているため、明示的に破棄する
  }

  //スクロールに合わせて数字を追加読み込み。
  loadOptionsWithScroll (elm){
    let remaining = elm.scrollHeight - (elm.clientHeight + elm.scrollTop);
    let past = elm.scrollTop;
    if (past <= this.loadingPoint){
      this.addLowOptions();
    } else if (remaining <= this.loadingPoint){
      this.addHighOptions();
    }
  }

  addLowOptions (){
    this.setState({topCount: this.state.topCount+=1});
    this.sliceOptions();
  }

  addHighOptions (){
    this.setState({bottomCount: this.state.bottomCount+=1})
    this.sliceOptions();
  }

  sliceOptions (){
    let startPoint = this.props.targetNumber - this.state.topCount * this.extraLoadNum;
    if(startPoint<=0){startPoint = 0;} // sliceは指定位置が負になるとバグるのでメタ
    let endPoint = this.props.targetNumber + this.state.bottomCount * this.extraLoadNum;
    this.setState({currentOptions: this.props.options.slice(startPoint,endPoint)})
  }

  scrollHandler (){
    let temp;
    let elm;
    let pastPosition;
    // 0.01秒ごとに、位置が変わっているか否かを確認。
    const handle = () =>{
      if(temp === undefined){
        temp = setInterval((function() {
            this.loadOptionsWithScroll(elm);
            if (pastPosition===elm.scrollTop) {
              clearInterval(temp);
              temp = undefined;
            } else {
              pastPosition = elm.scrollTop;
            }
          }).bind(this),10);

        // scrollbar の処理
        let totalOptionsLength = this.props.options.length*22;
        let currenOptionstLength = (this.state.currentOptions[0].key*22)+elm.scrollTop;
        this.setState({currentPosition: currenOptionstLength / totalOptionsLength});
      }
    }
    //0.01秒前のポジションを記録。わざわざ関数を二つに分けるのはこの時間の差があるから。
    return (e)=>{
      pastPosition = e.target.scrollTop;
      elm = e.target;
      handle();
    }
  }

  onSelected (e){
    let selectedItem = parseInt(e.target.innerText);
    this.setState({selectedItem: selectedItem});
    this.optionsDisplayHandler();
  }

  optionsDisplayHandler (){
    if(!this.state.showOptions){
      this.setState({showOptions: true});
    } else {
      this.setState({showOptions: false});
    }
  }

  renderOptions (){
    if (this.state.showOptions === false){return;}
    return (
      <Options
        currentOptions = {this.state.currentOptions}
        selectedItem = {this.state.selectedItem}
        onSelected = {this.onSelected.bind(this)}
        _onScroll = {this._onScroll}
        targetNumber = {this.props.targetNumber}
        currentPosition = {this.state.currentPosition}
      />
    )
  }

  showWrapper (){
    if (this.state.showOptions === false){return;}
    return(
      <div className="selector_wrapper" onClick={this.hideOptions.bind(this)}></div>
    )
  }

  hideOptions (){
    this.setState({showOptions: false});
  }

  render (){
    return　(
      <div className="loading_with_scroll_selector" style={{width:this.selectorWidth}}>
        {this.showWrapper()}
        <div className="selector">
          <div className="selected_option_box" onClick={this.optionsDisplayHandler.bind(this)}>
            {this.state.selectedItem}
          </div>
          {this.renderOptions()}
        </div>
      </div>
    )
  }
}

LoadingWithScrollSelector.propTypes = {
  options: PropTypes.array
};
