<template>
  <div class="transaction-area">
    <div class="transaction-container">
      <m-header
        title="Transactions"
        :tooltip="'All transactions recorded in Block at height ' + data.height"
      ></m-header>
      <div class="transaction-item" v-for="item in currentData" :key="item.hash">
        <flex-box leftContent="Fee" :rightContent="item.fee"></flex-box>

        <flex-box :leftContent="isMobile ? 'Amount' : ''" :rightContent="item.amount"> </flex-box>

        <flex-box heightLight leftContent="Hash" :rightContent="item.hashArray"></flex-box>

        <flex-box :leftContent="isMobile ? 'Date' : ''" :rightContent="item.date"></flex-box>

        <flex-box heightLight :leftContent="isMobile ? 'From' : ''" :rightContent="item.inputs"> </flex-box>

        <flex-box heightLight :leftContent="isMobile ? 'To' : ''" :rightContent="item.out">
          <template v-slot:left-content v-if="!isMobile">
            <svg
              enable-background="new 0 0 32 32"
              height="1.2rem"
              id="svg2"
              version="1.1"
              viewBox="0 0 32 32"
              width="1.2rem"
              style="fill: rgb(51, 159, 123)"
            >
              <g><rect fill="none" height="1.2rem" width="1.2rem"></rect></g>
              <g>
                <polygon points="16,2.001 16,10 2,10 2,22 16,22 16,30 30,16  "></polygon>
              </g>
            </svg>
          </template>
        </flex-box>
      </div>
    </div>
    <pagination
      :total="data.length"
      :currentPage="page.currentPage"
      :pageSize="page.pageSize"
      @change="pagination"
    ></pagination>
  </div>
</template>

<script>
import FlexBox from 'common/flex-box';
import MHeader from 'common/m-header';
import Pagination from 'common/pagination';
export default {
  components: {
    FlexBox,
    Pagination,
    MHeader,
  },
  name: 'transaction-area',
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      page: {
        currentPage: 1,
        pageSize: 5,
        total: 0,
      },
    };
  },
  computed: {
    currentData() {
      const { currentPage, pageSize } = this.page;
      const data = this.data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
      return this.normalizeData(data);
    },
  },
  methods: {
    normalizeData(data) {
      return data.map((item) => {
        const fee = [];
        Object.keys(item).forEach((key) => {
          if (key === 'out' || key === 'inputs' || key === 'hash') {
            return;
          }
          fee.push({
            main: key + ': ' + item[key],
          });
        });
        return {
          hash: item.hash,
          hashArray: [{ main: item.hash }],
          amount: [{ main: item.size }],
          date: [{ main: this.getDate(item.time) }],
          fee,
          out: item.out.map((a) => ({ main: a.script, aside: '$' + a.value })),
          inputs: item.inputs.map((a) => ({ main: a.script, aside: '$' + a.prev_out.value })),
        };
      });
    },
    getDate(time) {
      let date = new Date(time);
      date = date.toISOString();
      date = date.substring(0, date.indexOf('.'));
      return date.split('T').join(' ');
    },
    pagination(page) {
      this.page.currentPage = page;
    },
  },
};
</script>

<style lang="less" scoped>
.transaction-area {
  width: 100%;
  .transaction-container {
    margin: 1rem 0;
    width: 100%;
    .transaction-item {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
    }
  }
}

@media screen and (min-width: 768px) {
  .transaction-area {
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
  }
}
</style>