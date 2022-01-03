<template>
  <div class="home">
    <input-box @submit="getData" :disable="loading" :isMobile="isMobile"></input-box>

    <div class="container">
      <div class="loading-mask" v-if="loading">
        <div class="loading-spinner">
          <svg viewBox="25 25 50 50" class="circular">
            <circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
          </svg>
        </div>
      </div>

      <block-area v-if="blockData.length" :data="blockData"></block-area>
      <transaction-area :isMobile="isMobile" v-if="transactionData.length" :data="transactionData"></transaction-area>

      <div class="empty" v-else-if="!blockData.length && !transactionData.length && !loading">
        <span class="empty-text">请输入并搜索数据</span>
      </div>
    </div>

    <message-box :message="message" :visible.sync="messageBoxVisible"></message-box>
  </div>
</template>

<script>
import api from '../libs/api';
import MessageBox from 'common/message-box';

import BlockArea from 'components/block-area';
import InputBox from 'components/input-box';

import TransactionArea from 'components/transaction-area';
const WIDTH = 768;
const { body } = document;
export default {
  name: 'home',
  components: {
    BlockArea,
    InputBox,
    MessageBox,
    TransactionArea,
  },
  data() {
    return {
      loading: false,
      messageBoxVisible: false,
      isMobile: false,

      transactionData: [],
      blockData: [],
      message: '',
    };
  },
  mounted() {
    this.getValueOfIsMobile();
  },
  beforeMount() {
    window.addEventListener('resize', this.getValueOfIsMobile);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getValueOfIsMobile);
  },
  methods: {
    getValueOfIsMobile() {
      const rect = body.getBoundingClientRect();
      this.isMobile = rect.width < WIDTH;
    },
    getData(value) {
      if (!value) return;
      this.loading = true;
      api
        .get(`https://blockchain.info/rawblock/` + value)
        .then((data) => {
          const { tx, height } = data;
          this.transactionData = tx;
          this.transactionData.height = height;
          this.updateBlockData(data);
        })
        .catch((message) => {
          this.message = message;
          this.messageBoxVisible = true;
        })
        .finally(() => (this.loading = false));
    },
    updateBlockData(data) {
      this.blockData = [];
      this.blockData.height = data.height;
      Object.keys(data).forEach((key) => {
        if (key === 'tx') return;
        this.blockData.push({
          label: key,
          value: data[key],
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.home {
  padding: 1.2rem 1rem;
  height: 100vh;
  box-sizing: border-box;
  .container {
    position: relative;
    .empty {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      text-align: center;
      .empty-text {
        display: inline-block;
        margin-top: calc(30% - 3rem);
        color: #b7b7b7;
        font-size: 2rem;
      }
    }
    .loading-mask {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 2000;
      margin: auto;
      background-color: hsla(0, 0%, 100%, 0.9);
      transition: opacity 0.3s;
      .loading-spinner {
        margin-top: calc(30% - 3rem);
        width: 100%;
        text-align: center;
        position: absolute;
        .circular {
          height: 42px;
          width: 42px;
          animation: loading-rotate 2s linear infinite;
        }
        .path {
          animation: loading-dash 1.5s ease-in-out infinite;
          stroke-dasharray: 90, 150;
          stroke-dashoffset: 0;
          stroke-width: 2;
          stroke: #409eff;
          stroke-linecap: round;
        }
      }
    }
  }

  @keyframes loading-rate {
    100% {
      transform: rotate(1turn);
    }
  }

  @keyframes loading-dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -40px;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -120px;
    }
  }
}
</style>
