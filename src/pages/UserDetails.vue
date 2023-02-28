<template>
  <div class="user-details__wrapper">
    <Suspense>
      <UserCompAsync :userId="userId"></UserCompAsync>
      <template #fallback> SUSPENSE </template>
    </Suspense>
    <router-link to="/users" class="user-list-button">
      <q-btn color="primary" label="Go to users list" />
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { useRoute } from 'vue-router';
import LoadingComponent from 'src/components/LoadingComponent.vue';
import { pause } from 'src/utils/functions';

const route = useRoute();
const userId = Number(route.params.id);

const UserCompAsync = defineAsyncComponent({
  loader: async () => {
    await pause();
    return import('../components/UserDetailsPresentation.vue');
  },
  loadingComponent: LoadingComponent,
  delay: 200,
  suspensible: userId % 2 == 0,
});
</script>

<style lang="scss">
.user-details__wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
