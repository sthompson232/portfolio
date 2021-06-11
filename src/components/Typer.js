import React from 'react'

const TYPING_SPEED = 140;
const DELETING_SPEED = 80;

export class Typer extends React.Component {

  state = {
    text: '',
    isDeleting: false,
    loopNum: 0,
    typingSpeed: TYPING_SPEED,
  }

  componentDidMount() {
    this.handleType();
  }

  handleType = () => {
    const { dataText } = this.props;
    const { isDeleting, loopNum, text, typingSpeed } = this.state;
    const i = loopNum % dataText.length;
    const fullText = dataText[i];

    this.setState({
      text: isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1),
      typingSpeed: isDeleting ? DELETING_SPEED : TYPING_SPEED
    });

    if (!isDeleting && text === fullText) {     
      setTimeout(() => this.setState({ isDeleting: true }), 600);   
    } else if (isDeleting && text === '') {
      setTimeout(() => this.setState({
        isDeleting: false,
        loopNum: loopNum + 1
      }), 400)
    
    }

    setTimeout(this.handleType, typingSpeed);
  };

  render() {
    return (
      <h1 className="typer" style={{color: this.props.textColor}}>{ this.props.heading }&nbsp;
        <span>{ this.state.text }</span>
        <span style={{ borderLeft: `.1em solid ${this.props.textColor}` }} id="cursor"></span>
      </h1>
    );
  }
}
