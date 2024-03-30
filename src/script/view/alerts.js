import Swal from "sweetalert2";

const showSuccessAlert = (message) => {
  Swal.fire({
    icon: "success",
    title: message,
    showConfirmButton: false,
    timer: 1500,
  });
};

const showErrorAlert = (error) => {
  Swal.fire({
    icon: "error",
    title: error.message,
    showConfirmButton: false,
    timer: 1500,
  });
};

export { showSuccessAlert, showErrorAlert };
