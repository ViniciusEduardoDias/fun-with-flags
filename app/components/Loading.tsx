import { ArrowPathIcon } from '@heroicons/react/24/outline'

type PropsLoading = {
    text: string
}
const Loading = ({ text }: PropsLoading)=> {
    return (
       <div className='flex flex-col m-auto items-center'>
        <ArrowPathIcon className='size-6 mb-2 animate-[spin_1.5s_linear_infinite]' />
        <span>{text}</span>
       </div>
    )
}

export default Loading;