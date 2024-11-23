import styled from "styled-components";

export const ProfileContainer = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
export const ProfileBannerContainer = styled.section`
    width: 100%;
    height: 14rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`;
export const ProfileBannerImage = styled.img`
    width: 100%;
    height: 100%;
    border-bottom-left-radius: 2rem;
    border-bottom-right-radius: 2rem;
`;
export const ProfileAvatar = styled.img`
    position: absolute;
    bottom: -3rem;
    left: 50%;
    transform: translateX(-50%);
    width: 7rem;
    height: 7rem;
    border-radius: 50%;
`;
export const ProfileInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    width: 100%;
`;
export const ProfileName = styled.h1`
    margin-top: 3rem;
    font-size: 2rem;
    margin-bottom: 1rem;
`;
export const ProfileBioContainer = styled.div`
    margin-top: 1rem;
    font-weight: 300;
    display: block;
    width: 100%;
    padding: 0.5rem;
    border: 1px solid ${(props) => props.theme.colors.text};
    border-radius: 0.5rem;
    position: relative;
    > span {
        position: absolute;
        top: 0;
        right: 0;
        padding: 0.5rem;
        > svg {
            font-size: 1.5rem;
        }
    }
    > h2 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
    }
    > p {
        word-break: break-word;
        overflow-wrap: anywhere;
        white-space: normal;
    }
`;
