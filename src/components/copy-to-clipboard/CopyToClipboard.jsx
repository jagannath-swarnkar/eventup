import { Tooltip } from '@material-ui/core';
import React, { useState } from 'react'
import CopyToClipboardComp from "react-copy-to-clipboard";
import { collection_icon_white } from '../../lib/config';
import Image from '../Image';

const CopyToClipboard = (props) => {
    const [tooltipShow, setToolTipShow] = useState(false)
    return (
        <React.Fragment>
            <CopyToClipboardComp
                  text={props.text}
                  onCopy={() => {
                    setToolTipShow(true);
                    setTimeout(() => setToolTipShow(false), 1000);
                  }}
                >
                <Tooltip open={tooltipShow} title="Copied" placement="top">
                    <div className={""}>
                    <Image
                        src={collection_icon_white}
                        width={11}
                        className="mr-1"
                        height={11}
                    />
                    {props.children}
                    </div>
                </Tooltip>
            </CopyToClipboardComp>
        </React.Fragment>
    )
}

export default CopyToClipboard
