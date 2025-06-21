const { ApiError, sendAccountVerificationEmail } = require("../../utils");
const {
  findAllStudents,
  findStudentDetail,
  findStudentToSetStatus,
  addOrUpdateStudent,
  deleteStudent,
} = require("./students-repository");
const { findUserById } = require("../../shared/repository");

const checkStudentId = async (id) => {
  const isStudentFound = await findUserById(id);
  if (!isStudentFound) {
    throw new ApiError(404, "Student not found");
  }
};

const getAllStudents = async (payload) => {
  const students = await findAllStudents(payload);
  if (students.length <= 0) {
    throw new ApiError(404, "Students not found");
  }

  return students;
};

const getStudentDetail = async (id) => {
  await checkStudentId(id);

  const student = await findStudentDetail(id);
  if (!student) {
    throw new ApiError(404, "Student not found");
  }

  return student;
};

const addNewStudent = async (payload) => {
  const MESSAGES = {
    SUCCESS: "Student added and verification email sent successfully.",
    FAILED: "Student added, but failed to send verification email.",
  };
  try {
    const result = await addOrUpdateStudent(payload);

    console.log(result);
    if (!result.status) {
      throw (500, result.message);
    }

    try {
      await sendAccountVerificationEmail({
        userId: result.userId,
        userEmail: payload.email,
      });
      return { message: MESSAGES.SUCCESS };
    } catch (error) {
      return { message: MESSAGES.FAILED };
    }
  } catch (error) {
    if (error) {
      throw new ApiError(500, error);
    }
    throw new ApiError(500, "Unable to add Student");
  }
};

const updateStudent = async (payload) => {
  const result = await addOrUpdateStudent(payload);
  if (!result.status) {
    throw new ApiError(500, result.message);
  }

  return { message: result.message };
};

const deleteStudentService = async ({ id }) => {
  await checkStudentId(id);

  const affectedRow = await deleteStudent({ id });

  if (affectedRow <= 0) {
    throw new ApiError(500, "Unable to delete student");
  }

  return { message: "Student deleted successfully" };
};

const setStudentStatus = async ({ userId, reviewerId, status }) => {
  await checkStudentId(userId);

  const affectedRow = await findStudentToSetStatus({
    userId,
    reviewerId,
    status,
  });
  if (affectedRow <= 0) {
    throw new ApiError(500, "Unable to disable student");
  }

  return { message: "Student status changed successfully" };
};

module.exports = {
  getAllStudents,
  getStudentDetail,
  addNewStudent,
  setStudentStatus,
  updateStudent,
  deleteStudentService,
};
