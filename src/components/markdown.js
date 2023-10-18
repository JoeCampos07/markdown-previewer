import React from "react";
import '../stylesheets/markdown.css'
import { marked } from "marked";
import { useState } from "react";
import DOMPurify from "dompurify";
import { LiaFreeCodeCamp } from 'react-icons/lia'
import { BiExpandAlt } from 'react-icons/bi'
import { GrContract } from 'react-icons/gr'


function Markdown() {

  const [textHTML, setTextHTML] = useState('# Welcome to the MarkdownPreviewer...')
  
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



  return (
    <div className='main'>
      <div className={previewSize ? 'inputWrapRemoved' : 'inputWrap'}>
        <div className='box-header'> 
          <i className='iconFFC'><LiaFreeCodeCamp /></i>
          <span className='header-title'>Editor</span>
          <i className='iconExpand'
            onClick={adjInpSize}
             > {inputSize ? <GrContract /> : <BiExpandAlt />}</i>
        </div>
        <textarea
          id='textToRender' 
          name='textToRender'
          className={inputSize ? 'marker-input input-extend' : 'marker-input'}
          placeholder='Insert your text here...'
          value={textHTML}
          onChange={handleChange}
          >
        </textarea>
      </div>
      
      <div className={inputSize ? 'outputWrapRemoved' : 'outputWrap'}>
        <div className='box-header'> 
          <i className='iconFFC'><LiaFreeCodeCamp /></i>
          <span className='header-title'>Previewer</span>
          <i className='iconExpand'
             onClick={adjPrevSize}>{previewSize ? <GrContract /> : <BiExpandAlt />}</i>
        </div>
        <div className='marker-result' dangerouslySetInnerHTML={getMarkdown(textHTML)}/>
      </div>
    </div>
  )

}


export default Markdown;