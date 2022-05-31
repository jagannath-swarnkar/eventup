import Dialog from "../components/Dialogs";
import { DialogClose, DialogOpen } from "../lib/rxSubject";
import React from "react";
class DialogHoc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialog: {},
    };

    DialogOpen.subscribe((...params) =>
      this.open_dialog(...params)
    );
    DialogClose.subscribe((...params) =>
      this.close_dialog(...params)
    );
  }

  open_dialog = (dialog) => {
    if (typeof dialog[1] !== "undefined" && dialog[1].closeAll === true) {
      setTimeout(() => {
        this.setState({
          ...this.state,
          dialog: {
            [dialog[0]]: {
              open: true,
              type: dialog[0],
              dialogData: dialog[1] || {},
            },
          },
        });
      }, 20);
      return;
    }

    this.setState({
      ...this.state,
      dialogData: dialog[1] || {},
      open: true,
      type: dialog[0] || "",
    });

    this.setState(
      {
        ...this.state,
        dialog: {
          ...this.state.dialog,
          [dialog[0]]: {
            open: false,
            type: dialog[0],
            dialogData: dialog[1] || {},
          },
        },
      },
      () => {
        setTimeout(() => {
          this.setState({
            ...this.state,
            dialog: {
              ...this.state.dialog,
              [dialog[0]]: {
                ...this.state.dialog[dialog[0]],
                open: true,
              },
            },
          });
        }, 20);
      }
    );
  };

  close_dialog = (type, flag = false) => {
    // console.log("sadad", type);
    let stateObject = { ...this.state };

    let dialogData = { ...stateObject.dialog };
    if (dialogData[type]) {
      dialogData[type]["open"] = false;
    } else {
      // Object.keys(dialogData).map((type) => {
      //   dialogData[type]["open"] = false;
      // });
    }
    this.setState(
      {
        ...this.state,
        dialog: dialogData,
      },
      () => {
        if (type) {
          delete dialogData[type];
        } else {
          dialogData = {};
        }

        setTimeout(() => {
          this.setState({
            ...this.state,
            dialog: dialogData,
          });
        }, 30);
      }
    );
  };

  render() {
    return (
      <div>
        {Object.values(this.state.dialog).map(
          (dialog, index) => {
            // return <div>Drawer data</div>;
            // console.log("ASDads", dialog);
            return (
              <Dialog
                open={dialog.open}
                type={dialog.type}
                outerBox={dialog.outerBox || ""}
                handleClose={this.close_dialog.bind(
                  null,
                  dialog.type
                )}
                handlerDialog={this.open_dialog}
                dialogData={dialog.dialogData}
                key={index}
              />
            );
          }
        )}
      </div>
    );
  }
}

export default DialogHoc;
