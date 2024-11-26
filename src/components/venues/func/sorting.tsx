import { useState } from "react";
import {
    MdFilterList,
    MdFilterListOff,
    SortingContainer,
    SortOptions,
} from "../../../styles";

interface SortingComponentProps {
    onSortChange: (sort: string, sortOrder: string) => void;
}

export function SortingComponent({ onSortChange }: SortingComponentProps) {
    const [sort, setSort] = useState<string>("created");
    const [sortOrder, setSortOrder] = useState<string>("desc");
    const [sortCompActive, setSortCompActive] = useState<boolean>(false);

    const handleSortChange = (newSort: string) => {
        setSort(newSort);
        onSortChange(newSort, sortOrder);
    };

    const toggleSortOrder = () => {
        const newOrder = sortOrder === "asc" ? "desc" : "asc";
        setSortOrder(newOrder);
        onSortChange(sort, newOrder);
    };

    return (
        <SortingContainer>
            <button
                title="filter"
                onClick={() => setSortCompActive(!sortCompActive)}
            >
                {sortCompActive ? <MdFilterList /> : <MdFilterList />}
            </button>

            {sortCompActive && (
                <SortOptions>
                    <label htmlFor="sort">Sort By:</label>
                    <select
                        id="sort"
                        value={sort}
                        onChange={(e) => handleSortChange(e.target.value)}
                    >
                        <option value="created">Created</option>
                        <option value="name">Name</option>
                        <option value="price">Price</option>
                        <option value="rating">Rating</option>
                    </select>

                    <button onClick={toggleSortOrder}>
                        Sort Order:{" "}
                        {sortOrder === "asc" ? "Ascending" : "Descending"}
                    </button>
                </SortOptions>
            )}
        </SortingContainer>
    );
}
