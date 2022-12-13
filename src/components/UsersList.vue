<template>
  <div>
    <q-table
      title="Users"
      :rows="rows"
      :columns="columns"
      row-key="name"
      :filter="search"
    >
      <template #top-right>
        <q-input dense debounce="400" color="primary" v-model="search">
          <template #append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template #body-cell-avatar="props">
        <q-td :props="props">
          <img :src="props.row.avatar" />
        </q-td>
      </template>
      <template #body-cell-favourite="props">
        <q-td :props="props">
          <FavouriteState
            :user-data="props.row"
            @change="changeFavouriteState(props.row, $event)"
          />
        </q-td>
      </template>
      <template #body-cell-details="props">
        <q-td :props="props">
          <q-btn
            color="primary"
            label="Go to details"
            @click="goToDetails(props.row)"
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { QTableProps } from 'quasar';
import { UserRow, UserRowFromApi } from 'src/types/user-data';
import { useRouter } from 'vue-router';
import useUserData from 'src/composable/useUserData';
import { getUsersList } from 'src/services/api.service';
import FavouriteState from './FavouriteState.vue';

const router = useRouter();

const columns: QTableProps['columns'] = [
  {
    name: 'name',
    label: 'Name',
    field: 'name',
  },
  {
    name: 'email',
    label: 'Email',
    field: 'email',
  },
  {
    name: 'avatar',
    label: 'Avatar',
    field: 'avatar',
  },
  {
    name: 'favourite',
    label: 'Favourite',
    field: 'favourite',
  },
  {
    name: 'details',
    label: 'Details',
    field: 'id',
  },
];

const { mapToUserData, changeFavouriteState } = useUserData();

const apiRowsData = ref<UserRowFromApi[]>([]);

const rows = computed<UserRow[]>(() => {
  return apiRowsData.value.map(mapToUserData);
});

const search = ref('');

const goToDetails = (row: UserRow) => {
  router.push({
    name: 'user',
    params: {
      id: row.id,
    },
  });
};

onMounted(async () => {
  apiRowsData.value = await getUsersList();
});
</script>

<style scoped lang="scss"></style>
