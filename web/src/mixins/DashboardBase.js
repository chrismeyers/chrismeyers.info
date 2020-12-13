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
      lastError: null,
    };
  },
  methods: {
    setData({ response = null, error = null }) {
      if (error) {
        this.displayResult(
          this.retrievalError(this.type.plural, false, error),
          { capitalized: true },
        );
      } else {
        this.items = this.flattenData(response);
        this.schema = response.data.schema;
        this.selected = this.items[0];
      }
    },
    setImages({ response = null, error = null }) {
      if (error) {
        this.displayResult(
          this.retrievalError(this.type.plural, false, error),
          { capitalized: true },
        );
      } else {
        this.images = response.data.items;
      }
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
        try {
          this.lastResponse = await this.api.update(
            this.$cookie.get(API_TOKEN_KEY),
            this.selected,
          );
        } catch (error) {
          this.lastError = error;
        }
      } else {
        // Add new (POST)
        try {
          this.lastResponse = await this.api.add(
            this.$cookie.get(API_TOKEN_KEY),
            this.selected,
          );
        } catch (error) {
          this.lastError = error;
        }
      }

      let result = {};
      if (this.lastError) {
        result = this.modificationError(this.type.singular);
      } else {
        try {
          const response = await this.api.get({ schema: null, inactive: null });
          this.items = this.flattenData(response);
          this.selected = (() => {
            for (const [i, item] of this.items.entries()) {
              if (item.id === this.lastResponse.data.id) {
                return this.items[i];
              }
            }
            return this.items[0];
          })();
          result = this.success(this.type.singular);
        } catch (error) {
          result = this.retrievalError(this.type.plural, false);
        }
      }

      this.displayResult(result, { capitalized: true });
    },
    deleteEntry() {
      const handler = async () => {
        if (this.selected.id) {
          try {
            this.lastResponse = await this.api.delete(
              this.$cookie.get(API_TOKEN_KEY),
              this.selected,
            );
          } catch (error) {
            this.lastError = error;
          }

          let result = {};
          if (this.lastError) {
            result = this.modificationError(this.type.singular);
          } else {
            try {
              const response = await this.api.get({
                schema: null,
                inactive: null,
              });
              this.items = this.flattenData(response);
              this.selected = this.items[0];
              result = this.success(this.type.singular);
            } catch (error) {
              result = this.retrievalError(this.type.plural, false);
            }
          }

          this.displayResult(result, { capitalized: true });
        }
      };

      this.showConfirm(
        `Are you sure you want to delete ${this.type.singular} ${this.selected.id}?`,
        handler,
      );
    },
    displayResult(result, options = {}, timeout = 100) {
      // Prevent closing the dialog when pressing enter to submit form
      setTimeout(() => {
        this.showDialog(result.body, result.title, options);
      }, timeout);
    },
  },
};
