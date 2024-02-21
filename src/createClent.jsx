
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jubfonzpooabcktpgfip.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1YmZvbnpwb29hYmNrdHBnZmlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcyNzg2NjMsImV4cCI6MjAyMjg1NDY2M30.6Pohbpj5qAqDG7ZbBmx7F9oiXg5naYIvTJAU4juTHQg'

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;