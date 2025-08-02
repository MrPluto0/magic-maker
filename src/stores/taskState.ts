import { defineStore } from "pinia";

export const useTaskState = defineStore("taskState", () => {
  const taskId = ref();
  const timer = ref();

  const startTimer = (fn: Function, seconds: number = 5) => {
    if (timer.value) {
      clearInterval(timer.value);
    }
    fn();
    timer.value = setInterval(fn, 1000 * seconds);
  };

  const endTimer = () => {
    if (timer.value) {
      clearInterval(timer.value);
    }
  };

  return { taskId, startTimer, endTimer };
});
