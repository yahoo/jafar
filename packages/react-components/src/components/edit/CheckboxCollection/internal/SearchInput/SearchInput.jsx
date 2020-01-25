import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import { noop } from 'lodash';

const styles = {
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
};

class SearchInput extends React.PureComponent {
  static propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    onSearch: PropTypes.func,
  };

  static defaultProps = {
    value: '',
    placeholder: undefined,
    disabled: false,
    onChange: noop,
    onSearch: noop,
  };

  onChange = (e) => {
    const value = e.target.value;
    this.props.onChange(value);
  };

  onSearchIconClick = () => {
    this.props.onSearch(this.props.value);
  };

  onKeyPress = (e) => {
    if (e.charCode === 13) {
      this.props.onSearch(this.props.value);
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root} elevation={1}>
        <InputBase
          type="search"
          className={classes.input}
          value={this.props.value}
          placeholder={this.props.placeholder}
          disabled={this.props.disabled}
          onChange={this.onChange}
          onKeyPress={this.onKeyPress}
        />
        <IconButton
          className={classes.iconButton}
          disabled={this.props.disabled}
          aria-label="Search"
          onClick={this.onSearchIconClick}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    );
  }
}

export default withStyles(styles)(SearchInput);
