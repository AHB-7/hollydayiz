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
