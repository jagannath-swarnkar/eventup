import React from 'react'

const Image = ({src, height, width, alt, ...other}) => {
    return (
        <React.Fragment>
            <img 
                src={src} 
                height={height || 'auto'}
                width={width || 'auto'} 
                alt={alt || "Image"}
                {...other}
                />
        </React.Fragment>
    )
}

export default Image
