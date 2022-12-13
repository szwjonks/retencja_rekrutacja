<template>
  <div class="user-details__wrapper">
    <UserDetailsPresentation v-if="apiUserData" :api-user-data="apiUserData" />
    <router-link to="/users" class="user-list-button">
      <q-btn color="primary" label="Go to users list" />
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { UserRowFromApi } from 'src/types/user-data';
import { getUserDetails } from 'src/services/api.service';
import UserDetailsPresentation from '../components/UserDetailsPresentation.vue';

const route = useRoute();

const apiUserData = ref<UserRowFromApi | null>(null);

onMounted(async () => {
  apiUserData.value = await getUserDetails(Number(route.params.id));
});
</script>

<style lang="scss">
.user-details__wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
