const asyncHandler = require("express-async-handler");
const {
  getAllStudents,
  addNewStudent,
  getStudentDetail,
  setStudentStatus,
  updateStudent,
  deleteStudentService
} = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
  const payload = req.query;

  const students = await getAllStudents(payload);
  res.json({ students });
});

const handleAddStudent = asyncHandler(async (req, res) => {
  const payload = req.body;
  const message = await addNewStudent(payload);

  res.json(message);
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
  const { id: userId } = req.params;
  const payload = req.body;

  const message = await updateStudent({ ...payload, userId });

  res.json(message);
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const message = await getStudentDetail(id);
  res.json(message);
});

const handleStudentStatus = asyncHandler(async (req, res) => {
  const { id: userId } = req.params;
  const payload = req.body;
  const message = await setStudentStatus({ ...payload, userId });
  res.json(message);
});

const handleDeleteStudent = asyncHandler(async (req, res) => {
    const {id} = req.params

    const message = await deleteStudentService({id})
    res.json(message)
});

module.exports = {
  handleGetAllStudents,
  handleGetStudentDetail,
  handleAddStudent,
  handleStudentStatus,
  handleUpdateStudent,
  handleDeleteStudent
};
