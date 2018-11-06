<template>
  <nav>
    <ul class="pagination">
      <li
        v-bind:class="{ 'disabled': isPrevBtnDisabled }"
        class="page-item">
        <a
          class="page-link"
          v-on:click.prevent="paginationPrev" >
          <span>&laquo;</span>
        </a>
      </li>

      <li
        v-for="numberPageLink in pageLinks"
        v-bind:key="numberPageLink"
        v-bind:class="{ 'active': numberPageLink === page }"
        class="page-item">
        <a
          class="page-link"
          v-on:click.prevent="paginationLinkClick(numberPageLink)">{{ numberPageLink }}</a>
      </li>

      <li
        v-bind:class="{ 'disabled': isNextBtnDisabled }"
        class="page-item">
        <a
          class="page-link"
          v-on:click.prevent="paginationNext" >
          <span>&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'ContentPagination',

  props: {
    page: {
      type: Number,
      required: true
    },

    total: {
      type: Number,
      required: true
    },

    limit: {
      type: Number,
      required: true
    }
  },

  data() {
    return {
      pageRange: 2
    };
  },

  computed: {
    numberPageLinks() {
      return Math.ceil(this.total / this.limit);
    },

    isPrevBtnDisabled() {
      return this.page <= 1;
    },

    isNextBtnDisabled() {
      return this.page >= this.numberPageLinks;
    },

    pageLinks() {
      return this.calculationPositionOfPageLinks(
        this.page,
        this.pageRange,
        this.numberPageLinks
      );
    }
  },

  methods: {
    paginationPrev() {
      this.paginationClick({
        toPage: this.page - 1,
        name: this.$route.name
      });
    },

    paginationNext() {
      this.paginationClick({
        toPage: this.page + 1,
        name: this.$route.name
      });
    },

    paginationLinkClick(toPage) {
      this.paginationClick({
        toPage: toPage,
        name: this.$route.name
      });
    },

    paginationClick(page) {
      this.$emit('pagination-click', page);
    },

    calculationPositionOfPageLinks(currentPage, pageRange, totalPageLinks) {
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
