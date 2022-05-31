import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { withStyles } from "@material-ui/core/styles";
import ShareItems from "../Drawer/ShareItems";
import MeetingSettings from "../Drawer/MeetingSettings";

const styles = {
  root: {
    padding: "0px !important",
    overflowX: "hidden"
  },
  outerBox: {
    borderRadius: "8px !important",
    margin: "5px"
  },
};

const ModalDialog = (props) => {
  let { classes, dialogData } = props;
  let dialogContent = () => {
    switch (props.type) {
      case "SHARE_ITEMS":
        return <ShareItems {...props.dialogData}></ShareItems>;
      case "MEETING_SEETING":
        return (
            <MeetingSettings
                {...props.dialogData}
                handlerDialog={props.handlerDialog}
                onClose={props.handleClose}
            />
        ) 
      default:
        return <div>empty</div>;
    }
  };
  return (
    <Dialog
      test="dialog"
      open={props.open}
      onBackdropClick={
        dialogData && dialogData.dialogClick
          ? dialogData.dialogClick
          : props.handleClose
      }
      className={`${classes.outerBox} ${
        dialogData && dialogData.outerBox
      }  mu-dialog`}
      onClose={props.handleClose}
      disableBackdropClick={props.disableBackdropClick}
      classes={{
        paper: classes.outerBox,
      }}
      {...props.dialogModel}>
      <DialogContent
        test="DialogContent"
        className={classes.root, 'mu-dialog-content  custom_dialog'}>
        <div className="w-100">{dialogContent()}</div>
      </DialogContent>
      <style>{`
        :global(.mu-dialog > div > div) {
          overflow-y: visible !important;
        }
        :global(.mu-dialog) {
          margin: 11px !important;
        }
        :global(.MuiPaper-root.MuiDialog-paper) {
          min-width: 450px !important;
        }

        @media only screen and (max-width: 767px) {
          :global(.mu-dialog > div > div) {
            max-width: 90vw !important;
            min-width: 450px !important;
          }

          // :global(.MuiDialog-paper) {
          //   min-width: auto !important;
          // }
        }
      `}</style>
    </Dialog>
  );
};

export default withStyles(styles)(ModalDialog);
