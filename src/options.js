import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

export default class Options extends React.Component{
  //barのheightを30%に設定してあるので
  get currentPosition (){return this.props.currentPosition*70+'%'}

  constructor (props){
    super(props);
  }

  componentDidMount (){
    let selectedOption = document.getElementsByClassName("selected_option");
    let topPos = selectedOption.offsetTop;
    let options = document.getElementsByClassName('options');
    options.scrollTop = topPos-(options.offsetTop);
  }

  render (){
    let options;
    options = this.props.currentOptions.map((val,index) => {
      if (this.props.selectedItem==val.key){
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
  currentOptions: PropTypes.array,
  selectedItem: PropTypes.number,
  onSelected: PropTypes.func,
  targetNumber: PropTypes.number,
  currentPosition: PropTypes.number,
};
