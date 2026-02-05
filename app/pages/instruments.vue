<script setup>
import { useSupabase } from "../../utils/supabase";
const supabase = useSupabase();
const instruments = ref([]);
async function getInstruments() {
  const { data } = await supabase.from("instruments").select();
  instruments.value = data;
}
onMounted(() => {
  getInstruments();
});
</script>
<template>
  <UContainer class="py-16">
    <UPageCard>
      <template #title>Instruments</template>
      <ul>
        <li
          v-for="instrument in instruments"
          :key="instrument.id"
          class="p-2 border-t last:border-b"
        >
          {{ instrument.name }}
        </li>
      </ul>
    </UPageCard>
  </UContainer>
</template>
