import styled from 'styled-components';

export const Container = styled.div`
    margin-top: 16px;
    display: flex;
    gap: 24px;
    align-items: flex-start;

    span {
        color: ${({ theme }) => theme.colors.grey[200]};
        word-break: break-word;
    }
`;
