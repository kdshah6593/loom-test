import React from 'react';
import { linkReplace } from '@loomhq/loom-embed';


const LOOM_LINK = "https://www.loom.com/share/346d88ccccad486cb09079edf8a492a2";
const LINK_SELECTOR = '.loom-video'
const LINK_REPLACED_CLASS = 'lo-link-replaced';

class Video extends React.Component {
    state = {
        fetching: false
    }

    onLinkReplace = async () => {
        if (this.state.fetching) { return; }

        try {
            this.setState({ fetching: true });
            
            await linkReplace(LINK_SELECTOR);

            this.setState({ fetching: false })

        } catch {
            this.setState({ fetching: false });
        }
    }

    onResetClick = () => {
        const linkNode = document.querySelector(LINK_SELECTOR);

        linkNode.className = linkNode.className.replace(LINK_REPLACED_CLASS, '');

        const videoNode = document.querySelector('.lo-emb-vid');

        if (videoNode) {
            videoNode.remove();
          }
    }

    render() {
        const { fetching } = this.state;
        return (
            <div>
                <p>VIDEO HARD CODED IN TO THE PAGE</p>
                <div style = {{position: 'relative', paddingBottom: "25%", height: "0"}}><iframe title="test-video" src="https://www.loom.com/embed/346d88ccccad486cb09079edf8a492a2" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style={{position: "absolute", top: 0, left: "32.5%", right: "25%", width: "640px", height: "360px"}}></iframe></div>
                <br></br>
                <br></br>
                <p>ANOTHER WAY TO DO THE VIDEO, OFFERS DYNAMIC OPTION</p>
                <a className="loom-video" href={LOOM_LINK}>Loom Video Link</a>

                <div className="button-container">
                    <div
                        className={`button-base action-button ${fetching ? "disabled" : ""}`}
                        onClick={this.onLinkReplace}
                    >
                        { fetching ? "Expanding..." : "Expand Links" }
                    </div>
                    <div className="button-base reset-button" onClick={this.onResetClick}>
                        Reset
                    </div>
                </div>
            </div>
        )
    }
}


export default Video;