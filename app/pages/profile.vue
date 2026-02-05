<script setup>
import { ref, onMounted } from "vue";
import { useSupabase } from "../../utils/supabase";
const supabase = useSupabase();
const user = await supabase.auth.getUser();

console.log(user);

const loading = ref(false);
const avatarUrl = ref(
  user.data.user.user_metadata?.avatar_url || "https://i.pravatar.cc/150",
);
const fileInput = ref(null);

const triggerUpdate = () => fileInput.value.click();

const uploadAvatar = async (event) => {
  try {
    loading.value = true;
    const file = event.target.files[0];
    if (!file) return;

    const fileExt = file.name.split(".").pop();
    const fileName = `${user.data.user.id}.${fileExt}`;
    const filePath = `public/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);

    await supabase.auth.updateUser({
      data: { avatar_url: data.publicUrl },
    });

    avatarUrl.value = data.publicUrl;
  } catch (error) {
    alert("Erreur lors de l'upload : " + error.message);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div
    class="flex flex-col items-start gap-4 p-4 border rounded-lg border-gray-800"
  >
    <UUser
      :name="user?.data.user.user_metadata?.full_name || 'Utilisateur'"
      :description="user?.data.user.email"
      :avatar="{ src: avatarUrl }"
      chip
      size="xl"
    />

    <UButton
      label="Changer la photo"
      icon="i-heroicons-camera"
      :loading="loading"
      color="white"
      variant="solid"
      size="sm"
      @click="triggerUpdate"
    />

    <input
      ref="fileInput"
      type="file"
      class="hidden"
      accept="image/*"
      @change="uploadAvatar"
    />
  </div>
</template>
