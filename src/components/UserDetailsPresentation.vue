<template>
  <div class="user-details-presentation__container">
    <div class="user-details-presentation__wrapper">
      <img class="user-details-presentation___avatar" :src="userData.avatar" />
      <div class="user-details-presentation__fields-wrapper">
        <q-field label="First name" stack-label>
          {{ userData.first_name }}
        </q-field>
        <q-field label="Last name" stack-label>
          {{ userData.last_name }}
        </q-field>
        <q-field label="Email" stack-label>
          {{ userData.email }}
        </q-field>
        <q-field label="Favourite" stack-label>
          <FavouriteState
            :user-data="userData"
            @change="changeFavouriteState(userData, $event)"
          />
        </q-field>
      </div>
    </div>
    <div>
      <q-btn @click="resfresh" :disable="isFetchingData">{{
        refreshButtonText
      }}</q-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import useUserData from 'src/composable/useUserData';
import FavouriteState from './FavouriteState.vue';
import { getUserDetails } from 'src/services/api.service';
import { ref, computed } from 'vue';
import { pause } from 'src/utils/functions';

const props = defineProps({
  userId: {
    type: Number,
    required: true,
  },
});

const { mapToUserData, changeFavouriteState } = useUserData();

const isFetchingData = ref(false);
const refreshButtonText = computed(() => {
  return isFetchingData.value ? 'Refreshing' : 'Refresh';
});

const fetchData = async () => {
  isFetchingData.value = true;
  await pause();
  const apiUserData = await getUserDetails(props.userId);
  isFetchingData.value = false;
  return mapToUserData(apiUserData);
};

const userData = ref(await fetchData());

const resfresh = async () => {
  userData.value.first_name = '';
  userData.value = await fetchData();
};
</script>

<style lang="scss" scoped>
.user-details-presentation__container {
  display: flex;
  flex-direction: column;
  gap: 10px;

  .user-details-presentation__wrapper {
    display: flex;
    gap: 10px;

    .user-details-presentation__avatar {
      width: 200px;
    }

    .user-details-presentation__fields-wrapper {
      flex: 1;
    }
  }
}
</style>
