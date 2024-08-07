import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://cknujaeqirgnfpwkjktm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrbnVqYWVxaXJnbmZwd2tqa3RtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMjk2NjA0OSwiZXhwIjoyMDM4NTQyMDQ5fQ.QOUtCv77_xj_D_QORMA6-GozU31W_vXoYyXNG9vGt3I";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
