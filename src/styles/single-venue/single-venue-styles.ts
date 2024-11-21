import styled from "styled-components";

export const MainContainer = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 4rem;
    gap: 1rem;
`;

export const CarouselComponent = styled.div`
    width: 100%;
    max-width: 45rem;
    height: 35rem;
    position: relative;
    padding: 0 0.5rem;
    @media screen and (${({ theme }) => theme.breakpoints.sm}) {
        height: 25rem;
    }
    .slick-list {
        width: 100%;
        max-width: 45rem;
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
        max-width: 45rem;
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
export const RatingContainer = styled.div`
    width: 100%;
    max-width: 45rem;
    position: absolute;
    bottom: 0;
`;
export const VenueInfo = styled.div`
    padding: 0 0.5rem;
    max-width: 45rem;
    width: 100%;
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
`;
export const VenuePrice = styled.p`
    font-size: 1.4rem;
`;
export const Row = styled.div`
    display: flex;
    padding: 0 1rem;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
    align-items: end;
    width: 100%;
    max-width: 45rem;
    padding: 1.3rem 0.5rem;
    > div > h2 {
        font-size: 1.4rem;
        margin-bottom: 0.2rem;
    }
    :last-child {
        display: flex;
        align-items: end;
        gap: 0.5rem;
        margin-left: auto;
    }
    > div p {
        font-weight: bold;
        margin-left: auto;
    }
    > div svg {
        font-size: 1.2rem;
    }
`;
export const MetaInfo = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    text-align: start;
    width: 100%;
    max-width: 45rem;
    padding: 0 0.5rem;
    @media (${({ theme }) => theme.breakpoints.md}) {
        grid-template-columns: repeat(1, 1fr);
    }
`;
export const MetaTitle = styled.div`
    width: 100%;
    max-width: 45rem;
    padding: 0 0.5rem;
    > h3 {
        font-size: 1.2rem;
    }
`;
export const MetaInfoItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0.5rem;
    gap: 0.5rem;
    font-size: 1.2rem;
    border-radius: 1rem;
    height: 5rem;
    border: 1px solid ${({ theme }) => theme.colors.screenBackground};
    > span {
        text-align: center;
        font-size: 1rem;
        color: ${({ theme }) => theme.colors.text};
    }
    > svg {
        font-size: 3rem;
        fill: ${({ theme }) => theme.colors.text};
`;
