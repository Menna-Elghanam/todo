// import React from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";

// interface DatePickerModalProps {
//   selectedDate: Date;
//   onDateChange: (date: Date) => void;
//   onClose: () => void;
// }

// export const DatePickerModal: React.FC<DatePickerModalProps> = ({ selectedDate, onDateChange, onClose }) => (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//     <div className="bg-white p-8 rounded-lg w-96">
//       <h2 className="text-xl font-semibold mb-4">Select Date</h2>
//       <Calendar onChange={onDateChange} value={selectedDate} />
//       <button
//         onClick={onClose}
//         className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
//       >
//         Confirm Date
//       </button>
//     </div>
//   </div>
// );
// components/DatePickerModal.tsx
// components/DatePickerModal.tsx

import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// Explicitly define the types based on react-calendar's definitions
// type Value = Date | Date[] | null;

interface DatePickerModalProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  onClose: () => void;
}

export const DatePickerModal: React.FC<DatePickerModalProps> = ({
  selectedDate,
  onDateChange,
  onClose,
}) => {
  const handleDateChange = (
    value: unknown,
    _e: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (value instanceof Date) {
      onDateChange(value);
    } else if (Array.isArray(value) && value[0] instanceof Date) {
      onDateChange(value[0]);
    }
    // If value is null, we don't call onDateChange
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Select Date</h2>
        <Calendar onChange={handleDateChange} value={selectedDate} />
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Confirm Date
        </button>
      </div>
    </div>
  );
};
