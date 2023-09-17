import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export const popupInformation =  (title, text, icon = 'warning') => {
  MySwal.fire({
    title,
    text,
    icon,
    confirmButtonText: 'OK',
    allowOutsideClick: false,
    customClass: {
      confirmButton: 'btn btn-primary'
    },
    buttonsStyling: false
  }).then(function (result) {
    if (result.isConfirmed) {
      callback('confirm')
    }
  })
}

export const popupConfirm = (textHtml, callback, icon = 'warning') => {
  MySwal.fire({
    text: textHtml,
    icon,
    showCancelButton: true,
    confirmButtonText: 'Continue',
    allowOutsideClick: false,
    reverseButtons: true,
    customClass: {
      confirmButton: 'btn btn-primary ml-1',
      cancelButton: 'btn btn-outline-primary'
    },
    buttonsStyling: false
  }).then(function (result) {
    if (result.isDismissed) {
      callback('cancel')
    } else if (result.isConfirmed) {
      callback('confirm')
    }
  })
}

export const popupConfirmCustom = (textHtml, confirmBtn, cancelBtn, callback, className = "", icon = 'warning') => {
  MySwal.fire({
    icon,
    html: textHtml,
    confirmButtonText: confirmBtn,
    cancelButtonText: cancelBtn,
    allowOutsideClick: false,
    showConfirmButton: true,
    showCancelButton: true,
    reverseButtons: true,
    buttonsStyling: false,
    customClass: {
      cancelButton: className.includes("isCancelBtn") ? 'btn btn-outline-secondary' : 'btn btn-outline-primary',
      confirmButton: 'btn btn-primary ml-1',
      actions: 'popup-confirm-actions-sweet2',
      container: `popup-confirm-custom ${className}`
    }
  }).then(function (result) {
    if (result.isDismissed) {
      callback('cancel')
    } else if (result.isConfirmed) {
      callback('confirm')
    }
  })
}