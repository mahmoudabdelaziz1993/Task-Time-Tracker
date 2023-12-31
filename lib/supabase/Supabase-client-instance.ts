
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/supabase';
import { cookies } from 'next/headers';

export const supabase = createServerComponentClient<Database>({ cookies })
