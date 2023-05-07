<template>
  <div class="planning-daily-activity-add-place-search">
    <img :src="GreyPoint" alt="Grey point" />
    <SearchSelect
      v-model="selectedAttraction"
      :options="planningStore.attractions"
      track-by="name"
      :on-select="onAttractionSelect"
      :placeholder="placeholder || 'Search a place or choose on map'"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import SearchSelect from "@/common/components/SearchSelect/index.vue";
import { usePlanningStore } from "@/pages/Planning/store/planning";
import GreyPoint from "@/assets/images/GreyPoint.svg";

export default defineComponent({
  name: "add-place",
  components: { SearchSelect },
  data() {
    return {
      GreyPoint,
      selectedAttraction: null,
      planningStore: usePlanningStore(),
    };
  },
  props: {
    onAttractionSelect: Function,
    placeholder: {
      required: false,
      type: String,
    },
  },
});
</script>
