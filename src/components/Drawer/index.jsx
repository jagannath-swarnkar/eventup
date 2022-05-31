

import { Drawer } from '@material-ui/core';
import React from 'react'
import MeetingSettings from './MeetingSettings';
import ShareItems from './ShareItems';
import ToasterDrawer from './ToasterDrawer';

const CustomDrawer = (props) => {
    let { type, anchor, drawerData } = props;

    let drawerInnerContent = () => {
        switch (type){
            case "drawerToaster":
                return (
                    <ToasterDrawer
                        {...props.dialogData}
                        handlerDialog={props.handlerDialog}
                        onClose={props.handleClose}
                    />
                )
            case "SHARE_ITEMS":
                return <ShareItems {...props.drawerData}></ShareItems>;
            case "MEETING_SEETING":
                return (
                    <MeetingSettings
                        {...props.dialogData}
                        handlerDialog={props.handlerDialog}
                        onClose={props.handleClose}
                    />
                ) 
            default:
                return <div>No Drawer Content!</div>
        }
    }
    return (
        <React.Fragment key={props.index || String(Math.random)}>
            <Drawer
                onBackdropClick={
                    drawerData && drawerData.drawerClick
                    ? drawerData.drawerClick
                    : props.handleClose.bind(null, props.type)
                }
                disableBackdropClick={props.disableBackdropClick}
                anchor={anchor}
                className={"w-100"}
                PaperProps={{
                    className: `w-100 paper_drawer ${
                        (drawerData && drawerData.paperClass) || ""
                    }`,
                }}
                open={props.open}
                onClose={props.handleClose.bind(null, props.type)}
            >
                <div className="w-100 h-100">{drawerInnerContent()}</div>
            </Drawer>
        </React.Fragment>
    )
}

export default CustomDrawer
