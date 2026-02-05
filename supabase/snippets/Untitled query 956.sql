create policy "public can read instruments"
on public.instruments
for select to anon
using (true);