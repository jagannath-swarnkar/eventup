import React from "react";
import { handleLoader } from "../lib/rxSubject";
import ClipLoader from "react-spinners/HashLoader";
import { css } from "@emotion/core";
import { PRIMARY } from "../lib/config";

class LoaderHoc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };

    this.rxLoaderhandler = handleLoader.subscribe((flag) => {
      this.setState({
        loading: flag,
      });
    });
  }
  componentWillUnmount() {
    this.rxLoaderhandler && this.rxLoaderhandler.unsubscribe();
  }

  render() {
    const mobile = css`
      display: block;
      margin: 0 auto;
      border-width: 5px;
    `;
    return (
      <div>
        {" "}
        {this.state.loading && (
          <div className="loader">
            <div className="sweet-loading">
              <ClipLoader
                css={mobile}
                sizeUnit={"px"}
                size={60}
                color={PRIMARY}
                loading={this.state.loading}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default LoaderHoc;
