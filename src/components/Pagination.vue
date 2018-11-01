<template>
  <nav>
    <ul class="pagination">
      <li
        v-bind:class="{ 'disabled': !isPrevBtnActive }"
        class="page-item">
        <a
          class="page-link"
          v-on:click.prevent="paginationClick(localCurrentPage - 1)" >
          <span>&laquo;</span>
        </a>
      </li>

      <li
        v-for="numberPageLink in pageLinks"
        v-bind:key="numberPageLink"
        v-bind:class="{ 'active': numberPageLink == localCurrentPage }"
        class="page-item">
        <a
          class="page-link"
          v-on:click.prevent="paginationClick(numberPageLink)">{{ numberPageLink }}</a>
      </li>

      <li
        v-bind:class="{ 'disabled': !isNextBtnActive }"
        class="page-item">
        <a
          class="page-link"
          v-on:click.prevent="paginationClick(localCurrentPage + 1)" >
          <span>&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Pagination',

  model: {
    prop: 'currentPage'
  },

  props: {
    currentPage: {
      type: Number,
      required: true
    },

    totalCount: {
      type: Number,
      required: true
    },

    rowsPerPage: {
      type: Number,
      required: true
    }
  },

  data: () => ({
    pageRange: 2,
    localCurrentPage: null
  }),

  computed: {
    numberPageLinks: function() {
      return Math.ceil(this.totalCount / this.rowsPerPage);
    },

    isPrevBtnActive: function() {
      return this.localCurrentPage > 1;
    },

    isNextBtnActive: function() {
      return this.localCurrentPage < this.numberPageLinks;
    },

    pageLinks: function() {
      return this.calculationPositionOfPageLinks(
        this.localCurrentPage,
        this.pageRange,
        this.numberPageLinks
      );
    }
  },

  watch: {
    localCurrentPage: function() {
      this.$emit('input', this.localCurrentPage);
    }
  },

  created: function() {
    this.localCurrentPage = this.currentPage;
  },

  methods: {
    paginationClick: function(toPage) {
      this.localCurrentPage = toPage;
      this.$emit('pagination-click', toPage);
    },

    calculationPositionOfPageLinks: function(
      currentPage,
      pageRange,
      totalPageLinks
    ) {
      var rangeStart = currentPage - pageRange;
      var rangeEnd = currentPage + pageRange;

      if (rangeStart < 1) {
        rangeStart = 1;
        rangeEnd = Math.min(pageRange * 2 + 1, totalPageLinks);
      }

      if (rangeEnd > totalPageLinks) {
        rangeEnd = totalPageLinks;
        rangeStart = totalPageLinks - pageRange * 2;
        rangeStart = rangeStart < 1 ? 1 : rangeStart;
      }

      var temp = [];

      for (let i = rangeStart; i <= rangeEnd; i++) {
        temp.push(i);
      }

      return temp;
    }
  }
};
</script>
