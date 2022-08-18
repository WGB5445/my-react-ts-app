import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
// import './App.css'
import { Button, ButtonGroup } from '@chakra-ui/react'
import web3 from 'web3'
import {AptosAccount} from 'aptos'
import { starcoin_types } from '@starcoin/starcoin'
import Eth_wallet from './components/wallets/eth'
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
        <Eth_wallet  />
      </div>
    )  
  }
  
}

export default App
