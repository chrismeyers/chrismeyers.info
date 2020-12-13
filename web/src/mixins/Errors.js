import ModalsMixin from '@/mixins/Modals';
import ConnectionError from '@/utils/errors/types/connection';
import ResponseError from '@/utils/errors/types/response';

export default {
  mixins: [ModalsMixin],
  methods: {
    handleCommonErrors(error) {
      if (error instanceof ConnectionError || error instanceof ResponseError) {
        this.showDialog(error.message, error.title, {
          capitalized: true,
        });
      } else {
        this.showDialog(error);
      }
    },
  },
};
