import img1 from "./assets/background1.jpg";
import img2 from "./assets/image2.jpg";
import img3 from "./assets/mana5280-p2i2s0gU2iU-unsplash.jpg";
import img4 from "./assets/background4.jpg";
import img5 from "./assets/background5.jpg";

interface Image {
    id: number,
    src: string
}

const images: Image[] = [
    {
        id: 1,
        src: img1
    },
    {
        id: 2,
        src: img2
    },
    {
        id: 3,
        src: img3
    },
    {
        id: 4,
        src: img4
    },
    {
        id: 5,
        src: img5
    }
];

export default images;