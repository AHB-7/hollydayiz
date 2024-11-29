/**
 * SortingComponent allows users to select a sorting field and order for data.
 * It manages sorting options and triggers a callback with the selected sorting parameters.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {(sort: string, sortOrder: string) => void} props.onSortChange - Callback function triggered when sorting is applied.
 *
 * @example
 * <SortingComponent
 *   onSortChange={(sort, sortOrder) => console.log("Sort:", sort, "Order:", sortOrder)}
 * />
 */

import { useState } from "react";
import {
    MdFilterList,
    SortButton,
    SortingContainer,
    SortOptions,
    VenueBookingsButton,
} from "../../../styles";
import { SortingComponentProps } from "../../../types/global";

export function SortingComponent({
    onSortChange,
    defaultSort = "created",
    defaultSortOrder = "desc",
}: SortingComponentProps) {
    const [sort, setSort] = useState<"created" | "name" | "price" | "rating">(
        defaultSort
    );
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">(
        defaultSortOrder
    );
    const [isSortingVisible, setIsSortingVisible] = useState<boolean>(false);

    const [tempSort, setTempSort] = useState<
        "created" | "name" | "price" | "rating"
    >(sort);
    const [tempSortOrder, setTempSortOrder] = useState<"asc" | "desc">(
        sortOrder
    );

    const handleSortChange = (
        newSort: "created" | "name" | "price" | "rating"
    ) => {
        setTempSort(newSort);
    };

    const handleSortOrderChange = (order: "asc" | "desc") => {
        setTempSortOrder(order);
    };

    const handleDone = () => {
        setSort(tempSort);
        setSortOrder(tempSortOrder);

        onSortChange(tempSort, tempSortOrder);

        setIsSortingVisible(false);
    };

    return (
        <SortingContainer>
            <SortButton
                title="Toggle sorting options"
                onClick={() => setIsSortingVisible(!isSortingVisible)}
            >
                <MdFilterList />
            </SortButton>

            {isSortingVisible && (
                <SortOptions>
                    <label htmlFor="sort">Sort By:</label>
                    <select
                        id="sort"
                        value={tempSort}
                        onChange={(e) =>
                            handleSortChange(
                                e.target.value as
                                    | "created"
                                    | "name"
                                    | "price"
                                    | "rating"
                            )
                        }
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
                                    handleSortOrderChange(
                                        e.target.value as "asc" | "desc"
                                    )
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
                                    handleSortOrderChange(
                                        e.target.value as "asc" | "desc"
                                    )
                                }
                            />
                            Descending
                        </label>
                    </fieldset>

                    <VenueBookingsButton
                        title="Apply sorting"
                        onClick={handleDone}
                    >
                        Done
                    </VenueBookingsButton>
                </SortOptions>
            )}
        </SortingContainer>
    );
}
