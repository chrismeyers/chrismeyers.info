import DashboardMessagesMixin from '@/mixins/DashboardMessages';
import ModalsMixin from '@/mixins/Modals';
import { API_TOKEN_KEY } from '@/store/constants';

export default {
  mixins: [DashboardMessagesMixin, ModalsMixin],
  data() {
    return {
      whichButton: '',
      items: [],
      schema: [],
      images: [],
      selected: {},
      lastResponse: {},
    };
  },
  methods: {
    setData(response) {
      this.items = this.flattenData(response);
      this.schema = response.data.schema;
      this.selected = this.items[0];
    },
    setImages(response) {
      this.images = response.data.items;
    },
    flattenData(response) {
      return [
        this.createBlankEntry(response.data.items[0]),
        ...response.data.items,
      ];
    },
    createBlankEntry(template) {
      // Adds a blank entry as a placeholder for new items.
      const blank = { id: -1 };
      for (const field of Object.keys(template)) {
        blank[field] = null;
      }

      return blank;
    },
    routeFormSubmission() {
      if (this.whichButton === 'addUpdate') {
        this.addUpdateEntry();
      } else if (this.whichButton === 'delete') {
        this.deleteEntry();
      }
    },
    async addUpdateEntry() {
      if (this.selected.id > 0) {
        // Update existing (PUT)
        this.lastResponse = await this.api.update(
          this.$cookie.get(API_TOKEN_KEY),
          this.selected,
        );
      } else {
        // Add new (POST)
        this.lastResponse = await this.api.add(
          this.$cookie.get(API_TOKEN_KEY),
          this.selected,
        );
      }

      let result = {};
      if (this.lastResponse.status === 200) {
        const updated = await this.api.get({ schema: null, inactive: null });
        if (updated.status === 200) {
          this.items = this.flattenData(updated);
          this.selected = (() => {
            for (const [i, item] of this.items.entries()) {
              if (item.id === this.lastResponse.data.id) {
                return this.items[i];
              }
            }
            return this.items[0];
          })();
          result = this.success(this.type.singular);
        } else {
          result = this.retrievalError(this.type.plural, false);
        }
      } else {
        result = this.modificationError(this.type.singular);
      }

      // Prevent closing the dialog by pressing enter to submit form.
      setTimeout(() => this.showDialog(result.title, result.body), 100);
    },
    deleteEntry() {
      const handler = async () => {
        if (this.selected.id) {
          this.lastResponse = await this.api.delete(
            this.$cookie.get(API_TOKEN_KEY),
            this.selected,
          );

          let result = {};
          if (this.lastResponse.status === 200) {
            const updated = await this.api.get({
              schema: null,
              inactive: null,
            });
            if (updated.status === 200) {
              this.items = this.flattenData(updated);
              this.selected = this.items[0];
              result = this.success(this.type.singular);
            } else {
              result = this.retrievalError(this.type.plural, false);
            }
          } else {
            result = this.modificationError(this.type.singular);
          }

          // Prevent closing the dialog by pressing enter to submit form.
          setTimeout(() => this.showDialog(result.title, result.body), 100);
        }
      };

      this.showConfirm(
        `Are you sure you want to delete ${this.type.singular} ${this.selected.id}?`,
        handler,
      );
    },
  },
};
