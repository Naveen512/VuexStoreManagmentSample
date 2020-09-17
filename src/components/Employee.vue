<template>
  <div>
    <AddEmployee />
    <br />
    <div class="row">
      <div class="card" style="width: 18rem;" v-for="emp in allEmployees" v-bind:key="emp.id">
        <div class="card-header">{{emp.employee_name}}</div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Salary: {{emp.employee_salary}}</li>
          <li class="list-group-item">Age: {{emp.employee_age}}</li>
        </ul>
        <div>
          <button type="button" class="btn btn-success" @click="edit(emp.id)">Edit</button>
          <button type="button" class="btn btn-danger" @click="deleteEmp(emp.id)">Edit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AddEmployee from "./AddEmployee.vue";

export default {
  name: "Employee",
  components: {
    AddEmployee
  },
  methods: {
    ...mapActions(["fetchEmployees", "setEmployeeToUpdate", 'deleteEmployee']),
    edit: function(id) {
      var employee = this.findEmployeeById(id);
      this.setEmployeeToUpdate({
        employeeToUpdate: employee,
        operationName: "Update"
      });
    },
    deleteEmp: function(id) {
      this.deleteEmployee(id);
    }
  },
  computed: {
    ...mapGetters(["allEmployees", "findEmployeeById"])
  },
  created() {
    this.fetchEmployees();
  }
};
</script>