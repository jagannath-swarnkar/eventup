import React, { useEffect, useState } from 'react'
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { IconButton } from '@material-ui/core';
import Button from '../button/Button';
import Avatar from '../Image/Avatar';
import { close_dialog } from '../../lib/global';
navigator.getUserMedia = (
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia || 
    navigator.mozGetUserMedia || 
    navigator.msGetUserMedia ||
    navigator.oGetUserMedia
)
let videoElement;
const MeetingSettings = (props) => {
    const [media, setMedia] = useState({video: true, audio: true});
 
    useEffect(()=>{
        const mediaIns = JSON.parse(localStorage.getItem('media'));
        if(mediaIns && Object.keys(mediaIns).length){
            setMedia(mediaIns)
        }
        videoElement = document.getElementById('video_cam')
        navigator.getUserMedia({video: true}, handleVideo, videoError)
    },[])

    useEffect(()=>{
        navigator.getUserMedia({video: true}, handleVideo, videoError)
        
    },[media?.video])
    
    const handleMuteUnmute = (type, value) => {
        setMedia(prev=>({...prev, [type]:value}))
    }

    const handleVideo = (stream) => {
        if(media.video){
            videoElement.srcObject = stream
            videoElement.play()
        }else{
            videoElement.srcObject = null
        }
    }
    const videoError = (error) => {
        console.error(error)
    }

    const handleClickStart = () => {
        const data = {
            audio: !media.audio,
            video: !media.video
        }
        localStorage.setItem('media', JSON.stringify(data));
        props.onClose?.()
    }
    return (
        <React.Fragment>
            <div className="col-12 container py-3 pt-5">
                <video  id="video_cam" className="m-auto video-camera-cont border rounded d-flex">
                    <Avatar />
                </video>
                <div className="d-flex justify-content-center">
                    {media.audio ? (
                        <IconButton  
                            onClick={()=>handleMuteUnmute('audio', false)}
                            style={{background: '#ff0000', margin: '5px' }}>
                            <MicIcon  style={{color: "#fff"}}/>
                        </IconButton>
                    ) : (
                        <IconButton  
                            onClick={()=>handleMuteUnmute('audio', true)}
                            style={{margin: '5px', background: '#00000070' }}>
                            <MicOffIcon color="action" />
                        </IconButton>
                    )}
                    {media.video ? (
                        <IconButton  
                            onClick={()=>handleMuteUnmute('video', false)}
                            style={{background: '#4aa44d', margin: '5px' }}>
                            <VideocamIcon style={{color: "#fff"}}/>
                        </IconButton>
                    ) : (
                        <IconButton  
                            onClick={()=>handleMuteUnmute('video', true)}
                            style={{background: '#00000070', margin: '5px' }}>
                            <VideocamOffIcon color="action"/>
                        </IconButton>
                    )}
                </div>
                <div className="footer text-right mt-3">
                    <Button
                        style={{
                            background: '#4aa4dd'
                        }}
                        onClick={handleClickStart}
                        endIcon={<ArrowRightAltIcon />}
                    >
                        Save
                    </Button>
                </div>
            </div>
            <style>{`
                .video-camera-cont{
                    height: 200px;
                    width: 160px;
                    background: #000;
                }
                #video_cam{
                    background-position: center;
                    background-image: url(https://imgur.com/cyYmXd7.png);
                    background-size: 100%;
                    background-repeat: no-repeat;
                }
            `}</style>
        </React.Fragment>
    )
}

export default MeetingSettings
