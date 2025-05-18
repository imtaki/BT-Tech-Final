import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import api from "../utils/axios";

type conferenceYear = {
  id: string;
  year: string;
};

type EditorAddModalProps = {
  onEditorAdded: (newEditor: any) => void;
  conferenceYears: conferenceYear[];
};

export default function EditorAddModal({ onEditorAdded, conferenceYears }: EditorAddModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleAddEditor = async () => {
    setErrors({});
    try {
      const res = await api.post("/editors", { 
        email, 
        name,
        password,
        conference_year_id: selectedYear 
      });
      onEditorAdded(res.data);
      setIsModalOpen(false);

      setName('');
      setEmail('');
      setPassword('');
      setSelectedYear('');
    } catch (e: any) {
      if (e.response && e.response.status === 422) {
        setErrors(e.response.data.errors);
      } else {
        console.error("Failed to add editor", e);
      }
    }
  };

  return (
    <>
      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center" onClick={() => setIsModalOpen(true)}>
        <FaPlus className="mr-1"/>Pridať Editora
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">Pridať editora</h2>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Meno editora"
              className="w-full border px-3 py-2 mb-1 rounded"
            />
            {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name}</p>}

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail editora"
              className="w-full border px-3 py-2 mb-1 rounded"
            />
            {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Heslo"
              className="w-full border px-3 py-2 mb-1 rounded"
            />
            {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password}</p>}

            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full border px-3 py-2 mb-1 rounded"
            >
              <option value="">Vybrať ročník</option>
              {conferenceYears.map((yearObj: conferenceYear) => (
                <option key={yearObj.id} value={yearObj.id}>{yearObj.year}</option>
              ))}
            </select>
            {errors.conference_year_id && <p className="text-red-500 text-sm mb-2">{errors.conference_year_id}</p>}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Zrušiť
              </button>
              <button
                onClick={handleAddEditor}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Pridať
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}