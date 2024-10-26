import { toast } from 'react-toastify'

export const error = (message: string) => {
  toast.error(message, {
    position: 'top-center',
    autoClose: 2000,
  })
}

export const success = (message: string) => {
  toast.success(message, {
    position: 'top-center',
    autoClose: 2000,
  })
}

// toast.success('Success Notification !', {
//   position: 'top-center',
// })

// toast.error('Error Notification !', {
//   position: 'top-left',
// })

// toast.warn('Warning Notification !', {
//   position: 'bottom-left',
// })

// toast.info('Info Notification !', {
//   position: 'bottom-center',
// })
