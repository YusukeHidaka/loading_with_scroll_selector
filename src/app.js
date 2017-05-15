import React from 'react';
import ReactDOM from 'react-dom';
import LoadingWithScrollSelector from './loading_with_scroll_selector'
class App extends React.Component{
  //デフォルト値を設定
  get defaultValue (){return 500}
  get selectorWidth (){return 200}

  constructor(props) {
    super(props);
  }

  render(){
    //ここで表示したい全体のリストを読み込む
    let options = [];
    let i;
    for(i=0;i<1000;i++){options.push({'key':i,'value':i+'です'})};

    return(
      <div style={{width: this.selectorWidth}}>
        <LoadingWithScrollSelector options={options} targetNumber={this.defaultValue}/>
      </div>
    )
  }
}
ReactDOM.render(<App />,
document.getElementById('root'));
