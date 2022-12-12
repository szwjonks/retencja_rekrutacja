<template>
  <div>
    <q-table
      title="Users"
      :rows="rows"
      :columns="columns"
      row-key="name"
      :filter="search"
    >
      <template #top>
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
          <input
            type="checkbox"
            :checked="props.row.favourite"
            @change="updateFavourite(props.row)"
          />
        </q-td>
      </template>
      <template #body-cell-details="props">
        <q-td :props="props">
          <button @click="goToDetails(props.row)">Go to details</button>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { QTableProps } from 'quasar';
import { api } from 'src/boot/axios';
import { useStorage } from '@vueuse/core';
import { UserRow, UserRowFromApi, UsersApiResponse } from 'src/types/user-data';

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

const favourites = useStorage<Record<number, boolean>>('favourites', {});

const apiRowsData = ref<UserRowFromApi[]>([]);
const rows = computed<UserRow[]>(() => {
  return apiRowsData.value.map((row) => ({
    ...row,
    name: `${row.first_name} ${row.last_name}`,
    favourite: favourites.value[row.id] || false,
  }));
});
const search = ref('');

const updateFavourite = (row: UserRow) => {
  favourites.value[row.id] = !row.favourite;
};

const goToDetails = (row: UserRow) => {
  console.log('go to details: ', row.id);
};

onMounted(async () => {
  const config = {
    params: {
      per_page: 12,
    },
  };
  const usersResponse = await api.get<UsersApiResponse>('users', config);
  apiRowsData.value = usersResponse.data.data;
});
</script>

<style scoped lang="scss"></style>
