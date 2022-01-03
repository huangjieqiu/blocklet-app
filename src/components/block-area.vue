<template>
  <div class="block-area">
    <div style="margin-top: 1rem">
      <m-header
        :title="'Block ' + data.height"
        :tooltip="'All transactions recorded in Block at height ' + data.height"
      ></m-header>
      <div class="block-table">
        <div class="block-table-row" v-for="item in data" :key="item.label">
          <div class="block-table-column">
            <div class="block-table-cell">
              <span class="block-table-cell-content">{{ item.label }}</span>
            </div>
          </div>
          <div class="block-table-column">
            <div class="block-table-cell hasSvg">
              <span class="block-table-cell-content">{{ item.value }}</span
              ><svg
                @click="handleCopy(item.value)"
                v-if="item.label === 'hash'"
                viewBox="0 0 384 512"
                class="block-table-cell-svg"
                height="1rem"
                selectable="1"
                width="1rem"
              >
                <path
                  d="M384 112v352c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h80c0-35.29 28.71-64 64-64s64 28.71 64 64h80c26.51 0 48 21.49 48 48zM192 40c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24m96 114v-20a6 6 0 0 0-6-6H102a6 6 0 0 0-6 6v20a6 6 0 0 0 6 6h180a6 6 0 0 0 6-6z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MHeader from 'common/m-header';

export default {
  name: 'block-area',
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    handleCopy(value) {
      const input = document.createElement('input');
      document.body.appendChild(input);
      input.setAttribute('value', value);
      input.select();
      if (document.execCommand('copy')) {
        document.execCommand('copy');
      }
      document.body.removeChild(input);
    },
  },
  components: {
    MHeader,
  },
};
</script>

<style lang="less" scoped>
.block-area {
  .block-table {
    width: 100%;
    .block-table-row {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      border-bottom: 1px solid rgb(223, 227, 235);
      .block-table-column {
        width: 100%;
        padding: 0.8rem 0px;
        overflow: hidden;
        text-overflow: ellipsis;
        height: auto;
        &:first-child {
          width: 50%;
        }
        .block-table-cell {
          text-align: left;
          .block-table-cell-content {
            color: rgb(103, 113, 133);
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          &.hasSvg {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            .block-table-cell-svg {
              flex-shrink: 0;
              margin: 0px 5px;
              fill: rgb(80, 89, 107);
              &:hover {
                fill: rgb(61, 137, 245);
              }
            }
          }
        }
      }
    }
  }
}
</style>