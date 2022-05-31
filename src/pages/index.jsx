import React from 'react'
import WelcomePage from '../container/WelcomePage'
import Wrapper from '../hoc/Wrapper'
import SettingsIcon from '@material-ui/icons/Settings';
import { IconButton, Tooltip } from '@material-ui/core';
import { open_dialog } from '../lib/global';

const Homepage = () => {

    const handleClickSetting = () => {
        open_dialog("MEETING_SEETING",{})
    }
    return (
        <Wrapper>
            <WelcomePage/>
            <Tooltip
                title="Settings" 
                placement="top" 
                arrow>
                <IconButton 
                    onClick={handleClickSetting}
                    style={{
                    // background: "white",
                    position: "fixed",
                    bottom: 0,
                    right: 0,
                    margin: "10px"
                }}>
                    <SettingsIcon style={{color: "#fff"}} />
                </IconButton>
            </Tooltip>
        </Wrapper>
    )
}

export default Homepage
