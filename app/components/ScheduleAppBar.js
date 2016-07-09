import React, { PropTypes } from 'react'
import AppBar from 'material-ui/AppBar'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import Update from 'material-ui/svg-icons/action/update'
import FontIcon from 'material-ui/FontIcon'

import colors from '../constants/colors'

const styles = {
  AppBar: {}
}

export default function ScheduleAppBar (props) {
  const {
    layoutStyles,
    newResource,
    newActivity,
  } = props

  const handleMenuSelection = (event, menuItem) => {
    switch (menuItem.key) {
      case 'resource':
        newResource()
        break;
      case 'activity':
        newActivity()
        break;
      default:
    }
  }

  return (
    <AppBar
      zDepth={1}
      title="Scheduler"
      iconElementLeft={
        <IconButton>
          <Update color={colors.alternateTextColor} />
        </IconButton>
      }
      iconElementRight={
        <IconMenu
          iconButtonElement={
            <IconButton>
              <NavigationMenu color={colors.alternateTextColor} />
            </IconButton>
          }
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          style={styles.IconMenu}
          iconStyle={styles.iconStyle}
          onItemTouchTap={handleMenuSelection}
          >
          <MenuItem key={'resource'} primaryText='New Resource'/>
          <MenuItem key={'activity'} primaryText='New Activity' />
        </IconMenu>
      }
      style={Object.assign({}, styles.AppBar, layoutStyles)}
    />
  )
}

ScheduleAppBar.propTypes = {
  layoutStyles: PropTypes.object.isRequired,
  newResource: PropTypes.func.isRequired,
  newActivity: PropTypes.func.isRequired,
}
