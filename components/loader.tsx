import { ThreeDots } from 'react-loader-spinner'

interface LoaderProps{
    message: string,
}
export const Loader = ({
    message = "Thinking..."
}: LoaderProps) => {
    return (
        <div className="flex flex-col items-center justify-center h-full gap-y-4">
            <div className="relative">
                <ThreeDots
                height="50" 
                width="50" 
                radius="8"
                color="#2E71E5" 
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                visible={true}
                 />
            </div>
            <p className='text-sm text-muted-foreground'>
                {message}

            </p>
        </div>
    )
}