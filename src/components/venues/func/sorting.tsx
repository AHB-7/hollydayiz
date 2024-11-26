import { useState } from "react";
import {
    MdFilterList,
    SortingContainer,
    SortOptions,
    VenueBookingsButton,
} from "../../../styles";

interface SortingComponentProps {
    onSortChange: (sort: string, sortOrder: string) => void;
}

export function SortingComponent({ onSortChange }: SortingComponentProps) {
    const [sort, setSort] = useState<string>("created");
    const [sortOrder, setSortOrder] = useState<string>("desc");
    const [sortCompActive, setSortCompActive] = useState<boolean>(false);

    const [tempSort, setTempSort] = useState<string>(sort);
    const [tempSortOrder, setTempSortOrder] = useState<string>(sortOrder);

    const handleSortChange = (newSort: string) => {
        setTempSort(newSort);
    };

    const handleSortOrderChange = (order: string) => {
        setTempSortOrder(order);
    };

    const handleDone = () => {
        setSort(tempSort);
        setSortOrder(tempSortOrder);

        onSortChange(tempSort, tempSortOrder);

        setSortCompActive(false);
    };

    return (
        <SortingContainer>
            <button
                title="filter"
                onClick={() => setSortCompActive(!sortCompActive)}
            >
                <MdFilterList />
            </button>

            {sortCompActive && (
                <SortOptions>
                    <label htmlFor="sort">Sort By:</label>
                    <select
                        id="sort"
                        value={tempSort}
                        onChange={(e) => handleSortChange(e.target.value)}
                    >
                        <option value="created">Created</option>
                        <option value="name">Name</option>
                        <option value="price">Price</option>
                        <option value="rating">Rating</option>
                    </select>

                    <fieldset>
                        <legend>Sort Order:</legend>
                        <label>
                            <input
                                type="radio"
                                name="sortOrder"
                                value="asc"
                                checked={tempSortOrder === "asc"}
                                onChange={(e) =>
                                    handleSortOrderChange(e.target.value)
                                }
                            />
                            Ascending
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="sortOrder"
                                value="desc"
                                checked={tempSortOrder === "desc"}
                                onChange={(e) =>
                                    handleSortOrderChange(e.target.value)
                                }
                            />
                            Descending
                        </label>
                    </fieldset>

                    <VenueBookingsButton
                        title="Click to confirm sorting"
                        onClick={handleDone}
                    >
                        Done
                    </VenueBookingsButton>
                </SortOptions>
            )}
        </SortingContainer>
    );
}
