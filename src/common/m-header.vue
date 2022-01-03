<template>
  <div class="m-header">
    <span class="title" opacity="1">{{ title }}</span>
    <svg
      @mouseover="tooltipVisible = true"
      @mouseleave="tooltipVisible = false"
      class="svg"
      viewBox="0 0 512 512"
      height="1rem"
      selectable="0"
      width="1rem"
    >
      <path
        d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"
      ></path>
    </svg>
    <div class="tootip" v-if="tooltipVisible">
      {{ tooltip }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'm-header',
  props: {
    title: {
      type: String,
      default: '',
    },
    tooltip: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      tooltipVisible: false,
    };
  },
};
</script>

<style lang="less" scoped>
.m-header {
  display: flex;
  align-items: center;
  padding: 1rem 0px;

  .title {
    font-weight: 700;
    font-size: 1.5rem;
    text-transform: none;
    font-style: normal;
    color: rgb(53, 63, 82);
    text-transform: none;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    font-family: Inter, Helvetica, sans-serif;
    font-feature-settings: 'calt' 0;
  }
  .svg {
    fill: rgb(152, 161, 178);
    margin-left: 0.5rem;
  }

  .tooltip {
    border-radius: 30px;
    background: rgb(61, 60, 60);
    opacity: 0.6;
    padding: 3px;
    box-sizing: border-box;
    color: #fff;
    font-size: 1rem;
    z-index: 111;
  }
}
</style>