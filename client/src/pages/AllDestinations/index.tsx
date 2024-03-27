import "./all-destinations.scss";
import { Fragment, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector, getDestinations } from "store";
import { useThunk } from "hooks/useThunk";
import DestinationCard from "components/DestinationCard";
import Footer from "components/Footer";
import LoadingScreen from "components/LoadingScreen";
import DestsSkeleton from "./DestsSkeleton";
import Button from "components/Button";
import destImg1 from "../../assets/background2.jpg";

const AllDestinations = () => {
    const destinations = useAppSelector(state => state.destinations.allDestinations);
    const [getDests, isDestsLoading, destsError] = useThunk(getDestinations);

    const [params, setParams] = useSearchParams();
    const page = Number(params.get("page"));
    const PER_PAGE = 8;

    useEffect(() => {
        getDests({ page, perPage: PER_PAGE });
    }, [page]);

    if (!destinations.results || destinations.results.length === 0) {
        return <LoadingScreen />
    }

    const renderedAllDests = destinations.results.map((dest: any) => {
        return <Fragment key={dest.id}>
            <DestinationCard
                className=""
                id={dest.id}
                image={dest.image}
                title={dest.title}
                subTitle={dest.subTitle}
                categories={dest.categories} />
        </Fragment>;
    });

    const handleNextPage = () => setParams((params: any) => {
        const nextPage = String(Number(params.get("page")) + 1);
        params.set("page", nextPage);
        return params;
    });

    const handlePrevPage = () => setParams((params: any) => {
        const nextPage = String(Number(params.get("page")) - 1);
        params.set("page", nextPage);
        return params;
    });

    return (
        <main className="all-dests">
            <div className="all-dests-container">
                <div className="all-dests-main">
                    <h1>All destinations</h1>
                    {
                        isDestsLoading ? <DestsSkeleton />
                        : <div className="all-dests-cards">{renderedAllDests}</div>
                    }
                    <div className="all-dests-pagination">
                        <Button
                            variant="secondary all-dests-button"
                            icon="navigate_before"
                            onClick={handlePrevPage}
                            disabled={!destinations.previous} />
                        <Button
                            variant="secondary all-dests-button"
                            icon="navigate_next"
                            iconAriaLabel="next page"
                            onClick={handleNextPage}
                            disabled={!destinations.next} />
                    </div>
                </div>
                <Footer />
            </div>
        </main>
    );
};

export default AllDestinations;