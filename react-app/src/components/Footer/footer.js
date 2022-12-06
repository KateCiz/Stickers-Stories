import "./index.css"

function Footer (){
    return (
        <footer>
            <div className="footer-div">
                <a href="https://github.com/KateCiz/Stickers-and-Stories-Project" target="blank">
                    <p className="footer-elements">GitHub</p>
                </a>
                <a href="https://github.com/KateCiz/Stickers-and-Stories-Project/wiki" target="blank">
                    <p className="footer-elements">Wiki</p>
                </a>
                <a href="/about">
                    <p className="footer-elements">About</p>
                </a>
            </div>
        </footer>
    )
};

export default Footer;
