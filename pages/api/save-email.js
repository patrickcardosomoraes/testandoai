import { supabase } from '@/lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { email, origem } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
    return res.status(400).json({ error: 'E-mail inválido' });
  }

  try {
    const { data: existing, error: fetchError } = await supabase
      .from('cadastro_testandoai')
      .select('id')
      .eq('email', email)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Erro ao verificar e-mail:', fetchError.message);
      return res.status(500).json({ error: 'Erro ao verificar e-mail' });
    }

    if (existing) {
      return res.status(200).json({ message: 'E-mail já cadastrado' });
    }

    const { error: insertError } = await supabase
      .from('cadastro_testandoai')
      .insert([{ email, origem }]);

    if (insertError) {
      console.error('Erro ao salvar e-mail:', insertError.message);
      return res.status(500).json({ error: 'Erro ao salvar e-mail' });
    }

    return res.status(200).json({ message: 'E-mail salvo com sucesso!' });
  } catch (err) {
    console.error('Erro inesperado:', err);
    return res.status(500).json({ error: 'Erro inesperado no servidor' });
  }
}