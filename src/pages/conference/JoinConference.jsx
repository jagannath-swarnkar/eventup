import React from 'react'
import { useHistory } from 'react-router'
import Wrapper from '../../hoc/Wrapper';
import { DOMAIN, OPTIONS } from '../../lib/config';
import { init, startLoader, stopLoader, sleep } from '../../lib/global';

const JoinConference = () => {
    const history = useHistory();
    const {pathname="" } = history?.location;
    const roomId = pathname?.split('/')[2];
    React.useEffect(()=>{
        const options = {
            ...OPTIONS,
            roomName: roomId,
            parentNode: document.getElementById('meeting')
        }
        const api = init(DOMAIN, options)
        api.on('videoConferenceJoined',()=>{
        //   stopLoader()
        })
        api.on('videoConferenceLeft',async(e)=>{
            startLoader()
            await sleep(500)
            history.push('/')
        })
        setTimeout(() => {
            stopLoader()
        }, 1000);
    },[])
    return (
        <Wrapper>
            <div id="meeting"></div>
        </Wrapper>
    )
}

export default JoinConference
