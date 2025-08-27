import { useState, useEffect } from "react";
import Calendar from "./calender.jsx";


const BookingSection = ({
                            guideName,
                            guideImage,
                            guideId,
                            availability,
                            loadingAvailability,
                        }) => {
    const [selectedDate, setSelectedDate] = useState(null);

    // Debug logging
    // useEffect(() => {
    //     console.log("BookingSection - Props received:", {
    //         guideId,
    //         availability,
    //         loadingAvailability,
    //         guideName: guideName,
    //         guideImage: guideImage,
    //     });
    // }, [guideId, availability, loadingAvailability, guideName, guideImage]);

    const handleDateSelect = (formattedDate) => {
        console.log("BookingSection - Selected date:", formattedDate);
        setSelectedDate(formattedDate);
    };

    return (
       <>
           {/* Pass only availability prop to Calendar */}
           <Calendar
               onDateSelect={handleDateSelect}
               guideId={guideId}
               availability={availability}
           />
       </>
    );
};

export default BookingSection;
