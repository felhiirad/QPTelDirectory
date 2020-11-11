import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { colorStack } from '../constants/colors';

interface IGlobalLoaderProps {
    isLoading: boolean;
}

const sideToSide = keyframes`
    0%, 100% {
        transform: translateX(-50%);
    }

    50% {
        transform: translateX(150%);
    }
`;

const Loader = styled.div`
    height: 6px;
    margin-top: 1.5rem;
    overflow: hidden;
    position: relative;
    width: 120px;
    border-radius: 2px;
`;

const Bar = styled.div`
    animation: ${sideToSide} 2s ease-in-out infinite;
    background: linear-gradient(to right, ${colorStack.logoGreen} 0%, ${colorStack.logoBleu} 100%);
    position: absolute;
    height: 100%;
    width: 50%;
    border-radius: 2px;
`;

const Wrapper = styled.div`
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: start;
    flex-direction: column;
    background: ${colorStack.white};
    z-index: 2147484000; /* because intercom's z-index is 2147483000... */
    transition: all 300ms;
    opacity: 1;
    visibility: visible;

    img {
        width: 90px;
    }
`;

export class GlobalLoader extends React.Component<IGlobalLoaderProps, {}> {

  public render() {
    const { isLoading, children } = this.props;
    return (
      isLoading ? <Wrapper>
        <img src={require('../assets/Qatar-Petroleum-Vector-Logo.png')} />
        <Loader>
          <Bar />
        </Loader>
      </Wrapper> : children);
  }
}
