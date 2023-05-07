import { reactive } from "vue";
import type { MyObject } from "@/common/interfaces";

export const store = reactive({
  currentSlides: {} as MyObject,
});
