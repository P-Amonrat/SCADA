import { Fragment, useState } from 'react'
import { Label } from 'reactstrap'
import Flatpickr from 'react-flatpickr'

const PickerDefault = (props) => {
  const [picker, setPicker] = useState(new Date())
  return (
    <Fragment>
      {/* <Label for='default-picker'>Date</Label> */}
      <Flatpickr className='form-control' value={props.date} onChange={date => props.setDate(date)} id='default-picker' />
    </Fragment>
  )
}

export default PickerDefault
