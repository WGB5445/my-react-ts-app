import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Box, Button, CircularProgress, Grid,GridItem} from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import 'github-markdown-css/github-markdown-light.css'
import 'highlight.js/styles/github.css'
import MarkdownIt from 'markdown-it'
import highlightjs from 'markdown-it-highlightjs'
import markdownItFrontMatter from 'markdown-it-front-matter'
import anchor from 'markdown-it-anchor';
import markdownItTocDoneRight from 'markdown-it-toc-done-right'
import uslug from 'uslug'

import yaml from 'yaml'
import { useLocation, useParams } from 'react-router-dom'
import { Buffer } from 'safe-buffer';

function uslugify(s:any) {
    return uslug(s);
}


export default function PostPage (props:any){
    const [markdown,setMarkdown] = useState('')
    const [toc,settoc] = useState('')
    const [fm,setfm] = useState( {title:'',creater:'',date:''})
    const [Indeterminate,setIndeterminate] = useState(false)
    // let query = new URLSearchParams(useLocation().search);
    // const params = useParams();
    let params = props;
    useEffect(() => {

        const get_post = (url:string)=>{
            setIndeterminate(true)
            
            if(url.replace(/^ipfs:?\/\//,'') != url){
                url = 'https://ipfs.io/ipfs/'+ url
            }
            console.log("zheshi s"+url)
            axios.get(url)
            .then((data)=>{
                let md =  MarkdownIt({
                    html: true,
                    linkify: true,
                    typographer: true
                })
                .use(highlightjs,{inline:true})
                .use(markdownItFrontMatter,(data)=>{
                    console.log(yaml.parse(data))
                    setfm(yaml.parse(data))
                })

                .use(anchor,{permalink: true, permalinkBefore: true, permalinkSymbol: '#',uslugify: uslugify,})
                .use(markdownItTocDoneRight, {  
                    containerClass: 'toc',//生成的容器的类名，这样最后返回来的字符串是 <nav class="toc"><nav/>
                    containerId: 'toc',//生成的容器的ID，这样最后返回来的字符串是 <nav id="toc"><nav/>
                    listType: 'ul',//导航列表使用ul还是ol
                    listClass: 'listClass',//li标签的样式名
                    linkClass: 'linkClass',//a标签的样式名,
                    uslugify: uslugify,
                    callback: function (toc, ast) {
                        settoc(toc)
                        props.call_back(toc)
                }})
                setMarkdown( md.render(data.data))
                setIndeterminate(false)
            })
            .catch((err)=>{
                setIndeterminate(false)
                console.log(err)
            })
        }
        setIndeterminate(true)

        if(params.url == null){
            let data = JSON.stringify({
                "id": 101,
                "jsonrpc": "2.0",
                "method": "contract.call_v2",
                "params": [
                {
                    "function_id": "0x851abEF4eD79813D11BDA0Ca307bA021::Blog::get_post",
                    "type_args": [
                    "0x851abEF4eD79813D11BDA0Ca307bA021::BlogType::WEB3"
                    ],
                    "args": [
                    params.address,
                    params.idx
                    ]
                }
                ]
            });
            
            let config = {
                method: 'post',
                url: 'https://halley-seed.starcoin.org',
                headers: { 
                'Content-Type': 'application/json'
                },
                data : data
            };
            axios(config)
            .then((data)=>{
                console.log(data.data.result[0])
                get_post(Buffer.from (data.data.result[0].url.substring(2),'hex').toString());
            }).catch((err)=>{
                console.log('ccd')
            })
        }else{
            get_post(params.url)
        }
    },[])

    return(
        <Box>
            {
                Indeterminate?
                    <CircularProgress isIndeterminate color='green.300' />:null
                
            }
            <Text fontSize='4xl'>{fm.title?fm.title:''}</Text>
            <div className="markdown-body" dangerouslySetInnerHTML={{__html: markdown}}/>
        </Box>
    ) 
}


