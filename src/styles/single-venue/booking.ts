import styled from "styled-components";
import Calendar from "react-calendar";

export const ContainerForCalendar = styled.section`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    width: 100%;
    > form {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
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
export const PriceAndDate = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
export const GuestNumber = styled.input`
    width: 100%;
    max-width: 45rem;
    padding: 0.5rem;
    font-size: 1.2rem;
    border-radius: 0.8rem;
    border: 1px solid ${({ theme }) => theme.colors.screenBackground};
`;
