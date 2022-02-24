import React from 'react'
import '../css/Footer.css'

function Footer(props) {
    const { backColor } = props
    return (
        <>
        {/* <hr /> */}
        <div className="footer" style={{ backgroundColor: backColor }}>
            {/* {<hr />} */}
            <span>Got a question? Call 000-800-040-1843</span>
            <div className="footer__links">
                <a className="grid-item" href="https://help.netflix.com/en/node/412">FAQ</a>
                <a className="grid-item" href="https://help.netflix.com/en/node/412">Help centre</a>
                <a className="grid-item" href="https://help.netflix.com/en/node/412">Terms Of Use</a>
                <a className="grid-item" href="https://help.netflix.com/en/node/412">Contact us</a>
                <a className="grid-item" href="https://help.netflix.com/en/node/412">Only on Netflix</a>
            </div>

        </div>
        </>
    )
}

export default Footer
