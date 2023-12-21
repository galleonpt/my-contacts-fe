import styled from 'styled-components';

export const Container = styled.div`
    padding: 16px 32px;
    border-radius: 4px;

    color: #fff;
    background-color: ${({ theme }) => theme.colors.primary.main};
    box-shadow: 0px 20px 20px -16px #00000040;

    display: flex;
    justify-content: center;
    align-items: center;

    gap: 8px;

    & + & {
        margin-top: 12px;
    }
`;
