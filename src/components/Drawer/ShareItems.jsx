import React, { useState } from "react";
import {
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { APP_NAME, FACEBOOK_ID, collection_icon_white, WEB_URL } from "../../lib/config";

import CopyToClipboard from "react-copy-to-clipboard";
import Image from "../Image";
import Tooltip from "@material-ui/core/Tooltip";
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import SmsIcon from '@material-ui/icons/Sms';
import Wrapper from '../../hoc/Wrapper'
import { IconButton } from "@material-ui/core";
import { close_dialog, close_drawer, isMobile } from "../../lib/global";

const ShareItems = (props) => {
  const { meetingId = ""} = props;
  const [tooltipShow, setToolTipShow] = useState(false)
  const mobileView =  isMobile()

  const inviteUrl = `  Hello, You are invited for an online meeting at ${APP_NAME}.\n
    Meeting Id: ${meetingId}
    Meeting Link: ${WEB_URL}/j/${meetingId}
    \n
    Host your personal meeting at ${APP_NAME}.
    Visit our website: ${WEB_URL}/
    `

  const message = `Hello, You are invited for an online meeting at ${APP_NAME}.\n
    Meeting Id: ${meetingId}
    Meeting Link: ${WEB_URL}/j/${meetingId}
    \n
    Host your personal meeting at ${APP_NAME}.
    Visit our website: ${WEB_URL}/
    `
  const subject = `Online Meeting Invitation`;

  const handleClick = (type) => {
    if(type === 'email'){
      let mail = document.createElement("a");
      mail.href = `mailto:?subject=${subject}&body=${message}`;
      mail.click();
    }
    if(type === 'sms'){
      let mail = document.createElement("a");
      mail.href = `sms:?body=${message}`
      mail.click();
    }
    close_dialog('SHARE_ITEMS');
    close_drawer('SHARE_ITEMS')
  }


  const lang = {
    btnX: "",
    shareTo: "Share To",
    copyURL: "Copy Url",
    facebook: "Facebook",
    twitter: "Twitter",
    whatsapp: "Whatsapp",
    linkedin: "Linkedin",
    messenger: "Messenger",
    pinterest: "Pinterest",
    tumblr: "tumblr",
    telegram: "Telegram",
    email: "Email",
    sms: "SMS"
  }
  return (
    <Wrapper>
      <div className={mobileView ? "btmModal" : ""}>
        <div className={mobileView ? "modal-dialog" : ""}>
          {mobileView ? (
            ""
          ) : (
            <button
              type="button"
              className="close dv_modal_close"
              onClick={() => props.onClose()}
            >
              {lang.btnX}
            </button>
          )}
          <div className={mobileView ? "modal-content pt-4 pb-4" : ""}>
            <div
              className={mobileView ? "col-12 w-330 mx-auto" : "col-11 mx-auto"}
            >
              <h5 className="txt-black dv__fnt24 dv__black_color px-1 py-3 m-0">
                {lang.shareTo}
              </h5>

              <div className="d-flex justify-content-between">
                <CopyToClipboard
                  text={inviteUrl}
                  onCopy={() => {
                    setToolTipShow(true);
                    setTimeout(() => setToolTipShow(false), 1000);
                  }}
                >
                  <Tooltip open={tooltipShow} title="Copied" placement="top">
                    <div>
                      <div className={"clipboard-copy"}>
                        <Image
                          src={collection_icon_white}
                          width={mobileView ? 20 : 25}
                          height={mobileView ? 20 : 25}
                        />
                      </div>
                      
                      <p className="text-muted fntSz10 text-center">
                        {lang.copyURL}
                      </p>
                    </div>
                  </Tooltip>
                </CopyToClipboard>
                
                <div>
                  <IconButton onClick={()=>handleClick('email')} style={{background: 'green'}}>
                    <MailOutlineIcon style={{color: "#fff"}} />
                  </IconButton>
                  <p className="text-muted fntSz10 text-center">
                    {lang.email}
                  </p>
                </div>

                <div>
                  <IconButton onClick={()=>handleClick('sms')} style={{background: 'red'}}>
                    <SmsIcon style={{color: "#fff"}} />
                  </IconButton>
                  <p className="text-muted fntSz10 text-center">
                    {lang.sms}
                  </p>
                </div>

                <WhatsappShareButton
                  url={inviteUrl}
                  onShareWindowClose={() => {}}
                  // className="px-2"
                  quote={APP_NAME}
                  title={APP_NAME}
                >
                  <WhatsappIcon size={mobileView ? 40 : 50} round={true} />
                  <p
                    className={
                      mobileView ? "text-muted fntSz10" : "txt-roman dv__fnt12"
                    }
                  >
                    {lang.whatsapp}
                  </p>
                </WhatsappShareButton>
              </div>
              <div className="d-flex justify-content-between">
                <LinkedinShareButton
                  url={inviteUrl}
                  onShareWindowClose={() => {}}
                  title={APP_NAME}
                  // className="px-2"
                  quote={APP_NAME}
                >
                  <LinkedinIcon size={mobileView ? 40 : 50} round={true} />
                  <p
                    className={
                      mobileView ? "text-muted fntSz10" : "txt-roman dv__fnt12"
                    }
                  >
                    {lang.linkedin}
                  </p>
                </LinkedinShareButton>

                <FacebookShareButton
                  url={inviteUrl}
                  onShareWindowClose={(e) => {}}
                  // className="px-2"
                  quote={APP_NAME}
                  title={APP_NAME}
                  hashtag="#IPL"
                >
                  <FacebookIcon size={mobileView ? 40 : 50} round={true} />
                  <p
                    className={
                      mobileView ? "text-muted fntSz10" : "txt-roman dv__fnt12"
                    }
                  >
                    {lang.facebook}
                  </p>
                </FacebookShareButton>

                <FacebookMessengerShareButton
                  url={inviteUrl}
                  onShareWindowClose={() => {}}
                  // className="px-2"
                  appId={FACEBOOK_ID}
                  quote={APP_NAME}
                  title={APP_NAME}
                >
                  <FacebookMessengerIcon
                    size={mobileView ? 40 : 50}
                    round={true}
                  />
                  <p
                    className={
                      mobileView ? "text-muted fntSz10" : "txt-roman dv__fnt12"
                    }
                  >
                    {lang.messenger}
                  </p>
                </FacebookMessengerShareButton>

                <TelegramShareButton
                  url={inviteUrl}
                  onShareWindowClose={(e) => {}}
                  quote={APP_NAME}
                  title={APP_NAME}
                >
                  <TelegramIcon size={mobileView ? 40 : 50} round={true} />
                  <p
                    className={
                      mobileView ? "text-muted fntSz10" : "txt-roman dv__fnt12"
                    }
                  >
                    {lang.telegram}
                  </p>
                </TelegramShareButton>

                {/* <TwitterShareButton
                  url={inviteUrl}
                  onShareWindowClose={(e) => {}}
                  // className="px-2"
                  quote={APP_NAME}
                  title={APP_NAME}
                  hashtags={["IPL"]}
                >
                  <TwitterIcon size={mobileView ? 40 : 50} round={true} />
                  <p
                    className={
                      mobileView ? "text-muted fntSz10" : "txt-roman dv__fnt12"
                    }
                  >
                    {lang.twitter}
                  </p>
                </TwitterShareButton> */}

                {/* <PinterestShareButton
                  media={"https://i.imgur.com/ARMxyC4.png"}
                  url={inviteUrl}
                  title={APP_NAME}
                  onShareWindowClose={() => {}}
                >
                  <PinterestIcon size={mobileView ? 40 : 50} round={true} />
                  <p
                    className={
                      mobileView ? "text-muted fntSz10" : "txt-roman dv__fnt12"
                    }
                  >
                    {lang.pinterest}
                  </p>
                </PinterestShareButton> */}

                {/* <TumblrShareButton
                  url={inviteUrl}
                  onShareWindowClose={() => {}}
                  // className="px-2"
                  quote={APP_NAME}
                  title={APP_NAME}
                >
                  <TumblrIcon size={mobileView ? 40 : 50} round={true} />
                  <p
                    className={
                      mobileView ? "text-muted fntSz10" : "txt-roman dv__fnt12"
                    }
                  >
                    {lang.tumblr}
                  </p>
                </TumblrShareButton> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .maxWidth70 {
            max-width: 70%;
          }
          .clipboard-copy {
            width: ${mobileView ? "40px" : "50px"};
            height: ${mobileView ? "40px" : "50px"};
            background-color: #00aced;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }
        `}
      </style>
    </Wrapper>
  );
};
export default ShareItems;
