import React, { useState } from 'react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import Web3 from 'web3'
import { ethers } from 'ethers'
declare global {
    interface Window {
        store: any;
        ethereum: any
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
  

export class Eth_wallet extends React.Component<propType,StateType>{
    provider: Web3;
    constructor(props:any){
        super(props);
        this.provider = new Web3(null)
        
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
        if(window.ethereum){
            let that = this;
            let provider = new ethers.providers.Web3Provider(window.ethereum)
            provider.getNetwork().then((network)=>{
                that.setState({
                    network_id : network.chainId
                })
            });

            window.ethereum.on('accountsChanged',(addr:string[])=>{
                window.location.reload()
            })

            window.ethereum.on('chainChanged', (_chainId:number) => window.location.reload());

            // 自动链接钱包
            provider.send("eth_requestAccounts", []).then((addr)=>{
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
            let provider = new ethers.providers.Web3Provider(window.ethereum)
            await provider.send("eth_requestAccounts", []).then((addr)=>{
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

export default Eth_wallet