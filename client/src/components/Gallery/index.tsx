import "./gallery.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef, Dispatch, SetStateAction } from "react";
import FocusTrap from "focus-trap-react";
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
            <Button
                variant="secondary"
                className="gallery-button-center gallery-button-next"
                onClick={() => slider?.current?.slickNext()}
                icon="arrow_forward_ios"
                iconAriaLabel="Next image">
            </Button>
            <Button
                variant="secondary"
                className="gallery-button-center gallery-button-prev"
                onClick={() => slider?.current?.slickPrev()}
                icon="arrow_back_ios"
                iconAriaLabel="Previous image">
            </Button>
            <Slider ref={slider} {...settings} className="gallery-slider">
                {renderedImages}
            </Slider>
        </>
    );
};

const Gallery = ({ setIsGalleryOpen }: GalleryProps) => {
    return (
        <FocusTrap>
            <div className="gallery">
                <Button
                    icon="close"
                    iconAriaLabel="Close gallery"
                    variant="secondary"
                    className="gallery-button-close"
                    onClick={() => setIsGalleryOpen(false)}>
                </Button>
                <SimpleSlider />
            </div>
        </FocusTrap>
    );
};

export default Gallery;