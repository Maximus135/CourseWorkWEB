import React from 'react';
import * as Styles from './YoutubeMessage.module.css'
import { ReactComponent as MessageIcon } from '../../Images/youtubeMessage.svg';



const YoutubeMessage = ({ user, message }) => (
    <div className={Styles.wrapper}>
        <span className={Styles.name}><MessageIcon className={Styles.logo} />{user}:</span>
        <span className={Styles.messageText}>{message}</span>
    </div>
)

export default YoutubeMessage;