import styled from 'styled-components';

export const Container = styled.div`
    margin-top: 32px;
    position: relative;
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

export const SearchNotFoundContainer = styled.div`
    margin-top: 16px;
    display: flex;
    gap: 24px;
    align-items: flex-start;

    span {
        color: ${({ theme }) => theme.colors.grey[200]};
        word-break: break-word;
    }
`;
