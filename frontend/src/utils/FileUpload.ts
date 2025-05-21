import { supabase } from './supabase';
import axios from 'axios';

export async function uploadFileToSupabaseAndLaravel(file: File, token: string) {
  const filename = `${Date.now()}-${file.name}`;
  const path = `uploads/${filename}`;

  const { error } = await supabase.storage
    .from('files')
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) throw new Error('Upload to Supabase failed: ' + error.message);

  const { data: urlData } = supabase.storage.from('files').getPublicUrl(path);

  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/cloud-files`,
    {
      name: file.name,
      path,
      url: urlData.publicUrl,
      size: file.size,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`, // if using auth:api middleware
      },
    }
  );

  return response.data;
}
