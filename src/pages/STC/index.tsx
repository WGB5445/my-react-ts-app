import React from 'react'
import Markdown from '../../components/markdown'
import {Grid,GridItem} from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import Header from '../../components/header';
import axios from 'axios'

import './index.css'

import 'github-markdown-css/github-markdown-light.css'
import 'highlight.js/styles/github.css'
import MarkdownIt from 'markdown-it'
import highlightjs from 'markdown-it-highlightjs'
import markdownItFrontMatter from 'markdown-it-front-matter'
import anchor from 'markdown-it-anchor';
import markdownItTocDoneRight from 'markdown-it-toc-done-right'
import uslug from 'uslug'

import yaml from 'yaml'
type StateType = {
    markdownStr:string
    toc:string,
    fm:any
};


function uslugify(s:any) {
    return uslug(s);
}

type propType = {
};


class STC_Page extends React.Component<propType,StateType>{
    constructor(props:any){
        super(props)
        this.state = {
            markdownStr:'',
            toc : '',
            fm: ''
        }
    }
    componentDidMount(){
        let that = this
        let url = 'https://raw.githubusercontent.com/WGB5445/WGB5445.github.io/Hexo-blog-src/source/_posts/blockchain/DF/DF_WSL2_Explore/DF_WSL2_Explore.md'
        axios.get(url).then((data)=>{
            let md =  MarkdownIt({
                html: true,
                linkify: true,
                typographer: true
              })
              .use(highlightjs,{inline:true})
              .use(markdownItFrontMatter,(data)=>{
                console.log(yaml.parse(data))
                this.setState({
                    fm:yaml.parse(data)
                })
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
                    that.setState({
                        toc:toc
                    })
            }})
            that.setState({
                markdownStr:md.render(data.data)
            })
        })

    }
    render(): React.ReactNode {
        
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
                    <Text fontSize='4xl'>{this.state.fm.title?this.state.fm.title:''}</Text>
                    <div className="markdown-body" dangerouslySetInnerHTML={{__html: this.state.markdownStr}}/>
                </GridItem>
                <GridItem pl='2' area={'toc'}>
                    <div dangerouslySetInnerHTML={{__html: this.state.toc}} />
                </GridItem>
                <GridItem pl='2' area={'footer'}>
                    Footer
                </GridItem>
            </Grid>
            
            </div>
        )
    }
}

export default STC_Page