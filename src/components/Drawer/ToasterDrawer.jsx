import React, { useEffect } from "react";
import Image from "../Image";

import {
  DRAWER_CLOSE,
  DRAWER_TOASTER_TIME,
} from "../../lib/config";
import { isMobile } from "../../lib/global";
const ToasterDrawer = async(props) => {
  const {
    onClose,
    drawerClick,
    button = {},
    title,
    desc,
    titleClass = "",
    closeIconVisible = true,
    closing_time,
  } = props;
  const { text, onClick } = button;
  const mobileView = await isMobile()

  useEffect(() => {
    props.autoClose &&
      setTimeout(() => {
        onClose();
      }, closing_time || DRAWER_TOASTER_TIME);
  });
  return (
    <div
      onClick={drawerClick ? drawerClick : onClose}
      className="btmModal rounded">
      <div
        className={
          mobileView
            ? "modal-dialog"
            : "modal-dialog text-center rounded"
        }>
        {/* <button
          type="button"
          className="close dv_modal_close cursorPtr"
          data-dismiss="modal"
          onClick={() => onClose}>
          x
        </button> */}
        <div
          className="modal-content pt-4 pb-4"
          id="signInContent">
          <div className="col-12 w-330 mx-auto">
            {props.icon && (
              <div>
                <Image
                  className="mb-3"
                  // onClick={drawerClick ? drawerClick : onClose}
                  alt="check icon"
                  src={props.icon}
                  width="70px"
                  height="70px"
                />
              </div>
            )}
            {closeIconVisible && (
              <figure className="text-right op5">
                <Image
                  // onClick={drawerClick ? drawerClick : onClose}
                  alt="close button"
                  src={DRAWER_CLOSE}
                  width="13px"
                  height="13px"
                />
              </figure>
            )}
            {title && (
              <h5 className={`mb-3 ${titleClass}`}>
                {title}
              </h5>
            )}
            {desc && (
              <div className="txt-book fntSz16 mb-4">
                {desc}
              </div>
            )}
            {/* {text && isEmpty(button) && ( */}
            {text && (
              <div className="">
                <button
                  onClick={
                    onClick
                      ? (e, ...resc) => {
                          e && e.stopPropagation();
                          onClick();
                          onClose();
                        }
                      : () => {
                          onClose();
                        }
                  }
                  type="button"
                  className="btn btn-default blueBgBtn"
                  id="crtr_login_signup_modal3">
                  {text}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToasterDrawer;
