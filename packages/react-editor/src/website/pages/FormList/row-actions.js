import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Create';
import DownloadIcon from '@material-ui/icons/SaveAlt';

export default ({ edit, download, downloadFormFiles, remove }) => [{
  label: 'Edit',
  icon: EditIcon,
  onClick: edit,
}, {
  label: 'Download Json',
  icon: DownloadIcon,
  onClick: download,
}, {
  label: 'Download Files',
  icon: DownloadIcon,
  onClick: downloadFormFiles,
}, {
  label: 'Delete',
  icon: DeleteIcon,
  onClick: remove,
}];
