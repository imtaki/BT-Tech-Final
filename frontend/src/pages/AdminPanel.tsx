
import { useState } from 'react';
import { FaPlus, FaMinus, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('years');

  const years = ['2025', '2024'];
  const editors = ['Jan Novák', 'Eva Malá'];
  const admins = ['admin@boku.sk', 'director@boku.sk'];
  const subpages = [
    { id: 1, year: '2025', title: 'Program' },
    { id: 2, year: '2025', title: 'Registrácia' },
  ];

  return (
    <div className="p-6 bg-gray-100">
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <Link
              to="" 
              onClick={() => setActiveTab('years')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'years' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Ročníky konferencie
            </Link>
            <a 
              href="#" 
              onClick={() => setActiveTab('editors')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'editors' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Editori
            </a>
            <Link 
              to="" 
              onClick={() => setActiveTab('admins')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'admins' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Administrátori
            </Link>
            <Link 
              to="" 
              onClick={() => setActiveTab('subpages')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'subpages' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Podstránky
            </Link>
          </nav>
        </div>
      </div>

      {activeTab === 'years' && (
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Ročníky konferencie</h2>
          
          <div className="flex mb-4">
            <input
              type="text"
              placeholder="Rok konferencie (napr. 2026)"
              className="flex-grow border px-3 py-2 rounded-l"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-r flex items-center">
              <FaPlus className="mr-1" /> Pridať
            </button>
          </div>
          
          <ul className="divide-y divide-gray-200">
            {years.map((year) => (
              <li key={year} className="py-3 flex items-center justify-between">
                <span className="font-medium">{year}</span>
                <button className="bg-red-500 text-white px-3 py-1 rounded flex items-center">
                  <FaMinus className="mr-1" /> Odstrániť
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === 'editors' && (
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Editori</h2>
          
          <div className="space-y-2 mb-4">
            <input
              type="text"
              placeholder="Meno editora"
              className="w-full border px-3 py-2 rounded"
            />
            <input
              type="email"
              placeholder="E-mail editora"
              className="w-full border px-3 py-2 rounded"
            />
            <div className="flex">
              <select className="flex-grow border px-3 py-2 rounded-l">
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-r flex items-center">
                <FaPlus className="mr-1" /> Pridať editora
              </button>
            </div>
          </div>
          
          <ul className="divide-y divide-gray-200">
            {editors.map((editor) => (
              <li key={editor} className="py-3 flex items-center justify-between">
                <span className="font-medium">{editor}</span>
                <div className="flex space-x-2">
                  <select className="border px-3 py-1 rounded">
                    <option value="">Prideliť k ročníku</option>
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                  <button className="bg-red-500 text-white px-3 py-1 rounded flex items-center">
                    <FaMinus className="mr-1" /> Odstrániť
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === 'admins' && (
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Administrátori</h2>
          
          <div className="flex mb-4">
            <input
              type="email"
              placeholder="E-mail administrátora"
              className="flex-grow border px-3 py-2 rounded-l"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-r flex items-center">
              <FaPlus className="mr-1" /> Pridať
            </button>
          </div>
          
          <ul className="divide-y divide-gray-200">
            {admins.map((admin) => (
              <li key={admin} className="py-3 flex items-center justify-between">
                <span className="font-medium">{admin}</span>
                <button className="bg-red-500 text-white px-3 py-1 rounded flex items-center">
                  <FaMinus className="mr-1" /> Odstrániť
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === 'subpages' && (
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Podstránky</h2>
          
          <div className="space-y-2 mb-4">
            <input
              type="text"
              placeholder="Názov podstránky"
              className="w-full border px-3 py-2 rounded"
            />
            <div className="flex">
              <select className="flex-grow border px-3 py-2 rounded-l">
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-r flex items-center">
                <FaPlus className="mr-1" /> Pridať podstránku
              </button>
            </div>
          </div>
          
          <table className="min-w-full divide-y divide-gray-200 border">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rok
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Podstránka
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Akcie
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {subpages.map((subpage) => (
                <tr key={subpage.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {subpage.year}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {subpage.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button className="bg-blue-500 text-white px-2 py-1 rounded flex items-center">
                        <FaEdit className="mr-1" /> Editovať
                      </button>
                      <button className="bg-red-500 text-white px-2 py-1 rounded flex items-center">
                        <FaMinus className="mr-1" /> Odstrániť
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}