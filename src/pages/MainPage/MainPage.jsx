import React, { useState, useEffect } from 'react';
import Particles from 'react-particles-js';

import Header from '../../components/Header/Header';
import Interface from '../../components/Interface/Interface';
import Output from '../../components/Output/Output';
import LanguageToggle from '../../components/LanguageToggle/LanguageToggle';
import { ReactComponent as MicOff} from '../../assets/microphone-off.svg';
import { ReactComponent as MicOn} from '../../assets/microphone-on.svg';

import {
  MainPageContainer, MicContainer
} from './MainPageStyles';

function MainPage() {
  //states
  const [ text, setText ] = useState('');
  const [ translatedText, setTranslatedText ] = useState('');
  const [ inputLanguage, setInputLanguage ] = useState('en-US');
  const [ outputLanguage, setOutputLanguage ] = useState('es');
  const [ isRecording, setIsRecording ] = useState(false);
  const [ isOpen, setIsOpen ] = useState(false);

  const languages = {
    "en": ["English", {"es": "Spanish", "fr": "French"}],
    "fr": ["Français", {"es": "Espagnol", "en": "Anglais"}],
    "es": ["Español", {"en": "Inglés", "fr": "Francés"}]
  }


  const particlesOptions = {
    particles: {
      number: {
        value: 55,
        density: {
          enable: true,
          value_area: 800
        }
      },
      size: {
        value: 2
      }
    },
  }

  //Handlers
  const inputLanguageHandler = (language, event) => {
    event.preventDefault();
    if (outputLanguage === language.slice(0, 2)) {
      setOutputLanguage(inputLanguage.slice(0, 2))
    }
    setIsOpen(false);
    setInputLanguage(language);
  }

  const outputLanguageHandler = (language, event) => {
    event.preventDefault();
    if (inputLanguage === language) {
      switch (outputLanguage) {
        case 'en':
          setInputLanguage('en-US')
          break;
        case 'fr':
          setInputLanguage('fr-FR')
          break;
        case 'es':
          setInputLanguage('es-ES')
          break;
        default:
          break;
      }
    }
    setIsOpen(false);
    setOutputLanguage(language.slice(0, 2));
  }

  useEffect(() => {
    const getCredentials = async () => {
      
      const response = await fetch('http://localhost:3000/');
      const myjson = await response.json();
      const token = await myjson.access_token;
    
      const wsURI = `wss://stream.watsonplatform.net/speech-to-text/api/v1/recognize?access_token=${token}&model=${inputLanguage}_BroadbandModel`;

      const websocket = new WebSocket(wsURI);
      websocket.onopen = function(event) { onOpen(event) };
      websocket.onclose = function(event) { onClose(event) };
      websocket.onmessage = function(event) { onMessage(event) };
      websocket.onerror = function(event) { onError(event) };

      function onOpen(event) {
        setIsOpen(true);
        console.log('connecting');
      }

      function onClose(event) {
        console.log('closing:', event.data);
        window.location.reload();
      }
      
      function onMessage(event) {
        const data = JSON.parse(event.data);
        if (data.hasOwnProperty('results')) {
          if (data.results.length) {
          console.log(data)
          fetch('http://localhost:3000/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              data: data.results[0].alternatives[0].transcript,
              outputLanguage,
              inputLanguage
            })
          }).then(response => response.json())
          .then(response => {
            setText(data.results[0].alternatives[0].transcript)
            setTranslatedText(response)
          })
        }}
      }
      
      function onError(event) {
        console.log(event.data);
      }

      const listen = document.querySelector('.startRecording');
      const stop = document.querySelector('.stopRecording');

      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        console.log('getUserMedia supported.');
        navigator.mediaDevices.getUserMedia (
          // constraints - only audio needed for this app
          { audio: true, sampleSize: 16 })
    
          // Success callback
          .then(stream => {
              const mediaRecorder = new MediaRecorder(stream);
              listen.onclick = function(event) {
                event.preventDefault();
                
                console.log('inputLang:', inputLanguage)
                console.log('outputLang:', outputLanguage)
                console.log('uri:', wsURI)
                if (websocket.readyState === 1 && mediaRecorder.state === 'inactive') {
                  setIsRecording(isRecording => !isRecording)
                  websocket.send(JSON.stringify({
                    action: 'start',
                    'content-type': 'application/octet-stream',
                    'interim_results': true,
                    'inactivity_timeout': 100
                  }));
                  mediaRecorder.start(1000);

                  console.log(mediaRecorder.state);
                  console.log("recorder started");
                }

                stop.onclick = function(event) {
                  event.preventDefault();
                  setIsRecording(isRecording => !isRecording);
                  if(mediaRecorder.state === 'recording') {
                    mediaRecorder.stop();
                    console.log(mediaRecorder.state);
                    console.log("recorder stopped");
                  }
                }

                mediaRecorder.ondataavailable = function(event) {
                  websocket.send(event.data)
                }

                mediaRecorder.onstop = function(event) {            
                  websocket.send(JSON.stringify({action: 'stop'}))
                }
          }})
          .catch(function(err) {
              console.log('The following getUserMedia error occured: ' + err);
          }
        );
    } else {
        console.log('getUserMedia not supported on your browser!');
    }
  }
  getCredentials();
}, [inputLanguage, outputLanguage])
  
  return (  
    <MainPageContainer>
      <Particles className='particles'
        params={particlesOptions}
      />
      <Header />
      <Interface >
        <LanguageToggle heading={inputLanguage === "en-US"? "From" : "De"} handler={inputLanguageHandler} />
        <MicContainer style={isOpen ? {} : {opacity: "0.4", pointerEvents: "none"}}>
          <MicOff style={isRecording ? {width: '50%', height: '50%'} : {display: "none"}} className="stopRecording" />
          <MicOn style={isRecording ? {display: "none"} : {width: '50%', height: '50%'} } className="startRecording" />
        </MicContainer>
        <LanguageToggle heading={inputLanguage === "en-US"? "To" : "A"} handler={outputLanguageHandler}/>
      </Interface>
      <Output originalLanguage={languages[inputLanguage.slice(0, 2)][0]} originalText={text} translatedLanguage={languages[inputLanguage.slice(0, 2)][1][outputLanguage]} translatedText={translatedText}/>
    </MainPageContainer>
  )
}

export default MainPage;