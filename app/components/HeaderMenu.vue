<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const menuItems = computed<NavigationMenuItem[]>(() => [
  { label: "Home", to: "/" },
  { label: "Instruments", to: "/instruments" },
  { label: "About", to: "/about" },
  { label: "Profile", to: "/profile" },
]);
</script>

<template>
  <UNavigationMenu :items="menuItems" />
</template>
