//

import Card from './Card';
import Paper from './Paper';
import Input from './Input';
import Button from './Button';
import Tooltip from './Tooltip';
import Backdrop from './Backdrop';
import Typography from './Typography';
import CssBaseline from './CssBaseline';
import Autocomplete from './Autocomplete';
import Collapse from './Collapse';
import Checkbox from './Checkbox';
// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme) {
  return {
    components: {
      ...Card(theme),
      ...Input(theme),
      ...Paper(theme),
      ...Button(theme),
      ...Tooltip(theme),
      ...Collapse(theme),
      ...Checkbox(theme),
      ...Backdrop(theme),
      ...Typography(theme),
      ...CssBaseline(theme),
      ...Autocomplete(theme),
    }
  }
}
