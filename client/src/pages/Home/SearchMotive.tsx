import "./search.scss";
import searchMotiveImg from "../../assets/undraw_my_current_location_re_whmt.svg";
import { useAppSelector } from "store";

const SearchMotive = () => {
    const isSearched = useAppSelector(state => state.destinations.isSearched);

    return (
        <div className="search-motive">
            <div className="search-cards-placeholder">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <img src={searchMotiveImg} alt="" />
            <h2>
                {
                    isSearched ?
                        "Empty Search!"
                        :
                        "Search below!"
                }
            </h2>
            <p>
                {
                    isSearched ?
                        "We haven't found any destinations based on your parameters, you can always search again"
                        :
                        "Looks like you haven't searched for any destinations, feel free to explore"
                }
            </p>
        </div>
    );
};

export default SearchMotive;