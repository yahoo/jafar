import styled from 'styled-components';
import { withTheme } from '@material-ui/styles';

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

export const FormListWrapper = styled.div`
  padding: 40px;
  margin: 0 auto;
  max-width: 700px;
`;
