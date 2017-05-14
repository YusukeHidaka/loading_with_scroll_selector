import React from 'react'
import ReactDOM from 'react-dom'

export default class Options extends React.Component{

  //100%だとheight分はみ出てしまうので
  get currentPosition (){return this.props.currentPosition*80+'%'}

  constructor (props){
    super(props);
  }

  componentDidMount (){
    let selectedOption = document.getElementsByClassName("selected_option")[0];
    let topPos = selectedOption.offsetTop;
    let options = document.getElementsByClassName("options")[0];
    options.scrollTop = topPos-(options.offsetTop);
  }

  render (){
    let options;
    options = this.props.currentOptions.map((val,index) => {
      if (this.props.selectedOption==val.key){
        return (<li key={val.value} className="selected_option" onClick={this.props.onSelected}>{val.key}</li>)
      } else {
        return (<li key={val.value} onClick={this.props.onSelected}>{val.key}</li>)
      }
    })
    return (
      <div className="options_wrapper">
        <ul className="options" defaultValue={this.props.targetNumber} onScroll={this.props._onScroll}>
          {options}
        </ul>
        <div className="options_scrollbar" style={{top: this.currentPosition}}></div>
      </div>
    )
  }
}

Options.propTypes = {
  currentOptions: React.PropTypes.array,
  selectedOption: React.PropTypes.number,
  onSelected: React.PropTypes.func,
  targetNumber: React.PropTypes.number,
  currentPosition: React.PropTypes.number,
};
