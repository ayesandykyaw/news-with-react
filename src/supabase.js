import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hrnsbwjmyrxaplshajdm.supabase.co";
const supabaseKey =
  " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhybnNid2pteXJ4YXBsc2hhamRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE4Nzc5OTQsImV4cCI6MTk5NzQ1Mzk5NH0.eB3jJv_yoMUCEZvTPsd63EAXVj0v8gSN9h_Q1VSxmNY";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
