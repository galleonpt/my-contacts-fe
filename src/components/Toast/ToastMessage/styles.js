import styled, { css, keyframes } from 'styled-components';

const messageIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(100px);
    }

    to {
        opacity: 1;
        transform: translateY(0px);
    }
`;

const messageOut = keyframes`
    from {
        opacity: 1;
        transform: translateY(0px);
    }

    to {
        opacity: 0;
        transform: translateY(100px);
    }
`;

const containerVariants = {
  default: css`
        background-color: ${({ theme }) => theme.colors.primary.main};
    `,
  success: css`
        background-color: ${({ theme }) => theme.colors.success.main};
    `,
  danger: css`
        background-color: ${({ theme }) => theme.colors.danger.main};
    `,
};

export const Container = styled.div`
    padding: 16px 32px;
    border-radius: 4px;
    cursor: pointer;

    color: #fff;

    box-shadow: 0px 20px 20px -16px #00000040;

    ${({ type }) => containerVariants[type] || containerVariants.default};

    display: flex;
    justify-content: center;
    align-items: center;

    gap: 8px;

    animation: ${messageIn} .3s;

    ${({ isLeaving }) => isLeaving && css`animation: ${messageOut} 0.2s;`}

    & + & {
        margin-top: 12px;
    }
`;
