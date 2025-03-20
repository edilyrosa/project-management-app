'use client';
import useSWR from 'swr';
import { IconPencil, IconTrash, IconDotsVertical } from '@tabler/icons-react';
import { useState } from 'react';
import ClientCard from './ClientCard';

const fetcher = async (url: string) => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
    return await res.json();
  } catch (error) {
    console.error('Error making fetch:', error);
    throw error;
  }
};

interface Client {
  id: number;
  name: string;
  city: string;
  country: string;
  state: string;
  industry_codes: string;
  active: boolean;
}

export default function ClientsList() {
  const { data: clients, error } = useSWR<Client[]>('/api/clients', fetcher, {
    refreshInterval: 0,
    revalidateOnFocus: true,
  });

  const [hoveredClient, setHoveredClient] = useState<Client | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  if (error) return <p>Error loading Clients: {error.message}</p>;
  if (!clients) return <p>Loading...</p>;

  return (
    <>
      <div className="w-full overflow-x-auto max-w-[1024px] mx-auto relative">
        <table className="table w-full text-left text-sm text-gray-600 dark:text-gray-300 border border-gray-300">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3">Client's Name</th>
              <th className="px-6 py-3 hidden md:table-cell">City</th>
              <th className="px-6 py-3 hidden md:table-cell">Country</th>
              <th className="px-6 py-3 hidden lg:table-cell">State</th>
              <th className="px-6 py-3 hidden lg:table-cell">Industry Code</th>
              <th className="px-6 py-3">Active</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr
                key={client.id}
                className="border-y border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                onMouseEnter={(e) => {
                  setHoveredClient(client);
                  setPosition({ x: e.clientX + 10, y: e.clientY + 10 });
                }}
                onMouseLeave={() => setHoveredClient(null)}
              >
                <td className="px-6 py-4 text-nowrap">{client.name}</td>
                <td className="px-6 py-4 hidden md:table-cell">{client.city}</td>
                <td className="px-6 py-4 hidden md:table-cell">{client.country}</td>
                <td className="px-6 py-4 hidden lg:table-cell">{client.state}</td>
                <td className="px-6 py-4 hidden lg:table-cell">{client.industry_codes}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-md text-xs font-semibold ${
                      client.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {client.active ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button className="p-2 text-blue-600 hover:text-blue-800" aria-label="Editar">
                    <IconPencil size={18} />
                  </button>
                  <button className="p-2 text-red-600 hover:text-red-800" aria-label="Eliminar">
                    <IconTrash size={18} />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-gray-800" aria-label="Más opciones">
                    <IconDotsVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {hoveredClient && <ClientCard client={hoveredClient} position={position} />}
      </div>
    </>
  );
}

