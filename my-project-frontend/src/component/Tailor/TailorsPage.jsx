// import React, { useState, useEffect } from "react";
// import './TailorsPage.css';

// const TailorsPage = () => {
//   const [tailors, setTailors] = useState([]);
//   const [newTailorName, setNewTailorName] = useState("");
//   const [nextId, setNextId] = useState(5); // Starting id for the next tailor

//   useEffect(() => {
//     // Simulate fetching tailors (replace this with an API call if needed)
//     const fetchedTailors = [
//       { id: 1, name: "John Doe", orders: 5, isDeleted: false },
//       { id: 2, name: "Anna Smith", orders: 2, isDeleted: false },
//       { id: 3, name: "Mike Johnson", orders: 3, isDeleted: false },
//       { id: 4, name: "Sarah Lee", orders: 4, isDeleted: false },
//     ];
//     setTailors(fetchedTailors);
//   }, []);

//   const handleAddTailor = () => {
//     if (newTailorName.trim()) {
//       const newTailor = {
//         id: nextId, // Use nextId for unique IDs
//         name: newTailorName,
//         orders: 0,
//         isDeleted: false,
//       };
//       setTailors((prevTailors) => [...prevTailors, newTailor]);
//       setNewTailorName("");
//       setNextId(nextId + 1); // Increment nextId for the next tailor
//     }
//   };

//   const handleSoftDeleteTailor = (tailorId) => {
//     const updatedTailors = tailors.map((tailor) =>
//       tailor.id === tailorId ? { ...tailor, isDeleted: true } : tailor
//     );
//     setTailors(updatedTailors);
//   };

//   return (
//     <div className="tailors-container">
//       <div className="left-column">
//         <h1>Add New Tailor</h1>

//         {/* Add Tailor Form */}
//         <div className="add-tailor-form">
//           <input
//             type="text"
//             value={newTailorName}
//             onChange={(e) => setNewTailorName(e.target.value)}
//             placeholder="Enter tailor name"
//           />
//           <button onClick={handleAddTailor}>Add Tailor</button>
//         </div>
//       </div>

//       <div className="right-column">
//         <h2>Existing Tailors</h2>

//         {tailors.length > 0 ? (
//           tailors
//             .filter((tailor) => !tailor.isDeleted)
//             .map((tailor) => (
//               <div className="tailor-card" key={tailor.id}>
//                 <div className="tailor-info">
//                   <p><strong>{tailor.name}</strong></p>
//                   <p>Orders Assigned: {tailor.orders}</p>
//                 </div>
//                 <button
//                   onClick={() => handleSoftDeleteTailor(tailor.id)}
//                   className="delete-btn"
//                 >
//                   Soft Delete
//                 </button>
//               </div>
//             ))
//         ) : (
//           <p>No active tailors available.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TailorsPage;
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './TailorsPage.css';

const TailorsPage = () => {
  const [tailors, setTailors] = useState([]);
  const [nextId, setNextId] = useState(5); // Starting id for the next tailor

  useEffect(() => {
    // Simulate fetching tailors (replace this with an API call if needed)
    const fetchedTailors = [
      { id: 1, name: "John Doe", orders: 5, isDeleted: false },
      { id: 2, name: "Anna Smith", orders: 2, isDeleted: false },
      { id: 3, name: "Mike Johnson", orders: 3, isDeleted: false },
      { id: 4, name: "Sarah Lee", orders: 4, isDeleted: false },
    ];
    setTailors(fetchedTailors);
  }, []);

  const handleSoftDeleteTailor = (tailorId) => {
    const updatedTailors = tailors.map((tailor) =>
      tailor.id === tailorId ? { ...tailor, isDeleted: true } : tailor
    );
    setTailors(updatedTailors);
  };

  return (
    <div className="tailors-container">
      <div className="tailor-grid">
        {tailors.length > 0 ? (
          tailors
            .filter((tailor) => !tailor.isDeleted)
            .map((tailor) => (
              <div className="tailor-card" key={tailor.id}>
                <div className="tailor-info">
                  <p><strong>{tailor.name}</strong></p>
                  <p>Orders Assigned: {tailor.orders}</p>
                </div>
                <button
                  onClick={() => handleSoftDeleteTailor(tailor.id)}
                  className="delete-btn"
                >
                  Soft Delete
                </button>
              </div>
            ))
        ) : (
          <p>No active tailors available.</p>
        )}
      </div>

      {/* Button to Navigate to Add Tailor Page */}
      <Link to="/add-tailor">
        <button className="add-tailor-btn">Add New Tailor</button>
      </Link>
    </div>
  );
};

export default TailorsPage;