// NameDropdown.jsx
// import React, { useEffect, useState } from "react";

// function NameDropdown({ value, onChange, disabled }) {
//   const [names, setNames] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const API_ACTIVISTS = "https://shramjivi-backend.onrender.com/api/activists/";

//   useEffect(() => {
//     const fetchNames = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch(API_ACTIVISTS, {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//           credentials: "include",
//         });

//         if (!res.ok) throw new Error("Failed to fetch names");
//         const data = await res.json();

//         // ✅ Extract only names (unique names)
//         const uniqueNames = [...new Set(data.map((item) => item.name))];
//         setNames(uniqueNames);
//       } catch (err) {
//         console.error("Error fetching activist names:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNames();
//   }, []);

//   return (
//     <select
//       className="form-select"
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       disabled={loading || disabled}
//     >
//       <option value="">-- Select Name --</option>
//       {loading ? (
//         <option>Loading...</option>
//       ) : (
//         names.map((name, idx) => (
//           <option key={idx} value={name}>
//             {name}
//           </option>
//         ))
//       )}
//     </select>
//   );
// }

// export default NameDropdown;


import React, { useEffect, useState } from "react";

function NameDropdown({ value, onChange, disabled }) {
  const [names, setNames] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_ACTIVISTS = "https://shramjivi-backend.onrender.com/api/activists/";

  useEffect(() => {
    const fetchNames = async () => {
      setLoading(true);
      try {
        const res = await fetch(API_ACTIVISTS, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch names");
        const data = await res.json();

        // ✅ Keep full objects (id + name)
        setNames(data);
      } catch (err) {
        console.error("Error fetching activist names:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNames();
  }, []);

  return (
    <select
      className="form-select"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))} // Send ID as number
      disabled={loading || disabled}
    >
      <option value="">-- Select Name --</option>
      {loading ? (
        <option>Loading...</option>
      ) : (
        names.map((person) => (
          <option key={person.id} value={person.id}>
            {person.name} ({person.region?.district || "No district"})
          </option>
        ))
      )}
    </select>
  );
}

export default NameDropdown;
  