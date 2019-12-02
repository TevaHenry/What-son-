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
  //state
  const [ text, setText ] = useState('');
  const [ translatedText, setTranslatedText ] = useState('');
  const [ inputLanguage, setInputLanguage ] = useState('en-US');
  const [ outputLanguage, setOutputLanguage ] = useState('es');
  const [ isRecording, setIsRecording ] = useState(false);

  const languages = {
    "en": "English",
    "fr": "French",
    "es": "Spanish"
  }

  const particlesOptions = {
    particles: {
      number: {
        value: 50,
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

  //fetch this
  const IAM_access_token = 'eyJraWQiOiIyMDE5MDcyNCIsImFsZyI6IlJTMjU2In0.eyJpYW1faWQiOiJpYW0tU2VydmljZUlkLTlkNWYzMWZkLTdjMDAtNGIyMS04MjdkLThlYmY4NDc4Mjk3NCIsImlkIjoiaWFtLVNlcnZpY2VJZC05ZDVmMzFmZC03YzAwLTRiMjEtODI3ZC04ZWJmODQ3ODI5NzQiLCJyZWFsbWlkIjoiaWFtIiwiaWRlbnRpZmllciI6IlNlcnZpY2VJZC05ZDVmMzFmZC03YzAwLTRiMjEtODI3ZC04ZWJmODQ3ODI5NzQiLCJzdWIiOiJTZXJ2aWNlSWQtOWQ1ZjMxZmQtN2MwMC00YjIxLTgyN2QtOGViZjg0NzgyOTc0Iiwic3ViX3R5cGUiOiJTZXJ2aWNlSWQiLCJ1bmlxdWVfaW5zdGFuY2VfY3JucyI6WyJjcm46djE6Ymx1ZW1peDpwdWJsaWM6c3BlZWNoLXRvLXRleHQ6dXMtc291dGg6YS84NGRhYzYxYWZmMDFkN2MyNGNmMmE5MzQ5ZGU0MDM5Yzo2MGJjOGFkZC1iNjIzLTQwZmItOWUyNy00Nzc0YTVhZTViYzI6OiJdLCJhY2NvdW50Ijp7InZhbGlkIjp0cnVlLCJic3MiOiI4NGRhYzYxYWZmMDFkN2MyNGNmMmE5MzQ5ZGU0MDM5YyJ9LCJpYXQiOjE1NzUyNzI0ODMsImV4cCI6MTU3NTI3NjA4MywiaXNzIjoiaHR0cHM6Ly9pYW0uY2xvdWQuaWJtLmNvbS9pZGVudGl0eSIsImdyYW50X3R5cGUiOiJ1cm46aWJtOnBhcmFtczpvYXV0aDpncmFudC10eXBlOmFwaWtleSIsInNjb3BlIjoiaWJtIG9wZW5pZCIsImNsaWVudF9pZCI6ImRlZmF1bHQiLCJhY3IiOjEsImFtciI6WyJwd2QiXX0.FNiHTnv2JOIkPjBMP0tOZziK8A7hJKmqpEQSHreVvMx3YPI3q1lLbgyUn-9v0jOGDKNxPGyJ8UTCJsGnyeO8zpvEsrnBMNshzwT50GHDlGJISWFP1FNfCwiZa1A7Y9I0P9m2fd6x3u3je3O6i1pSAtTOEHsX5QkDlE_xUHeZhK14xAyMdahf1iICeMPwLqLPOYmI-WLiL2j8GPpKu0PA7gQQn4SdxRml8Opj2gM5kCZFzgKggMa0W_I19pmw74XZk6DZTDoF1nKBIQs_PG0Wrz7thP5SaW7fCk6-e7gqd6vzZNnMoM3uVxVKDhe8oKUav2QjCZbxqJlMcqPDdPUBrg'

  const wsURI = `wss://stream.watsonplatform.net/speech-to-text/api/v1/recognize?access_token=${IAM_access_token}&model=${inputLanguage}_BroadbandModel`;

  const websocket = new WebSocket(wsURI);
  websocket.onopen = function(event) { onOpen(event) };
  websocket.onclose = function(event) { onClose(event) };
  websocket.onmessage = function(event) { onMessage(event) };
  websocket.onerror = function(event) { onError(event) };

  function onOpen(event) {
    console.log('connecting')
    console.log(websocket)
  }

  function onClose(event) {
    console.log('closing:', event.data);
    console.log(websocket)
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

  const inputLanguageHandler = (language, event) => {
    event.preventDefault();
    if (outputLanguage === language.slice(0, 2)) {
      setOutputLanguage(inputLanguage.slice(0, 2))
    }
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
    setOutputLanguage(language.slice(0, 2));
  }

  useEffect(() => {
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
              setIsRecording(isRecording => !isRecording)
              console.log('inputLang:', inputLanguage)
              console.log('outputLang:', outputLanguage)
              console.log('uri:', wsURI)
              if (websocket.readyState === 1 && mediaRecorder.state === 'inactive') {
                websocket.send(JSON.stringify({
                  action: 'start',
                  'content-type': 'application/octet-stream',
                  'interim_results': true,
                  // 'inactivity_timeout': -1
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
}, [inputLanguage, websocket, outputLanguage, wsURI])
  
  return (  
    <MainPageContainer>
      <Particles className='particles'
        params={particlesOptions}
      />
      <Header />
      <Interface className="test" >
        <LanguageToggle heading="From" handler={inputLanguageHandler} />
        <MicContainer>
          <MicOff style={isRecording ? {width: '50%', height: '50%'} : {display: "none"}} className="stopRecording" />
          <MicOn style={isRecording ? {display: "none"} : {width: '50%', height: '50%'} } className="startRecording" />
        </MicContainer>
{/* <img  src="./images/microphone-off.svg" alt="mic symbol to stop recording" className="stopRecording"/> */}
        {/* <img src="./images/microphone-on.svg" alt="mic symbol to start recording" className="startRecording"/> */}
        <LanguageToggle heading="To" handler={outputLanguageHandler}/>
      </Interface>
      <Output originalLanguage={languages[inputLanguage.slice(0, 2)]} originalText={text} translatedLanguage={languages[outputLanguage]} translatedText={translatedText}/>
    </MainPageContainer>
  )
}

export default MainPage;