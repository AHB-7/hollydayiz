/**
 * Stars is a reusable component that visually displays a star rating out of 5.
 * It renders active (gold) and inactive (light grey) stars based on the provided rating.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {number} props.rating - The rating to display, between 0 and 5. Ratings are clamped to this range.
 *
 * @example
 * // Example usage:
 * <Stars rating={4.5} />
 */

import styled from "styled-components";
import { StarsProps } from "../../types/global";
import { StarsContainer, FaStar } from "../../styles/index";

const Star = styled(FaStar)`
    &.active {
        fill: gold;
    }

    &.inactive {
        fill: lightgrey;
    }

    font-size: 2rem;
`;

export function Stars({ rating }: StarsProps) {
    const safeRating = Math.max(0, Math.min(Math.floor(rating), 5));

    return (
        <StarsContainer>
            {Array.from({ length: 5 }).map((_, index) => (
                <Star
                    key={index}
                    className={index < safeRating ? "active" : "inactive"}
                />
            ))}
        </StarsContainer>
    );
}
