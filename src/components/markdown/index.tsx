import React from 'react'
import 'github-markdown-css/github-markdown-light.css'
import 'highlight.js/styles/github.css'
import MarkdownIt from 'markdown-it'
import highlightjs from 'markdown-it-highlightjs'
import markdownItFrontMatter from 'markdown-it-front-matter'
import anchor from 'markdown-it-anchor';
import markdownItTocDoneRight from 'markdown-it-toc-done-right'
import uslug from 'uslug'
type StateType = {
};

function uslugify(s:any) {
    return uslug(s);
}

type propType = {
  str:string
};


class Markdown extends React.Component<propType,StateType>{
    constructor(props:any){
        super(props)

    }
    render(): React.ReactNode {
        let md =  MarkdownIt({
            html: true,
            linkify: true,
            typographer: true
          }).use(highlightjs,{inline:true})
          .use(markdownItFrontMatter,(data)=>{
            // console.log(data)
          })
          .use(anchor,{permalink: true, permalinkBefore: true, permalinkSymbol: '§'})
          .use(markdownItTocDoneRight, { slugify: uslugify ,callback: function (html, ast) {
            //把目录单独列出来
            console.log(html)
            console.log(ast)
        }})
        let document = md.render(this.props.str);
        
        return (
            <div className="markdown-body" dangerouslySetInnerHTML={{__html: document}}>
                
            </div>
        )
    }
}

export default Markdown