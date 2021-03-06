import React, { useEffect, useState } from 'react';
import './App.css';
import io from 'socket.io-client';
import TwitchChat from './components/TwitchChat/TwitchChat'
import Participants from './components/Participants/Participants';
import YoutubeChat from './components/YoutubeChat/YoutubeChat';

const socket = io.connect('http://localhost:4000');

const App = () => {

  const [twitchMessage, addTwitchMessage] = useState({});
  const [youtubeMessage, addYoutubeMessage] = useState({});
  const [userNickName, addUserNickName] = useState({});

  const startTwitchParsing = (nickName, keyWord) => {
    socket.emit('startTwitchParser', { nickName: nickName, keyWord: keyWord });
  }

  const startYoutubeParsing = (streamKey, keyWord) => {
    socket.emit('startYoutubeParser', { streamKey: streamKey, keyWord: keyWord });
  }

  const stopTwitchParsing = () => {
    socket.emit('stopTwitchParser', {});
  }

  const stopYoutubeParsing = () => {
    socket.emit('stopYoutubeParser', {});
  }

  useEffect(() => {
    socket.on('connect', socket => {
      console.log('connected');
    });
    socket.on('newMessageFromTwitch', socket => {
      if (socket.wordFlag) {
        addUserNickName({ user: socket.user, platform: 'twitch' })
      }
      addTwitchMessage(socket);
    });
    socket.on('newMessageFromYoutube', socket => {
      if (socket.wordFlag) {
        addUserNickName({ user: socket.user, platform: 'youtube' })
      }
      addYoutubeMessage(socket);
    })
  })


  return (
    <div className='App'>
      <TwitchChat
        message={twitchMessage.message}
        user={twitchMessage.user}
        startTwitchParsing={startTwitchParsing}
        stopTwitchParsing={stopTwitchParsing}
      >
      </TwitchChat>
      <Participants
        platform={userNickName.platform}
        user={userNickName.user}
        stopTwitchParsing={stopTwitchParsing}
        stopYoutubeParsing={stopYoutubeParsing}
      >
      </Participants>
      <YoutubeChat
        message={youtubeMessage.message}
        user={youtubeMessage.user}
        startYoutubeParsing={startYoutubeParsing}
        stopYoutubeParsing={stopYoutubeParsing}
      >
      </YoutubeChat>
    </div>
  )
}

export default App;
