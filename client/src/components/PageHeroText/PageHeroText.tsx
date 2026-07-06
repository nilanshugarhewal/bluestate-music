import { useLocation } from "react-router-dom";
import "./PageHeroText.scss";

const PageHeroText = () => {
    const { pathname } = useLocation();

    const homeText = (
        <>
            BlueState is a <span className="page-hero-text-react">pop, r&b & hip hop<br />music producer</span> from India.
        </>
    );
    
    const trackText = (
        <>
            All of my beats are available for <span className="page-hero-text-react">leasing,<br />licensing and exclusive rights</span>.
        </>
    );

    const isHome = pathname === "/home" || pathname === "/";
    const isTracks = pathname === "/tracks";

    if (!isHome && !isTracks) return null;

    return (
        <div className="page-hero-text">
            {isHome ? homeText : trackText}
        </div>
    );
};

export default PageHeroText;