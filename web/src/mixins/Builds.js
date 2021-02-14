export default {
  methods: {
    cleanCPU(cpu) {
      return cpu.split('@')[0].trim();
    },
  },
};
