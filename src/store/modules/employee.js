import axios from "axios";

const state = {
  employees: [],
  employeeToUpdate: null,
  operation:"Add"
};

const getters = {
  allEmployees: (state) => state.employees,
  findEmployeeById: (state) =>(id) => {
    var employee = state.employees.filter((e) => {
      if (e.id === id) {
        return e;
      }
    });
    return employee[0];
  },
  getOperation: (state) => state.operation,
  getEmployeeToUpdate:(state) => state.employeeToUpdate
};

const actions = {
  async fetchEmployees({ commit }) {
    const response = await axios.get(
      "http://dummy.restapiexample.com/api/v1/employees"
    );
    commit("setEmployees", response.data.data);
  },
  async addEmployee({ commit }, newEmployee) {
    // Note:-
    // Dummy Rest API Example create API returning returning cross-orgin issue
    // so i'm explaining by mocking data here

    //   const response = await axios.post("http://dummy.restapiexample.com/create", newEmployee);
    //   commit('addEmployee', response.data);

    const mapNewEmployee = {
      id: 0,
      employee_name: newEmployee.name,
      employee_salary: newEmployee.salary,
      employee_age: newEmployee.age,
      profile_image: "",
    };
    commit("addEmployee", mapNewEmployee);
  },
  setEmployeeToUpdate({ commit },data) {
    commit("setEmployeeToUpdate",data);
  },
  async updateEmployee({commit}, data){
    // Note:-
    // Dummy Rest API Example update API returning returning cross-orgin issue
    // so i'm explaining by mocking data here

    // const response = await axios.put(`http://dummy.restapiexample.com/v1/update/${data.id}`, data);
    //   commit('addEmployee', response.data);
    const updateEmp = {
      id: data.id,
      employee_name: data.name,
      employee_salary: data.salary,
      employee_age: data.age,
      profile_image: "",
    };
    commit('updatedEmployee',updateEmp)
  },
  async deleteEmployee({commit}, id){
    // Note:-
    // Dummy Rest API Example delete API returning returning cross-orgin issue
    // so i'm explaining by mocking data here
    // const response = await axios.delete(`http://dummy.restapiexample.com/v1/delete/${data.id}`)
    commit('deleteEmployee', id);
  }
};

const mutations = {
  setEmployees: (state, data) => {
    state.employees = data;
  },
  addEmployee: (state, data) => state.employees.unshift(data),
  setEmployeeToUpdate: (state,data) => {
    state.employeeToUpdate = data.employeeToUpdate;
    state.operation = data.operationName;
    return state;
  },
  updatedEmployee:(state,data) => {
    var employees = state.employees.filter((e) => {
      if (e.id !== data.id) {
        return e;
      }
    });
    employees.unshift(data);
    state.employees = employees;
    return state;
  },
  deleteEmployee:(state, id) =>{
    var employees = state.employees.filter((e) => {
      if (e.id !== id) {
        return e;
      }
    });
    state.employees = employees;
    return state;
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};
