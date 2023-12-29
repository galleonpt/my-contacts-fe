import styled, { css } from 'styled-components';

export const StyledButton = styled.button`
    height: 52px;
    padding: 0 16px;

    display: flex;
    align-items: center;
    justify-content: center;

    border: none;
    border-radius: 4px;
    box-shadow: 0px 4px 10px rgba(0,0,0,0.04);

    background: ${({ theme }) => theme.colors.primary.main};

    font-size: 16px;
    font-weight: bold;
    color: #fff;

    transition: background .2s ease-in;

    &:hover {
        background: ${({ theme }) => theme.colors.primary.light};
    }

    &:active {
        background: ${({ theme }) => theme.colors.primary.dark};
    }

    &:disabled {
        background: #CCC !important;
        cursor: default !important;
    }

    ${({ theme, $danger }) => $danger && css`
        background: ${theme.colors.danger.main};

        &:hover {
            background: ${theme.colors.danger.light}
         }

        &:active {
            background: ${theme.colors.danger.dark};
        }
    `}
`;
