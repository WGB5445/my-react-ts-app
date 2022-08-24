import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
// import './App.css'
import { Button, ButtonGroup } from '@chakra-ui/react'
import {AptosAccount} from 'aptos'
import { starcoin_types } from '@starcoin/starcoin'
import ETH_wallet from './components/wallets/eth'
import STC_wallet from './components/wallets/stc'
import APTOS_wallet from './components/wallets/aptos'
import STC_Page from './pages/STC'
import PostPage from './pages/PostPage'
import {BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
type StateType = {
  count: number;
};
type propType = {

};

export  class App extends React.Component <propType,StateType>{
  constructor(props:any){
    //需要使用super将props对象传入父类进行初始化操作
    super(props);

    //声明state属性，其值为对象，通过键值对方式存储需要动态更新的内容
    this.state = {
      count : 0
    } 
  }

  render(): React.ReactNode {
    // const [count, setCount] = useState(0)

    return (
      <div className="App">
        
          <Routes>
            <Route path='/' element={<Navigate to="/STCBlog" replace={true}/>}/>
            <Route path='/STCBlog/*' element={<STC_Page />}/>
            <Route path='/STCBlog/:address/*' element={<STC_Page />}/>
            <Route path='/STCBlog/:address/:idx/*' element={<STC_Page />}/>
            <Route path="/ETH" element={<ETH_wallet />} />
            <Route path="/STC" element={<STC_wallet />} />
          </Routes>
        
      </div>
    )  
  }
  
}

export default App
