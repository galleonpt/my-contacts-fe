import styled from 'styled-components';

export const Overlay = styled.div`
    width: 100%;
    height: 100%;

    position: absolute;
    top: 0;
    left: 0;

    background: rgba(0, 0, 0, .6);
    backdrop-filter: blur(5px);

    display: flex;
    align-items: center;
    justify-content: center;

`;

export const Container = styled.div`
    width: 100%;
    max-width: 450px;
    padding: 24px;;

    border-radius: 4px;

    background: #fff;
    box-shadow: rgba(0, 0, 0, 0.04);

    h1 {
        font-size: 22px;
    }

    p {
        margin-top: 8px;
    }
`;

export const Footer = styled.footer`
    margin-top: 32px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;

    .cancel_btn {
        background: transparent;
        border: none;
        font-size: 16px;
        color: ${({ theme }) => theme.colors.grey[200]}
    }
`;
