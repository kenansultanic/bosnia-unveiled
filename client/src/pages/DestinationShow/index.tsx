import "./destination-show.scss";
import galleryOpenImg from "../../assets/download.jpeg";
import mainImage from "../../assets/main-section-image.jpg";

const DestinationShow = () => {
    return (
        <div className="dest-show">
            <div className="dest-show-container">
                <div className="dest-heading-section">
                    <div className="dest-heading">
                        <p className="dest-sub-heading">Picturesque waterfalls near city of Ljubuški</p>
                        <h1 className="dest-main-heading">Vodopadi <br /> Kravice</h1>
                    </div>
                    <button className="dest-cta">
                        <span className="material-symbols-outlined">
                            route
                        </span>
                        <span>Take me there</span>
                    </button>
                </div>
                <div className="dest-image-section">
                    <div className="dest-main-image">
                        <img src={mainImage} />
                        <div className="dest-gallery-open">
                            <span className="material-symbols-outlined">
                                photo_library
                            </span>
                        </div>
                    </div>
                </div>
                <div className="dest-main-section">
                    <div className="dest-main-section-wrapper">
                        <div className="dest-main-section-first-part">
                            <div className="dest-description">
                                <span className="material-symbols-outlined dest-icon">
                                    menu_book
                                </span>

                                <h2>Kravice Waterfalls: The Natural Marvel of Herzegovina</h2>

                                <span>Kravice Waterfalls, situated on the Trebižat River in the stunning Herzegovinian landscape, represent one of the most impressive natural wonders of Bosnia and Herzegovina. These beautiful waterfalls, often referred to as the "Herzegovinian Niagara," are an irresistible attraction for locals and visitors from around the world.</span>

                                <span>Kravice Waterfalls encompass a series of cascades and rapids, creating a picturesque scene that takes your breath away. Water tumbles down from a height of about 25 meters (82 feet) over the cliffs, generating a roar and mist that further enhance the sense of natural beauty and energy. During spring, when the water level of the Trebižat River is typically higher due to abundant rainfall, the waterfalls become even more impressive, creating spectacular views that are unforgettable for every visitor.</span>

                                <span>The surrounding nature further complements the experience of Kravice Waterfalls. Dense forests and greenery encircle the falls, creating a feeling of isolation and tranquility. Visitors often take the opportunity to explore the surroundings by hiking or taking boat rides on the river. There's also the option to swim in the natural pools formed beneath the waterfalls, which is particularly appealing during the warmer months.</span>

                                <span>These waterfalls are not only a natural treasure but also hold cultural significance. They are steeped in rich history and folklore, often passed down through generations. Kravice Waterfalls are also a popular destination for various events and festivals, where local culture is celebrated through song, dance, and traditional food.</span>

                                <span>For nature enthusiasts, photographers, and anyone seeking moments of escape from the hustle and bustle of daily life, Kravice Waterfalls provide a true sanctuary. Here, nature opens up in its full splendor, inviting us to connect with its beauty and power.</span>
                            </div>
                            <div className="dest-quick-info">
                                <div className="dest-quick-info-card">
                                    <span className="material-symbols-outlined dest-icon">
                                        location_on
                                    </span>
                                    <span className="dest-quick-info-card-heading">Ljubuški, Federation of Bosnia and Herzegovina</span>
                                    <span className="dest-quick-info-card-paragraph">3 km from Vitaljina, Studenci</span>
                                </div>
                                <div className="dest-quick-info-card">
                                    <span className="material-symbols-outlined dest-icon">
                                        category
                                    </span>
                                    <span className="dest-quick-info-card-heading">Categories</span>
                                    <span className="dest-quick-info-card-paragraph">
                                        <span className="dest-quick-info-card-sub-paragraph">
                                            <span className="material-symbols-outlined">
                                                nature
                                            </span>
                                            <span>Nature</span>
                                        </span>
                                        <span className="dest-quick-info-card-sub-paragraph">
                                            <span className="material-symbols-outlined">
                                                park
                                            </span>
                                            <span>Park</span>
                                        </span>
                                        <span className="dest-quick-info-card-sub-paragraph">
                                            <span className="material-symbols-outlined">
                                                tour
                                            </span>
                                            <span>Touristic place</span>
                                        </span>
                                    </span>

                                </div>
                                <div className="dest-quick-info-card">
                                    <span className="material-symbols-outlined dest-icon">
                                        partly_cloudy_day
                                    </span>
                                    <span className="dest-quick-info-card-heading">Weather today</span>
                                    <span className="dest-quick-info-card-paragraph">Expect a partly cloudy day with a temperature of 28°C and a gentle breeze. There is a 20% chance of isolated showers in the late afternoon</span>
                                </div>
                                <div className="dest-quick-info-card">
                                    <span className="material-symbols-outlined dest-icon">
                                        schedule
                                    </span>
                                    <span className="dest-quick-info-card-heading">Open until 11 PM</span>
                                    <span className="dest-quick-info-card-paragraph">Available for visit every day until 10 PM, on weekends until 11 PM</span>
                                </div>
                            </div>
                        </div>

                        <div className="dest-main-section-second-part">
                            <div className="dest-map-container">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2910.5478145133848!2d17.60552617669852!3d43.15602388444385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134b0dbd11aad181%3A0xf6bd890e2045e895!2sVodopad%20Kravica!5e0!3m2!1sbs!2sba!4v1692364988165!5m2!1sbs!2sba" allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="dest-map"></iframe>
                            </div>
                            <div className="dest-bus-schedules">
                                <span className="material-symbols-outlined dest-icon">
                                    directions_bus
                                </span>
                                <span className="dest-bus-schedules-heading">Bus schedules</span>
                                <p className="dest-bus-schedule-line"></p>
                                <p className="dest-bus-schedule-line"></p>
                                <p className="dest-bus-schedule-line"></p>
                            </div>
                        </div>

                        <div className="dest-main-section-suggested">
                            <h2 className="dest-suggested-heading">Similar places</h2>
                            <div className="dest-suggested-cards">
                                <div className="dest-suggested-card"></div>
                                <div className="dest-suggested-card"></div>
                                <div className="dest-suggested-card"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="dest-footer">
                    <h2 className="dest-footer-heading">Footer</h2>
                </div>
            </div>
        </div>
    );
};

export default DestinationShow;