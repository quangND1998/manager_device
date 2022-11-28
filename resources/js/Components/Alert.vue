<template>
  <div
    v-if="$page.props.flash.warning || Object.keys($page.props.errors).length > 0"
    :class="['alert', 'alert-' + 'error', {'alert-dismissible': dismissible}]"
  >
    <button
      v-if="dismissible"
      type="button"
      class="close"
      data-dismiss="alert"
      aria-hidden="true"
    >&times;</button>
    <h4>
      <i class="fa fa-warning" v-if="Object.keys($page.props.errors).length > 0"></i>
      <span
        v-if="Object.keys($page.props.errors).length > 0"
      >There are {{Object.keys($page.props.errors).length}} form errors.</span>
      <i class="fa fa-warning" v-if="$page.props.flash.warning"></i>
      <span v-if="$page.props.flash.warning">{{$page.props.flash.warning}}</span>
    </h4>
    <span>
      <slot></slot>
    </span>
  </div>
  <div v-else-if="$page.props.flash.success" :class="['alert', 'alert-' + 'success', {'alert-dismissible': dismissible}]">
    <button
      v-if="dismissible"
      type="button"
      class="close"
      data-dismiss="alert"
      aria-hidden="true"
    >&times;</button>
    <h4>
      <i class="fa fa-check"></i>
      <span>{{$page.props.flash.success}}</span>
    </h4>
    <span>
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: "Alert",
  props: {
    dismissible: {
      type: Boolean,
      default: true
    }
  }
};
</script>
