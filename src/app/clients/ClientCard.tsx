'use client';

interface Client {
  id: number;
  name: string;
  city: string;
  country: string;
  state: string;
  industry_codes: string;
  active: boolean;
}

interface ClientCardProps {
  client: Client;
  position: { x: number; y: number };
}

export default function ClientCard({ client, position }: ClientCardProps) {
  return (
    <div
      className="absolute top-[25%] left-[25%] z-50 p-4 w-[60%] text-center bg-white dark:bg-gray-900 shadow-lg rounded-lg border border-gray-300 dark:border-gray-700"
     
    >
      <h3 className="text-lg font-semibold">{client.name}</h3>
      <p className="text-sm text-gray-600">{client.city}, {client.country}</p>
      <p className="text-sm text-gray-600">State: {client.state}</p>
      <p className="text-sm text-gray-600">Industry Code: {client.industry_codes}</p>
      <p className="text-sm font-semibold mt-2">
        State: <span className={client.active ? 'text-green-600' : 'text-red-600'}>
          {client.active ? 'Active' : 'Inactive'}
        </span>
      </p>
    </div>
  );
}
