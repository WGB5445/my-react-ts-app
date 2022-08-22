import React, { useState } from 'react'
import { Button, ButtonGroup } from '@chakra-ui/react'

declare global {
    interface Window {
        store: any;
        martian: any
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    }
}

type StateType = {
    address : string,
    nameserivce:string,
    network_id: number,
    connect_state:boolean,
    installed: boolean
  };
  type propType = {
  
  };
  

export class APTOS_wallet extends React.Component<propType,StateType>{
    constructor(props:any){
        super(props);
    
        
        this.state = {
            address : "",
            nameserivce:"",
            network_id: 0,
            connect_state:false,
            installed: false
        }
    }

    //挂载完成
    componentDidMount() {
        if(window.martian){
            let that = this;
            // let provider = new ethers.providers.Web3Provider(window.ethereum)
            // provider.getNetwork().then((network)=>{
            //     that.setState({
            //         network_id : network.chainId
            //     })
            // });

           
            window.martian.connect().then(
                console.log
            );
            // 自动链接钱包
            
        }
    }

    async connect(){
        // if(window.ethereum){
        //     let that = this;
        //     let provider = new ethers.providers.Web3Provider(window.ethereum)
        //     await provider.send("eth_requestAccounts", []).then((addr)=>{
        //         that.setState({
        //             address: addr[0],
        //             installed:true,
        //             connect_state:true,
        //     })})
        //     .catch((err)=>{
        //         console.log(err)
        //     }) ;
        // }else{
        //     alert("please install metamask wallet");
        // }
    }

    disconnect(){
        this.setState({
            address : "",
            nameserivce:"",
            network_id: 0,
            connect_state:false
        })
    }

    render(): React.ReactNode {
        return (
            <div className="Wallet">
                <Button onClick={()=>{
                    this.state.connect_state ? this.disconnect() : this.connect()
                }}>
                    { this.state.connect_state ? "Disconnect" : "Connect" }
                </Button>
            </div>
        )
    }
}

export default APTOS_wallet