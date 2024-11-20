import styled from "styled-components";

export const MainContainer = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 4rem;
`;
export const FirstRow = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 1.4rem;
`;
export const CarouselComponent = styled.div`
    width: 100%;
    max-width: 45rem;
    height: 35rem;

    .slick-list {
        width: 45rem;
        height: 35rem;
        overflow: hidden;
    }

    .slick-slide {
        display: flex !important;
        align-items: center;
        justify-content: center;
        height: 35rem;
    }

    img {
        width: 45rem;
        height: 35rem;
        object-fit: cover;
        border-radius: 1.8rem;
    }

    .slick-arrow {
        font-size: 0;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.4);
        width: 4rem;
        height: 4rem;
        z-index: 3;
        transition: all 0.3s ease;
        &:hover {
            background-color: rgba(0, 0, 0, 0.8);
        }
    }

    .slick-prev {
        left: 0px;
    }

    .slick-next {
        right: 0px;
    }

    .slick-dots li button:before {
        font-size: 0.8rem;
        color: #888;
        opacity: 1;
    }

    .slick-dots li.slick-active button:before {
        color: #000;
    }
`;

export const VenueInfo = styled.div`
    margin-top: 1rem;
`;
export const VenueTitle = styled.h1`
    font-size: 2rem;
    margin-bottom: 1rem;
`;
export const VenueDescription = styled.p`
    font-size: 1.2rem;
    margin-bottom: 1rem;
`;
