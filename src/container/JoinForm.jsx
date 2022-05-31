import React from 'react'
import { generateRoomWithoutSeparator, randomAlphanumString } from 'random-word-generator-npm';
import CopyToClipboard from '../components/copy-to-clipboard/CopyToClipboard';
import Image from '../components/Image';
import { share_icon_white, WEB_URL } from '../lib/config';

const JoinForm = (props) => {
    const { 
        meetingId,
        handleSubmit, 
        setMeetingId ,
        handleShare
    } = props;
    const meetingUrl = `${WEB_URL}/s/${meetingId}`

    const handleGenerateMeetingId = () => {
        const roomName = generateRoomWithoutSeparator()
        const randomChar = randomAlphanumString(5)
        const roomId = `${roomName.match(/[A-Z][a-z]+/g).join('_').toLowerCase()}_${randomChar}`;
        setMeetingId(roomId);
        return roomId
    }

    return (
        <React.Fragment>
            <form onSubmit={handleSubmit} className="form py-5">
                <div className="col-auto p-0">
                    <div className="input-group">
                        <input 
                            type="text" 
                            className="form-control room_id_input" 
                            id="foomid" 
                            value={meetingId}
                            onChange={(e)=>setMeetingId(e.target.value)}
                            placeholder="👇 Enter your meeting ID..."
                            />
                        <div className="input-group-append">
                            <div className="input-group-text p-0">
                                <button 
                                    type="submit"
                                    role="bittpm"
                                    className="btn btn-default py-3 px-4 font-weight-bold">
                                    Join
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 row m-0 p-0">
                    <div onClick={handleGenerateMeetingId} className="btn btn-link app-link p-0 font-weight-bold text-white">
                        Generate random meetingId
                    </div>
                    <div className="btn btn-link app-link p-0 font-weight-bold text-white ml-auto">
                        <CopyToClipboard text={meetingUrl}>
                            copy
                        </CopyToClipboard>
                    </div>
                    <div onClick={handleShare} className="btn btn-link app-link p-0 font-weight-bold text-white ml-2">
                        <Image
                          src={share_icon_white}
                          className="mr-1"
                          width={11}
                          height={11}
                        />
                        share
                    </div>
                </div>
            </form>
        </React.Fragment>
    )
}

export default JoinForm
