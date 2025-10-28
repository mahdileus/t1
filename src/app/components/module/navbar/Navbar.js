import MobileHeader from "./MobileHeader";
import Nav from "./Nav";

export default function Navbar() {
    return (
        <div className="container">
                  <div className="hidden mt-10 py-2.5 relative z-4 mx-auto rounded-full backdrop-blur-2xl lg:flex bg-[#f5f5f53d] items-center justify-between  md:px-10">
            <div className="flex justify-center items-center gap-3">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="52.25" height="59.312" viewBox="0 0 52.25 59.312">
                        <g id="logo" transform="translate(-742.691 -73.077)">
                            <path id="Path_1894" data-name="Path 1894"
                                d="M3750.727,132.389h-19.062V84.241h-13.974V73.077h52.1v8.506h-15.872s0,5.154-3.158,7.52-9.472,1.943-9.472,1.943v14.991h9.44Z"
                                transform="translate(-2975)" fill="#173372" />
                            <path id="Path_1895" data-name="Path 1895"
                                d="M3975.384,189.645v10.708h9.569v28.4h17.239V180h-13.974s-.946,4.758-4.154,7.169S3975.384,189.645,3975.384,189.645Z"
                                transform="translate(-3207.251 -96.367)" fill="#ff9436" />
                        </g>
                    </svg>
                </div>
                <div className="text-primary font-yekan-bakh">
                    <span className="block font-bold"></span>
                    <span className="block font-bold"> آرین تجارت</span>
                    <span className="block font-bold">تیوان</span>
                </div>
                <div className="lg:pr-2 xl:pr-8">
                    <Nav/>
                </div>
            </div>
            <div  >
                <div className="flex justify-between items-center gap-4">
                    <div className="flex flex-col justify-center">
                    <p className="text-secondery font-yekan-bakh bg-white text-center rounded-full  ">پشتیبانی</p>
                    <a href="tel:02186097738 " className="text-white font-yekan-bakh">02186097738</a>
                    <a href="tel:09125673763 " className="text-white font-yekan-bakh -mt-1">09125673763</a>
                    </div>
                    <div className="bg-white p-2.5 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                            <g id="Iconly_Bulk_Calling" data-name="Iconly/Bulk/Calling" transform="translate(-2 -2)">
                                <g id="Group" transform="translate(13 2)" opacity="0.4">
                                    <g id="Calling" transform="translate(0)">
                                        <path id="Fill-1"
                                            d="M1.418,3.49a.861.861,0,0,0-.327,1.69A3.462,3.462,0,0,1,3.835,7.93h0a.859.859,0,0,0,.841.7.933.933,0,0,0,.165-.015A.865.865,0,0,0,5.518,7.6a5.174,5.174,0,0,0-4.1-4.11"
                                            fill="#ff9436" />
                                        <path id="Fill-3"
                                            d="M1.356.008A.817.817,0,0,0,.73.184a.863.863,0,0,0,.434,1.534A6.912,6.912,0,0,1,7.29,7.857a.857.857,0,0,0,.851.764.8.8,0,0,0,.1-.006A.847.847,0,0,0,8.813,8.3a.856.856,0,0,0,.181-.633A8.616,8.616,0,0,0,1.356.008"
                                            fill="#ff9436" />
                                    </g>
                                </g>
                                <g id="Call" transform="translate(2 3)">
                                    <path id="Stroke-1"
                                        d="M9.032,9.972c3.989,3.988,4.894-.626,7.434,1.912,2.449,2.448,3.856,2.938.754,6.04-.389.312-2.858,4.07-11.535-4.6S.762,2.172,1.074,1.784c3.11-3.11,3.592-1.695,6.041.753C9.654,5.076,5.043,5.984,9.032,9.972Z"
                                        fill="#ff9436" fillRule="evenodd" />
                                </g>
                            </g>
                        </svg>
                    </div>
                </div>
            </div>

        </div>
        <MobileHeader/> 
        </div>


    );
}
