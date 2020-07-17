import DownloadIcon from '@material-ui/icons/SaveAlt';

export default ({ downloadFormFiles }) => [{
  label: 'Download Files',
  icon: DownloadIcon,
  onClick: downloadFormFiles,
}];
