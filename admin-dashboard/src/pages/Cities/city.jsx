// import { useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import HeroSection from "../../features/cities/components/City/heroSection.jsx";
// import Info from "../../features/cities/components/City/Info.jsx";
// import Events from "../../features/cities/components/City/events.jsx";
// import Guides from "../../features/cities/components/City/guides.jsx";
// export default function City()
// {
//     const { id: cityId } = useParams();
//     const dispatch = useDispatch();
//     useEffect(() => {
//
//     }, [cityId]);
//
//     return (
//         <main className="bg-white min-h-screen">
//             {/* Custom CSS for animations */}
//             <style jsx>{`
//         @keyframes fade-in-up {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//
//         @keyframes slide-in-left {
//           from {
//             opacity: 0;
//             transform: translateX(-20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }
//
//         @keyframes slide-in-right {
//           from {
//             opacity: 0;
//             transform: translateX(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }
//
//         @keyframes slide-in-up {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//
//         @keyframes fade-in {
//           from {
//             opacity: 0;
//           }
//           to {
//             opacity: 1;
//           }
//         }
//
//         .animate-fade-in-up {
//           animation: fade-in-up 0.8s ease-out forwards;
//         }
//
//         .animate-slide-in-left {
//           animation: slide-in-left 0.6s ease-out forwards;
//         }
//
//         .animate-slide-in-right {
//           animation: slide-in-right 0.6s ease-out forwards;
//         }
//
//         .animate-slide-in-up {
//           animation: slide-in-up 0.8s ease-out forwards;
//         }
//
//         .animate-fade-in {
//           animation: fade-in 0.6s ease-out forwards;
//         }
//
//         .animation-delay-200 {
//           animation-delay: 200ms;
//         }
//         .animation-delay-300 {
//           animation-delay: 300ms;
//         }
//         .animation-delay-400 {
//           animation-delay: 400ms;
//         }
//         .animation-delay-500 {
//           animation-delay: 500ms;
//         }
//         .animation-delay-600 {
//           animation-delay: 600ms;
//         }
//         .animation-delay-700 {
//           animation-delay: 700ms;
//         }
//         .animation-delay-800 {
//           animation-delay: 800ms;
//         }
//         .animation-delay-1000 {
//           animation-delay: 1000ms;
//         }
//       `}</style>
//
//             <div className="flex flex-col max-w-[1200px] mx-auto w-full">
//                 {/* Hero Section */}
//                 <HeroSection info={info} />
//
//                 {/* City Information */}
//                 <Info info={info} />
//
//                 {/* Events Section */}
//                 <div className="mt-8">
//                 <Events info={info} />
//                 </div>
//
//                 {/* Guides Section */}
//                 <div className="mt-8 mb-8">
//                     {/*<Guides cityId={cityId} />*/}
//                 </div>
//             </div>
//         </main>
//     )
// }