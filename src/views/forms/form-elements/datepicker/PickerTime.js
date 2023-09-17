import { Fragment, useState } from 'react'
import { Label } from 'reactstrap'
import Flatpickr from 'react-flatpickr'

const Timepickers = (props) => {
  // const [basic, setBasic] = useState(new Date())

  return (
    <Fragment>
      {/* <Label id='timepicker'>Time</Label> */}
      <Flatpickr
        className='form-control'
        value={props.date}
        id='timepicker'
        options={{
          enableTime: true,
          noCalendar: true,
          dateFormat: 'H:i',
          time_24hr: true
        }}
        onChange={date => props.setTime(date)}
      />
    </Fragment>
  )
}

export default Timepickers
