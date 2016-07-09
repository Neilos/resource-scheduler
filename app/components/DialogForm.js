import React, { Component, PropTypes } from 'react'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton'

import dimensions from '../constants/dimensions'

import FormResource from './FormResource'
import FormActivity from './FormActivity'
import FormDateRange from './FormDateRange'

const styles = {
  contentStyle: {
    width: `calc(100% - ${dimensions.desktopGutter}px)`,
    maxWidth: 650,
  },
  bodyStyle: {
    padding: 0,
    paddingLeft: dimensions.desktopGutter,
    paddingRight: dimensions.desktopGutter,
  }
}

export default function DialogForm(props) {
  const {
    newEntity,
    existingEntity,
    onCancelNew,
    onCreate,
    onCancelEdit,
    onUpdate,
    formId,
    entityType,
  } = props

  const isOpen = !!newEntity || !!existingEntity
  const isNewEntity = !!newEntity

  const config ={
    new: {
      onCancel: onCancelNew,
      onSubmit: onCreate,
      initialValues: newEntity,
      title: `New ${entityType}`,
    },
    existing: {
      onCancel: onCancelEdit,
      onSubmit: onUpdate,
      initialValues: existingEntity,
      title: `Edit ${entityType}`,
    }
  }

  const {
    onCancel,
    onSubmit,
    initialValues,
    title,
  } = config[isNewEntity ? 'new' : 'existing']

  const formProps = {formId, onSubmit, initialValues}

  const actions = [
    <FlatButton
      label="Cancel"
      secondary={true}
      type='button'
      onTouchTap={onCancel}
    />,
    <FlatButton
      label="Submit"
      primary={true}
      disabled={false}
      type='submit'
      form={formId}
    />
  ]

  const entityForm = function () {
    switch (entityType) {
      case 'Resource':
        return <FormResource {...formProps} />
      case 'Activity':
        return <FormActivity {...formProps} />
      case 'Date Range':
        return <FormDateRange {...formProps} />
      default:
        throw `DialogForm does not recognize given entityType: ${entityType}.`
    }
  }

  return (
    <Dialog className='DialogForm'
      title={title}
      actions={actions}
      modal={true}
      contentStyle={styles.contentStyle}
      bodyStyle={styles.bodyStyle}
      open={isOpen}
    >
      { entityForm() }
    </Dialog>
  )
}

DialogForm.propTypes = {
  onCancelNew: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  onCancelEdit: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  formId: PropTypes.string.isRequired,
  entityType: PropTypes.string.isRequired,
}
