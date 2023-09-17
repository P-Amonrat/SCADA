import { Fragment, useState } from 'react'
import { Label } from 'reactstrap'
import Flatpickr from 'react-flatpickr'

const PickerDateTime = (props) => {
  const [picker, setPicker] = useState(new Date())
  return (
    <Fragment>
      <Label for='date-time-picker'></Label>
      <Flatpickr
        value={props.date}
        data-enable-time
        id='date-time-picker'
        className='form-control'
        onChange={date => props.setDate(date)}
      />
    </Fragment>
  )
}

export default PickerDateTime
