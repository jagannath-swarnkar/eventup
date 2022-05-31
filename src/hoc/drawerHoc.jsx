import React, { Component } from 'react'
import CustomDrawer from '../components/Drawer'
import { DrawerClose, DrawerOpen } from '../lib/rxSubject';

export class DrawerHoc extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             drawer: {
                // "STORY_DRAWER": {
                //   open: true,
                //   anchor: "left",
                //   type: 'STORY_DRAWER',
                //   drawerData: {},
                //   drawerModel: {},
                // },
                // "COMMENT_DRAWER": {
                //   open: true,
                //   anchor: "left",
                //   type: 'COMMENT_DRAWER',
                //   drawerData: {},
                //   drawerModel: {},
                // }
             }
        }
        DrawerOpen.subscribe((...params) => this.open_drawer(...params[0]));
        DrawerClose.subscribe((...params) => this.close_drawer(...params[0]));
    }



    open_drawer = (type, drawerData={}, anchor="right", drawerModel={}) => {
        this.setState({
              ...this.state,
            drawer: {
            ...this.state.drawer,
            [type]: {
                open: false,
                anchor: anchor || "left",
                type: type,
                drawerData: drawerData || {},
                drawerModel: drawerModel || {},
            },
            },
        },() => {
            setTimeout(() => {
            this.setState({
                ...this.state,
                drawer: {
                ...this.state.drawer,
                [type]: { ...this.state.drawer[type], open: true },
                },
            });
            }, 20);
        });
    }

    close_drawer = (type = "") => {
        let stateObject = { ...this.state };
        let darwerData = { ...stateObject.drawer };
        if (darwerData[type]) {
          darwerData[type]["open"] = false;
        }
        this.setState(
          {
            ...this.state,
            drawer: darwerData,
          },() => {
            if (type) {
              delete darwerData[type];
            } else {
              darwerData = {};
            }
            setTimeout(() => {
              this.setState({
                ...this.state,
                drawer: darwerData,
              });
            }, 30);
          }
        );
      };
    
    render() {
        return Object.values(this.state.drawer).map((drawer, index)=>{
            return (
                <CustomDrawer
                    key={index}
                    disableBackdripClick={
                        (drawer.drawerData && drawer.drawerData.disableBackdripClick) || false
                    }
                    open={drawer.open}
                    type={drawer.type}
                    handleClose={(type="")=>{
                        this.close_drawer(type)
                        drawer.drawerData && drawer.drawerData.handleClose &&
                        drawer.drawerData.handleClose(null)
                    }}
                    anchor={drawer.anchor}
                    handlerDialog={this.open_drawer}
                    drawerData={drawer.drawerData}
                />
            )
        })
    }
}

export default DrawerHoc
