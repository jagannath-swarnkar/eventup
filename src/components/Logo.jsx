import { IconButton } from '@material-ui/core'
import React from 'react'
import Image from './Image'

const Logo = ({src}) => {
    return (
        <React.Fragment>
            <IconButton 
                style={{
                    // height: "65px",
                    margin: "20px",
                    padding: 0
                    // boxShadow: "3px 4px 6px 3px #0000002e",
                    // borderRadius: "50%",
                    // cursor: "pointer"
                }}
            >
                <Image
                    src={src || '/favicon.png'}
                    alt="App Logo"
                    height=""
                    width=""
                    style={{
                        height: "65px",
                        // margin: "20px",
                        boxShadow: "3px 4px 6px 3px #0000002e",
                        borderRadius: "50%",
                        // cursor: "pointer"
                    }}
                ></Image>
            </IconButton>
        </React.Fragment>
    )
}

export default Logo
