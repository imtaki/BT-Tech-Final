import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import api from "../utils/axios";

type AdminAddModalProps = {
  onAdminAdded: (newAdmin: any) => void;
}

export default function AdminAddModal({ onAdminAdded }: AdminAddModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAddAdmin = async () => {
    try {
      const res = await api.post("/admins", { email, name, password });
      onAdminAdded(res.data);
      setIsModalOpen(false);

      setName('');
      setEmail('');
      setPassword('');
    } catch (e: unknown) {
      console.error("Failed to add admin", e);
    }
  }

  return (
    <>
      <button className="bg-blue-500 text-white px-4 py-2 rounded flex items-center" onClick={() => setIsModalOpen(true)}>
        <FaPlus className="mr-1"/>Pridať Administrátora
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">Pridať administrátora</h2>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Meno"
              className="w-full border px-3 py-2 mb-3 rounded"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail"
              className="w-full border px-3 py-2 mb-3 rounded"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Heslo"
              className="w-full border px-3 py-2 mb-4 rounded"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Zrušiť
              </button>
              <button
                onClick={handleAddAdmin}
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