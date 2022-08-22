import React, { useState } from 'react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import {providers, utils, bcs, encoding } from '@starcoin/starcoin'

declare global {
    interface Window {
        store: any;
        starcoin: any
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
  

export class STC_Wallet extends React.Component<propType,StateType>{
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
        if(window.starcoin){
            let that = this;
            let provider = new providers.Web3Provider(window.starcoin)
            provider.getNetwork().then((network)=>{
                that.setState({
                    network_id : network.chainId
                })
            });

            window.starcoin.on('accountsChanged',(addr:string[])=>{
                window.location.reload()
            })

            window.starcoin.on('chainChanged', (_chainId:number) => window.location.reload());

            // 自动链接钱包
            provider.send("stc_requestAccounts", []).then((addr)=>{
                that.setState({
                    address: addr[0],
                    installed:true,
                    connect_state:true,
            })})
            .catch((err)=>{
                console.log(err)
            }) ;
        }
    }

    async connect(){
        if(window.ethereum){
            let that = this;
            let provider = new providers.Web3Provider(window.starcoin)
            await provider.send("stc_requestAccounts", []).then((addr)=>{
                that.setState({
                    address: addr[0],
                    installed:true,
                    connect_state:true,
            })})
            .catch((err)=>{
                console.log(err)
            }) ;
        }else{
            alert("please install metamask wallet");
        }
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

export default STC_Wallet