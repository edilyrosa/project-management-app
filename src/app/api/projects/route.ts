import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET: Obtener todos los proyectos
export async function GET() {
  const { data, error } = await supabase.from('projects').select('*');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST: Crear un nuevo proyecto
export async function POST(req: Request) {
  const body = await req.json();
  const { data, error } = await supabase.from('projects').insert([body]);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
