import "./footer.scss";

interface Props {
    className?: string
}

const Footer = ({ className }: Props) => {
    return (
        <footer className={`footer ${className}`}>
            <h2 className="footer-heading">Footer</h2>
        </footer>
    );
};

export default Footer;