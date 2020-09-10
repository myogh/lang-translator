import React from 'react'
import './App.css'

async function postData(url = '', data = '') {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'AndroidTranslate/5.3.0.RC02.130475354-53000263 5.1 phone TRANSLATE_OPM5_TEST_1'
        // 'Access-Control-Allow-Origin':'*' 
        // 'Content-Type': 'application/x-www-form-urlencoded'
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: data // body data type must match "Content-Type" header
    })

    return response.json() // parses JSON response into native JavaScript objects
  }

// ------------------------------------------------

class Translate extends React.Component{
    constructor(){
        super()
        this.state = {
            input: "",
            translation: "",
            flip: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)

    }

    handleClick(){
        let sldata = 'sl=en&tl=de&q='+this.state.input
        // https://cors-anywhere.herokuapp.com/
        postData('https://cors-anywhere.herokuapp.com/translate.google.com/translate_a/single?client=at&dt=t&dt=ld&dt=qca&dt=rm&dt=bd&dj=1&hl=%25s&ie=UTF-8&oe=UTF-8&inputm=2&otf=2&iid=1dd3b944-fa62-4b55-b330-74909a99969e&', sldata)
                .then(data => {
                this.setState({
                    translation: data.sentences[0].trans,
                    flip: !this.state.flip, 
                    input: ''
                    }
                )
            })

        // this.setState({
        //     translation: "",
        //     flip: !this.state.flip, 
        //     input: ''
        // })
    }

    handleChange(e){
        
        this.setState({
            input: e.target.value
        })
    }

    render(){
        let shouldFlip = this.state.flip
        let textStyle = {}
        let resultStyle = {}
        if (shouldFlip){
            textStyle = {
                animation: 'swap 1s linear'  
            }
            resultStyle = {
                zIndex: '1' 
            }
        }
        return(
            <div className='container'>
                <h1>English to German Translator</h1>
                <div className='stack'>
                    <textarea 
                        name="input" 
                        id="inputText"  
                        onChange = {this.handleChange}
                        style={textStyle}
                    ></textarea>
                    <div className='result' style={resultStyle}>{this.state.translation}</div>
                </div>
                <button className='btn' onClick={this.handleClick}>Translate</button>
            </div>
        )
    }
}


export default Translate