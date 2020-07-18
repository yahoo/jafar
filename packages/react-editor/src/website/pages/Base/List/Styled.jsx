import styled from 'styled-components';
import { withTheme } from '@material-ui/styles';

export const Wrapper = styled.div`
  padding: 40px;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const Title = styled.h1`
  font-weight: 500;
`;

export const BooleanWrapper = styled.div`
  position: relative;
  top: 7px;
`;

export const Link = withTheme(styled.a`
  flex: 1;
  text-decoration: none;
  cursor: pointer;
  color: ${props => props.theme.palette.secondary.main};
  &:hover {
    text-decoration: underline;
  }
`);
