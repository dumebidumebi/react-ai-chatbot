import React, { useState, useEffect } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import logo from './logo.svg';
import sendIcon from './sendIcon.svg';


console.log(process.env.REACT_API_KEY)

const configuration = new Configuration({
  apiKey: process.env.REACT_API_KEY,
});
const openai = new OpenAIApi(configuration);



function Bubble(props) {
  return <div className='bubble'>{props.bubbletext}</div>;
}

function App() {
  const [items, setItems] = useState('');
  const [bubbles, setBubbles] = useState([]);
  // useEffect(() => {
  //   aiResponse();
  // }, []);

  function handleChange(event) {
    setItems(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setBubbles([...bubbles, { role: 'user', content: items }]);
    setItems('');
    
    // await aiResponse();
  }

  async function aiResponse() {
    const completion = await openai.createCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        ...bubbles,
      ],
    });

    const response = completion.data.choices[0].message.content;
    setBubbles([...bubbles, { role: 'assistant', content: response }]);
  }

  const userBubbles = bubbles.map((bub, index) => (
    <Bubble key={index} bubbletext={bub.content} />
  ));

  return (
    <div className='App'>
      <div className='messageheader'>
        <img className='logo' src={logo} alt='Logo' />
        <div className='headertext-container'>
          <h4 className='header-text'>ReactAI Chatbot</h4>
          <h5>ASK ME ANYTHING</h5>
        </div>
      </div>
      <div className='messagebox'>{userBubbles}</div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          className='input-box'
          onChange={handleChange}
          value={items}
          placeholder='Ask me a question...'
        />
        <button className='submit' type='submit'>
          <img className='sendIcon' src={sendIcon} alt='Send' />
        </button>
      </form>
    </div>
  );
}

export default App;
