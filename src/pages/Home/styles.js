import styled from 'styled-components';

export const Container = styled.div`
    margin-top: 32px;
    position: relative;
`;

export const InputSearchContainer = styled.div`
    width: 100%;

    input {
        width: 100%;
        background: #fff;
        border: none;
        border-radius: 25px;
        height: 50px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
        outline: 0;
        padding: 0 16px;

        &::placeholder {
            color: #BCBCBC
        }
    }
`;

export const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: ${({ hasError }) => (hasError ? 'flex-end' : 'space-between')};
    margin-top: 32px;
    border-bottom: 2px solid ${({ theme }) => theme.colors.grey[100]};
    padding-bottom: 16px;


    strong {
        font-size: 24px;
    }

    a {
        color: ${({ theme }) => theme.colors.primary.main};
        text-decoration: none;
        font-weight: bold;

        padding: 8px 16px;
        border: 2px solid ${({ theme }) => theme.colors.primary.main};
        border-radius: 4px;
        transition: all .2s ease-in;

        &:hover {
            background: ${({ theme }) => theme.colors.primary.main};
            color: #fff
        }
    }
`;

export const ListHeader = styled.header`
    margin-top: 24px;
    margin-bottom: 8px;

    button {
        background: transparent;
        border: none;
        display: flex;
        align-items: center;

        span {
            margin-right: 8px;
            font-weight: bold;
            color: ${({ theme }) => theme.colors.primary.main};
        }

        img {
            rotate: ${({ orderBy }) => (orderBy === 'asc' ? '180deg' : '0deg')};
            transition: rotate .2s ease-in;
        }
    }

`;

export const Card = styled.div`
    background: #fff;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
    padding: 16px;
    border-radius: 4px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    & + & {
        margin-top: 16px
    }

    .info {
        .contact-name {
            display: flex;
            align-items: center;

            small {
                background: ${({ theme }) => theme.colors.primary.lighter};
                color: ${({ theme }) => theme.colors.primary.main};
                font-weight: bold;
                text-transform: uppercase;
                border-radius: 4px;
                padding: 4px;
                margin-left: 8px
            }
        }
    }

    span {
        display: block;
        font-size: 14px;
        color: ${({ theme }) => theme.colors.grey[200]};
    }

    .actions {
        display: flex;
        align-items: center;
        gap: 8px;

        button {
            background: transparent;
            border: none;
        }
    }
`;

export const ErrorContainer = styled.div`
    margin-top: 16px;
    display: flex;
    align-items: center;
    gap: 24px;

    .details {
        strong {
            display: block;
            font-size: 22px;
            color: ${({ theme }) => theme.colors.danger.main};
            margin-bottom: 8px
        }
    }
`;
