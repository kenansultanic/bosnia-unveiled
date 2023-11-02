import "./footer.scss";
import miniLogo from "../../assets/bhwanderlust-mini.png";

interface Props {
    className?: string
}

const Footer = ({ className }: Props) => {
    return (
        <footer className={`footer ${className}`}>
            <div className="footer-logo">
                <img src={miniLogo} />
            </div>
            <div className="hr"></div>
            <section className="footer-section">
                <div className="footer-about">
                    <div>
                        <span className="material-symbols-outlined">
                            info
                        </span>
                    </div>
                    <h2 className="footer-heading">About Us</h2>
                    <p className="footer-about-paragraph">We are three students who wanted to show the world how beautiful our homeland is.</p>
                </div>
                <div className="footer-contact">
                    <div>
                        <span className="material-symbols-outlined">
                            alternate_email
                        </span>
                    </div>
                    <h2 className="footer-heading">Contact Us</h2>
                    <div>
                        <div className="footer-email">
                            <div>Admira</div>
                            <div>admira@gmail.com</div>
                        </div>
                        <div className="footer-email">
                            <div>Kenan</div>
                            <div>keno@gmail.com</div>
                        </div>
                        <div className="footer-email">
                            <div>Demir</div>
                            <div>pasalic.dev@gmail.com</div>
                        </div>
                    </div>
                </div>
            </section>
        </footer>
    );
};

export default Footer;