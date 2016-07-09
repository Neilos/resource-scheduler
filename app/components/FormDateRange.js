import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import DatePicker from './WrapperDatePicker'

const styles = {
  FormDateRange: {
    maxHeight: '100%',
    overflow: 'auto',
    display: 'flex',
    flexFlow: 'wrap',
    justifyContent: 'spac-around',
  },
  DatePicker: {
    flex: 1
  }
}

function FormDateRange ({
    formId,
    fields: { startDate, endDate },
    handleSubmit,
  }) {

  return (
    <form id={formId} onSubmit={handleSubmit} className='FormDateRange' style={styles.FormDateRange}>
      <DatePicker
        hintText="Start date"
        floatingLabelText="Start date"
        mode="portrait"
        container="inline"
        autoOk={true}
        {...startDate}
        style={styles.DatePicker}
      />

      <DatePicker
        hintText="End date"
        floatingLabelText="End date"
        mode="portrait"
        container="inline"
        autoOk={true}
        {...endDate}
        style={styles.DatePicker}
      />
    </form>
  )
}

FormDateRange.propTypes = {
  formId: PropTypes.string.isRequired,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
}

FormDateRange = reduxForm({
  form: 'dateRange',
  fields: ['startDate', 'endDate'],
})(FormDateRange)

export default FormDateRange
