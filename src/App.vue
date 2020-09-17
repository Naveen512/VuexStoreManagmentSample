<template>
  <div id="app" class="container">
    <h1>Employees</h1>
    <Employee />
  </div>
</template>

<script>
import Employee from './components/Employee.vue';

export default {
  name: 'App',
  components: {
    Employee
  }
}
</script>

