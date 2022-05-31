import React from 'react'
import { useHistory } from 'react-router'
import Wrapper from '../../hoc/Wrapper';
import { DOMAIN, OPTIONS } from '../../lib/config';
import { init, startLoader, stopLoader, sleep } from '../../lib/global';

const StartConference = () => {
    const history = useHistory();
    const {pathname="" } = history?.location;
    const roomId = pathname?.split('/')[2];
    React.useEffect(()=>{
        const mediaIns = JSON.parse(localStorage.getItem('media'))
        console.log('mediaIns', mediaIns)
        const options = {
            ...OPTIONS,
            roomName: roomId,
            parentNode: document.getElementById('meeting'),
            configOverwrite: {
                ...OPTIONS.configOverwrite,
                startWithAudioMuted: mediaIns?.audio || false,
                startWithVideoMuted: mediaIns?.video || false
            }
        }
        const api = init(DOMAIN, options)
        api.on('videoConferenceJoined',()=>{
            stopLoader();
            let element = document.getElementsByClassName('watermark')
            element = null
            // const el = element?.[0]
            // console.log('element--->', el)
            // setInterval(() => {
            //     console.log('element---> ', document.getElementsByClassName('watermark'))
            // }, 2000);
            // el.style?.backgroundImage = "url(https://eventup.jagan.pro/favicon.png)"
        })
        api.on('videoConferenceLeft',async(e)=>{
            startLoader()
            await sleep(500)
            history.push('/')
        })
        
    },[])
    return (
        <Wrapper>
            <div id="meeting"></div>
        </Wrapper>
    )
}

export default StartConference
