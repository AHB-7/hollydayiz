import styled from "styled-components";

export const MainContainer = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 4rem;
    gap: 2rem;
`;

export const CarouselComponent = styled.div`
    width: 100%;
    max-width: 55rem;
    height: 35rem;
    padding: 0 0.5rem;
    @media screen and (${({ theme }) => theme.breakpoints.sm}) {
        height: 25rem;
    }
    .slick-list {
        width: 100%;
        max-width: 55rem;
        height: 35rem;
        overflow: hidden;
        @media screen and (${({ theme }) => theme.breakpoints.sm}) {
            height: 25rem;
        }
    }

    .slick-slide {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 35rem;
        @media screen and (${({ theme }) => theme.breakpoints.sm}) {
            height: 25rem;
        }
    }

    img {
        width: 100%;
        max-width: 55rem;
        height: 35rem;
        object-fit: cover;
        border-radius: 1.2rem;
        @media screen and (${({ theme }) => theme.breakpoints.sm}) {
            height: 25rem;
        }
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
        left: 14px;
    }

    .slick-next {
        right: 14px;
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
    padding: 0 0.5rem;
    max-width: 55rem;
`;
export const VenueTitle = styled.h1`
    font-size: 2rem;
    margin-bottom: 1rem;
`;
export const VenueDescription = styled.p`
    font-size: 1rem;
    margin-bottom: 1rem;
    line-height: 1.4;
    text-align: justify;
    padding: 0 0.5rem;
`;
export const VenuePrice = styled.p`
    font-size: 1.4rem;
`;
export const Row = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 55rem;
    padding: 0 1rem;
`;
