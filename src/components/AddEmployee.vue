<template>
  <div>
    <form>
      <div class="form-row">
        <div class="col">
          <input type="text" class="form-control" placeholder="Name" v-model="employee.name" />
        </div>
        <div class="col">
          <input type="text" class="form-control" placeholder="age" v-model="employee.age" />
        </div>
        <div class="col">
          <input type="text" class="form-control" placeholder="salary" v-model="employee.salary" />
        </div>
        <div class="col">
          <button type="button" class="btn btn-success" @click="save()">Save</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "AddEmployee",
  data: function() {
    return {
      employee: {
        id: 0,
        name: "",
        age: "",
        salary: ""
      }
    };
  },
  computed: {
    ...mapGetters(["getOperation", "getEmployeeToUpdate"])
  },
  watch: {
    getEmployeeToUpdate: function() {
      if (this.getOperation && this.getOperation.toLowerCase() === "update") {
        this.employeeToUpdate();
      } else {
        this.resetEmployee();
      }
    }
  },
  methods: {
    ...mapActions(["addEmployee","updateEmployee","setEmployeeToUpdate"]),
    save: function() {
      if (this.getOperation.toLowerCase() === "add") {
        this.addEmployee(this.employee);
      }else{
        this.updateEmployee(this.employee);
      }
      this.setEmployeeToUpdate({ employeeToUpdate: null, operationName: "Add" });
      this.resetEmployee();
    },
    employeeToUpdate: function() {
      if (this.getEmployeeToUpdate) {
        this.employee.name = this.getEmployeeToUpdate.employee_name;
        this.employee.age = this.getEmployeeToUpdate.employee_age;
        this.employee.salary = this.getEmployeeToUpdate.employee_salary;
        this.employee.id = this.getEmployeeToUpdate.id;
      }
    },
    resetEmployee: function() {
      this.employee = {
        id: 0,
        name: "",
        age: "",
        salary: ""
      };
    }
  }
};
</script>