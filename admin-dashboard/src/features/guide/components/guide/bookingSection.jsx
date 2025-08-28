import { useState } from "react";
import Calendar from "./calender.jsx";


const BookingSection = ({ Tasks}) => {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateSelect = (formattedDate) => {
        console.log("BookingSection - Selected date:", formattedDate);
        setSelectedDate(formattedDate);
    };

    return (
       <>
           {/* Pass only availability prop to Calendar */}
           <Calendar
               onDateSelect={handleDateSelect}
               Tasks={Tasks}
           />
       </>
    );
};

export default BookingSection;
