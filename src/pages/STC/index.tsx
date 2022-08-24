import React, { useEffect, useState } from 'react'
import Markdown from '../../components/markdown'
import {Box, Button, CircularProgress, Grid,GridItem} from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import Header from '../../components/header';
import axios from 'axios'

import './index.css'

import { Buffer } from 'safe-buffer';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import PostPage from '../PostPage';

interface Post {
    creater:string,
    url:string,
    name:string,
    date:string
}

function STC_Page () {
    const [Posts,setPosts] = useState(Array<Post>);
    const [Indeterminate,setIndeterminate] = useState(false);
    const [toc,setToc] = useState('');
    const params = useParams();

    useEffect(()=>{
        setIndeterminate(true)
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
                    params.address||"0x3865E774f13E8cb02bBb2225D6605FAA"
                ]
              }
            ]
          });
          console.log(data)
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
                console.log(data.data)
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
            setIndeterminate(false)
        }).catch((err)=>{
            setIndeterminate(false)
            console.log(err)
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
                    { 
                        params.idx?<PostPage address={params.address} idx={params.idx} call_back={setToc}/>:
                            <div>
                                {
                                    Indeterminate?
                                        <CircularProgress isIndeterminate color='green.300' />:null
                                }
                                
                                {
                                    Posts.map((item,i) => (
                                        <Box key={item.name}>
                                            {/* <li key={item.name}>{item.name}</li> */}
                                            <Link key={item.name} to={ (params.address?'./':'0x3865E774f13E8cb02bBb2225D6605FAA/') + i}>{item.name}</Link>
                                        </Box>
                                    ))
                                }
                            </div>  
                        
                    }
                    

                
                </GridItem>
                <GridItem pl='2' area={'toc'}>
                        <Box dangerouslySetInnerHTML={{__html:toc}}></Box>
                </GridItem>
                <GridItem pl='2' area={'footer'}>
                    Footer
                </GridItem>
            </Grid>
            
            </div>
        )
}

export default STC_Page