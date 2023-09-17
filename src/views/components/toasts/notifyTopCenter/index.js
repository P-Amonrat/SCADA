import {Fragment} from "react"
import { toast } from 'react-toastify'
import { CheckCircle } from "react-feather"

const timeDelay = 2000
const options = {
  position: toast.POSITION.TOP_CENTER,
  hideProgressBar: true,
  autoClose: timeDelay
}

const ComponentToast = ({ title }) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <CheckCircle size={22} />
        <h6 className='toast-title ml-50 mb-0'>{title}</h6>
      </div>
    </div>
  </Fragment>
)

export const notifySuccess = (title) => toast.success(<ComponentToast title={title} />, options)
export const notifyFailed = (title) => toast.error(<ComponentToast title={title} />, options)