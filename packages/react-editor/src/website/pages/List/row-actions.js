import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Create';
import DownloadIcon from '@material-ui/icons/SaveAlt';

export default ({ edit, download, remove }) => [{
  label: 'Edit',
  icon: EditIcon,
  onClick: edit,
}, {
  label: 'Download Json',
  icon: DownloadIcon,
  onClick: download,
}, {
  label: 'Delete',
  icon: DeleteIcon,
  onClick: remove,
}];
