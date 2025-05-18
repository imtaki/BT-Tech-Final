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

  const handleAddEditor = async () => {
    try {
      const res = await api.post("/editors", { 
        email, 
        name,
        password,
        conferenceYearId: selectedYear 
      });
      onEditorAdded(res.data);
      setIsModalOpen(false);
      
      setName('');
      setEmail('');
      setPassword('');
      setSelectedYear('');
    } catch (e: unknown) {
      console.error("Failed to add editor", e);
    }
  };

  return (
    <>
      <button className="bg-blue-500 text-white px-4 py-2 rounded flex items-center" onClick={() => setIsModalOpen(true)}>
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
              className="w-full border px-3 py-2 mb-3 rounded"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail editora"
              className="w-full border px-3 py-2 mb-3 rounded"
            />
             <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Heslo"
              className="w-full border px-3 py-2 mb-3 rounded"
            />
            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full border px-3 py-2 mb-4 rounded"
            >
              <option value="">Vybrať ročník</option>
              {conferenceYears.map((yearObj: conferenceYear) => (
                <option key={yearObj.id} value={yearObj.id}>{yearObj.year}</option>
              ))}
            </select>
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