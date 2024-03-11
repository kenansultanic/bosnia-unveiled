import "./all-destinations.scss";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector, getDestinations } from "store";
import { useThunk } from "hooks/useThunk";
import DestinationCard from "components/DestinationCard";
import Footer from "components/Footer";
import destImg1 from "../../assets/background2.jpg";

const AllDestinations = () => {
    const destinations = useAppSelector(state => state.destinations.allDestinations);
    const [getDests, isDestsLoading, destsError] = useThunk(getDestinations);

    useEffect(() => {
        getDests();
    }, []);
    console.log(destinations)

    const renderedAllDests = destinations.map(dest => {
        return <DestinationCard
            className=""
            id={dest.id}
            image={dest.image}
            title={dest.title}
            subTitle={dest.subTitle}
            categories={dest.categories} />;
    });

    return (
        <main className="all-dests">
            <div className="all-dests-container">
                <div className="all-dests-cards">{renderedAllDests}</div>
                <Footer />
            </div>
        </main>
    );
};

export default AllDestinations;