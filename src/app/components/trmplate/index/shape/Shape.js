export default function Shape() {


        return(
            <div className="flex justify-between relative -z-50 select-none">
                <div className="absolute top-0 left-0 w-[80%] md:w-[50%]"><img 
                src="/images/slider02@2x.png"
                />
                </div>            
                <div className="absolute top-0 right-0 w-[30%] ">
                <img 
                src="/images/0@2x.png"
                />    
                </div>            
            </div>
        )
    }