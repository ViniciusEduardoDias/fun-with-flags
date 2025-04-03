import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

type PropsError = {
    text: string
}
const ErrorMessage = ({ text }: PropsError)=> {
    return (
       <div className='flex flex-col m-auto items-center'>
        <ExclamationTriangleIcon className='size-6 mb-2' />
        <span>Ops, something want wrong!</span>
        <span>{text}</span>
       </div>
    )
}

export default ErrorMessage;