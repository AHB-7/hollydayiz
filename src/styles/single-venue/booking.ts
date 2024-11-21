import styled from "styled-components";
import Calendar from "react-calendar";

export const ContainerForCalendar = styled.section`
    display: flex;
    flex-direction: row;
    width: 100%;
    max-width: 45rem;
    > form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
        > div > label > p {
            font-size: 1rem;
            font-weight: bold;
            padding: 0.5rem;
        }
    }
`;
export const StyledCalendar = styled(Calendar)`
    background: ${({ theme }) => theme.colors.background};
    border-radius: 1rem;
    padding: 1rem;
    font-size: 1.2rem;
    font-weight: bold;
    .unavailable {
        background: #ff474c;
    }

    .react-calendar__tile {
        height: 100%;
        padding: 1rem;
    }

    .react-calendar__tile--now {
        background: lightblue;
    }

    .react-calendar__tile--range {
        background: green;
    }
`;
export const BookingInfo = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 0 2rem 2rem 2rem;
`;
export const PriceAndDate = styled.div`
    width: 100%;
    max-width: 45rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    > h3 {
        margin: 0 auto;
        > strong {
            color: ${({ theme }) => theme.colors.primary};
    }
`;
export const GuestNumberContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
`;
export const GuestNumber = styled.select`
    width: 100%;
    padding: 0.5rem;
    font-size: 1.2rem;
    border-radius: 0.8rem;
    border: 1px solid ${({ theme }) => theme.colors.screenBackground};
`;
export const Loging = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 45rem;
    gap: 1rem;
    margin: 2rem 0;
`;
