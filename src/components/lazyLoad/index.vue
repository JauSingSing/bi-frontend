<script>
import { h } from 'vue'
import useLazyLoad from './useLazyLoad'

export default {
  data() {
    return {
      show: false
    }
  },
  render() {
    return h('div', this.show && this.$slots.default ? this.$slots.default() : null)
  },
  created() {
    useLazyLoad(this)
  },
  methods: {
    load() {
      this.show = true
      this.$emit('show')
    }
  }
}
</script>
