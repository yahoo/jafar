import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Create';
import DownloadIcon from '@material-ui/icons/SaveAlt';

export default ({ edit, download, remove }, rowActions = []) => [{
  label: 'Edit',
  icon: EditIcon,
  onClick: edit,
}, {
  label: 'Download Json',
  icon: DownloadIcon,
  onClick: download,
}, ...rowActions,
{
  label: 'Delete',
  icon: DeleteIcon,
  onClick: remove,
}];
