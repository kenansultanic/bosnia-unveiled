import "./gallery.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef, Dispatch, SetStateAction } from "react";
import Slider from "react-slick";
import Button from "components/Button";
import images from "images";

interface GalleryProps {
    isGalleryOpen: boolean,
    setIsGalleryOpen: Dispatch<SetStateAction<boolean>>
}

function SimpleSlider() {
    const slider = useRef<Slider>(null);

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const renderedImages = images.map(img => (
        <div key={img.id}>
            <div className="gallery-img-container">
                <img src={img.src} alt="#" className="gallery-img" />
            </div>
        </div>
    ));

    return (
        <>
            <Button className="gallery-arrow gallery-arrow-next" onClick={() => slider?.current?.slickNext()}>
                <span className="gallery-arrow-text">Next</span>
                <span className="gallery-arrow-icon material-symbols-outlined">
                    arrow_forward_ios
                </span>
            </Button>
            <Button className="gallery-arrow gallery-arrow-prev" onClick={() => slider?.current?.slickPrev()}>
                <span className="gallery-arrow-icon material-symbols-outlined">
                    arrow_back_ios
                </span>
                <span className="gallery-arrow-text">Prev</span>
            </Button>
            <Slider ref={slider} {...settings} className="gallery-slider">
                {renderedImages}
            </Slider>
        </>
    );
};

const Gallery = ({ isGalleryOpen, setIsGalleryOpen }: GalleryProps) => {
    return (
        <div className="gallery">
            <Button
                icon="close"
                iconAriaLabel="Close gallery"
                className="gallery-close"
                onClick={() => setIsGalleryOpen(false)}
            >Close</Button>
            <SimpleSlider />
        </div>
    );
};

export default Gallery;