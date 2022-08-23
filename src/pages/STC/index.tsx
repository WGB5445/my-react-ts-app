import React, { useEffect, useState } from 'react'
import Markdown from '../../components/markdown'
import {Box, Button, Grid,GridItem} from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import Header from '../../components/header';
import axios from 'axios'

import './index.css'

import { Buffer } from 'safe-buffer';
import { Link, Route, useParams } from 'react-router-dom';

interface Post {
    creater:string,
    url:string,
    name:string,
    date:string
}

function STC_Page () {
    const [Posts,setPosts] = useState(Array<Post>);
    const params = useParams();
    useEffect(()=>{
        var data = JSON.stringify({
            "id": 101,
            "jsonrpc": "2.0",
            "method": "contract.call_v2",
            "params": [
              {
                "function_id": "0x851abEF4eD79813D11BDA0Ca307bA021::Blog::get_posts",
                "type_args": [
                  "0x851abEF4eD79813D11BDA0Ca307bA021::BlogType::WEB3"
                ],
                "args": [
                    params.address
                ]
              }
            ]
          });
          
          var config = {
            method: 'post',
            url: 'https://halley-seed.starcoin.org',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
        axios(config
            ).then((data)=>{
            let posts:Array<Post> = Array<Post>()
            data.data.result[0].forEach((element: { name: any; date: any; url: any; creater:any}) => {
                let post:Post = {
                    name: Buffer.from(element.name.substring(2),'hex').toString(),
                    date: element.date,
                    url: Buffer.from(element.url.substring(2),'hex').toString(),
                    creater:Buffer.from(element.creater.substring(2),'hex').toString()
                }
                posts.push(post)
            }); 
            setPosts(posts)
        })
    },[])
        
    return (
            <div>
            <Grid
                templateAreas={`"header header header"
                            "nav main toc"
                            "nav footer footer"`}
                gridTemplateRows={'50px 1fr 30px'}
                // gridTemplateColumns={'22% 60% 15%'}
                gridTemplateColumns={'27vw 54vw 18vw'}
                minHeight = '98vh'
                gap='1'
                color='blackAlpha.700'
                fontWeight='bold'
            >
                <GridItem pl='2'  area={'header'}>
                    <div >
                        <Header wallet_type='stc'/>
                    </div>
                </GridItem>
                <GridItem pl='2'  area={'nav'}>
                    Nav
                </GridItem>
                <GridItem pl='2'  area={'main'}>
                    <div>
                    {
                        Posts.map((item,i) => (
                        <Box key={item.name}>
                            {/* <li key={item.name}>{item.name}</li> */}
                            <Link key={item.name + "Button"} to={'./'+ i}>{item.name}</Link>
                        </Box>
                    ))}
                    </div>
                    
                </GridItem>
                <GridItem pl='2' area={'toc'}>
                    
                </GridItem>
                <GridItem pl='2' area={'footer'}>
                    Footer
                </GridItem>
            </Grid>
            
            </div>
        )
}

export default STC_Page