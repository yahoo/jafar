import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Create';
import DuplicateIcon from '@material-ui/icons/FileCopy';
import DownloadIcon from '@material-ui/icons/SaveAlt';

export default ({ edit, duplicate, download, remove }, rowActions = []) => [{
  label: 'Edit',
  icon: EditIcon,
  onClick: edit,
}, {
  label: 'Duplicate',
  icon: DuplicateIcon,
  onClick: duplicate,
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
