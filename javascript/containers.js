import '/kaitori/src/containers/single_products/ranking_list_single_product_containers'
import '/kaitori/src/containers/commons/fit_accordion/common_fit_accordion'
import '/kaitori/src/containers/popups/popup_review_form'
import '/kaitori/src/containers/popups/ctoc_popup_review_form'
import '/kaitori/src/containers/popups/fuyo_popup_review_form'
import '/kaitori/src/containers/popups/pawn_popup_review_form'
import '/kaitori/src/containers/popups/recycle_popup_review_form'
import '/kaitori/src/containers/popups/rip_popup_review_form'

import LoadingWithScrollSelector from '/kaitori/src/containers/hidaka/loading_with_scroll_selector'
import React from 'react'
import ReactDOM from 'react-dom'

class EnormousOptionsSelector extends React.Component{
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
ReactDOM.render(<EnormousOptionsSelector />,
document.getElementById('enormous_options_selector'));
