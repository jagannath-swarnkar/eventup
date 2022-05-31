import React, { useState } from 'react'
import Logo from '../components/Logo'
import { generateRoomWithoutSeparator, randomAlphanumString } from 'random-word-generator-npm';
import { useHistory } from 'react-router';
import Wrapper from '../hoc/Wrapper';
import { close_dialog, close_drawer, isMobile, open_dialog, open_drawer, startLoader, stopLoader } from '../lib/global';
import { NavLink } from 'react-router-dom';
import StartForm from './StartForm';
import JoinForm from './JoinForm';

const WelcomePage = () => {
    const [meetingId, setMeetingId] = useState('')
    const Route = useHistory();
    const params = new URLSearchParams(Route.location.search)
    const [type, setType] = useState(params.get('type'))

    const mobileView = isMobile();

    React.useEffect(()=>{
        if(!type){
            Route.push({search: '?type=start'});
            setType('start')
        }
        stopLoader();
    },[]);

    const handleGenerateMeetingId = () => {
        const roomName = generateRoomWithoutSeparator()
        const randomChar = randomAlphanumString(5)
        const roomId = `${roomName.match(/[A-Z][a-z]+/g).join('_').toLowerCase()}_${randomChar}`;
        setMeetingId(roomId);
        return roomId
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        let roomId = meetingId
        if(!meetingId){
            roomId = await handleGenerateMeetingId()
        }
        startLoader()
        setTimeout(()=>{
            Route.push(`/s/${roomId}`)
        },1000)
    }

    const handleShare = () => {
        if(!meetingId) return;

        if(!mobileView){
            open_dialog("SHARE_ITEMS",{
                meetingId: meetingId,
                back: () => close_dialog("SHARE_ITEMS")
            })
        }else{
            open_drawer("SHARE_ITEMS",{
                meetingId: meetingId,
                back: () => close_drawer("SHARE_ITEMS")
            },"bottom")
        }
    }
    return (
        <Wrapper>
            <div className="welcome_page">
                <div className="container-fluid">
                    <div className="logo col-12 row m-0 p-0">
                        <Logo />
                        <div className="ml-auto start_join_radio mt-3">
                            <nav className="navbar p-0">
                                <div className="container">
                                    <NavLink
                                        className={`nav-item ${type === 'start' ? 'active' : ''}`} 
                                        onClick={()=>setType('start')}
                                        to={{search: "?type=start"}}>Start</NavLink>
                                    <NavLink
                                        className={`nav-item ${type === 'join' ? 'active' : ''}`} 
                                        onClick={()=>{setType('join');setMeetingId('')}}
                                        to={{search: "?type=join"}}>Join</NavLink>
                                </div>
                            </nav>
                        </div>
                    </div>
                    <div className="form_text">
                        <h1 className="text-start text-white">
                            Start & Join meetings for free
                        </h1>
                        <h5 className="subtitle text-start text-white font-weight-bold">
                            No amount needed
                        </h5>
                    </div>
                    
                    {type === 'start' ? (
                        <StartForm 
                        meetingId={meetingId}
                        handleShare={handleShare}
                        setMeetingId={setMeetingId}
                        handleSubmit={handleSubmit}/>
                    ) : (
                        <JoinForm
                        meetingId={meetingId}
                        handleShare={handleShare}
                        setMeetingId={setMeetingId}
                        handleSubmit={handleSubmit}/>
                    )}
                    
                    
                </div>
            </div>
            <style jsx="true">{`
                .welcome_page{
                    background-repeat: no-repeat;
                    background-image: url(/images/meet_call2.jpeg);
                    background-position: center;
                    background-size: cover;
                    height: 100vh;
                    width: 100vw;
                }
                .form_text{
                    max-width: 450px;;
                }
                .form{
                    max-width: 500px;
                }
                .room_id_input{

                }
                .start_join_radio > nav{
                    border-radius: 50px;
                    background-color: transparent;
                    border: 1px solid white;
                }
                .start_join_radio > nav > div{
                    display: flex;
                    justify-content: space-between;
                    padding: 0 10px;
                }
                .start_join_radio > nav > .container > .nav-item{
                    padding: 0 1rem;    
                    color: #fff;
                    text-decoration: none;
                    padding: 5px 24px !important;
                    border-radius: 20px;
                    margin: 5px 0px;
                }
                .nav-item.active {
                    background: #000;
                    
                }
            `}
            </style>
        </Wrapper>
    )
}

export default WelcomePage
