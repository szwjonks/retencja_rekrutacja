<template>
  <q-checkbox
    :model-value="userData.favourite"
    @update:model-value="emitChange"
    checked-icon="star"
    unchecked-icon="star_border"
    indeterminate-icon="help"
  />
</template>

<script setup lang="ts">
import { UserRow } from 'src/types/user-data';
import { PropType } from 'vue';

defineProps({
  userData: {
    type: Object as PropType<UserRow>,
    required: true,
  },
});

const emit = defineEmits<{
  (e: 'change', newValue: boolean): void;
}>();

const emitChange = (value: unknown) => {
  emit('change', !!value);
};
</script>
