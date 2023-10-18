import React from "react";
import '../stylesheets/markdown.css'
import { marked } from "marked";
import { useState } from "react";
import DOMPurify from "dompurify";
import { LiaFreeCodeCamp } from 'react-icons/lia'
import { BiExpandAlt } from 'react-icons/bi'
import { GrContract } from 'react-icons/gr'


function Markdown() {

  const defaultMarkdown = `# Welcome to my React Markdown Previewer!

  ## This is a sub-heading...
  ### And here's some other cool stuff:
  
  Heres some code, \`<div></div>\`, between 2 backticks.
  
  \`\`\`
  // this is multi-line code:
  
  function anotherExample(firstLine, lastLine) {
    if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
      return multiLineCode;
    }
  }
  \`\`\`
  
  You can also make text **bold**... whoa!
  Or _italic_.
  Or... wait for it... **_both!_**
  And feel free to go crazy ~~crossing stuff out~~.
  
  There's also [links](https://www.freecodecamp.org), and
  > Block Quotes!
  
  And if you want to get really crazy, even tables:
  
  Wild Header | Crazy Header | Another Header?
  ------------ | ------------- | -------------
  Your content can | be here, and it | can be here....
  And here. | Okay. | I think we get it.
  
  - And of course there are lists.
    - Some are bulleted.
       - With different indentation levels.
          - That look like this.
  
  
  1. And there are numbered lists too.
  1. Use just 1s if you want!
  1. And last but not least, let's not forget embedded images:
  
  ![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
  `




  const [textHTML, setTextHTML] = useState(defaultMarkdown)
  
  const getMarkdown = (FORM_INPUT) => {
    if (FORM_INPUT) {
      const html = marked.parse(textHTML)
      return {__html: DOMPurify.sanitize(html)}
    }
  }

  const handleChange = event => {
    setTextHTML(event.target.value)
  }

/*togle the input*/
  const [inputSize, setInputSize] = useState(false)

  const adjInpSize = () => {
    setInputSize(!inputSize)
  }

/*togle the previewer*/
  const [previewSize, setPreviewSize] = useState(false)
  const adjPrevSize = () => {
    setPreviewSize(!previewSize)
  }

  marked.setOptions({
    "async": false,
    "breaks": true,
    "extensions": null,
    "gfm": true,
    "hooks": null,
    "pedantic": false,
    "silent": false,
    "tokenizer": null,
    "walkTokens": null
   })

  return (
    <div className='main'>
      <div className={previewSize ? 'hidden' : 'inputWrap'}>
        <div className='box-header'> 
          <i className='iconFFC'><LiaFreeCodeCamp /></i>
          <span className='header-title'>Editor</span>
          <i className='iconExpand'
            onClick={adjInpSize}
             > {inputSize ? <GrContract /> : <BiExpandAlt />}</i>
        </div>
        <textarea
          id='editor' 
          name='editor'
          className={inputSize ? 'marker-input input-extend' : 'marker-input'}
          placeholder='Insert your text here...'
          value={textHTML}
          onChange={handleChange}
          >
        </textarea>
      </div>
      
      <div className={inputSize ? 'hidden' : 'outputWrap'}>
        <div className='box-header'> 
          <i className='iconFFC'><LiaFreeCodeCamp /></i>
          <span className='header-title'>Previewer</span>
          <i className='iconExpand'
             onClick={adjPrevSize}>{previewSize ? <GrContract /> : <BiExpandAlt />}</i>
        </div>
        <div className='marker-result' id='preview' dangerouslySetInnerHTML={getMarkdown(textHTML)}/>
      </div>
    </div>
  )

}


export default Markdown;