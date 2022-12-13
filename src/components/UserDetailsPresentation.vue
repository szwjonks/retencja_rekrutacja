<template>
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
</template>

<script setup lang="ts">
import useUserData from 'src/composable/useUserData';
import { UserRow, UserRowFromApi } from 'src/types/user-data';
import { PropType, computed } from 'vue';
import FavouriteState from './FavouriteState.vue';

const props = defineProps({
  apiUserData: {
    type: Object as PropType<UserRowFromApi>,
    required: true,
  },
});

const { mapToUserData, changeFavouriteState } = useUserData();

const userData = computed<UserRow>(() => {
  return mapToUserData(props.apiUserData);
});
</script>

<style lang="scss" scoped>
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
</style>
