import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
`;

const scaleIn = keyframes`
    from { transform: scale(0); }
    to { transform: scale(1); }
`;

export const Overlay = styled.div`
    width: 100%;
    height: 100%;

    position: fixed;
    top: 0;
    left: 0;

    background: rgba(0, 0, 0, .6);
    backdrop-filter: blur(5px);

    display: flex;
    align-items: center;
    justify-content: center;

    animation: ${fadeIn} 0.3s;

`;

export const Container = styled.div`
    width: 100%;
    max-width: 450px;
    padding: 24px;;

    border-radius: 4px;

    background: #fff;
    box-shadow: rgba(0, 0, 0, 0.04);

    animation: ${scaleIn} 0.3s;

    > h1 {
        font-size: 22px;
        color: ${({ theme, danger }) => (danger ? theme.colors.danger.main : theme.colors.grey[900])}
    }

    .body {
        margin-top: 32px;
    }
`;

export const Footer = styled.footer`
    margin-top: 32px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 24px;

    .cancel_btn {
        background: transparent;
        border: none;
        font-size: 16px;
        color: ${({ theme }) => theme.colors.grey[200]};

        &:disabled {
            cursor: not-allowed;
        }
    }
`;
