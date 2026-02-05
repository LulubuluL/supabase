<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent, AuthFormField } from "@nuxt/ui";
import { useSupabase } from "../../utils/supabase";

const toast = useToast();

const fields: AuthFormField[] = [
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "Enter your email",
    required: true,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    required: true,
  },
];

const schema = z.object({
  email: z.email("Invalid email"),
  password: z.string("Password is required"),
});

type Schema = z.output<typeof schema>;

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  const supabase = useSupabase();

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: payload.data.email,
      password: payload.data.password,
    });

    if (error) {
      throw error;
    }

    if (data.user) {
      toast.add({
        description: "Login successful.",
      });
      await navigateTo("/");
    }
  } catch (err) {
    console.error(err);
    toast.add({
      description: "Login failed. Please check your credentials.",
    });
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 p-4">
    <UPageCard class="w-full max-w-md">
      <UAuthForm
        :schema="schema"
        title="Login"
        description="Enter your credentials to access your account."
        icon="i-lucide-user"
        :fields="fields"
        @submit="onSubmit"
      />
    </UPageCard>
  </div>
</template>
