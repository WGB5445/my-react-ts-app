import React, { useState } from 'react'
import { Button, ButtonGroup,Box ,Text,Flex,Spacer,Grid,HStack} from '@chakra-ui/react'

import STC_wallet from '../wallets/stc'
import Markdown from '../markdown';
type StateType = {
    
};
type propType = {
    wallet_type:string
};
  

export class Header extends React.Component<propType,StateType>{
    constructor(props:any){
        super(props);
    
        
        this.state = {
            
        }
    }

    //挂载完成
    componentDidMount() {
        
        
    }

    render(): React.ReactNode {
        const wallet_type = this.props.wallet_type;
 
        let button = null;
        switch(wallet_type){
            case 'stc':
                button = <STC_wallet />;
                break
            default:
                button = <Button >NULL</Button>
        }
        return (
            <div className="Header">
                <Box>
                    <Flex>
                        <Box w='10%'   >
                            
                        </Box>
                        <Spacer />
                        <Box w='15%'/>
                        <Spacer />
                        <Box w='10%' >
                            {button}
                        </Box>
                    </Flex>
                </Box>
                
            </div>
        )
    }
}

export default Header