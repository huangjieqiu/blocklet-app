<template>
  <div class="input-box">
    <svg v-if="!isMobile" viewBox="0 0 512 512" class="search-icon" height="1.5rem" selectable="0" width="1.5rem">
      <path
        d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
      ></path>
    </svg>
    <input
      v-model="value"
      type="text"
      placeholder="Search your transaction, an address or a block"
      width="100%"
      @keydown="enterPress"
      class="input-inner"
    />
    <button v-if="value.length" @click="value = ''" class="clear-btn">X</button>
    <button
      :class="{ 'button-disabled': disable }"
      :disabled="disable"
      class="search-button"
      type="button"
      v-if="isMobile"
      @click="handleInputFinished"
    >
      <svg viewBox="0 0 512 512" class="btn-svg" height="1.5rem" selectable="0" width="1.5rem">
        <path
          d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
        ></path>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'input-box',
  props: {
    disable: {
      type: Boolean,
      default: false,
    },
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      value: '',
    };
  },
  methods: {
    enterPress(eEvent) {
      if (this.disable) return;
      if (window.event) {
        eEvent = window.event;
      }
      const keyCode = eEvent.charCode || eEvent.keyCode;
      // press enter key
      if (keyCode === 13) {
        this.handleInputFinished();
      }
    },
    handleInputFinished() {
      const value = this.value.trim();
      if (!value) return;
      this.$emit('submit', value);
    },
  },
};
</script>

<style scoped lang="less">
.input-box {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  justify-content: space-between;
  border: 1px solid rgb(223, 227, 235);
  border-radius: 0.5rem;
  padding: 0px 0.5rem;
  width: 100%;
  height: 3rem;
  box-sizing: border-box;
  .clear-btn {
    margin-right: 1rem;
    width: 1.5rem;
    height: 1.5rem;
    border: none;
    font-size: 0.8rem;
    border-radius: 50%;
    cursor: pointer;
    outline: none;
    color: #fff;
    background-color: #ccc;
  }
  .search-icon {
    margin: 0px 0.5rem;
    pointer-events: none;
  }

  .input-inner {
    display: block;
    height: 2.7rem;
    width: 100%;
    padding: 0px 1rem;
    box-sizing: border-box;
    font-family: Inter;
    font-size: 1rem;
    color: rgb(53, 63, 82);
    border-width: 1px;
    border-color: rgb(223, 227, 235);
    border-style: solid;
    border-radius: 0.255rem;
    background-color: rgb(255, 255, 255);
    background-image: none;
    outline-width: 0px;
    user-select: text;
    transition: box-shadow 0.25s ease-out 0s;
    border: 0px;
    padding: 0px 0.5rem 0px 0px;
  }

  .search-button {
    &.button-disabled {
      cursor: not-allowed;
      background-color: #6998d9;
      .btn-svg {
        fill: #b1b1b1;
      }
    }
    margin-right: -0.5rem;
    font-family: Inter, Helvetica, sans-serif;
    font-size: 1rem;
    font-weight: 500;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    height: 100%;
    width: 5rem;
    border-radius: 0 0.5rem 0.5rem 0;
    padding: 0px 1rem;
    box-sizing: border-box;
    color: rgb(255, 255, 255);
    background-color: rgb(12, 108, 242);
    border: none;
    cursor: pointer;
    outline: none;
    opacity: 1;

    .btn-svg {
      fill: white;
    }
  }
}
</style>