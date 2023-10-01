import "./destination-show.scss";
import { useGetDestinationQuery } from "store/destinationsApi";
import { useSearchParams } from "react-router-dom";
import mainImage from "../../assets/main-section-image.jpg";
import destImg1 from "../../assets/background2.jpg";
import destImg2 from "../../assets/background4.jpg";
import destImg3 from "../../assets/background5.jpg";
import Button from "components/Button";
import ContentCard from "components/ContentCard";
import DestinationCard from "components/DestinationCard";
import Footer from "components/Footer";
import Gallery from "components/Gallery";

const DestinationShow = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    //const { data, error, isLoading } = useGetDestinationQuery(2);

    return (
        <main className="dest-show">
            <Gallery />
            <div className="dest-show-container">
                <header className="dest-heading">
                    <p className="dest-sub-heading">Picturesque waterfalls near city of Ljubuški</p>
                    <h1 className="dest-main-heading">Vodopadi Kravice</h1>

                    <Button className="primary dest-main-cta" icon="route" iconAriaHidden={true}>Take me there</Button>
                </header>
                <section className="dest-image-section">
                    <div className="dest-main-image">
                        <img src={mainImage} alt="Alt provided by API" />
                        <Button
                            onClick={() => console.log("hehe")}
                            className="dest-gallery-open" icon="photo_library" iconAriaLabel="Open gallery"></Button>
                    </div>
                </section>
                <section className="dest-main-section">
                    <div className="dest-main-section-wrapper">
                        <section className="dest-main-section-right-side">
                            <div className="dest-quick-info">
                                <ContentCard
                                    icon="location_on"
                                    iconAriaLabel="Location"
                                    heading="Ljubuški, Federation of Bosnia and Herzegovina">
                                    3 km from Vitaljina, Studenci
                                </ContentCard>
                                <ContentCard
                                    icon="category"
                                    iconAriaLabel="Categories"
                                    heading="Categories">
                                    <div className="content-card-category">
                                        <span className="material-symbols-outlined" aria-hidden="true">
                                            nature
                                        </span>
                                        <span>Nature</span>
                                    </div>
                                    <div className="content-card-category">
                                        <span className="material-symbols-outlined" aria-hidden="true">
                                            park
                                        </span>
                                        <span>Park</span>
                                    </div>
                                    <div className="content-card-category">
                                        <span className="material-symbols-outlined" aria-hidden="true">
                                            tour
                                        </span>
                                        <span>Touristic place</span>
                                    </div>
                                </ContentCard>
                                <ContentCard icon="partly_cloudy_day" iconAriaLabel="Weather today" heading="Partly Cloudy">
                                    Expect a partly cloudy day with a temperature of 28°C and a gentle breeze. There is a 20% chance of isolated showers in the late afternoon
                                </ContentCard>
                                <ContentCard icon="schedule" iconAriaLabel="Working hours" heading="Open until 11 PM">
                                    Available for visit every day until 10 PM, on weekends until 11 PM
                                </ContentCard>
                            </div>
                            <ContentCard className="dest-bus-schedules" icon="directions_bus" iconAriaLabel="" heading="Bus schedules for today">

                            </ContentCard>
                        </section>

                        <section className="dest-main-section-left-side">
                            <ContentCard className="dest-description" icon="menu_book" iconAriaLabel="About destination" heading="Kravice Waterfalls: The Natural Marvel of Herzegovina">
                                <p>Kravice Waterfalls, situated on the Trebižat River in the stunning Herzegovinian landscape, represent one of the most impressive natural wonders of Bosnia and Herzegovina. These beautiful waterfalls, often referred to as the "Herzegovinian Niagara," are an irresistible attraction for locals and visitors from around the world.</p>

                                <p>Kravice Waterfalls encompass a series of cascades and rapids, creating a picturesque scene that takes your breath away. Water tumbles down from a height of about 25 meters (82 feet) over the cliffs, generating a roar and mist that further enhance the sense of natural beauty and energy. During spring, when the water level of the Trebižat River is typically higher due to abundant rainfall, the waterfalls become even more impressive, creating spectacular views that are unforgettable for every visitor.</p>

                                <p>The surrounding nature further complements the experience of Kravice Waterfalls. Dense forests and greenery encircle the falls, creating a feeling of isolation and tranquility. Visitors often take the opportunity to explore the surroundings by hiking or taking boat rides on the river. There's also the option to swim in the natural pools formed beneath the waterfalls, which is particularly appealing during the warmer months.</p>

                                <p>These waterfalls are not only a natural treasure but also hold cultural significance. They are steeped in rich history and folklore, often passed down through generations. Kravice Waterfalls are also a popular destination for various events and festivals, where local culture is celebrated through song, dance, and traditional food.</p>

                                <p>For nature enthusiasts, photographers, and anyone seeking moments of escape from the hustle and bustle of daily life, Kravice Waterfalls provide a true sanctuary. Here, nature opens up in its full splendor, inviting us to connect with its beauty and power.</p>

                            </ContentCard>
                            <div className="dest-map-container">
                                <iframe
                                    title="Destination pinned on Google Maps"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2910.5478145133848!2d17.60552617669852!3d43.15602388444385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134b0dbd11aad181%3A0xf6bd890e2045e895!2sVodopad%20Kravica!5e0!3m2!1sbs!2sba!4v1692364988165!5m2!1sbs!2sba"
                                    allowFullScreen={false}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="dest-map">
                                </iframe>
                                {/* <a href="#" target="_blank">Link to Google Maps</a> */}
                                {/* Link above is for users who cannot interact with map */}
                            </div>
                        </section>

                        <section className="dest-main-section-suggested">
                            <h2 className="dest-suggested-heading">Similar places</h2>
                            <section className="dest-suggested-cards">
                                <DestinationCard
                                    className="dest-suggested-card"
                                    orientation="horizontal"
                                    image={destImg1} />
                                <DestinationCard
                                    className="dest-suggested-card"
                                    orientation="horizontal"
                                    image={destImg2} />
                                <DestinationCard
                                    className="dest-suggested-card"
                                    orientation="horizontal"
                                    image={destImg3} />
                            </section>
                        </section>
                    </div>
                </section>
                <Footer className="dest-footer" />
            </div>
        </main>
    );
};

export default DestinationShow;