import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET: Obtener todas las tareas
export async function GET() {
  const { data, error } = await supabase.from('taskentries').select('*');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST: Crear un nuevo task entry
export async function POST(req: Request) {
  const body = await req.json();
  const { data, error } = await supabase.from('taskentries').insert([body]);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
